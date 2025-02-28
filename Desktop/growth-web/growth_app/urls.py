from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    # Public pages
    path('', views.landing_page, name='landing_page'),
    path('about/', views.about_us, name='about_us'),
    path('contact/', views.contact, name='contact'),
    
    # Authentication
    path('signin/', views.signin_view, name='signin'),
    path('register/', views.register_view, name='register'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    
    # User dashboard and settings
    path('dashboard/', views.dashboard, name='dashboard'),
    path('settings/', views.user_settings, name='user_settings'),
    
    # Business management
    path('businesses/', views.businesses_list, name='businesses_list'),
    path('businesses/add/', views.add_business, name='add_business'),
    path('businesses/<int:business_id>/', views.business_detail, name='business_detail'),
    path('businesses/<int:business_id>/edit/', views.edit_business, name='edit_business'),
    path('businesses/<int:business_id>/delete/', views.delete_business, name='delete_business'),
    
    # Sales data
    path('businesses/<int:business_id>/add-data/', views.add_sales_data, name='add_sales_data'),
    
    # AJAX endpoints
    path('api/sales-data/<int:business_id>/', views.get_sales_data, name='get_sales_data'),
] 