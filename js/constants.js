//Модалки
const modalProfile = document.querySelector('.modal_target_profile');
const modalCard = document.querySelector('.modal_target_addCard');
const modalZoom = document.querySelector('.modal_target_photoZoom');
const modalOverlayAll = document.querySelectorAll('.modal__overlay');
const modalsList = document.querySelectorAll('.modal');

//Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileCloseButton = document.querySelector('.form__close-btn_target_profile');
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.form__close-btn_target_add');
const zoomCLoseButton = modalZoom.querySelector('.zoom__close-btn');
const profileSubmitButton = modalProfile.querySelector('.form__submit-btn');

//Добавляемый контент
const profileName = document.querySelector('.profile__title-name');
const profileAbout = document.querySelector('.profile__subtitle-name');

//Формы
const formProfile = document.querySelector('.form__section_target_profile');
const formCardAdd = document.querySelector('.form__section_target_add');

//Инпуты
const inputProfile = document.querySelector('.form__input_field_name');
const inputAbout = document.querySelector('.form__input_field_about');
const inputTitle = document.querySelector('.form__input_field_title');
const inputSrc = document.querySelector('.form__input_field_src');

//Отдельные блоки
const list = document.querySelector('.elements__list');
const zoomWindow = document.querySelector('.zoom');
const zoomText = document.querySelector('.zoom__text-image');
const zoomImage = document.querySelector('.zoom__image');
const mainDocumentPage = document.querySelector('.page');

//Template объект
const listTemplate = document.querySelector('#listItem').content;

////Открытие-закрытие модалок
const popupOpen = targetModal => {
  targetModal.classList.add('modal_activ');
}

const popupClose = targetModal => {
  targetModal.classList.remove('modal_activ');
}

//Параметры валидации
const validationConfig = {
  formSelector: '.form__section', //
  inputSelector: '.form__input', //
  submitButtonSelector: '.form__submit-btn', //
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}
