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

/* BOOK CLASS */
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static addButton(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    const newBook = new Book(title, author);

    bookCollection.push(newBook);

    // add book object to local storage
    localStorage.setItem('books', JSON.stringify(bookCollection));

    // create new book in the dom
    const bookCard = document.createElement('div');
    const bookInfo = document.createElement('div');
    bookInfo.classList.add('bookInfo');
    bookCard.classList.add('bookCard');

    bookContainer.classList.remove('disappear');

    const h2 = document.createElement('h2');
    h2.innerText = title;
    bookInfo.append(h2);

    const h4 = document.createElement('h4');
    h4.innerText = `by ${author}`;
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
      bookCollection = bookCollection.filter((element) => element !== newBook);
      localStorage.setItem('books', JSON.stringify(bookCollection));
      seperator.parentNode.removeChild(seperator);
    };

    deleteButton.addEventListener('click', removeButton);
  }
}

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
  addNew.style.color = 'grey';
  ButtonContact.style.color = 'black';
  BookList.style.color = 'black';
});

ButtonContact.addEventListener('click', () => {
  bookContainer.classList.add('disappear');
  contact.classList.remove('disappear');
  formContainer.classList.add('disappear');
  addNew.style.color = 'black';
  ButtonContact.style.color = 'grey';
  BookList.style.color = 'black';
});

BookList.addEventListener('click', () => {
  bookContainer.classList.remove('disappear');
  contact.classList.add('disappear');
  formContainer.classList.add('disappear');
  addNew.style.color = 'black';
  ButtonContact.style.color = 'black';
  BookList.style.color = 'grey';
});