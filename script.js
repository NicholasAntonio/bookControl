const mainInput = document.querySelector(".book-input input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn");
const bookField = document.querySelector(".book-field");

let editId,
  isEditBook = false,
  books = JSON.parse(localStorage.getItem("book-list"));

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showBook(btn.id);
  });
});

function showBook(filter) {
  let bookEl = "";
  if (books) {
    books.forEach((book, id) => {
      let completed = book.status;
      if (book.status == "completed") {
        completed = "checked";
      } else {
        completed = "";
      }

      if (filter == book.status || filter == "all") {
        bookEl += `
        <li class="book">
          <label class="book-label" for="${id}">
            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
            <p class="${completed}">${book.name}</p>
          </label>
           <label for="number-${id}" class="number-label">Página:</label>
      <input type="number" id="number-${id}" class="number-input" value="${
          book.number || ""
        }" onchange="saveNumber(${id}, this.value)" onblur="updateNumber(${id}, this.value)">
    </label>
          <div class="settings">
            <ul>
              <li onclick='editBook(${id}, "${
          book.name
        }")'><i class='bx bx-pencil'></i>Editar</li>
              <li onclick='deleteBook(${id}, "${filter}")'><i class='bx bx-x' ></i>Deletar</li>
            </ul>
          </div>
        </li>
      `;
      }
    });
  }
  bookField.innerHTML = bookEl || "<span>Sem leituras disponíveis 😢 </span>";
  let checkBook = bookField.querySelectorAll(".book");
  !checkBook.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
  bookField.offsetHeight >= 300
    ? bookField.classList.add("overflow")
    : bookField.classList.remove("overflow");
}
showBook("all");

function updateStatus(selectedBook) {
  let bookName = selectedBook.parentElement.lastElementChild;
  if (selectedBook.checked) {
    bookName.classList.add("checked");
    books[selectedBook.id].status = "completed";
  } else {
    bookName.classList.remove("checked");
    books[selectedBook.id].status = "reading";
  }
  localStorage.setItem("book-list", JSON.stringify(books));
}

function editBook(bookId, textName) {
  editId = bookId;
  isEditBook = true;
  mainInput.value = textName;
  mainInput.focus();
  mainInput.classList.add("active");
}

function deleteBook(deleteId, filter) {
  isEditBook = false;
  books.splice(deleteId, 1);
  localStorage.setItem("book-list", JSON.stringify(books));
  showBook(filter);
}

clearAll.addEventListener("click", () => {
  isEditBook = false;
  books.splice(0, books.length);
  localStorage.setItem("book-list", JSON.stringify(books));
  showBook();
});

mainInput.addEventListener("keyup", (e) => {
  let userBook = mainInput.value.trim();
  if (e.key == "Enter" && userBook) {
    if (!isEditBook) {
      books = !books ? [] : books;
      let bookInfo = { name: userBook, status: "reading" };
      books.push(bookInfo);
    } else {
      isEditBook = false;
      books[editId].name = userBook;
    }
    mainInput.value = "";
    localStorage.setItem("book-list", JSON.stringify(books));
    showBook(document.querySelector("span.active").id);
  }
});

function saveNumber(bookId, number) {
  books[bookId].number = number;
  localStorage.setItem("book-list", JSON.stringify(books));
}

function updateNumber(bookId, number) {
  books[bookId].number = number;
  localStorage.setItem("book-list", JSON.stringify(books));
}
