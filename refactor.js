/* eslint-disable no-loop-func */
let bookCollection = [];
let storage = [];

const submitButton = document.getElementById('submit');
const booksContainer = document.getElementById('books-container');

const formContainer = document.querySelector('.formContainer');
const bookContainer = document.querySelector('#books-container');
const contact = document.querySelector('.contact');
const addNew = document.querySelector('#add_new');
const ButtonContact = document.querySelector('#contact');
const BookList = document.querySelector('#book_list');

const makeaddButtonTemplate = (title, author, index) => {
  let buildHtml = '';
  buildHtml += `
  <div class="bookCard" id=${index}>
    <div class="bookInfo">
      <h2>${title}</h2>
      <h4>by ${author}</h4>
    </div>
    <button>Remove</button>
  </div>
  `;
  /*
   BUG: ----------------------------------------
    using innerHTML is still proving to be a major bottleneck
  */
  booksContainer.innerHTML = buildHtml;
  bookContainer.classList.remove('disappear');
};

/* BOOK CLASS */
class Book {
  constructor(title, author, index) {
    this.title = title;
    this.author = author;
    this.index = index;
  }

  static addButton(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const index = Math.random() * 10;

    const newBook = new Book(title, author, index);

    // add new book to the dom
    const newTemplate = makeaddButtonTemplate(newBook.title, newBook.author, newBook.index);
    booksContainer.append(newTemplate);
    // add new book to book collection
    bookCollection.push(newBook);
    // add new book to local storage
    localStorage.setItem('books', JSON.stringify(bookCollection));

    bookContainer.classList.remove('disappear');
    // clear the inputs
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';

    /* REMOVE FUNCTION */
    function remove() {
      const bookCard = document.getElementById(`${newBook.index}`)
      bookCard.remove();
      bookCollection = bookCollection.filter((element) => element !== newBook);
      localStorage.setItem('books', JSON.stringify(bookCollection));
      // seperator.parentNode.removeChild(seperator);
    }

    document.getElementById(`${newBook.index}`).addEventListener('click', remove);
  }
}

/*
populate page on initial load from local storage
------------------------------------------------
*/
storage = JSON.parse(localStorage.getItem('books')) || [];
if (storage.length > 0) {
  for (let i = 0; i < storage.length; i += 1) {
    const bookCard = document.createElement('div');
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('bookInfo');
    bookCard.classList.add('bookCard');

    const h2 = document.createElement('h2');
    h2.innerText = storage[i].title;
    bookInfo.append(h2);

    const h4 = document.createElement('h4');
    h4.innerText = `by ${storage[i].author}`;
    bookInfo.append(h4);

    bookCard.append(bookInfo);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    bookCard.append(deleteButton);

    const seperator = document.createElement('hr');
    seperator.id = 'seperator';

    booksContainer.append(bookCard);
    booksContainer.append(seperator);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';

    /* REMOVE FUNCTION */
    const removeButton = () => {
      bookCard.remove();
      localStorage.setItem('books', JSON.stringify(bookCollection));
      seperator.parentNode.removeChild(seperator);
    };

    deleteButton.addEventListener('click', removeButton);
  }
} else {
  formContainer.classList.remove('disappear');
}

submitButton.addEventListener('click', Book.addButton);

addNew.addEventListener('click', () => {
  bookContainer.classList.add('disappear');
  contact.classList.add('disappear');
  formContainer.classList.remove('disappear');
});

ButtonContact.addEventListener('click', () => {
  bookContainer.classList.add('disappear');
  contact.classList.remove('disappear');
  formContainer.classList.add('disappear');
});

BookList.addEventListener('click', () => {
  bookContainer.classList.remove('disappear');
  contact.classList.add('disappear');
  formContainer.classList.add('disappear');
});