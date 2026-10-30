import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

const sortableFields = ["full_name", "age", "gender", "country", "course"];

export function sortUsers(users = allUsers, field, direction = "asc") {
  if (!_.includes(sortableFields, field)) return [...users];

  return _.orderBy(users, [field], [direction]);
}
