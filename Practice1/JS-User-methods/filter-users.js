import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

export function filterUsers(users = allUsers, filters = {}) {
  return users.filter((user) => {
    let ageMatch = true;
    if (filters.age && filters.age !== "all") {
      if (filters.age === "18-30") ageMatch = user.age >= 18 && user.age <= 30;
      else if (filters.age === "31-45")
        ageMatch = user.age >= 31 && user.age <= 45;
      else if (filters.age === "46-60")
        ageMatch = user.age >= 46 && user.age <= 60;
      else if (filters.age === "61+") ageMatch = user.age >= 61;
    }

    let genderMatch = true;
    if (filters.gender && filters.gender !== "all") {
      genderMatch = user.gender === filters.gender;
    }

    let favoriteMatch = true;
    if (filters.favorite) {
      favoriteMatch = user.favorite === true;
    }

    let photoMatch = true;
    if (filters.withPhoto) {
      photoMatch =
        user.picture_large !== null && user.picture_large !== undefined;
    }

    let countryMatch = true;
    if (filters.country && filters.country !== "all") {
      countryMatch =
        user.country?.toLowerCase() === filters.country.toLowerCase();
    }

    return (
      ageMatch && genderMatch && favoriteMatch && photoMatch && countryMatch
    );
  });
}
