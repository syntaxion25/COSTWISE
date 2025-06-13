const toggle = document.getElementById('nightToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

function formatCurrency(amount, currency = 'INR') {
  const currencySymbols = { 'INR': '₹', 'USD': '$', 'EUR': '€' };
  const symbol = currencySymbols[currency] || '₹';
  return `${symbol}${parseFloat(amount).toFixed(2)}`;
}

function getCurrentCurrency() {
  const currencySelect = document.getElementById('currency');
  return currencySelect ? currencySelect.value : 'INR';
}

function calculateMaterialCosts() {
  const materialBlocks = document.querySelectorAll('.material-block');
  let totalMaterialCost = 0;
  const materials = [];

  materialBlocks.forEach(block => {
    const quantity = parseFloat(block.querySelector('.material-quantity')?.value) || 0;
    const unitCost = parseFloat(block.querySelector('.material-cost')?.value) || 0;
    const name = block.querySelector('.material-name')?.value || 'Unnamed Material';
    const totalCost = quantity * unitCost;
    totalMaterialCost += totalCost;

    if (quantity > 0 && unitCost > 0) {
      materials.push({ name, quantity, unitCost, totalCost });
    }
  });

  return { totalMaterialCost, materials };
}

function calculateLaborCosts() {
  const laborBlocks = document.querySelectorAll('.labor-block');
  let totalLaborCost = 0;
  const laborItems = [];

  laborBlocks.forEach(block => {
    const hours = parseFloat(block.querySelector('.labor-hours')?.value) || 0;
    const hourlyRate = parseFloat(block.querySelector('.labor-cost')?.value) || 0;
    const totalCost = hours * hourlyRate;
    totalLaborCost += totalCost;

    if (hours > 0 && hourlyRate > 0) {
      laborItems.push({ hours, hourlyRate, totalCost });
    }
  });

  return { totalLaborCost, laborItems };
}

function calculateOverheadCosts() {
  const overheadBlocks = document.querySelectorAll('.overhead-block');
  let totalOverheadCost = 0;
  const overheadItems = [];

  overheadBlocks.forEach(block => {
    const hours = parseFloat(block.querySelector('.overhead-hours')?.value) || 0;
    const hourlyRate = parseFloat(block.querySelector('.overhead-cost')?.value) || 0;
    const totalCost = hours * hourlyRate;
    totalOverheadCost += totalCost;

    if (hours > 0 && hourlyRate > 0) {
      overheadItems.push({ hours, hourlyRate, totalCost });
    }
  });

  return { totalOverheadCost, overheadItems };
}

function calculateMiscellaneousCosts() {
  const miscInput = document.getElementById('miscellaneous_costs');
  const totalMiscellaneousCost = parseFloat(miscInput?.value) || 0;
  return { totalMiscellaneousCost };
}

function calculateTotalCost() {
  const materials = calculateMaterialCosts();
  const labor = calculateLaborCosts();
  const overheads = calculateOverheadCosts();
  const miscellaneous = calculateMiscellaneousCosts();
  const totalCost = materials.totalMaterialCost + labor.totalLaborCost + overheads.totalOverheadCost + miscellaneous.totalMiscellaneousCost;

  return {
    materials,
    labor,
    overheads,
    miscellaneous,
    totalCost,
    breakdown: {
      materialsPercentage: totalCost > 0 ? (materials.totalMaterialCost / totalCost * 100).toFixed(1) : 0,
      laborPercentage: totalCost > 0 ? (labor.totalLaborCost / totalCost * 100).toFixed(1) : 0,
      overheadsPercentage: totalCost > 0 ? (overheads.totalOverheadCost / totalCost * 100).toFixed(1) : 0,
      miscellaneousPercentage: totalCost > 0 ? (miscellaneous.totalMiscellaneousCost / totalCost * 100).toFixed(1) : 0
    }
  };
}

function updateCostDisplay() {
  const currency = getCurrentCurrency();
  const costData = calculateTotalCost();

  let costSummary = document.getElementById('cost-summary');
  if (!costSummary) {
    costSummary = document.createElement('div');
    costSummary.id = 'cost-summary';
    costSummary.className = 'cost-summary-card';

    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    if (main && footer) {
      main.insertBefore(costSummary, footer);
    }
  }

  costSummary.innerHTML = `
    <h2>Cost Summary</h2>
    <div class="cost-breakdown">
      <div class="cost-item">
        <span class="cost-label">Raw Materials:</span>
        <span class="cost-value">${formatCurrency(costData.materials.totalMaterialCost, currency)}</span>
        <span class="cost-percentage">(${costData.breakdown.materialsPercentage}%)</span>
      </div>
      <div class="cost-item">
        <span class="cost-label">Labor:</span>
        <span class="cost-value">${formatCurrency(costData.labor.totalLaborCost, currency)}</span>
        <span class="cost-percentage">(${costData.breakdown.laborPercentage}%)</span>
      </div>
      <div class="cost-item">
        <span class="cost-label">Overheads:</span>
        <span class="cost-value">${formatCurrency(costData.overheads.totalOverheadCost, currency)}</span>
        <span class="cost-percentage">(${costData.breakdown.overheadsPercentage}%)</span>
      </div>
      <div class="cost-item">
        <span class="cost-label">Miscellaneous:</span>
        <span class="cost-value">${formatCurrency(costData.miscellaneous.totalMiscellaneousCost, currency)}</span>
        <span class="cost-percentage">(${costData.breakdown.miscellaneousPercentage}%)</span>
      </div>
      <div class="cost-item total-cost">
        <span class="cost-label">Total Production Cost:</span>
        <span class="cost-value">${formatCurrency(costData.totalCost, currency)}</span>
      </div>
    </div>
  `;
}

// Enhanced calculateAI function with detailed insights
function calculateAI() {
  const costData = calculateTotalCost();
  const currency = getCurrentCurrency();
  
  if (costData.totalCost === 0) {
    alert("Please enter some cost data first to get AI insights!");
    return;
  }
  
  // Update the display first
  updateCostDisplay();
  
  // Generate AI insights
  let insights = [`Total Production Cost: ${formatCurrency(costData.totalCost, currency)}\n\n`];
  
  // Cost breakdown insights
  if (costData.materials.totalMaterialCost > 0) {
    insights.push(`🔧 Materials account for ${costData.breakdown.materialsPercentage}% of total cost`);
  }
  
  if (costData.labor.totalLaborCost > 0) {
    insights.push(`👷 Labor accounts for ${costData.breakdown.laborPercentage}% of total cost`);
  }
  
  if (costData.overheads.totalOverheadCost > 0) {
    insights.push(`🏭 Overheads account for ${costData.breakdown.overheadsPercentage}% of total cost`);
  }
  
  if (costData.miscellaneous.totalMiscellaneousCost > 0) {
    insights.push(`📦 Miscellaneous costs account for ${costData.breakdown.miscellaneousPercentage}% of total cost`);
  }
  
  // Cost optimization suggestions
  insights.push('\n💡 AI Optimization Suggestions:');
  
  if (parseFloat(costData.breakdown.materialsPercentage) > 60) {
    insights.push('• Consider bulk purchasing or alternative suppliers for materials');
  }
  
  if (parseFloat(costData.breakdown.laborPercentage) > 50) {
    insights.push('• Explore automation opportunities to reduce labor costs');
  }
  
  if (parseFloat(costData.breakdown.overheadsPercentage) > 30) {
    insights.push('• Review overhead allocation and identify cost-saving opportunities');
  }
  
  if (parseFloat(costData.breakdown.miscellaneousPercentage) > 20) {
    insights.push('• Analyze miscellaneous costs for potential savings');
  }
  
  if (costData.materials.materials.length > 5) {
    insights.push('• Consider consolidating materials to reduce complexity');
  }
  
  // Profitability insights
  insights.push('\n📊 Profitability Analysis:');
  const suggestedMarkup = 1.3; // 30% markup
  const suggestedPrice = costData.totalCost * suggestedMarkup;
  insights.push(`• Suggested selling price (30% markup): ${formatCurrency(suggestedPrice, currency)}`);
  insights.push(`• Break-even quantity analysis recommended`);
  
  alert(insights.join('\n'));
}

// Save template functionality
function openSaveModal() {
  const costData = calculateTotalCost();
  if (costData.totalCost === 0) {
    alert("No cost data to save. Please enter some values first!");
    return;
  }
  
  const templateName = prompt("Enter a name for this cost template:");
  if (templateName) {
    const template = {
      id: Date.now(),
      name: templateName,
      date: new Date().toLocaleDateString(),
      currency: getCurrentCurrency(),
      data: {
        materials: getAllMaterialsData(),
        labor: getAllLaborData(),
        overheads: getAllOverheadsData(),
        miscellaneous: document.getElementById('miscellaneous_costs')?.value || 0
      },
      totalCost: costData.totalCost
    };
    
    savedTemplates.push(template);
    updateSavedTemplatesDisplay();
    alert(`Template "${templateName}" saved successfully!\nTotal Cost: ${formatCurrency(costData.totalCost, getCurrentCurrency())}`);
  }
}

// Get all materials data for saving
function getAllMaterialsData() {
  const materialBlocks = document.querySelectorAll('.material-block');
  const materials = [];
  
  materialBlocks.forEach(block => {
    const name = block.querySelector('.material-name')?.value || '';
    const quantity = block.querySelector('.material-quantity')?.value || '';
    const cost = block.querySelector('.material-cost')?.value || '';
    
    if (name || quantity || cost) {
      materials.push({ name, quantity, cost });
    }
  });
  
  return materials;
}

// Get all labor data for saving
function getAllLaborData() {
  const laborBlocks = document.querySelectorAll('.labor-block');
  const labor = [];
  
  laborBlocks.forEach(block => {
    const hours = block.querySelector('.labor-hours')?.value || '';
    const cost = block.querySelector('.labor-cost')?.value || '';
    
    if (hours || cost) {
      labor.push({ hours, cost });
    }
  });
  
  return labor;
}

// Get all overheads data for saving
function getAllOverheadsData() {
  const overheadBlocks = document.querySelectorAll('.overhead-block');
  const overheads = [];
  
  overheadBlocks.forEach(block => {
    const hours = block.querySelector('.overhead-hours')?.value || '';
    const cost = block.querySelector('.overhead-cost')?.value || '';
    
    if (hours || cost) {
      overheads.push({ hours, cost });
    }
  });
  
  return overheads;
}

// Load template data
function loadTemplate(templateId) {
  const template = savedTemplates.find(t => t.id === templateId);
  if (!template) return;
  
  // Clear existing forms first
  clearForms();
  
  // Set currency
  const currencySelect = document.getElementById('currency');
  if (currencySelect) {
    currencySelect.value = template.currency;
  }
  
  // Load materials
  template.data.materials.forEach((material, index) => {
    if (index > 0) createMaterialElement();
    const materialBlocks = document.querySelectorAll('.material-block');
    const block = materialBlocks[index];
    if (block) {
      const nameInput = block.querySelector('.material-name');
      const quantityInput = block.querySelector('.material-quantity');
      const costInput = block.querySelector('.material-cost');
      
      if (nameInput) nameInput.value = material.name;
      if (quantityInput) quantityInput.value = material.quantity;
      if (costInput) costInput.value = material.cost;
    }
  });
  
  // Load labor
  template.data.labor.forEach((labor, index) => {
    if (index > 0) createLaborElement();
    const laborBlocks = document.querySelectorAll('.labor-block');
    const block = laborBlocks[index];
    if (block) {
      const hoursInput = block.querySelector('.labor-hours');
      const costInput = block.querySelector('.labor-cost');
      
      if (hoursInput) hoursInput.value = labor.hours;
      if (costInput) costInput.value = labor.cost;
    }
  });
  
  // Load overheads
  template.data.overheads.forEach((overhead, index) => {
    if (index > 0) createOverheadsElement();
    const overheadBlocks = document.querySelectorAll('.overhead-block');
    const block = overheadBlocks[index];
    if (block) {
      const hoursInput = block.querySelector('.overhead-hours');
      const costInput = block.querySelector('.overhead-cost');
      
      if (hoursInput) hoursInput.value = overhead.hours;
      if (costInput) costInput.value = overhead.cost;
    }
  });
  
  // Load miscellaneous
  const miscInput = document.getElementById('miscellaneous_costs');
  if (miscInput) {
    miscInput.value = template.data.miscellaneous;
  }
  
  // Update display
  updateCostDisplay();
  
  // Switch to materials tab
  const materialsTab = document.querySelector('[data-tab="materials_parent"]');
  if (materialsTab) materialsTab.click();
  
  alert(`Template "${template.name}" loaded successfully!`);
}

// Delete template
function deleteTemplate(templateId) {
  if (confirm('Are you sure you want to delete this template?')) {
    savedTemplates = savedTemplates.filter(t => t.id !== templateId);
    updateSavedTemplatesDisplay();
  }
}

// Update saved templates display
function updateSavedTemplatesDisplay() {
  const templateList = document.querySelector('.template-list');
  if (!templateList) return;
  
  if (savedTemplates.length === 0) {
    templateList.innerHTML = '<p class="no-templates">No saved templates yet. Create and save a template to see it here.</p>';
    return;
  }
  
  templateList.innerHTML = savedTemplates.map(template => `
    <div class="template-item">
      <div class="template-info">
        <h3>${template.name}</h3>
        <p>Saved on: ${template.date}</p>
        <p>Total Cost: ${formatCurrency(template.totalCost, template.currency)}</p>
      </div>
      <div class="template-actions">
        <button onclick="loadTemplate(${template.id})" class="btn primary">Load</button>
        <button onclick="deleteTemplate(${template.id})" class="btn danger">Delete</button>
      </div>
    </div>
  `).join('');
}

function clearForms() {
  document.querySelectorAll("input").forEach(i => i.value = "");
  updateCostDisplay(); // Update display after clearing
}

// Add event listeners for real-time calculation
function addCalculationListeners() {
  // Listen for changes in all input fields
  document.addEventListener('input', function(e) {
    if (e.target.matches('.material-quantity, .material-cost, .labor-hours, .labor-cost, .overhead-hours, .overhead-cost, .miscellaneous-costs')) {
      updateCostDisplay();
    }
  });
  
  // Listen for currency changes
  const currencySelect = document.getElementById('currency');
  if (currencySelect) {
    currencySelect.addEventListener('change', updateCostDisplay);
  }
}

// Initialize calculation listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  addCalculationListeners();
  updateSavedTemplatesDisplay();
  // Force initial display creation
  setTimeout(() => {
    updateCostDisplay();
  }, 100);
});

