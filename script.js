const fullscreenDiv = document.querySelector("#fullscreen-div");
const modal = document.querySelector("#modal");
const addBtn = document.querySelector("#add-btn");
const closeBtn = document.querySelector("#close-btn");
const modalAddBtn = document.querySelector("#modal-add-btn");
const form = document.querySelector("#modal");
const bookList = document.querySelector("#book-list tbody");
const delBtns = document.querySelectorAll(".delete-btn");
const stateBtns = document.querySelectorAll(".book-status");

class Book {
    constructor(title, author, pages, status){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    static getBookList() {
        return [];
    }

    static addBookToList(book) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="book-title">${book.title}</span></td>
            <td><span class="book-author">${book.author}</span></td>
            <td><span class="book-pages">${book.pages}</span></td>
            <td><span class="book-status ${book.status == 'read' ? 'read' : 'not-read'}">${book.status == 'read' ? 'Read' : 'Not Read'}</span></td>
            <td><button class="delete-btn">delete</button></td>
        `;
        bookList.appendChild(row);

        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
        });

        row.querySelector('.book-status').addEventListener('click', () => {
            const statusSpan = row.querySelector('.book-status');
            if (statusSpan.classList.contains('not-read')) {
                statusSpan.classList.remove('not-read');
                statusSpan.classList.add('read');
                statusSpan.innerText = "Read";
            } else {
                statusSpan.classList.remove('read');
                statusSpan.classList.add('not-read');
                statusSpan.innerText = "Not Read";
            }
        });
    }
    
}

class UI {
    static showModal(){
        modal.style.display = "block";
        fullscreenDiv.style.display = "block";
    }

    static hideModal(){
        modal.style.display = "none";
        fullscreenDiv.style.display = "none";
    }
}

window.addEventListener('DOMContentLoaded', () => {
    eventListeners();
    initDelBtns();
    initStateBtns()
});

function eventListeners(){
    addBtn.addEventListener('click', () => {
        form.reset();
        UI.showModal();
    });

    closeBtn.addEventListener('click', UI.hideModal);

    fullscreenDiv.addEventListener('click', UI.hideModal);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if(getFormData()) {
            const newBook = new Book(bookTitle, bookAuthor, bookPages, bookStatus);
            Book.addBookToList(newBook);
            UI.hideModal();
        }
    });

}

let bookTitle, bookAuthor, bookPages, bookStatus;

function getFormData(){
    bookTitle = form.book_title.value.trim();
    bookAuthor = form.book_author.value.trim();
    bookPages = form.book_pages.value.trim();
    bookStatus = form.labels.value.trim();

    if(bookTitle && bookAuthor && bookPages && bookStatus){
        return true;
    } else {
        alert("Please fill out all fields");
        return false;
    }
}

function initDelBtns() {
    delBtns.forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('tr').remove()
        })
    })
}

function initStateBtns() {
    stateBtns.forEach((button) => {
        button.addEventListener('click', () => {
            if(button.classList.contains('not-read')){
                button.classList.remove('not-read');
                button.classList.add('read');
                button.innerText = "Read"
            } else {
                button.classList.remove('read');
                button.classList.add('not-read');
                button.innerText = "Not Read"               
            }
        })
    })
}