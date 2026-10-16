import { sortUsers } from "./JS-User-methods/sort-users.js";

const tableBody = document.querySelector(".data-table tbody");
const tableHeader = document.querySelectorAll(".data-table thead th");

let currentSortField = null;
let currentSortDirection = "asc";
export function renderStatistics(usersList) {
  tableBody.innerHTML = "";

  const rows = usersList.map((user) => {
    const tr = document.createElement("tr");

    const tdName = document.createElement("td");
    tdName.textContent = user.full_name || "-";

    const tdSubject = document.createElement("td");
    tdSubject.textContent = user.course || "-";

    const tdAge = document.createElement("td");
    tdAge.textContent = user.age || "-";

    const tdGender = document.createElement("td");
    tdGender.textContent = user.gender
      ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
      : "-";

    const tdCountry = document.createElement("td");
    tdCountry.textContent = user.country || "-";

    tr.append(tdName, tdSubject, tdAge, tdGender, tdCountry);

    return tr;
  });

  tableBody.append(...rows);
}

export function initStaticticsTable(users) {
  renderStatistics(users);

  tableHeader.forEach((th) => {
    th.addEventListener("click", () => {
      const field = th.dataset.sort;
      if (!field) return;

      if (currentSortField === field) {
        currentSortDirection = currentSortDirection === "asc" ? "desc" : "asc";
      } else {
        currentSortField = field;
        currentSortDirection = "asc";
      }

      tableHeader.forEach((th) => {
        th.classList.remove("sort-asc", "sort-desc");
      });

      if (currentSortDirection === "asc") th.classList.add("sort-asc");
      else th.classList.add("sort-desc");

      const sortedUsers = sortUsers(users, field, currentSortDirection);

      renderStatistics(sortedUsers);
    });
  });
}
