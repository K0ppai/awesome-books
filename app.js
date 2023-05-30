const form = document.querySelector('.form');
const bookData = JSON.parse(localStorage.getItem('bookData')) || [];
const ul = document.getElementById('book-list-container');

function saveDataToLocalStorage() {
  localStorage.setItem('bookData', JSON.stringify(bookData));
}

function renderBookList() {
  ul.innerHTML = '';
  // bookData.forEach((data) => {
  for (let i = 0; i < bookData.length; i += 1) {
    const li = document.createElement('li');
    li.className = 'px-3 py-2 d-flex fw-bold fs-5';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    titleSpan.innerText = `"${bookData[i].Title}"`;

    const authorSpan = document.createElement('span');
    authorSpan.className = 'author';
    authorSpan.innerText = bookData[i].Author;

    const byText = document.createElement('span');
    byText.innerText = 'by';
    byText.className = 'ps-3 pe-3';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn fw-bold btn btn-outline-dark btn-sm ms-auto';
    removeBtn.innerText = 'Remove';

    if (i % 2 !== 0) {
      li.className += ' bg-warning';
    } else {
      // li.className += ' bg-dark text-warning';
      // removeBtn.className = 'remove-btn fw-bold btn btn-outline-warning btn-sm ms-auto';
    }
    li.append(titleSpan, byText, authorSpan, removeBtn);
    ul.appendChild(li);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.querySelector('input[placeholder="Title"]').value;
  const author = form.querySelector('input[placeholder="Author"]').value;

  const newData = {
    Title: title,
    Author: author,
  };

  bookData.push(newData);
  saveDataToLocalStorage();
  renderBookList();
  form.reset();
});

ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const li = e.target.parentElement;
    const index = Array.prototype.indexOf.call(ul.children, li);

    bookData.splice(index, 1);
    saveDataToLocalStorage();
    renderBookList();
  }
});

for (let i = 0; i < ul.children; i += 2) {
  // const ul = document.getElementById('book-list-container');
  // const list = Array.prototype.slice.call(ul.children);
  // console.log(ul.children[1]);
  ul.children[1].className += ' bg-warning';
}
renderBookList();
