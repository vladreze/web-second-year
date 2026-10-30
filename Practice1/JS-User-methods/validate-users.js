const phonePatterns = {
  Germany: /^\d{4}-\d{7}$/,
  Ireland: /^\d{3}-\d{3}-\d{4}$/,
  Canada: /^\d{3}-\d{3}-\d{4}$/,
  Australia: /^\d{2}-\d{4}-\d{4}$/,
  "United States": /^\(\d{3}\)-\d{3}-\d{4}$/,
  Turkey: /^\(\d{3}\)-\d{3}-\d{4}$/,
  "New Zealand": /^\(\d{3}\)-\d{3}-\d{4}$/,
  Netherlands: /^\(\d{3}\)-\d{3}-\d{4}$/,
  Finland: /^\d{2}-\d{3}-\d{3}$/,
  Switzerland: /^\d{3} \d{3} \d{2} \d{2}$/,
  Spain: /^\d{3}-\d{3}-\d{3}$/,
  Norway: /^\d{8}$/,
  Denmark: /^\d{8}$/,
  Iran: /^\d{3}-\d{8}$/,
  France: /^\d{2}-\d{2}-\d{2}-\d{2}-\d{2}$/,
};

function stringValidation(value) {
  return (
    _.isString(value) &&
    !_.isEmpty(_.trim(value)) &&
    value.charAt(0) === value.charAt(0).toUpperCase()
  );
}

function phoneValidation(phone, country) {
  if (!_.isString(phone)) return false;
  const pattern = phonePatterns[country];
  return pattern ? pattern.test(phone) : /^[\d\s()+-]{6,}$/.test(phone);
}

export function validateUser(user) {
  const errors = [];

  if (!stringValidation(user.full_name)) errors.push("full_name");
  if (!stringValidation(user.gender)) errors.push("gender");
  if (!_.isNil(user.note) && user.note !== "" && !stringValidation(user.note))
    errors.push("note");
  if (!stringValidation(user.state)) errors.push("state");
  if (!stringValidation(user.city)) errors.push("city");
  if (!stringValidation(user.country)) errors.push("country");
  if (!phoneValidation(user.phone, user.country)) errors.push("phone");
  if (!_.isNumber(user.age) || _.isNaN(user.age) || user.age < 1)
    errors.push("age");
  if (!_.isString(user.email) || !_.includes(user.email, "@"))
    errors.push("email");
  return { valid: _.isEmpty(errors), errors };
}
