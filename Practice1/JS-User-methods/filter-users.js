import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

export function filterUsers(users = allUsers, filters = {}) {
  return _.filter(users, (user) => {
    let ageMatch = true;
    if (filters.age && filters.age != "all") {
      if (filters.age === "18-30") ageMatch = _.inRange(user.age, 18, 31);
      else if (filters.age === "31-45") ageMatch = _.inRange(user.age, 31, 46);
      else if (filters.age === "46-60") ageMatch = _.inRange(user.age, 46, 61);
      else if (filters.age === "61+") ageMatch = user.age >= 61;
    }

    const genderMatch =
      !filters.gender ||
      filters.gender === "all" ||
      _.toLower(user.gender) === _.toLower(filters.gender);
    const favoriteMatch = filters.favorite ? user.favorite === true : true;
    const photoMatch = filters.withPhoto ? !_.isNil(user.picture_large) : true;
    const countryMatch =
      !filters.country ||
      filters.country === "all" ||
      _.toLower(user.country) === _.toLower(filters.country);

    return (
      ageMatch && genderMatch && favoriteMatch && photoMatch && countryMatch
    );
  });
}
