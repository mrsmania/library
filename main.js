const innercontainer = document.getElementById('innercontainer');
const addBookBtn = document.getElementById('addBookBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const BOOK_ICON_FINISHED = '<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 449 512.36" class="icon"><title>Mark this book as not read</title><path d="M74.68 0H434.6v401.7c-.66 11.22-15.14 11.48-30.82 10.78H69.36c-52.32 0-52.3 70.41 0 70.41h348.83v-37.72l30.81-.03v49.1c0 9.69-7.92 17.61-17.61 17.61H70.9C28.13 515.6 0 498.59 0 459.6V74.68C0 33.6 33.6 0 74.68 0zm94.03 169.33 35 33.06 71.71-72.83c6.85-6.96 11.15-12.53 19.59-3.83l27.43 28.08c9.01 8.91 8.54 14.12.05 22.42L219.37 277.5c-17.9 17.53-14.8 18.63-32.95.6l-63.87-63.5c-3.77-4.09-3.36-8.23.78-12.32l31.83-33c4.82-5.08 8.68-4.64 13.55.05z"/></svg>';
const BOOK_ICON_NOTREAD = '<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 103.19 122.88" class="icon"><title>Mark this book as read</title><path d="M17.16 0h82.72a3.32 3.32 0 013.31 3.31v92.32c-.15 2.58-3.48 2.64-7.08 2.48H15.94c-4.98 0-9.05 4.07-9.05 9.05s4.07 9.05 9.05 9.05h80.17v-9.63h7.08v12.24c0 2.23-1.82 4.05-4.05 4.05H16.29C7.33 122.88 0 115.55 0 106.59V17.16C0 7.72 7.72 0 17.16 0zm3.19 13.4h2.86c1.46 0 2.66.97 2.66 2.15v67.47c0 1.18-1.2 2.15-2.66 2.15h-2.86c-1.46 0-2.66-.97-2.66-2.15V15.55c.01-1.19 1.2-2.15 2.66-2.15z"/></svg>';
const DELETE_ICON = '<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 105.16 122.88" class="icon"><title>Remove this book from the library</title><path d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"/></svg>';

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
    const url = document.getElementById('url').value;

    const newBook = new Book(title, author, pages, read, url);
    myLibrary.push(newBook);
    displayBook(newBook, myLibrary.length - 1);
    form.reset();
    dialog.close();
});

// Constructor
function Book(title, author, pages, read, url) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? true : false;
    this.url = url;
}

Book.prototype.changeReadStatus = function (readIconElement, bookCard, readIconDiv) {
    this.read = !this.read;
    readIconElement.innerHTML = this.read ? BOOK_ICON_FINISHED : BOOK_ICON_NOTREAD;
    bookCard.classList.toggle('read', this.read);
    readIconDiv.classList.toggle('itemIsRead', this.read);
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "310", false,"https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/The_Hobbit_trilogy_dvd_cover.jpg/220px-The_Hobbit_trilogy_dvd_cover.jpg");
const lordOfTheRings1 = new Book("The Lord of the Rings - The Fellowship of the Ring", "J.R.R. Tolkien", "423", true, "https://s26162.pcdn.co/wp-content/uploads/2023/07/The-Fellowship-of-the-Ring.jpg");
const lordOfTheRings2 = new Book("The Lord of the Rings - The Two Towers", "J.R.R. Tolkien", "352", true, "https://cdn.vox-cdn.com/thumbor/_IHlNwoEBUZlb5yIj8mfPxiD6Ds=/0x0:3816x1575/1200x675/filters:focal(767x23:1377x633)/cdn.vox-cdn.com/uploads/chorus_image/image/69927797/ROTK_eye_of_sauron.0.jpg");
const lordOfTheRings3 = new Book("The Lord of the Rings - The Return of the King", "J.R.R. Tolkien", "416", true,"https://cdn.vox-cdn.com/thumbor/oztKvhMaL7iwB9tLeYnFaOwDNvM=/260x0:1852x796/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/14231686/lotr3_movie_screencaps.com_19747.jpg");
const theSilmarillion = new Book("The Silmarillion", "J.R.R. Tolkien", "365", false,"");
const davinciCode = new Book("The Da Vinci Code", "Dan Brown", "689", true,"https://www.labouquinerieduliseron.nc/dev007/wp-content/uploads/2021/08/51e2oM03P-L.jpg");
const nameOfTheRose = new Book("The Name of the Rose", "Umberto Eco", "512", false,"https://www.otherwordsbooks.co.uk/wp-content/uploads/2023/02/Name-of-the-Rose-1.jpg");
const diaryOfAnneFrak = new Book("The Diary of Anne Frank", "Anne Frank", "714", false,"https://www.nationalww2museum.org/sites/default/files/styles/wide_medium/public/2023-12/23-0736-sdc-anne-frank-website-cal-entry-960x700-r5.jpg?h=c6cbd989");
const myLibrary = [theHobbit, lordOfTheRings1, lordOfTheRings2, lordOfTheRings3, theSilmarillion, davinciCode, nameOfTheRose, diaryOfAnneFrak];

function displayBook(book, index) {
    const bookCard = document.createElement('div');
    bookCard.className = "bookCard";
    innercontainer.append(bookCard);

    const bookCardBackground = document.createElement('div');
    bookCardBackground.className = "bookCardBackground";
    bookCard.append(bookCardBackground);
    
    bookCardBackground.innerHTML += book.url ? "<img src=\""+book.url+"\">" : "<img src=\"https://variety.com/wp-content/uploads/2013/10/film-placeholder.jpg\">";

    const bookCardInfos = document.createElement('div');
    bookCardInfos.className = "bookCardInfos";
    bookCard.append(bookCardInfos);

    bookCardInfos.innerHTML = "<h2>" + book.title + "</h2>";
    bookCardInfos.innerHTML += "<p>by " + book.author + "</p>";

    const bookCardButtons = document.createElement('div');
    bookCardButtons.className = "bookCardButtons";
    bookCard.append(bookCardButtons);
    
    const pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');
    pagesDiv.innerHTML = book.pages+" pages";
    bookCardButtons.append(pagesDiv);

    const readIconDiv = document.createElement('div');
    readIconDiv.classList.add('readIcon');
    readIconDiv.innerHTML = book.read ? BOOK_ICON_FINISHED : BOOK_ICON_NOTREAD;
    if (book.read) {
        bookCard.classList.add('read');
        readIconDiv.classList.add('itemIsRead');
    }

    bookCardButtons.append(readIconDiv);
    const readIconElement = bookCardButtons.querySelector('.readIcon');
    readIconDiv.addEventListener('click', () => book.changeReadStatus(readIconElement, bookCard, readIconDiv));

    const deleteIcon = document.createElement('div');
    deleteIcon.classList.add("deleteIcon");
    deleteIcon.innerHTML = DELETE_ICON;
    bookCardButtons.append(deleteIcon);
    deleteIcon.addEventListener('click', () => {
        myLibrary.splice(index, 1);
        displayBooks(myLibrary);
    });
}

function displayBooks(array) {
    innercontainer.innerHTML = '';
    array.forEach((element, index) => displayBook(element, index));
}

displayBooks(myLibrary);