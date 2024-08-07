const innercontainer = document.getElementById('innercontainer');
const addBookBtn = document.getElementById('addBookBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const BOOK_ICON_FINISHED = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z" /></svg>';
const BOOK_ICON_READING = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103.19 122.88" class="icon"><path d="M17.16 0h82.72a3.32 3.32 0 013.31 3.31v92.32c-.15 2.58-3.48 2.64-7.08 2.48H15.94c-4.98 0-9.05 4.07-9.05 9.05s4.07 9.05 9.05 9.05h80.17v-9.63h7.08v12.24c0 2.23-1.82 4.05-4.05 4.05H16.29C7.33 122.88 0 115.55 0 106.59V17.16C0 7.72 7.72 0 17.16 0zm3.19 13.4h2.86c1.46 0 2.66.97 2.66 2.15v67.47c0 1.18-1.2 2.15-2.66 2.15h-2.86c-1.46 0-2.66-.97-2.66-2.15V15.55c.01-1.19 1.2-2.15 2.66-2.15z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
const DELETE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>';

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
    element.innerHTML = this.read ? BOOK_ICON_READING : BOOK_ICON_FINISHED;
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

    const readIcon = document.createElement('div');
    readIcon.classList.add("readIcon");
    readIcon.innerHTML = book.read ? (BOOK_ICON_READING + "<div class=\"read\"></div>") : BOOK_ICON_FINISHED;
    bookCardButtons.append(readIcon);
    const readStatusElement = bookCardButtons.querySelector(".readIcon");
    readIcon.addEventListener('click', () => book.changeReadStatus(readStatusElement));

    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.innerHTML = DELETE_ICON;
    bookCardButtons.append(deleteIcon);

    const deleteElement = bookCardButtons.querySelector(".deleteIcon");
    deleteIcon.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        displayBooks(myLibrary);
    });
}

function displayBooks(array) {
    innercontainer.innerHTML = "";
    array.forEach((element, index) => displayBook(element, index));
}

displayBooks(myLibrary);