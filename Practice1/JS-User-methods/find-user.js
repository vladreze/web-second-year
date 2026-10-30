import {
  additionalUsers,
  formatUsers,
  randomUserMock,
} from "./FE4U-Lab2-mock.js";

const allUsers = formatUsers(randomUserMock, additionalUsers);

const searchableFields = ["full_name", "note", "age"];

export function findUser(users = allUsers, findParam = {}) {
  const [field, value] = Object.entries(findParam)[0] ?? [];

  if (!_.includes(searchableFields, field)) return null;
  if (_.isNil(value) || value === "") return null;

  const foundUser = _.find(users, (user) => {
    const userValue = _.get(user, field);

    if (_.isString(value)) {
      return (
        _.isString(userValue) &&
        _.includes(_.toLower(userValue), _.toLower(value))
      );
    }

    return userValue === value;
  });

  return foundUser ?? null;
}
