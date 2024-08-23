document.addEventListener('DOMContentLoaded', () => {
    const createBookForm = document.getElementById('createBookForm');
    const updateBookForm = document.getElementById('updateBookForm');
    const booksList = document.getElementById('booksList');
    const fetchBooksButton = document.getElementById('fetchBooks');

    // Create a new book
    createBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const status = document.getElementById('status').value;

        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, status }),
            });
            const book = await response.json();
            alert(`Book created: ${book.name} with status ${book.status}`);
            createBookForm.reset();
        } catch (error) {
            console.error('Error creating book:', error);
            alert('Failed to create book');
        }
    });

    // Fetch all books
    fetchBooksButton.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:3000/');
            const books = await response.json();
            booksList.innerHTML = '';
            books.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `ID: ${book.id}, Name: ${book.name}, Status: ${book.status}, Current Fine: ${book.currentFine}`;
                booksList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
            alert('Failed to fetch books');
        }
    });

    // Return a book (update book status)
    updateBookForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('bookId').value;

        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
            const book = await response.json();
            alert(`Book returned: ${book.name}, New Fine: ${book.currentFine}`);
            updateBookForm.reset();
        } catch (error) {
            console.error('Error returning book:', error);
            alert('Failed to return book');
        }
    });
});
