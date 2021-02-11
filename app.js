/*** GETTING ELEMENTS AND ASIGN THEM TO VARIABLES ****/
const form = document.querySelector('#form');
const input = document.querySelector('.text');
const listItems = document.querySelector('.list-items');
const clearBtn = document.querySelector('.clear-items');
const feedback = document.querySelector('.feedback');


/************ EVENT LISTENERS ***************/
// Add Items
form.addEventListener('submit', e=>{
   e.preventDefault();

   const text = input.value;
   
   if( text === ''){
      showAlert(feedback, 'Please enter the text', 'alert-error');
   } else {
      showAlert(feedback, 'The item has been added', 'alert-success');
      addItem(text);
      addToStorage(text);
   }
})

// Remove Item
listItems.addEventListener('click', e=>{
   if(e.target.classList.contains('fa-trash-alt')){
      e.target.parentElement.remove();
      const value = e.target.parentElement.childNodes[1].innerHTML;

      clearSingleItem(value);
   }
})

// Clear Items 
clearBtn.addEventListener('click', ()=>{
   listItems.innerHTML = '';
   clearlocalStorage();
})


/************* FUNCTIONS  *************/
// Add Item
function addItem(text){
   const li = document.createElement('li');
   li.classList = 'item';
   li.innerHTML = `
      <p class="text-item">${text}</p>
      <i class="far fa-trash-alt"></i>
   `
   listItems.appendChild(li);

   input.value = '';
} 

// Show Alert
function showAlert(feedback, message, theClass){
   feedback.classList.add(theClass);
   feedback.innerText = message;

   setTimeout(()=>{
      feedback.classList.remove(theClass);
   }, 2000);
}



/************** LOCAL STORAGE  *************/
// Add to Storage
function addToStorage(text){
   let items;

   if( localStorage.getItem('grocery')){
      items = JSON.parse(localStorage.getItem('grocery'));
   } else {
      items = [];
   }

   items.push(text);
   localStorage.setItem('grocery', JSON.stringify(items));
}

// Clear Single Item 
function clearSingleItem(value){
   
   let items = JSON.parse(localStorage.getItem('grocery'));
   items = items.filter(element=>{
      if(element !== value){
         return element;
      }
   })
   localStorage.removeItem('grocery');
   localStorage.setItem('grocery', JSON.stringify(items));
}

// Clear Local Storage
function clearlocalStorage(){
   localStorage.removeItem('grocery');
}



/*********** DOM CONTENT LOADED ***********/
document.addEventListener('DOMContentLoaded', ()=>{
   let items = JSON.parse(localStorage.getItem('grocery'));
   items.forEach(item=>{
      const li = document.createElement('li');
      li.classList = 'item';
      li.innerHTML = `
         <p class="text-item">${item}</p>
         <i class="far fa-trash-alt"></i>
      `
      listItems.appendChild(li);
   })
})

