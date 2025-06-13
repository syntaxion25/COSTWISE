// =================== saveTemplate.js ===================

let savedTemplates = [];

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

function getAllMaterialsData() {
  const materialBlocks = document.querySelectorAll('.material-block');
  const materials = [];
  materialBlocks.forEach(block => {
    const name = block.querySelector('.material-name')?.value || '';
    const quantity = block.querySelector('.material-quantity')?.value || '';
    const cost = block.querySelector('.material-cost')?.value || '';
    if (name || quantity || cost) materials.push({ name, quantity, cost });
  });
  return materials;
}

function getAllLaborData() {
  const laborBlocks = document.querySelectorAll('.labor-block');
  const labor = [];
  laborBlocks.forEach(block => {
    const hours = block.querySelector('.labor-hours')?.value || '';
    const cost = block.querySelector('.labor-cost')?.value || '';
    if (hours || cost) labor.push({ hours, cost });
  });
  return labor;
}

function getAllOverheadsData() {
  const overheadBlocks = document.querySelectorAll('.overhead-block');
  const overheads = [];
  overheadBlocks.forEach(block => {
    const hours = block.querySelector('.overhead-hours')?.value || '';
    const cost = block.querySelector('.overhead-cost')?.value || '';
    if (hours || cost) overheads.push({ hours, cost });
  });
  return overheads;
}

function loadTemplate(templateId) {
  const template = savedTemplates.find(t => t.id === templateId);
  if (!template) return;
  clearForms();
  const currencySelect = document.getElementById('currency');
  if (currencySelect) currencySelect.value = template.currency;

  template.data.materials.forEach((material, index) => {
    if (index > 0) createMaterialElement();
    const block = document.querySelectorAll('.material-block')[index];
    if (block) {
      block.querySelector('.material-name').value = material.name;
      block.querySelector('.material-quantity').value = material.quantity;
      block.querySelector('.material-cost').value = material.cost;
    }
  });

  template.data.labor.forEach((labor, index) => {
    if (index > 0) createLaborElement();
    const block = document.querySelectorAll('.labor-block')[index];
    if (block) {
      block.querySelector('.labor-hours').value = labor.hours;
      block.querySelector('.labor-cost').value = labor.cost;
    }
  });

  template.data.overheads.forEach((overhead, index) => {
    if (index > 0) createOverheadsElement();
    const block = document.querySelectorAll('.overhead-block')[index];
    if (block) {
      block.querySelector('.overhead-hours').value = overhead.hours;
      block.querySelector('.overhead-cost').value = overhead.cost;
    }
  });

  const miscInput = document.getElementById('miscellaneous_costs');
  if (miscInput) miscInput.value = template.data.miscellaneous;

  updateCostDisplay();
  const materialsTab = document.querySelector('[data-tab="materials_parent"]');
  if (materialsTab) materialsTab.click();
  alert(`Template "${template.name}" loaded successfully!`);
}

function deleteTemplate(templateId) {
  if (confirm('Are you sure you want to delete this template?')) {
    savedTemplates = savedTemplates.filter(t => t.id !== templateId);
    updateSavedTemplatesDisplay();
  }
}

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
