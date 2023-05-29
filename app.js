const form = document.querySelector('.form');
const bookData = [];
const ul = document.getElementById('book-list-container');

// form.addEventListener('submit', addData);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // console.log(title);
  // console.log(author);

  // create elements
  const title = form.querySelector('input[placeholder="Title"]').value;
  const author = form.querySelector('input[placeholder="Author"]').value;
  const li = document.createElement('li');
  const titleSpan = document.createElement('span');
  titleSpan.className = 'title';
  const authorSpan = document.createElement('span');
  authorSpan.className = 'author';
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';

  // create text
  titleSpan.innerText = title;
  authorSpan.innerText = author;
  removeBtn.innerText = 'Remove';
  li.appendChild(titleSpan);
  li.appendChild(authorSpan);
  li.appendChild(removeBtn);
  ul.appendChild(li);
  // add data to array
  function NewBookData(titleName, authorName) {
    this.Title = titleName;
    this.Author = authorName;
  }
  function addData() {
    const newData = new NewBookData(title, author);
    bookData.push(newData);
  }
  addData();
  console.log(bookData);
  // remove elements
});
ul.addEventListener('click', (e) => {
  // console.log(e.target.tagName === 'BUTTON');
  const li = e.target.parentElement;
  const nodeList = Array.from(ul.children);
  const targetIndex = nodeList.indexOf(li);
  const dataIndex = bookData.at(targetIndex);
  if (e.target.tagName === 'BUTTON') {
    ul.removeChild(li);
    bookData.splice(targetIndex, 1);
    console.log(targetIndex, dataIndex, bookData);
  }
});