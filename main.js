const submitButton = document.getElementById('submit');
let bookCollection = [];
const booksContainer = document.getElementById('books-container');

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

    const h2 = document.createElement('h2');
    h2.innerText = title;
    bookInfo.append(h2);

    const h4 = document.createElement('h4');
    h4.innerText = author;
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

submitButton.addEventListener('click', Book.addButton);