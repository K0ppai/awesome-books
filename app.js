// Select the form element
const form = document.querySelector('.form');

// Initialize the bookData array with saved data from local storage or an empty array
const bookData = JSON.parse(localStorage.getItem('bookData')) || [];

// Select the book list container element
const ul = document.getElementById('book-list-container');

// Function to save the bookData to local storage
function saveDataToLocalStorage() {
  localStorage.setItem('bookData', JSON.stringify(bookData));
}

// Function to render the book list on the page
function renderBookList() {
  // Clear the existing book list
  ul.innerHTML = '';

  // Iterate over the bookData array using forEach method
  bookData.forEach((data) => {
    // Create li element
    const li = document.createElement('li');

    // Create title span element
    const titleSpan = document.createElement('span');
    titleSpan.className = 'title';
    titleSpan.innerText = data.Title;

    // Create author span element
    const authorSpan = document.createElement('span');
    authorSpan.className = 'author';
    authorSpan.innerText = data.Author;

    // Create remove button element
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerText = 'Remove';

    // Append the elements to the li element
    li.appendChild(titleSpan);
    li.appendChild(authorSpan);
    li.appendChild(removeBtn);

    // Append the li element to the book list container
    ul.appendChild(li);
  });
}

// Event listener for form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get the input values for title and author
  const title = form.querySelector('input[placeholder="Title"]').value;
  const author = form.querySelector('input[placeholder="Author"]').value;

  // Create a new data object
  const newData = {
    Title: title,
    Author: author,
  };

  // Add the new data to the bookData array
  bookData.push(newData);

  // Save the updated bookData to local storage
  saveDataToLocalStorage();

  // Render the updated book list
  renderBookList();

  // Reset the form input fields
  form.reset();
});

// Event listener for removing a book
ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    // Get the parent li element of the clicked button
    const li = e.target.parentElement;

    // Find the index of the li element within the book list container
    const index = Array.prototype.indexOf.call(ul.children, li);

    // Remove the corresponding data object from the bookData array
    bookData.splice(index, 1);

    // Save the updated bookData to local storage
    saveDataToLocalStorage();

    // Render the updated book list
    renderBookList();
  }
});

// Render the initial book list
renderBookList();
