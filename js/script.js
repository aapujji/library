const myLibrary = [];

function Book(title, author, read, pages) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = this.pages;
    this.read = read;
};

const addBookToLibrary = (book) => {
    const newBook = new Book;
    newBook.title = book.title;
    newBook.author = book.author;
    newBook.read = book.read;
    newBook.pages = book.pages;
    myLibrary.push(newBook);
}

const testBooks = [
    {
        title: "The Hound of the Baskervilles",
        author: "Arthur Conan Doyle",
        read: true,
        pages: 256,
    },
    {
        title: "Better Than The Movies",
        author: "Lynn Painter",
        read: false,
        pages: 100,
    },
    {
        title: "I Ran Out of Titles",
        author: "Teddy Rosie",
        read: false,
        pages: 200,
    }
];
testBooks.forEach(book => addBookToLibrary(book));

myLibrary.map((book) => {
    const bookList = document.querySelector(".books");
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.id = book.id;
    
    const titleElem = document.createElement("h2");
    titleElem.classList.add("title");
    titleElem.textContent = book.title;

    const authorElem = document.createElement("h4");
    authorElem.classList.add("author");
    authorElem.textContent = book.author;

    const pagesElem = document.createElement("p");
    pagesElem.classList.add("pages");
    pagesElem.textContent = `${book.pages} pages`;

    const removeBtn = document.createElement("button");
    const removeBtnImg = document.createElement("img");
    removeBtn.classList.add("button", "remove");
    removeBtnImg.src = "./assets/remove.svg";
    removeBtnImg.classList.add("icon");
    removeBtn.appendChild(removeBtnImg);
    
    bookDiv.appendChild(titleElem);
    bookDiv.appendChild(authorElem);
    bookDiv.appendChild(pagesElem);
    bookDiv.appendChild(removeBtn);

    const isRead = book.read;
    if (isRead) {
        const checkMarkElem = document.createElement("img");
        checkMarkElem.src = "./assets/check.svg";
        checkMarkElem.classList.add("checkmark","icon");
        bookDiv.appendChild(checkMarkElem);
    }
    bookList.appendChild(bookDiv);
});

const container = document.querySelector(".main");
const modal = document.querySelector(".modal");
container.addEventListener("click", (e) => {
    console.log(e.target.classList);
    e.preventDefault();
    if (e.target.classList.contains("add-book"))
        modal.classList.remove("hidden");
    else if (e.target.classList.contains("save"))
        console.log(e.target);
});

