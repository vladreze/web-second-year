import { findUser } from "./JS-User-methods/find-user.js";
import { createTeachers } from "./renderTeachers.js";

const searchForm = document.querySelector(".container-logo-search form");
const searchInput = searchForm.querySelector("input");

export function searchUser(users) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchValue = searchInput.value.trim();

    if (!searchValue) return createTeachers(users);

    let foundUser = findUser(users, { full_name: searchValue });
    if (!foundUser) foundUser = findUser(users, { note: searchValue });
    if (!foundUser && !isNaN(searchValue))
      foundUser = findUser(users, { age: Number(searchValue) });

    if (foundUser) createTeachers([foundUser]);
    else {
      alert("За вашим запитом викладача не знайдено!");
      searchInput.value = "";
    }
  });
}
