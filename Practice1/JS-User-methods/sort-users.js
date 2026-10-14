import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

const sortableFields = ["full_name", "age", "b_date", "country"];

function hasValue(value) {
  return value !== null && value !== "" && value !== undefined;
}

function compareValues(first, second, field) {
  if (field === "age") return first - second;
  if (field === "b_date") return new Date(first) - new Date(second);
  return first.localeCompare(second);
}

export function sortUsers(users = allUsers, field, direction = "asc") {
  if (!sortableFields.includes(field)) return [...users];
  const order = direction === "desc" ? -1 : 1;

  return [...users].sort((a, b) => {
    const first = a[field];
    const second = b[field];

    if (!hasValue(first) && !hasValue(second)) return 0;
    if (!hasValue(first)) return 1;
    if (!hasValue(second)) return -1;

    return compareValues(first, second, field) * order;
  });
}

console.log(
  sortUsers(allUsers, "age")
    .map((u) => u.age)
    .slice(0, 3),
); // [ 24, 26, 27 ]
console.log(
  sortUsers(allUsers, "age", "desc")
    .map((u) => u.age)
    .slice(0, 3),
); // [ 80, 75, 73 ]
console.log(sortUsers(allUsers, "age").at(-1).full_name); // Aaron Enokse
console.log(sortUsers(allUsers, "country")[0].country); // Australia
console.log(
  sortUsers(allUsers, "favorite")[0].full_name === allUsers[0].full_name,
); // true
