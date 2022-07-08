const darkThemeBtn = document.querySelector(".dark-toggle");
const lightThemeBtn = document.querySelector(".light-toggle");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const displayFormBtn = document.querySelector(".display-popup-button");
const form = document.querySelector("form");
const formSection = document.querySelector(".form-section");
const booksContainer = document.querySelector(".grid");
const hideFormBtn = document.querySelector(".remove-form");
const addBookBtn = document.querySelector(".add-book-btn");
const clearFormBtn = document.querySelector(".clear-form-btn");

let myLibrary = [
  {
    title: "The Hunger Games: Catching Fire",
    author: "Suzanne Collins",
    pageCount: 439,
    language: "English",
    date: "1 9 2009",
    read: true,
  },
  {
    title: "Harry Potter And The Order Of The Phoenix",
    author: "J.K. Rowling",
    pageCount: 802,
    language: "English",
    date: "21 6 2003",
    read: true,
  },
  {
    title: "A Game Of Thrones",
    author: "George R.R. Martin",
    pageCount: 694,
    language: "English",
    date: "1 7 1996",
    read: true,
  },
];
let switchNumber = 1;
let totalBooksNumber = 0;
let booksRead = 0;
let booksNotRead = 0;

darkThemeBtn.addEventListener("click", () => {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
});

lightThemeBtn.addEventListener("click", () => {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
});
function useCheckboxFunctions() {
  const checkboxes = document.querySelectorAll(".reading-status-checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      toggleColor(checkbox);
      displayReadingStatus(e.target);
      changeReadCount(e.target);
      displayReadingCount();
    });
  });
}

function deleteBook() {
  const deleteBookBtn = Array.from(document.querySelectorAll(".delete-book"));
  deleteBookBtn.forEach((button) =>
    button.addEventListener("click", () => {
      button.parentElement.remove();
      totalBooksNumber -= 1;
      if (button.parentElement.lastElementChild.children[1].checked) {
        booksRead -= 1;
      } else {
        booksNotRead -= 1;
      }
      displayReadingCount();
    })
  );
}

deleteAllBtn.addEventListener("click", deleteAllBooks);
displayFormBtn.addEventListener("click", () => {
  formSection.style.display = "grid";
});
hideFormBtn.addEventListener("click", () => {
  formSection.style.display = "none";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook();
  useCheckboxFunctions();
  deleteBook();
  clearForm();
  formSection.style.display = "none";
});

clearFormBtn.addEventListener("click", clearForm);

function toggleColor(checkbox) {
  if (checkbox.checked) {
    checkbox.parentElement.parentElement.style.backgroundImage =
      "linear-gradient(-45deg, #209b87, #80cf7f)";
  } else {
    checkbox.parentElement.parentElement.style.backgroundImage =
      "linear-gradient(135deg, #e3e3e3, #5d6874)";
  }
}

function displayReadingStatus(checkbox) {
  if (checkbox.checked) {
    checkbox.previousElementSibling.textContent = "Read";
  } else {
    checkbox.previousElementSibling.textContent = "Not Read Yet";
  }
}

function changeReadCount(checkbox) {
  if (checkbox.checked) {
    booksRead += 1;
    booksNotRead !== 0 ? (booksNotRead -= 1) : booksNotRead;
  } else {
    booksNotRead += 1;
    booksRead !== 0 ? (booksRead -= 1) : booksRead;
  }
}

function displayReadingCount() {
  const totalBooks = document.querySelector(".total-books");
  const readBooksDisplay = document.querySelector(".read-books-number");
  const unreadBooksDisplay = document.querySelector(".unread-books-number");
  readBooksDisplay.textContent = booksRead;
  unreadBooksDisplay.textContent = booksNotRead;
  totalBooks.textContent = totalBooksNumber;
}

function deleteAllBooks() {
  const main = document.querySelector("main");
  let shouldDelete = confirm("Do you really want to delete all the books");
  if (shouldDelete) {
    booksContainer.remove();
    deleteAllBtn.disabled = true;
    deleteAllBtn.classList.add("disabled");
    main.classList.remove("main");
    totalBooksNumber = 0;
    booksRead = 0;
    booksNotRead = 0;
    displayReadingCount();
  }
}

function clearForm() {
  form.reset();
}

class Book {
  constructor(title, author, pageCount, language, publishingDate, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.language = language;
    this.date = publishingDate;
    this.read = read;
  }
}

function addBook() {
  totalBooksNumber = 0;
  booksNotRead = 0;
  booksRead = 0;
  let bookTitle = document.querySelector("#title").value;
  let bookAuthor = document.querySelector("#author").value;
  let numberOfPages = document.querySelector("#page-number").value;
  let language = document.querySelector("#language").value;
  let publishingDateInput = document.querySelector("#publishing-date");
  let publishingDate = publishingDateInput.value.split("-").reverse().join(" ");
  let readingStatus = document.querySelector("#reading-status").checked;
  let newBookObj = new Book(
    bookTitle,
    bookAuthor,
    numberOfPages,
    language,
    publishingDate,
    readingStatus
  );
  myLibrary.push(newBookObj);
  displayBook();
  displayReadingCount();
}

function displayBook() {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }
  for (let i in myLibrary) {
    const book = document.createElement("div");
    const deleteButton = document.createElement("span");
    const bookTitle = document.createElement("h2");
    const author = document.createElement("p");
    const authorName = document.createElement("span");
    const pages = document.createElement("p");
    const pageNumberDisplay = document.createElement("span");
    const lang = document.createElement("p");
    const langDisplay = document.createElement("span");
    const published = document.createElement("p");
    const publishedDate = document.createElement("span");
    const toggle = document.createElement("div");
    const readingStatusDisplay = document.createElement("span");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");

    book.classList.add("grid-item");
    deleteButton.classList.add("delete-btn", "delete-book");
    toggle.classList.add("reading-toggle");
    readingStatusDisplay.classList.add("reading-status-display");
    checkbox.classList.add("reading-status-checkbox");
    label.classList.add("checkbox-label");

    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `switch${switchNumber}`);
    label.setAttribute("for", checkbox.getAttribute("id"));
    switchNumber += 1;

    deleteButton.textContent = "+";
    bookTitle.textContent = myLibrary[i].title;
    author.textContent = "By: ";
    authorName.textContent = myLibrary[i].author;
    pages.textContent = "Number of pages: ";
    pageNumberDisplay.textContent = myLibrary[i].pageCount;
    lang.textContent = "Language: ";
    langDisplay.textContent = myLibrary[i].language;
    published.textContent = "Published: ";
    publishedDate.textContent = myLibrary[i].date;
    readingStatusDisplay.textContent = "Read";
    if (myLibrary[i].read) {
      checkbox.setAttribute("checked", "");
    } else {
      checkbox.setAttribute("unchecked", "");
    }
    checkbox.checked ? (booksRead += 1) : (booksNotRead += 1);

    author.appendChild(authorName);
    pages.appendChild(pageNumberDisplay);
    lang.appendChild(langDisplay);
    published.appendChild(publishedDate);
    toggle.append(readingStatusDisplay, checkbox, label);
    book.appendChild(toggle);
    book.append(
      deleteButton,
      bookTitle,
      author,
      pages,
      lang,
      published,
      toggle
    );
    booksContainer.appendChild(book);
    toggleColor(checkbox);
    totalBooksNumber += 1;
  }
}

displayBook();
useCheckboxFunctions();
deleteBook();