// Also trigger on window load as backup
window.addEventListener('load', function() {
  updateCostDisplay();
});

let materialCounter = 1;
let laborCounter = 1;
let overheadCounter = 1;

// General delete logic for any block
function deleteElement(button) {
    const block = button.closest(".outlined-wrapper");
    const parent = block.parentNode;
    if (block !== parent.querySelector(".outlined-wrapper")) {
        block.remove();
        updateCostDisplay(); // Update costs after deletion
    } else {
        console.warn("Cannot delete the first block.");
    }
}

// Clone for Raw Materials
function createMaterialElement() {
    const parent = document.getElementById("materials_parent");
    const original = parent.querySelector(".material-block");
    const clone = original.cloneNode(true);
    clone.querySelectorAll("input").forEach(input => input.value = "");
    clone.id = `material_${materialCounter++}`;
    clone.querySelector("button.delete-btn").onclick = function () {
        deleteElement(this);
    };
    parent.insertBefore(clone, parent.lastElementChild);
    
    // Add event listeners to new inputs
    clone.querySelectorAll('.material-quantity, .material-cost').forEach(input => {
        input.addEventListener('input', updateCostDisplay);
    });
}

// Clone for Labor
function createLaborElement() {
    const parent = document.getElementById("labor_parent");
    const original = parent.querySelector(".labor-block");
    const clone = original.cloneNode(true);
    clone.querySelectorAll("input").forEach(input => input.value = "");
    clone.id = `labor_${laborCounter++}`;
    clone.querySelector("button.delete-btn").onclick = function () {
        deleteElement(this);
    };
    parent.insertBefore(clone, parent.lastElementChild);
    
    // Add event listeners to new inputs
    clone.querySelectorAll('.labor-hours, .labor-cost').forEach(input => {
        input.addEventListener('input', updateCostDisplay);
    });
}

