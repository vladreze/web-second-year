import { formatUsers } from "./JS-User-methods/FE4U-Lab2-mock.js";

const users = formatUsers();
const teacherProfileContainer = document.querySelector(
  ".teachers-profiles-container",
);

const TOP = 10;

function getInitials(fullName) {
  const words = fullName.trim().split(" ");
  const first = words[0].charAt(0);
  const last = words.at(-1).charAt(0);

  return `${first}.${last}`.toUpperCase();
}

function createAvatar(user) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("teacher-card__avatar-wrapper");

  if (user.picture_large) {
    const img = document.createElement("img");
    img.classList.add("teacher-card__avatar");
    img.setAttribute("width", 120);
    img.setAttribute("height", 120);
    img.setAttribute("src", user.picture_large);
    img.setAttribute("alt", user.full_name);
    wrapper.append(img);
  } else {
    const initialsDiv = document.createElement("div");
    initialsDiv.classList.add(
      "teacher-card__avatar",
      "teacher-card__avatar--initials",
    );
    initialsDiv.textContent = getInitials(user.full_name);

    wrapper.append(initialsDiv);
  }

  return wrapper;
}

function createTeacherCard(user) {
  const card = document.createElement("article");
  card.classList.add("teacher-card");
  if (user.favorite) card.classList.add("teacher-card--favorite");

  card.dataset.id = user.id;

  const [firstName, ...lastName] = user.full_name.split(" ");
  const name = document.createElement("h3");
  name.classList.add("teacher-card__name");
  name.append(firstName, document.createElement("br"), lastName.join(" "));

  const subject = document.createElement("p");
  subject.classList.add("teacher-card__subject");
  subject.textContent = user.course;

  const country = document.createElement("span");
  country.classList.add("teacher-card__country");
  country.textContent = user.country;

  card.append(createAvatar(user), name, subject, country);

  return card;
}

function createTeachers(list, container) {
  container.replaceChildren(...list.map(createTeacherCard));
}

createTeachers(users.slice(0, TOP), teacherProfileContainer);
