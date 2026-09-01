const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = []

// Drag Functionality

let draggedItem;
let dragging = false;
let currentColumn;


// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}


getSavedColumns();
updateSavedColumns();

// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  })
}

function filterArray(array) {
  const filteredArray = array.filter(item => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  console.log('columnEl:', columnEl);
  console.log('column:', column);
  console.log('item:', item);
  console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.setAttribute('draggable', 'true');
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem( ${index}, ${column})`);


  columnEl.appendChild(listEl);
}


// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray = filterArray(backlogListArray);
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index);
  })
  // Progress Column
  progressList.textContent = '';
  progressListArray = filterArray(progressListArray);
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  })
  // Complete Column
  completeList.textContent = '';
  completeListArray = filterArray(completeListArray);
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  })
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray = filterArray(onHoldListArray);
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  })

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();

}

function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;

  console.log('selectedColumnEl', selectedColumnEl[id].textContent);
  console.log('id', id);
  if (!dragging) {
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
}

function addToColumn(column) {
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM();
}



function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

function rebuildArrays() {
  backlogListArray = Array.from(backlogList.children).map(el => el.textContent);
  progressListArray = Array.from(progressList.children).map(el => el.textContent);
  completeListArray = Array.from(completeList.children).map(el => el.textContent);
  onHoldListArray = Array.from(onHoldList.children).map(el => el.textContent);
  updateDOM();

}

function drag(e) {
  draggedItem = e.target;
  console.log('draggedItem:', draggedItem);
  dragging = true;


}


function allowDrop(e) {
  e.preventDefault();
  // console.log('allowDrop:', e);

}

function drop(e) {
  e.preventDefault();
  // console.log('dragDrop:', e);
  listColumns.forEach((column) => {
    column.classList.remove('over');
  })

  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
  dragging = false;
  rebuildArrays();
}

function dragEnter(column) {
  listColumns[column].classList.add('over');
  currentColumn = column;
  // console.log('dragEnter:', listColumns[column]);

}






updateDOM();
