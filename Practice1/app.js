import { fetchUsers } from "./api.js";
import {
  initRenderTeachers,
  createTeachers,
  renderFavorites,
} from "./renderTeachers.js";
import { initModal } from "./modalWindowTeacher.js";
import { filterUsers } from "./JS-User-methods/filter-users.js";
import { initStaticticsTable } from "./statistics.js";
import { searchUser } from "./search.js";
import { initAddTeacher } from "./addTeacher.js";

let users = [];

async function startUp() {
  const fetchedUsers = await fetchUsers();
  users = fetchedUsers;
  initRenderTeachers(users);
  initModal(users, createTeachers, renderFavorites);
  initStaticticsTable(users);
  searchUser(users);
  initAddTeacher(users, createTeachers);
}

startUp();

const form = document.querySelector(".top-teachers-form-container");
form.addEventListener("change", () => {
  const filters = {
    age: document.querySelector("#age").value,
    country: document.querySelector("#country").value,
    gender: document.querySelector("#sex").value,
    favorite: document.querySelector("#favorites-checkbox").checked,
    withPhoto: document.querySelector("#photo-checkbox").checked,
  };

  const filteredUsers = filterUsers(users, filters);
  createTeachers(filteredUsers);
});

const loadMoreBtn = document.querySelector("#load-more-teachers");
loadMoreBtn.addEventListener("click", async () => {
  loadMoreBtn.textContent = "Loading...";
  const newUsers = await fetchUsers(10);
  users.push(...newUsers);
  createTeachers(users);
  initStaticticsTable(users);
  loadMoreBtn.textContent = "Load more";
});
