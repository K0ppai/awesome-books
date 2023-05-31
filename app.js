class BookListApp {
  constructor() {
    this.form = document.querySelector('.form');
    this.bookData = JSON.parse(localStorage.getItem('bookData')) || [];
    this.ul = document.getElementById('book-list-container');
    this.list = document.querySelector('.list');
    this.addForm = document.querySelector('.add-form');
    this.contact = document.querySelector('.contact');
    this.bookSec = document.getElementById('book-list');
    this.formSec = document.getElementById('form');
    this.contactSec = document.getElementById('contact');

    this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
    this.ul.addEventListener('click', this.handleRemoveButtonClick.bind(this));
    this.list.addEventListener('click', this.generateBookList.bind(this));
    this.addForm.addEventListener('click', this.generateAddForm.bind(this));
    this.contact.addEventListener('click', this.generateContact.bind(this));
    this.renderBookList();
  }

  saveDataToLocalStorage() {
    localStorage.setItem('bookData', JSON.stringify(this.bookData));
  }

  renderBookList() {
    this.ul.innerHTML = '';

    this.bookData.forEach((book, index) => {
      const li = document.createElement('li');
      li.className = 'px-3 py-2 d-flex fw-bold fs-5';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'title';
      titleSpan.innerText = `"${book.Title}"`;

      const authorSpan = document.createElement('span');
      authorSpan.className = 'author';
      authorSpan.innerText = book.Author;

      const byText = document.createElement('span');
      byText.innerText = 'by';
      byText.className = 'ps-3 pe-3';

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn fw-bold btn btn-outline-dark btn-sm ms-auto';
      removeBtn.innerText = 'Remove';

      if (index % 2 !== 0) {
        li.className += ' bg-warning';
      }

      li.append(titleSpan, byText, authorSpan, removeBtn);
      this.ul.appendChild(li);
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const title = this.form.querySelector('input[placeholder="Title"]').value;
    const author = this.form.querySelector('input[placeholder="Author"]').value;

    const newBook = {
      Title: title,
      Author: author,
    };

    this.addBook(newBook);
    this.renderBookList();
    this.form.reset();
  }

  handleRemoveButtonClick(e) {
    if (e.target.tagName === 'BUTTON') {
      const li = e.target.parentElement;
      const index = Array.prototype.indexOf.call(this.ul.children, li);

      this.removeBook(index);
      this.renderBookList();
    }
  }

  addBook(book) {
    this.bookData.push(book);
    this.saveDataToLocalStorage();
  }

  removeBook(index) {
    this.bookData.splice(index, 1);
    this.saveDataToLocalStorage();
  }

  generateBookList() {
    this.bookSec.classList.remove('active');
    this.formSec.classList.remove('active');
    this.contactSec.classList.remove('active');
    this.list.className.replace('text-dark', 'text-warning');
    this.list.className.replace('text-warning', 'text-dark');
    this.list.className.replace('text-warning', 'text-dark');
    // console.log(this.list.className);
  }

  generateAddForm() {
    this.bookSec.classList.add('active');
    this.formSec.classList.add('active');
    this.contactSec.classList.remove('active');
    this.list.className.replace('text-warning', 'text-dark');
    this.list.className.replace('text-dark', 'text-warning');
    this.list.className.replace('text-warning', 'text-dark');
  }

  generateContact() {
    this.bookSec.classList.add('active');
    this.formSec.classList.remove('active');
    this.contactSec.classList.add('active');
    this.list.className.replace('text-warning', 'text-dark');
    this.list.className.replace('text-warning', 'text-dark');
    this.list.className.replace('text-dark', 'text-warning');
  }
}

const app = new BookListApp();

app.initialize();