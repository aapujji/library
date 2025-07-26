const myLibrary = [];

function Book(title, author, status, coverImage) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.image = coverImage;
    this.read = status;
};

const addBookToLibrary = (book) => {
    const newBook = new Book;
    console.log(newBook);
    newBook.title = book.title;
    newBook.author = book.author;
    newBook.status = book.status;
    newBook.coverImage = book.coverImage;
    myLibrary.push(newBook);

    addBookToUI(newBook);
};

const removeBookFromLibrary = (targetBook) => {
    myLibrary.map((book,index) => {
        if (targetBook.id === book.id) {
            myLibrary.splice(index,1);
            targetBook.remove();
        }
    });
};

const addBookToUI = (book) => {
    const bookList = document.querySelector(".books");
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.id = book.id;
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("book-details");

    const coverImage = document.createElement("img");
    coverImage.src = book.coverImage ? book.coverImage : "./assets/placeholder-book.svg";
    coverImage.alt = book.title;
    coverImage.classList.add("cover-image")
    
    const titleElem = document.createElement("h3");
    titleElem.classList.add("title");
    titleElem.textContent = book.title;

    const authorElem = document.createElement("p");
    authorElem.classList.add("author");
    authorElem.textContent = `by ${book.author}`;

    const deleteBtn = document.createElement("button");
    const deleteBtnImg = document.createElement("img");
    deleteBtn.classList.add("icon-button", "delete");
    deleteBtnImg.src = "./assets/xmark.svg";
    deleteBtnImg.classList.add("icon");
    deleteBtn.appendChild(deleteBtnImg);
    bookDiv.appendChild(deleteBtn);

    detailsDiv.appendChild(coverImage);
    detailsDiv.appendChild(titleElem);
    detailsDiv.appendChild(authorElem);

    bookDiv.appendChild(detailsDiv);

    if (book.status) {
        const readBanner = document.createElement("div");
        readBanner.classList.add("card-banner");
        const bannerText = document.createElement("span");
        bannerText.classList.add("banner-text");
        const bannerImage = document.createElement("img");
        bannerImage.classList.add("icon");
        if (book.status === "read") {
            readBanner.classList.add("read");
            bannerText.textContent = "read";
            bannerImage.src = "./assets/check.svg";
        } else if (book.status === "in-progress") {
            readBanner.classList.add("reading");
            bannerText.textContent = "reading";
            bannerImage.src = "./assets/progress.svg";
        }
        readBanner.appendChild(bannerImage);
        readBanner.appendChild(bannerText);
        bookDiv.appendChild(readBanner);
    }
    bookList.appendChild(bookDiv);
}

const toggleModal = () => {
    const backdrop = document.querySelector(".modal-backdrop");
    backdrop.classList.toggle("hidden");
}

const init = () => {
    const testBooks = [
        {
            title: "The Hound of the Baskervilles",
            author: "Arthur Conan Doyle",
            coverImage: "./assets/hound_of_baskervilles.jpg",
            status: "in-progress",
        },
        {
            title: "Better Than The Movies",
            author: "Lynn Painter",
            coverImage: "./assets/better_than_the_movies.jpg",
            status: "in-progress",
        },
        {
            title: "Emily Wilde's Map of the Otherlands",
            author: "Heather Fawcett",
            coverImage: "./assets/emily-wildes-map-of-the-otherlands.jpg",
            status: "to-read",
        }
    ];
    testBooks.forEach(book => addBookToLibrary(book));

    const container = document.querySelector(".container");
    const modal = document.querySelector(".modal");
    container.addEventListener("click", (e) => {
        e.preventDefault();
        if (e.target.classList.contains("add-book")) {
            toggleModal();
        } else if (e.target.classList.contains("save")) {
            const userBook = {};
            userBook.title = document.querySelector("input[name=title]").value;
            userBook.author = document.querySelector("input[name=author]").value;
            userBook.coverImage = document.querySelector("input[name=coverImage]").value;
            userBook.status = document.querySelector("select[name=status]").value || "to-read";
            console.info(userBook);
            addBookToLibrary(userBook);
            toggleModal();
        } else if (e.target.classList.contains("delete") || e.target.parentElement.classList.contains("delete")) {
            const targetBook = e.target.closest(".book");
            if (targetBook && targetBook.id) {
                removeBookFromLibrary(targetBook);
            } else {
                console.log("ERROR - not a valid book");
            }
        }
    });
};

init();