const addTeacherModal = document.getElementById('modal-add-teacher');
const openAddTeacherBtns = document.querySelectorAll('.add-teacher-btn, .footer-nav-container button');

openAddTeacherBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    addTeacherModal.classList.add('is-open');
  });
});


const teacherInfoModal = document.getElementById('modal-teacher-info');
const teacherCards = document.querySelectorAll('.teacher-card');

teacherCards.forEach((card) => {
  card.addEventListener('click', () => {
    teacherInfoModal.classList.add('is-open');
  });
});



document.querySelectorAll('.modal-overlay').forEach((modal) => {
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });
  }

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('is-open');
    }
  });
});
