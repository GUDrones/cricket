from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Business, SalesData, UserProfile
from .forms import (
    RegistrationForm, BusinessForm, SalesDataForm, 
    UserProfileForm, PasswordChangeForm
)

def landing_page(request):
    """Landing page view with information about the service."""
    return render(request, 'growth_app/landing_page.html')

def about_us(request):
    """About Us page with company information."""
    return render(request, 'growth_app/about_us.html')

def contact(request):
    """Contact page with company contact information."""
    return render(request, 'growth_app/contact.html')

def signin_view(request):
    """User login view."""
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('dashboard')
    else:
        form = AuthenticationForm()
    return render(request, 'growth_app/signin.html', {'form': form})

def register_view(request):
    """User registration view."""
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Create a user profile
            UserProfile.objects.create(user=user)
            # Log the user in
            login(request, user)
            return redirect('dashboard')
    else:
        form = RegistrationForm()
    return render(request, 'growth_app/register.html', {'form': form})

def forgot_password(request):
    """Password reset request page."""
    # This would typically use Django's password reset functionality
    return render(request, 'growth_app/forgot_password.html')

@login_required
def dashboard(request):
    """User dashboard with overview of businesses and sales data."""
    businesses = Business.objects.filter(owner=request.user)
    return render(request, 'growth_app/dashboard.html', {'businesses': businesses})

@login_required
def user_settings(request):
    """User settings page for profile and password management."""
    if request.method == 'POST':
        if 'update_profile' in request.POST:
            profile_form = UserProfileForm(request.POST, request.FILES, instance=request.user.profile)
            if profile_form.is_valid():
                profile_form.save()
                return redirect('user_settings')
        elif 'change_password' in request.POST:
            password_form = PasswordChangeForm(request.user, request.POST)
            if password_form.is_valid():
                password_form.save()
                # Update session to prevent logout
                update_session_auth_hash(request, request.user)
                return redirect('user_settings')
    else:
        profile_form = UserProfileForm(instance=request.user.profile)
        password_form = PasswordChangeForm(request.user)
    
    return render(request, 'growth_app/user_settings.html', {
        'profile_form': profile_form,
        'password_form': password_form
    })

@login_required
def businesses_list(request):
    """List of all businesses belonging to the user."""
    businesses = Business.objects.filter(owner=request.user)
    return render(request, 'growth_app/businesses_list.html', {'businesses': businesses})

@login_required
def add_business(request):
    """Add a new business."""
    if request.method == 'POST':
        form = BusinessForm(request.POST, request.FILES)
        if form.is_valid():
            business = form.save(commit=False)
            business.owner = request.user
            business.save()
            return redirect('businesses_list')
    else:
        form = BusinessForm()
    return render(request, 'growth_app/add_business.html', {'form': form})

@login_required
def business_detail(request, business_id):
    """Detail view for a specific business."""
    business = get_object_or_404(Business, id=business_id, owner=request.user)
    sales_data = SalesData.objects.filter(business=business)
    return render(request, 'growth_app/business_detail.html', {
        'business': business, 
        'sales_data': sales_data
    })

@login_required
def edit_business(request, business_id):
    """Edit an existing business."""
    business = get_object_or_404(Business, id=business_id, owner=request.user)
    if request.method == 'POST':
        form = BusinessForm(request.POST, request.FILES, instance=business)
        if form.is_valid():
            form.save()
            return redirect('business_detail', business_id=business.id)
    else:
        form = BusinessForm(instance=business)
    return render(request, 'growth_app/edit_business.html', {'form': form, 'business': business})

@login_required
def delete_business(request, business_id):
    """Delete a business."""
    business = get_object_or_404(Business, id=business_id, owner=request.user)
    if request.method == 'POST':
        business.delete()
        return redirect('businesses_list')
    return render(request, 'growth_app/delete_business.html', {'business': business})

@login_required
def add_sales_data(request, business_id):
    """Add sales data for a business."""
    business = get_object_or_404(Business, id=business_id, owner=request.user)
    if request.method == 'POST':
        form = SalesDataForm(request.POST)
        if form.is_valid():
            sales_data = form.save(commit=False)
            sales_data.business = business
            sales_data.save()
            return redirect('business_detail', business_id=business.id)
    else:
        form = SalesDataForm()
    return render(request, 'growth_app/add_sales_data.html', {'form': form, 'business': business})

@login_required
def get_sales_data(request, business_id):
    """API endpoint to get sales data for charts."""
    business = get_object_or_404(Business, id=business_id, owner=request.user)
    sales_data = SalesData.objects.filter(business=business)
    data = {
        'dates': [item.date.strftime('%Y-%m-%d') for item in sales_data],
        'amounts': [float(item.amount) for item in sales_data]
    }
    return JsonResponse(data)
