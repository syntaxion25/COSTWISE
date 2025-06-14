// =================== pieChart.js ===================

let costChart = null;

// Initialize the pie chart
function initializePieChart() {
  const ctx = document.getElementById('costPieChart');
  if (!ctx) {
    console.error('Canvas element not found');
    return;
  }

  // Destroy existing chart if it exists
  if (costChart) {
    costChart.destroy();
  }

  const costData = calculateTotalCost();
  
  costChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Raw Materials', 'Labor', 'Overheads', 'Miscellaneous'],
      datasets: [{
        data: [
          costData.materials.totalMaterialCost,
          costData.labor.totalLaborCost,
          costData.overheads.totalOverheadCost,
          costData.miscellaneous.totalMiscellaneousCost
        ],
        backgroundColor: [
          '#FF6384', // Pink for Raw Materials
          '#36A2EB', // Blue for Labor
          '#FFCE56', // Yellow for Overheads
          '#4BC0C0'  // Teal for Miscellaneous
        ],
        borderColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0'
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverBorderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 14,
              weight: '500'
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const currency = getCurrentCurrency();
              const formattedValue = formatCurrency(value, currency);
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${formattedValue} (${percentage}%)`;
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#fff',
          borderWidth: 1
        }
      },
      animation: {
        animateRotate: true,
        duration: 1000
      }
    }
  });

  console.log('Pie chart initialized successfully');
}

// Update the pie chart with new data
function updatePieChart() {
  const costData = calculateTotalCost();
  const noDataMessage = document.getElementById('no-data-message');
  const chartSummary = document.getElementById('chart-summary');
  
  console.log('Updating pie chart with data:', costData);

  // Check if there's any cost data
  if (costData.totalCost === 0) {
    // Show no data message
    if (noDataMessage) {
      noDataMessage.style.display = 'block';
    }
    // Hide chart summary
    if (chartSummary) {
      chartSummary.style.display = 'none';
    }
    // Don't create/update chart
    return;
  } else {
    // Hide no data message
    if (noDataMessage) {
      noDataMessage.style.display = 'none';
    }
    // Show chart summary
    if (chartSummary) {
      chartSummary.style.display = 'block';
    }
  }

  // Initialize chart if it doesn't exist
  if (!costChart) {
    initializePieChart();
    return;
  }

  // Update chart data
  costChart.data.datasets[0].data = [
    costData.materials.totalMaterialCost,
    costData.labor.totalLaborCost,
    costData.overheads.totalOverheadCost,
    costData.miscellaneous.totalMiscellaneousCost
  ];

  // Update the chart
  costChart.update('active');

  // Update chart summary
  updateChartSummary(costData);
}

// Update chart summary information
function updateChartSummary(costData) {
  const chartSummary = document.getElementById('chart-summary');
  if (!chartSummary) return;

  const currency = getCurrentCurrency();
  
  let summaryHTML = `
    <div class="summary-item">
      <strong>Total Cost: ${formatCurrency(costData.totalCost, currency)}</strong>
    </div>
    <div class="summary-breakdown">
  `;

  // Add breakdown items only if they have values
  if (costData.materials.totalMaterialCost > 0) {
    summaryHTML += `
      <div class="breakdown-item">
        <span class="breakdown-color" style="background-color: #FF6384;"></span>
        <span>Materials: ${formatCurrency(costData.materials.totalMaterialCost, currency)} (${costData.breakdown.materialsPercentage}%)</span>
      </div>
    `;
  }

  if (costData.labor.totalLaborCost > 0) {
    summaryHTML += `
      <div class="breakdown-item">
        <span class="breakdown-color" style="background-color: #36A2EB;"></span>
        <span>Labor: ${formatCurrency(costData.labor.totalLaborCost, currency)} (${costData.breakdown.laborPercentage}%)</span>
      </div>
    `;
  }

  if (costData.overheads.totalOverheadCost > 0) {
    summaryHTML += `
      <div class="breakdown-item">
        <span class="breakdown-color" style="background-color: #FFCE56;"></span>
        <span>Overheads: ${formatCurrency(costData.overheads.totalOverheadCost, currency)} (${costData.breakdown.overheadsPercentage}%)</span>
      </div>
    `;
  }

  if (costData.miscellaneous.totalMiscellaneousCost > 0) {
    summaryHTML += `
      <div class="breakdown-item">
        <span class="breakdown-color" style="background-color: #4BC0C0;"></span>
        <span>Miscellaneous: ${formatCurrency(costData.miscellaneous.totalMiscellaneousCost, currency)} (${costData.breakdown.miscellaneousPercentage}%)</span>
      </div>
    `;
  }

  summaryHTML += `</div>`;
  chartSummary.innerHTML = summaryHTML;
}

// Dark mode chart colors
function updateChartTheme() {
  if (!costChart) return;

  const isDarkMode = document.body.classList.contains('dark-mode');
  
  if (isDarkMode) {
    // Dark mode colors
    costChart.options.plugins.legend.labels.color = '#e0e0e0';
    costChart.options.plugins.tooltip.backgroundColor = 'rgba(40, 40, 40, 0.9)';
  } else {
    // Light mode colors
    costChart.options.plugins.legend.labels.color = '#333';
    costChart.options.plugins.tooltip.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }
  
  costChart.update('none');
}

// Initialize chart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, preparing pie chart...');
  // Wait for other scripts to load
  setTimeout(() => {
    // Chart will be initialized when the tab is first opened
    console.log('Pie chart ready for initialization');
  }, 500);
});

// Update chart theme when dark mode is toggled
const nightToggle = document.getElementById('nightToggle');
if (nightToggle) {
  nightToggle.addEventListener('change', function() {
    setTimeout(updateChartTheme, 100);
  });
}

// Force chart update when inputs change
function refreshChart() {
  if (document.getElementById('chart_parent').style.display !== 'none') {
    updatePieChart();
  }
}