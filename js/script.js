const myLibrary = [];

function Book(title, author, read, coverImage) {
    this.uuid = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.coverImage = coverImage;
    this.read = read;
    this.setReadStatus = () => {
        this.read = !this.read;
    }
};

const addBookToLibrary = (book) => {
    const newBook = new Book(book.title, book.author, book.read, book.coverImage);
    myLibrary.push(newBook);
};

const removeBookFromLibrary = (targetBook) => {
    myLibrary.map((book,index) => {
        if (targetBook.dataset.uuid === book.uuid) {
            myLibrary.splice(index,1);
        }
    });
};

const updateBookListUI = () => {
    const bookList = document.querySelector(".books");
    bookList.innerHTML = "";

    myLibrary.map((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.dataset.uuid = book.uuid;
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

        const readBanner = document.createElement("div"); 
        readBanner.classList.add("card-banner");
        const bannerText = document.createElement("span");
        bannerText.classList.add("banner-text");
        const bannerImage = document.createElement("img");
        bannerImage.classList.add("icon");

        if (book.read) {
            readBanner.classList.add("read");
            bannerText.textContent = "read";
            bannerImage.src = "./assets/check.svg";
        } else {
            bannerText.textContent = "mark as read";
            bannerImage.src = "./assets/check-black.svg";
        }
        readBanner.appendChild(bannerImage);
        readBanner.appendChild(bannerText);
        bookDiv.appendChild(readBanner);
        bookList.appendChild(bookDiv);
    });
}

const toggleModal = () => {
    const backdrop = document.querySelector(".modal-backdrop");
    backdrop.classList.toggle("hidden");
}

const validateForm = () => {
    const inputs = document.querySelectorAll("[required]");
    let isValid = true;
    inputs.forEach((input) => {
        const parent = input.parentElement;
        if (input.value === "") {
            const message = parent.querySelector(".message");
            message.classList.remove("hidden");
            isValid = false;
        }
    });
    return isValid;
}

const init = () => {
    const testBooks = [
        {
            title: "The Hound of the Baskervilles",
            author: "Arthur Conan Doyle",
            coverImage: "./assets/hound_of_baskervilles.jpg",
            read: false,
        },
        {
            title: "Better Than The Movies",
            author: "Lynn Painter",
            coverImage: "./assets/better_than_the_movies.jpg",
            read: true,
        },
        {
            title: "Emily Wilde's Map of the Otherlands",
            author: "Heather Fawcett",
            coverImage: "./assets/emily-wildes-map-of-the-otherlands.jpg",
            read: false,
        }
    ];
    testBooks.forEach(book => addBookToLibrary(book));
    updateBookListUI();

    const container = document.querySelector(".container");
    container.addEventListener("click", (e) => {
        const target = e.target;
        const parent = target.parentElement;
        if (target.classList.contains("add-book") || 
            target.classList.contains("close") || 
            parent.classList.contains("close")) {
                toggleModal();
        } else if (target.classList.contains("save")) {
            if (validateForm()) {
                const form = document.querySelector(".form");
                const userBook = {};
                userBook.title = form.querySelector("input[name=title]").value;
                userBook.author = form.querySelector("input[name=author]").value;
                userBook.coverImage = form.querySelector("input[name=coverImage]").value;
                userBook.read = form.querySelector("input[name=status]").checked ? true : false;
                addBookToLibrary(userBook);
                updateBookListUI();
                toggleModal();
                form.reset();
            }
        } else if (target.classList.contains("delete") || parent.classList.contains("delete")) {
            const targetBook = target.closest(".book");
            if (targetBook && targetBook.dataset.uuid) {
                removeBookFromLibrary(targetBook);
                updateBookListUI();
            }
        } else if (target.classList.contains("card-banner") || target.parentElement.classList.contains("card-banner")) {
            const targetBook = target.closest(".book");
            myLibrary.map((book) => {
                if (targetBook.dataset.uuid === book.uuid) book.setReadStatus();
            });
            updateBookListUI();
        }
    });

    const inputs = document.querySelectorAll(".input, .select");
    inputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            const parent = e.target.parentElement;
            const message = parent.querySelector(".message");
            message.classList.add("hidden");
        });
    });
};

init();