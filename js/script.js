
const profileEdit = document.querySelector('.profile__edit-btn');
const formShow = document.querySelector('.modal');
const formClose = document.querySelector('.form__close-btn');
const profileName = document.querySelector('.profile__title-name');
const profileAbout = document.querySelector('.profile__subtitle-name');
const inputProfile = document.querySelector('.form__input_field_name');
const inputAbout = document.querySelector('.form__input_field_about');



function modalOn() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formShow.classList.add('modal_activ');
};

function modalOff() {
  formShow.classList.remove('modal_activ');
};

profileEdit.addEventListener('click', modalOn);
formClose.addEventListener('click', modalOff);

const formElement = document.querySelector('.form__section');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputProfile.value;;
    profileAbout.textContent = inputAbout.value;;
    modalOff();
}

formElement.addEventListener('submit', formSubmitHandler);

//Спасибо за ревью! Счастья, печенек и хорошего настроения!:)