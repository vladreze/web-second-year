const teachersProfile = document.querySelector(".teachers-profiles-container");
const favoritesContainer = document.querySelector(".favorites-container");

function setLink(link, value, prefix) {
  link.hidden = !value;

  if (value) {
    link.textContent = value;
    link.setAttribute("href", prefix + value);
  }
}

function capitalize(text) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
}

function countDaysUntilBDay(birthDate) {
  const today = dayjs();
  const dob = dayjs(birthDate);
  let nextBday = dob.year(today.year());
  if (nextBday.isBefore(today, "day")) nextBday = nextBday.add(1, "year");
  return nextBday.diff(today, "day");
}

const modal = document.querySelector("#modal-teacher-info");

let map = null;

function openModal(user) {
  const photo = modal.querySelector(".teacher-info-photo");
  if (user.picture_large) {
    photo.setAttribute("src", user.picture_large);
    photo.setAttribute("alt", user.full_name);
  } else {
    photo.setAttribute("src", "img/defaultimage.jpg");
    photo.setAttribute("alt", user.full_name);
  }

  photo.hidden = false;

  const name = modal.querySelector(".teacher-info-name");
  name.textContent = user.full_name;

  const star = modal.querySelector(".teacher-info-star");
  star.textContent = user.favorite ? "★" : "☆";

  const subject = modal.querySelector(".teacher-info-subject");
  subject.textContent = user.course;

  const locationText = modal.querySelector(".teacher-info-location");
  locationText.textContent = [user.city, user.country]
    .filter(Boolean)
    .join(", ");

  const meta = modal.querySelector(".teacher-info-meta");
  meta.textContent = [user.age, capitalize(user.gender)]
    .filter(Boolean)
    .join(", ");

  const dayToTheBirthday = modal.querySelector(
    ".teacher-info-days-to-the-birthday",
  );

  const dayText = countDaysUntilBDay(user.b_date) > 1 ? "days" : "day";

  dayToTheBirthday.textContent =
    "Days to the birthday: " + countDaysUntilBDay(user.b_date) + " " + dayText;

  const email = modal.querySelector(".teacher-info-link");
  setLink(email, user.email, "mailto:");

  const phone = modal.querySelector(".teacher-info-phone");
  setLink(phone, user.phone, "tel:");

  const bio = modal.querySelector(".teacher-info-bio");
  bio.textContent = user.note || "No notes";

  modal.dataset.id = user.id;
  modal.classList.add("is-open");

  const lat = user.latitude;
  const lng = user.longitude;

  if (!map) {
    map = L.map("teacher-map").setView([lat, lng], 5);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  } else {
    map.setView([lat, lng], 5);
  }

  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      layer.remove();
    }
  });

  L.marker([lat, lng]).addTo(map);
}

function closeModal() {
  modal.classList.remove("is-open");
}

export function initModal(users, renderCallback, renderFavoritesCallback) {
  function handleCardClick(event) {
    const card = event.target.closest(".teacher-card");
    if (!card) return;

    const user = users.find(
      (currentUser) => currentUser.id === card.dataset.id,
    );
    if (user) openModal(user);
  }

  teachersProfile.addEventListener("click", handleCardClick);
  favoritesContainer.addEventListener("click", handleCardClick);

  modal.addEventListener("click", function (event) {
    const closeButton = event.target.closest(".modal-close");
    if (event.target === modal || closeButton) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });

  const starBtn = modal.querySelector(".teacher-info-star");
  starBtn.addEventListener("click", function () {
    const currentId = modal.dataset.id;
    const user = users.find((u) => u.id === currentId);

    if (user) {
      user.favorite = !user.favorite;
      starBtn.textContent = user.favorite ? "★" : "☆";
      renderCallback(users);
      renderFavoritesCallback(users);
    }
  });
}
