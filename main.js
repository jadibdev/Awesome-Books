let bookCollection = [];

const submitButton = document.getElementById('submit');
const booksContainer = document.getElementById('books-container');

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

    const h2 = document.createElement('h2');
    h2.innerText = title;
    bookCard.append(h2);

    const h3 = document.createElement('h3');
    h3.innerText = author;
    bookCard.append(h3);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove';
    bookCard.append(deleteButton);

    booksContainer.append(bookCard);

    document.getElementById('title').value = '';
    document.getElementById('author').value = '';

    /* REMOVE FUNCTION */
    const removeButton = () => {
      bookCard.remove();
      bookCollection = bookCollection.filter((element) => element !== newBook);
      localStorage.setItem('books', JSON.stringify(bookCollection));
    };

    deleteButton.addEventListener('click', removeButton);
  }
}

submitButton.addEventListener('click', Book.addButton);

