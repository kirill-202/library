const LIBRARY = [];
let FORM;
const TEST_NUM = 5;

function Book(title = "Unknown", author = "Unknown", yearIssued = "Unkown") {
    this.title = title;
    this.author = author;
    this.yearIssued = yearIssued;
    this.getInfo = function() {
        return `Book title: ${this.title}\nAuthor: ${this.author}\nDate published: ${this.yearIssued}`;
    }
}

function addBookToLibrary(book, library) {
    if (!(book instanceof Book)) {
        throw new TypeError("The object is not of type Book!");
    }
    return library.push(book) -1 ;

}


function fetchDialogForm() {
    const dialog = document.getElementById("dialog");
    dialog.style.display = "flex";
    dialog.showModal();

    FORM = document.querySelector("#dialog form");

    const closeFormBtn = document.getElementById("closeFormBtn");
    closeFormBtn.addEventListener("click", function () {
        dialog.close();
        FORM.reset();
        dialog.style.display = "none";
    });

    FORM.removeEventListener("submit", handleFormSubmit);
    FORM.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const author = document.getElementById("author").value.trim();
    const title = document.getElementById("title").value.trim();
    const dateIssued = document.getElementById("dateIssued").value.trim();

    if (!author || !title || !dateIssued) {
        alert("All fields are required!");
        return;
    }

    const book = new Book(title, author, dateIssued);
    const id =  addBookToLibrary(book, LIBRARY);

    const container = document.querySelector(".container");
    const card = document.createElement("div");
    card.className = "book-container";
    card.id = id;
    card.textContent = book.getInfo();

    const button = document.createElement("button");
    button.textContent = "Delete"; 
    button.className = "delete-button"; 

    card.appendChild(button);
    container.appendChild(card);

    const dialog = document.getElementById("dialog");
    dialog.close();
    FORM.reset();
    dialog.style.display = "none";
}

function removeBook(id) {
    const card = document.getElementById(`${id}`);
    card.remove();

}

function main() {


    const container = document.querySelector(".container");

    for (let i=0; i<TEST_NUM; i++) {
        let book = new Book();
        let id = addBookToLibrary(book, LIBRARY);
        const card = document.createElement("div");
        card.className = "book-container";
        card.id = id;
        card.textContent = book.getInfo();

        const button = document.createElement("button");
        button.textContent = "Delete"; 
        button.className = "delete-button"; 

        card.appendChild(button);
        container.appendChild(card);

    }

    const bookButton = document.querySelector(".new-book-button");
    bookButton.addEventListener('click', fetchDialogForm);

    container.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-button")) {
            const card = event.target.parentElement;
            removeBook(card.id);
        }
    });
}

main();