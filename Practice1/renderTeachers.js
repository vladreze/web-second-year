const teacherProfileContainer = document.querySelector(
  ".teachers-profiles-container",
);

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

export function createTeachers(list) {
  teacherProfileContainer.replaceChildren(...list.map(createTeacherCard));
}

export function initRenderTeachers(users) {
  createTeachers(users);
  renderFavorites(users);
}

const favoriteContainer = document.querySelector(".favorites-container");

export function renderFavorites(users) {
  const favoriteUsers = users.filter((user) => user.favorite);
  favoriteContainer.innerHTML = "";
  favoriteContainer.style.justifyContent = "flex-start";

  if (favoriteUsers.length === 0) {
    const noFoundElement = document.createElement("p");
    noFoundElement.textContent = "Немає улюблених вчителів";
    favoriteContainer.style.justifyContent = "center";
    favoriteContainer.append(noFoundElement);
    return;
  }

  favoriteContainer.replaceChildren(
    ...favoriteUsers.map((user) => createTeacherCard(user)),
  );
}
