let books = [];

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      e.code === 22

              || e.code === 1014

              || e.name === 'QuotaExceededError'

              || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')

              && (storage && storage.length !== 0);
  }
}
const addButton = document.querySelector('.add-btn');
const title = document.getElementById('title');
const author = document.getElementById('author');
const booksContainer = document.getElementById('books-container');
let removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
let dataFromStorage = [];

function addBooktoHTML(title, author) {
  const bookHTML = document.createElement('div');
  bookHTML.innerHTML = `
        <p class="title">${title}</p>
        <p class="author">${author}</p>
        <button class="remove-btn">remove</button>
        <hr>
    `;
  booksContainer.appendChild(bookHTML);
  console.log(books, localStorage.BooksDataItem);
}

function removeBookFromHTML() {
  removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
  removeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      booksContainer.removeChild(btn.parentElement);
      books = books.filter((book, index) => index !== removeButtons.indexOf(btn));
      localStorage.setItem('BooksDataItem', JSON.stringify(books));
      removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
    });
  });
}

if (storageAvailable('localStorage')) {
  dataFromStorage = JSON.parse(localStorage.getItem('BooksDataItem'));

  if (dataFromStorage !== null) {
    books = dataFromStorage;
    dataFromStorage.forEach((book) => {
      addBooktoHTML(book.title, book.author);
      removeBookFromHTML();
    });
  }
} else {
  dataFromStorage = [];
  books = dataFromStorage;
}

function Book(title, author) {
  this.title = title;
  this.author = author;
}

addButton.addEventListener('click', () => {
  const titleInputValue = title.value;
  const authorInputValue = author.value;
  if (titleInputValue !== '' && authorInputValue !== '') {
    const newBook = new Book(titleInputValue, authorInputValue);
    books.push(newBook);

    addBooktoHTML(titleInputValue, authorInputValue);
    localStorage.setItem('BooksDataItem', JSON.stringify(books));
    removeBookFromHTML();
  }
});
