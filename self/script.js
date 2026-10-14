const form = document.querySelector("#todo-form");
let input = document.querySelector("#task-input");
let list = document.querySelector("#task-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let liNew = document.createElement("li");
  let buttonNew = document.createElement("button");

  liNew.innerText = input.value;
  buttonNew.classList.add("delete-btn");
  buttonNew.textContent = "Видалити";

  liNew.append(buttonNew);
  list.prepend(liNew);

  input.value = "";
});

list.addEventListener("click", function (event) {
  let button = event.target.closest(".delete-btn");
  if (!button) return;
  let findLi = event.target.closest("li");
  findLi.remove();
});
