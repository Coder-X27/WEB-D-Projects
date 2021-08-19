console.log("This is an ES6 Version")

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    add(book) {
        console.log('Adding to UI')
        let tableBody = document.getElementById('tableBody')
        let uiString = `
                        <tr >
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.type}</td>
                        </tr>`
        tableBody.innerHTML += uiString;
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm')
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 3 || book.author.length < 3) {
            return false;
        } else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message')
        let boldtext;
        if (type === 'success') {
            boldtext = 'Success'
        } else {
            boldtext = 'Error !'
        }
        message.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>${boldtext}:</strong> ${displayMessage}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
        setTimeout(function() {
            message.innerHTML = ''
        }, 5000)
    }
}

let libraryForm = document.getElementById('libraryForm')
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('Your Form has been submitted')
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (author.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type)
    console.log(book)
    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        display.show('success', 'Your book has been succesfully added')
    } else {
        display.show('danger', 'Sorry You cannot add book')
    }
    e.preventDefault();
}