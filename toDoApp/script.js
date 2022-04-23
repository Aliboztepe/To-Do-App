// UI variables

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();
// call event listeners
eventListeners();

function eventListeners(event) {
    // submit event
    form.addEventListener('submit', addNewItem);

    // delete an item 
    taskList.addEventListener('click', deleteItem);

    // delete all item
    btnDeleteAll.addEventListener('click', deleteAllItem);
};


// get items from local storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
};

// set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
};

// delete an item from local storage
function deleteItemFromLs(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
};

function loadItems() {

    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    });
};

function createItem(text) {
    // create li 
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    // create a
    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>'
    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);
};



function addNewItem(e) {

    if (input.value === '') {
        alert('Add Item.');
    } else {

        // create item
        createItem(input.value);

        // save to Local Storage
        setItemToLS(input.value);

        // input value
        input.value = '';
    }

    e.preventDefault();
};

function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();

        // delete item from Local Storage
        deleteItemFromLs(e.target.parentElement.parentElement.textContent);

    }
    e.preventDefault();
};

function deleteAllItem(e) {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    };

    // taskList.childNodes.forEach(function (item) {
    //     if (item.nodeType === 1) {
    //         item.remove();
    //     }
    // });

    // delete all item from Local Storage
    localStorage.clear(); 

    e.preventDefault();
};