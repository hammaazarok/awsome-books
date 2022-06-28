class StorageAvailable {
  constructor (type) {
    this.type = type
  }

  try() {
    let storage;
    storage = window[this.type];
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

class AwesomeBooks {
  constructor(books, dataFromStorage) {
    this.books = []
    this.dataFromStorage = []
  }

  addBooktoHTML(title, author) {
    const bookHTML = document.createElement('div');
    bookHTML.innerHTML = `
          <p class="title">${title}</p>
          <p class="author">${author}</p>
          <button class="remove-btn">remove</button>
          <hr>
      `;
    booksContainer.appendChild(bookHTML);
  }

  removeBookFromHTML() {
    removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
    removeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        booksContainer.removeChild(btn.parentElement);
        this.books = this.books.filter((book, index) => index !== removeButtons.indexOf(btn));
        localStorage.setItem('BooksDataItem', JSON.stringify(this.books));
        removeButtons = Array.from(document.querySelectorAll('.remove-btn'));
      });
    });
  }
}

let awesomeBooks = new AwesomeBooks()

if (new StorageAvailable('localStorage')) {
  awesomeBooks.dataFromStorage = JSON.parse(localStorage.getItem('BooksDataItem'));

  if ( awesomeBooks.dataFromStorage !== null) {
    awesomeBooks.books =  awesomeBooks.dataFromStorage;
    awesomeBooks.dataFromStorage.forEach((book) => {
     awesomeBooks.addBooktoHTML(book.title, book.author);
     awesomeBooks.removeBookFromHTML();
    });
  }
} else {
   awesomeBooks.dataFromStorage = [];
   awesomeBooks.books =  awesomeBooks.dataFromStorage;
}

class Book {
  constructor (title,author) {
    this.title = title;
    this.author = author;
  }
}

addButton.addEventListener('click', () => {
  const titleInputValue = title.value;
  const authorInputValue = author.value;
  if (titleInputValue !== '' && authorInputValue !== '') {
    const newBook = new Book(titleInputValue, authorInputValue);
    awesomeBooks.books.push(newBook);

    awesomeBooks.addBooktoHTML(titleInputValue, authorInputValue);
    localStorage.setItem('BooksDataItem', JSON.stringify(awesomeBooks.books));
    awesomeBooks.removeBookFromHTML();
  }
});
