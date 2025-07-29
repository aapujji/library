class Library {
    constructor(name = "myLibrary", books = []){
        this.name = name;
        this.books = books;
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(uuid) {
        this.books.map((book,index) => {
            if (book.uuid === uuid) {
                this.books.splice(index,1);
            }
        })
    }
}

class Book {
    constructor(title, author, coverImage, readStatus = false) {
        this.uuid = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.coverImage = coverImage;
        this.readStatus = readStatus;
    }

    updateReadStatus() {
        this.readStatus = !this.readStatus;
    }
}

(() => {
    // statuc variables
    const testBooks = [
        {
            title: "The Hound of the Baskervilles",
            author: "Arthur Conan Doyle",
            coverImage: "./assets/hound_of_baskervilles.jpg",
            readStatus: false,
        },
        {
            title: "Better Than The Movies",
            author: "Lynn Painter",
            coverImage: "./assets/better_than_the_movies.jpg",
            readStatus: true,
        },
        {
            title: "Emily Wilde's Map of the Otherlands",
            author: "Heather Fawcett",
            coverImage: "./assets/emily-wildes-map-of-the-otherlands.jpg",
            readStatus: false,
        }
    ];

    const bookList = testBooks.map((book) => {
        return new Book(book.title, book.author, book.coverImage, book.readStatus);
    });

    const myLibrary = new Library("My Library", bookList);
    const books = myLibrary.books;

    // dom cache
    const bookListDiv = document.querySelector(".books");
    const modalBackdropDiv = document.querySelector(".modal-backdrop");
    const form = document.querySelector(".form");
    const formInputs = document.querySelectorAll(".input, .select");
    const requiredFormInputs = document.querySelectorAll("[required]");
    
    const updateBookListUI = () => {
        bookListDiv.textContent = "";

        const createUIElement = (type, attributes = {}, children = []) => {
            const elem = document.createElement(type);
            Object.entries(attributes).forEach(([key, value]) => {
                if (key in elem) elem[key] = value;
                else elem.setAttribute(key,value);
            });
            if (children) children.map((childElem) => elem.appendChild(childElem))
            return elem;
        }

        books.map((book) => {
            const bookCoverImageSrc = book.coverImage || "./assets/placeholder-book.svg";
            const bookCoverImage = createUIElement("img", {class: "cover-image", src: bookCoverImageSrc, alt: book.title})

            const titleH3 = createUIElement("h3", {class: "title", textContent: book.title});

            const authorText = `by ${book.author}`;
            const authorPara = createUIElement("p", {class: "author", textContent: authorText});

            const readStatusPara = createUIElement("p", {class: "status-text"});
            const readStatusImg = createUIElement("img", {class: "icon"});

            readStatusPara.textContent = book.readStatus ? "read" : "mark as read";
            readStatusImg.src = book.readStatus ? "./assets/check.svg" : "./assets/check-black.svg";
            
            const readStatusBtn = createUIElement("button", {class: "button icon-button read-status"}, [readStatusImg, readStatusPara]);
            if (book.readStatus) readStatusBtn.classList.add("read");

            const bookDetailsDiv = createUIElement("div", {class: "book-details"}, [titleH3, authorPara, readStatusBtn]);

            const deleteBtnImg = createUIElement("img", {class: "icon", src: "./assets/xmark.svg"});
            const deleteBtn = createUIElement("button", {class: "icon-button delete"}, [deleteBtnImg]);

            const bookDiv = createUIElement("div", {class: "book", "data-uuid": book.uuid}, [bookCoverImage, bookDetailsDiv, deleteBtn]);

            bookListDiv.appendChild(bookDiv);
        })
    }

    updateBookListUI();

    const toggleModal = () => modalBackdropDiv.classList.toggle("hidden");

    const validateForm = () => {
        const isValid = true;
        requiredFormInputs.forEach((input) => {
            const parent = input.parentElement;
            if (input.value === "") {
                const message = parent.querySelector(".message");
                message.classList.remove("hidden");
                isValid = false;
            }
        })
        return isValid;
    }

    document.addEventListener("click", (e) => {
        const target = e.target;
        const parent = target.parentElement;

        if (target.classList.contains("add-book") || 
            target.classList.contains("close") || 
            parent.classList.contains("close")) {
                toggleModal();
        } else if (target.classList.contains("save")) {
            if (validateForm()) {
                const userBook = new Book();
                userBook.title = form.querySelector("input[name=title]").value;
                userBook.author = form.querySelector("input[name=author]").value;
                userBook.coverImage = form.querySelector("input[name=coverImage]").value;
                userBook.read = form.querySelector("input[name=status]").checked ? true : false;
                myLibrary.addBook(userBook);
                updateBookListUI();
                toggleModal();
                form.reset();
            }
        } else if (target.classList.contains("delete") || parent.classList.contains("delete")) {
            const targetBook = target.closest(".book");
            myLibrary.removeBook(targetBook.dataset.uuid);
            updateBookListUI();
        } else if (target.classList.contains("read-status") || target.parentElement.classList.contains("read-status")) {
            const targetBook = target.closest(".book");
            books.map((book) => {
                console.log(book);
                if (targetBook.dataset.uuid === book.uuid) book.updateReadStatus();
            });
            updateBookListUI();
        }
    })

    requiredFormInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            const parent = e.target.parentElement;
            const message = parent.querySelector(".message");
            message.classList.add("hidden");
        });
    });
})();