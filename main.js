const innercontainer = document.getElementById('innercontainer');
const addBookBtn = document.getElementById('addBookBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");


addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});
closeModalBtn.addEventListener('click', () => {
    dialog.close();
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBook(newBook, myLibrary.length - 1);
    form.reset();
    dialog.close();
});

// Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? true : false;
}

Book.prototype.changeReadStatus = function (element) {
    this.read = !this.read;
    element.textContent = "Read: " + this.read;
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", false);
const lordOfTheRings1 = new Book("The Lord of the Rings - The Fellowship of the Ring", "J.R.R. Tolkien", "864", true);
const lordOfTheRings2 = new Book("The Lord of the Rings - The Two Towers", "J.R.R. Tolkien", "1094", true);
const lordOfTheRings3 = new Book("The Lord of the Rings - The Return of the King", "J.R.R. Tolkien", "964", true);
const myLibrary = [theHobbit, lordOfTheRings1, lordOfTheRings2, lordOfTheRings3];

function displayBook(book, index) {
    const bookCard = document.createElement('div');
    bookCard.className = "bookCard";
    innercontainer.append(bookCard);

    const bookCardInfos = document.createElement('div');
    bookCardInfos.className = "bookCardInfos";
    bookCard.append(bookCardInfos);

    const bookCardButtons = document.createElement('div');
    bookCardButtons.className = "bookCardButtons";
    bookCard.append(bookCardButtons);

    bookCardInfos.innerHTML = "<p><h2>" + book.title + "</h2></p>";
    bookCardInfos.innerHTML += "<p>" + book.author + "</p>";
    bookCardInfos.innerHTML += "<p>" + book.pages + " pages</p>";
    bookCardInfos.innerHTML += "<p class=\"status\">Read: " + book.read + "</p>";
    
    const statusElement = bookCard.querySelector(".status");
    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent ="Toggle read";
    toggleReadBtn.addEventListener('click', () => book.changeReadStatus(statusElement));
    bookCardButtons.append(toggleReadBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        displayBooks(myLibrary);
    });
    bookCardButtons.append(deleteBtn);
}

function displayBooks(array) {
    innercontainer.innerHTML = "";
    array.forEach((element, index) => displayBook(element, index));
}

displayBooks(myLibrary);