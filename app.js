const form = document.querySelector('.form');
const bookData = JSON.parse(localStorage.getItem('bookData')) || [];
const ul = document.getElementById('book-list-container');

function saveDataToLocalStorage() {
  localStorage.setItem('bookData', JSON.stringify(bookData));
}

function renderBookList() {
  ul.innerHTML = '';
  bookData.forEach((data) => {
    const li = document.createElement('li');
    const titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    titleSpan.innerText = data.Title;

    const authorSpan = document.createElement('span');
    authorSpan.className = 'author';
    authorSpan.innerText = data.Author;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerText = 'Remove';

    li.appendChild(titleSpan);
    li.appendChild(authorSpan);
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
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

renderBookList();
