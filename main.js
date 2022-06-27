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
  const booksContainer = document.getElementById('books-container')
  let removeButtons = Array.from(document.querySelectorAll('.remove-btn'))
  let dataFromStorage = [];
  if (storageAvailable('localStorage')) { 
  
    dataFromStorage = JSON.parse(localStorage.getItem('BooksDataItem'));
    dataFromStorage.forEach(book => {
        let bookHTML = document.createElement('div');
        bookHTML.innerHTML = `
            <p class="title">${book.title}</p>
            <p class="author">${book.author}</p>
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
                localStorage.setItem('BooksDataItem', JSON.stringify(books));
            })
        })
    })
    if(dataFromStorage !== null){
    books = dataFromStorage;
    }
  }else{

    dataFromStorage = [];
    books = dataFromStorage;
  }




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

        localStorage.setItem('BooksDataItem', JSON.stringify(books));
        console.log(JSON.stringify(books));

        removeButtons = Array.from(document.querySelectorAll('.remove-btn'))
        removeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                booksContainer.removeChild(btn.parentElement)
                books = books.filter((book, index) => {
                    return index !== removeButtons.indexOf(btn)
                })
                localStorage.setItem('BooksDataItem', JSON.stringify(books));
            })
        })
    }
})



