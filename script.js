const bookInput = document.querySelector(".book-input input");
const bookField = document.querySelector(".book-field");
const filters = document.querySelector(".filters span");
const clearAll = document.querySelector(".clear-btn");




bookInput.addEventListener('keyup', (e)=>{
    let inputValue = bookInput.value;
    if(e.key == 'Enter' && inputValue != ''){
        const bookLi = document.createElement('li');
            bookLi.classList.add('book');
            const bookContent = document.createTextNode(inputValue);
            bookLi.appendChild(bookContent);
            const deleteButton = document.createElement('i');
            deleteButton.classList.add('bx' ,'bx-x-circle');
            deleteButton.addEventListener('click', ()=>{
                bookField.removeChild(bookLi);
            })
            bookLi.appendChild(deleteButton);
        bookField.appendChild(bookLi);
        bookInput.value = '';
    }; 
})

