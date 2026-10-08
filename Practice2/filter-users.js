import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

export function filterUsers(users = allUsers, filters = {}) {
  return users.filter((currentUser) => {
    const countryFilter =
      filters.country === undefined || currentUser.country === filters.country;
    const ageFilter =
      filters.age === undefined || currentUser.age === filters.age;
    const genderFilter =
      filters.gender === undefined || currentUser.gender === filters.gender;
    const favoriteFilter =
      filters.favorite === undefined ||
      currentUser.favorite === filters.favorite;

    return countryFilter && ageFilter && genderFilter && favoriteFilter;
  });
}

console.log(filterUsers(allUsers).length); // 52
console.log(filterUsers(allUsers, { country: "Germany" })); // 3
console.log(
  filterUsers(allUsers, { country: "Germany", gender: "female" }).map(
    (u) => u.full_name,
  ),
); // [ 'Tessa Möllmann', 'Adeline Weigand' ]
console.log(filterUsers(allUsers, { country: "Atlantis" })); // []
