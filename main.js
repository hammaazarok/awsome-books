let books = [];

const addButton = document.querySelector('.add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const booksContainer = document.getElementById('books-container')
let removeButtons = Array.from(document.querySelectorAll('.remove-btn'))

function Book(title, author){
    this.title = title;
    this.author = author;
}

addButton.addEventListener('click', ()=>{
    let titleInputValue = title.value;
    let authorInputValue = author.value;
    if (titleInputValue !== '' && authorInputValue !== '') {
        let newBook = new Book(titleInputValue,authorInputValue);
        books.push(newBook);

        let bookHTML = document.createElement('div');
        bookHTML.innerHTML = `
            <p class="title">${titleInputValue}</p>
            <p class="author">${authorInputValue}</p>
            <button class="remove-btn">remove</button>
            <hr>
        `;
        booksContainer.appendChild(bookHTML)

        removeButtons = Array.from(document.querySelectorAll('.remove-btn'))
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                booksContainer.removeChild(btn.parentElement)
                books = books.filter((book, index) => {
                    return index !== removeButtons.indexOf(btn)
                })
            })
        })
    }
})

