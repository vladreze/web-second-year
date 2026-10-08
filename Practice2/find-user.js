import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

const searchableFields = ["full_name", "note", "age"];

export function findUser(users = allUsers, findParam = {}) {
  const [field, value] = Object.entries(findParam)[0] ?? [];

  if (!searchableFields.includes(field)) return null;
  if (value === undefined || value === "") return null;

  const foundUser = users.find((user) => {
    const userValue = user[field];

    if (typeof value === "string") {
      return (
        typeof userValue === "string" &&
        userValue.toLowerCase().includes(value.toLowerCase())
      );
    }

    return userValue === value;
  });

  return foundUser ?? null;
}

console.log(findUser(allUsers, { full_name: "norbert" })?.full_name); // Norbert Weishaupt
console.log(findUser(allUsers, { age: 65 })?.full_name); // Norbert Weishaupt
console.log(findUser(allUsers, { note: "cats" })?.full_name); // Olivia Storm
console.log(findUser(allUsers, { full_name: "Zzzz" })); // null
console.log(findUser(allUsers, { city: "Madrid" })); // null
