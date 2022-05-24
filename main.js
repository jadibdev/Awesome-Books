class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

const booksContainer = document.getElementById('booksContainer');
const bookCollection = [];

const form = document.getElementById('form');

function addBook(event) {
  // get title and author from user input
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;
 
  // this prevents browser default behavior
  event.preventDefault();

  // initialize and add new book to collection
  const newBook = new Book(title, author);
  bookCollection.push(newBook);

  // sets local storage


  // target book collection and populate page with available books
  let buildHTML = '';
  for (let i = 0; i < bookCollection.length; i += 1) {
    buildHTML += `
      <div>
        <h2 >${bookCollection[i].title}</h2>
        <h3>${bookCollection[i].author}</h3>
        <button type="button" onclick="removeBtn(${i})">Remove</button>
        <p>${i}</p>
        <hr />
      </div>
    `;
  }
  // sets booksContainer to buildHTML
  booksContainer.innerHTML = buildHTML;
  // cleans the DOM
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
}

function removeBtn(t) {
  (bookCollection.splice(t, t));
  console.log(bookCollection);
}
form.addEventListener('submit', addBook);
