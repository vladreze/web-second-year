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
