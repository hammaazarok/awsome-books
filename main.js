let books = [];

const addButton = document.querySelector('.add-btn');
const title = document.querySelector('.title');
const author = document.querySelector('.author');

function Book(title,author){
    this.title = title;
    this.author = author;
}

addButton.addEventListener('click',()=>{
     let titleInputValue = title.value;
    let authorInputValue = author.value;
let newBook = new Book(titleInputValue,authorInputValue);
books.push(newBook);
console.log(books);
})

