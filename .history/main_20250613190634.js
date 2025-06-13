  const toggle = document.getElementById('nightToggle');

  // Load saved preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

   toggle.addEventListener('change', () => {
     document.body.classList.toggle('dark-mode');
     localStorage.setItem('theme', toggle.checked ? 'dark' : 'light');
   });



function calculateAI() {
  alert("Calculating with AI insights...");
}

function openSaveModal() {
  alert("This would open the save template popup!");
}

function clearForms() {
  document.querySelectorAll("input").forEach(i => i.value = "");
}


let materialCounter = 1;
let laborCounter = 1;
let overheadCounter = 1;

// General delete logic for any block
function deleteElement(button) {
    const block = button.closest(".outlined-wrapper");
    const parent = block.parentNode;
    if (block !== parent.querySelector(".outlined-wrapper")) {
        block.remove();
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
}


// TAB LOGIC
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
    tabButtons.forEach(btn => btn.classList.remove(".active"));

    // Show the selected section
    const targetSection = document.getElementById(target);
    if (targetSection) targetSection.style.display = "block";

    // Set active class
    this.classList.add(".active");
  });
});

// Optional: Show the first tab by default
document.querySelector(".tab")?.click();




