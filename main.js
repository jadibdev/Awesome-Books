function Book() {
  this.title = 'title';
  this.author = 'author';
}

const bookCollection = [];

function addBook(event) {
  // get title and author from user input
  const title = document.getElementById('bookTitle').value;
  const author = document.getElementById('bookAuthor').value;

  // this prevents browser default behavior
  event.preventDefault();

  // initialize and add new book to collection
  const newBook = Object.create(Book.prototype);
  newBook.title = title;
  newBook.author = author;
  bookCollection.push(newBook);

  window.localStorage.setItem('Title', title);
  window.localStorage.setItem('Author', author);

  // target book collection and populate page with available books
  const booksContainer = document.getElementById('available-books');
  let buildHTML = '';
  let itemId;
  for (let i = 0; i < bookCollection.length; i += 1) {
    buildHTML += `
      <div>
        <h2>${bookCollection[i].title}</h2>
        <h3>${bookCollection[i].author}</h3>
        <button type="button" onclick="removeBtn(${i})">Remove</button>
        <p>${i}</p>
        <hr />
      </div>
    `;
    console.log(i);
  }
  booksContainer.innerHTML = buildHTML;
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
}

function removeBtn(t){
  (bookCollection.splice(t,t));
}


const form = document.getElementById('form');
form.addEventListener('submit', addBook);
