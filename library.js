const darkThemeBtn = document.querySelector(".dark-toggle");
const lightThemeBtn = document.querySelector(".light-toggle");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const deleteBookBtn = document.querySelectorAll(".delete-book");
const deleteAllBtn = document.querySelector(".delete-all-btn");
let totalBooksNumber = 3;
let booksRead = 3;
let booksNotRead = 0;

darkThemeBtn.addEventListener("click", () => {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
});

lightThemeBtn.addEventListener("click", () => {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
});

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", (e) => {
    toggleColor(e.target);
    displayReadingStatus(e.target);
    changeReadCount(e.target);
    displayReadingCount();
  })
);

deleteBookBtn.forEach((button) =>
  button.addEventListener("click", (e) => {
    button.parentNode.remove();
    booksRead !== 0 ? (booksRead -= 1) : booksRead;
    booksNotRead !== 0 ? (booksNotRead -= 1) : booksNotRead;
    totalBooksNumber -= 1;
    displayReadingCount();
  })
);

deleteAllBtn.addEventListener("click", deleteAllBooks);

function toggleColor(checkbox) {
  if (checkbox.checked) {
    checkbox.parentNode.parentNode.style.backgroundImage =
      "linear-gradient(-45deg, #209b87, #80cf7f)";
  } else {
    checkbox.parentNode.parentNode.style.backgroundImage =
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
  const booksContainer = document.querySelector(".grid");
  const main = document.querySelector("main");
  let shouldDelete = confirm("Do you really want to delete all the books");
  if (shouldDelete) {
    booksContainer.remove();
    deleteAllBtn.disabled = true;
    deleteAllBtn.classList.add("disabled");
    main.classList.remove("main");
  }
}

function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.read}`;
  };
}

const book1 = new Book("Hard Times", "Charles Dickens", 319, "Read");
console.log(book1.info());

// To get proper date from date input field
// let val = date.value.split("-").reverse().join("-");
