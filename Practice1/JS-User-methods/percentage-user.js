import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

export function percentageAmongUsers(users = allUsers, condition) {
  if (users.length === 0 || typeof condition !== "function") return 0;

  const matchedUsers = users.filter(condition).length;
  const percentage = (matchedUsers / users.length) * 100;

  return Math.round(percentage * 100) / 100;
}