// Clone for Overheads
function createOverheadsElement() {
    const parent = document.getElementById("overheads_parent");
    const original = parent.querySelector(".overhead-block");
    const clone = original.cloneNode(true);
    clone.querySelectorAll("input").forEach(input => input.value = "");
    clone.id = `overhead_${overheadCounter++}`;
    clone.querySelector("button.delete-btn").onclick = function () {
        deleteElement(this);
    };
    parent.insertBefore(clone, parent.lastElementChild);
    
    // Add event listeners to new inputs
    clone.querySelectorAll('.overhead-hours, .overhead-cost').forEach(input => {
        input.addEventListener('input', updateCostDisplay);
    });
}

// UPDATED TAB LOGIC
const tabButtons = document.querySelectorAll(".tab");
const tabSections = document.querySelectorAll(".raw-materials-card");

tabButtons.forEach(button => {
  button.addEventListener("click", function () {
    const target = this.dataset.tab;

    // Hide all sections
    tabSections.forEach(section => {
      section.style.display = "none";
    });

    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove("active"));

    // Show the selected section
    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.style.display = "block";
    } else if (target === 'tab4') {
      // Show miscellaneous section
      const miscSection = document.getElementById('miscellaneous_parent');
      if (miscSection) miscSection.style.display = "block";
    } else if (target === 'tab5') {
      // Show saved templates section
      const templatesSection = document.getElementById('saved_templates');
      if (templatesSection) templatesSection.style.display = "block";
    }

    // Set active class
    this.classList.add("active");
  });
});

// Optional: Show the first tab by default
document.querySelector(".tab")?.click();
