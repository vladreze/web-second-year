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
    typeof value === "string" &&
    value.length > 0 &&
    value.charAt(0) === value.charAt(0).toUpperCase()
  );
}

function phoneValidation(phone, country) {
  if (typeof phone !== "string") return false;

  const pattern = phonePatterns[country];

  return pattern ? pattern.test(phone) : /^[\d\s()+-]{6,}$/.test(phone);
}

export function validateUser(user) {
  const errors = [];

  if (!stringValidation(user.full_name)) errors.push("full_name");
  if (!stringValidation(user.gender)) errors.push("gender");
  if (
    typeof user.note !== "string" ||
    (user.note !== "" && !stringValidation(user.note))
  )
    errors.push("note");
  if (!stringValidation(user.state)) errors.push("state");
  if (!stringValidation(user.city)) errors.push("city");
  if (!stringValidation(user.country)) errors.push("country");
  if (!phoneValidation(user.phone, user.country)) errors.push("phone");

  if (typeof user.age !== "number" || user.age < 1 || Number.isNaN(user.age))
    errors.push("age");
  if (typeof user.email !== "string" || !user.email.includes("@"))
    errors.push("email");

  return { valid: errors.length === 0, errors };
}

const validUser = {
  full_name: "Anna Test",
  gender: "Female",
  note: "",
  state: "Kyiv",
  city: "Kyiv",
  country: "Germany",
  phone: "0079-8291509",
  age: 25,
  email: "anna@example.com",
};

console.log(validateUser(validUser)); // { valid: true, errors: [] }
console.log(
  validateUser({ ...validUser, age: "25", phone: "123", email: "abc" }).errors,
); // [ 'phone', 'age', 'email' ]
console.log(validateUser({ ...validUser, note: "hello" }).errors); // [ 'note' ]
console.log(validateUser({ ...validUser, gender: "female" }).errors); // [ 'gender' ]
console.log(
  validateUser({
    ...validUser,
    country: "United States",
    phone: "(720)-981-1014",
  }).valid,
); // true
