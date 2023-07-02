const mainInput = document.querySelector(".book-input input");
const filters = document.querySelectorAll(".filters span");
const clearAll = document.querySelector(".clear-btn");
const bookField = document.querySelector(".book-field");

let editId,
  isEditBook = false,
  books = JSON.parse(localStorage.getItem("books"));

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
        bookEl += ` <li class="book">
                     <label for="${id}">
                     <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                     <p class="${completed}">${book.name}</p>
                     </label>
                     <div class="settings">
                        <ul>
                            <li onclick='editTask(${id}, "${book.name}")'><i class='bx bx-pencil'></i>Editar</li>
                            <li onclick='deleteTask(${id}, "${filter}")'><i class='bx bx-x' ></i>Deletar</li>
                        </ul>
                     </div>
                     </li>
                `;
      }
    });
  }
  bookField.innerHTML = bookEl || `<span>Sem leituras disponíveis 😢 </span>`;
  let checkBook = bookField.querySelectorAll(".book");
  !checkBook.length
    ? clearAll.classList.remove("active")
    : clearAll.classList.add("active");
  bookField.offsetHeight >= 300
    ? bookField.classList.add("overflow")
    : bookField.classList.remove("overflow");
}
showBook('all');
