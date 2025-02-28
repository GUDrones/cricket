// Initialize dropdowns
$(document).ready(function() {
    $('.dropdown-toggle').dropdown();
});

// Function to create charts
function createChart(canvasId, labels, data, label, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: 'rgba(' + color + ', 0.2)',
                borderColor: 'rgba(' + color + ', 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(' + color + ', 1)',
                pointRadius: 3,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
} 