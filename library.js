const darkThemeBtn = document.querySelector(".dark-toggle");
const lightThemeBtn = document.querySelector(".light-toggle");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

darkThemeBtn.addEventListener("click", () => {
  document.body.classList.add("dark-mode");
  document.body.classList.remove("light-mode");
});

lightThemeBtn.addEventListener("click", () => {
  document.body.classList.add("light-mode");
  document.body.classList.remove("dark-mode");
});

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      checkbox.parentNode.parentNode.style.backgroundImage =
        "linear-gradient(-45deg, #209b87, #80cf7f)";
    } else {
      checkbox.parentNode.parentNode.style.backgroundImage =
        "linear-gradient(135deg, #e3e3e3, #5d6874)";
    }
  })
);

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
