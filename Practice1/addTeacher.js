import { validateUser } from "./JS-User-methods/validate-users.js";

const modalAddTeacher = document.querySelector("#modal-add-teacher");
const addTeacherBtns = document.querySelectorAll("#add-btn");
const form = document.querySelector(".modal-form");

function openModal() {
  modalAddTeacher.classList.add("is-open");
}

function closeModal() {
  modalAddTeacher.classList.remove("is-open");
}

function capitalize(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}
function countAge(dobStr) {
  if (!dobStr) return null;

  const birthDate = new Date(dobStr);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function initAddTeacher(users, render) {
  addTeacherBtns.forEach((button) => {
    button.addEventListener("click", openModal);
  });
  modalAddTeacher.addEventListener("click", (event) => {
    const closeBtn = event.target.closest(".modal-close");

    if (event.target === modalAddTeacher || closeBtn) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const inputName = form.querySelector('input[name="name"]').value.trim();
    const inputSpeciality = form.querySelector(
      'select[name="speciality"]',
    ).value;
    const inputCountry = form.querySelector('select[name="country"]').value;
    const inputCity = form.querySelector('input[name="city"]').value.trim();
    const inputEmail = form.querySelector('input[name="email"]').value.trim();
    const inputPhone = form.querySelector('input[name="phone"]').value.trim();
    const inputDateOfBirth = form.querySelector('input[name="dob"]').value;
    const inputSex =
      form.querySelector('input[name="sex"]:checked')?.value || "";
    const inputBGColor = form.querySelector('input[name="bg_color"]').value;
    const inputNotes = form
      .querySelector('textarea[name="notes"]')
      .value.trim();

    const newUser = {
      id: Date.now().toString(),
      full_name: capitalize(inputName),
      course: capitalize(inputSpeciality),
      country: capitalize(inputCountry),
      city: capitalize(inputCity),
      state: capitalize(inputCity),
      email: inputEmail,
      phone: inputPhone,
      b_date: inputDateOfBirth,
      age: countAge(inputDateOfBirth),
      gender: capitalize(inputSex),
      bg_color: inputBGColor,
      note: inputNotes,
      favorite: false,
      picture_large: null,
    };

    const validation = validateUser(newUser);

    if (!validation.valid) {
      alert("Помилка заповнення у полях: " + validation.errors.join(", "));
      return;
    }

    users.unshift(newUser);
    render(users);

    closeModal();
    form.reset();

    alert(`Користувача ${newUser.full_name} успішно додано!`);
  });
}
