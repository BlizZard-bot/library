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
