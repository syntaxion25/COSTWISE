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

function cloneMaterialDiv() {
    var original = document.getElementById("material");
    var clone = original.cloneNode(true);
    original.parentNode.insertBefore(clone, original.nextSibling);
}
function cloneLaborDiv() {
    var original = document.getElementById("labor");
    var clone = original.cloneNode(true);
    original.parentNode.insertBefore(clone, original.nextSibling);
}

function cloneOverheadDiv() {
    var original = document.getElementById("overheads");
    var clone = original.cloneNode(true);
    original.parentNode.insertBefore(clone, original.nextSibling);
}

function deleteElement(id) {
    const element = document.getElementById(id);
    const parent = document.getElementById("card_parent");

    if (!element || !parent) {
        console.warn("Element or parent not found:", id);
        return;
    }

    if (element !== parent.firstChild) {
        element.remove();
        console.log("Element deleted:", id);
    } else {
        console.warn("Element is the first child and was not deleted:", id);
    }
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


// const tab_buttons = document.querySelectorAll(".tab");



// for (var i = 0 ; i < tab_buttons.length; i++){
//     tab_buttons[i].addEventListener('click',() => {
//         var tab_name = this.dataset.tab;
//         var tab_content = document.getElementById(tab_name);


//         tab_content.style.display = "block";
//         this.classList.add('.tab.active')
//     })
// }