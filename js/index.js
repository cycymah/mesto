//Спасибо за ревью и труд! Печенек, радости и чтобы код радовал глаз!:)

import Card from './Card.js';
import {
  initialCards
} from './initial-cards.js';
import FormValidator from './FormValidator.js';

//Параметры валидации
export const validationConfig = {
  inputSelector: '.form__input', 
  submitButtonSelector: '.form__submit-btn', 
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  formInputError: '.form__input-error'
}

//Модалки
const modalProfile = document.querySelector('.modal_target_profile');
const modalCard = document.querySelector('.modal_target_addCard');
const modalZoom = document.querySelector('.modal_target_photoZoom');
const modalsList = document.querySelectorAll('.modal');

//Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const profileCloseButton = document.querySelector('.form__close-btn_target_profile');
const cardAddButton = document.querySelector('.profile__add-button');
const cardCloseButton = document.querySelector('.form__close-btn_target_add');
const modalCloseButton = modalZoom.querySelector('.zoom__close-btn');

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
const mainDocumentPage = document.querySelector('.page');

//Создание объекта класса для валидации формы
const validationProfileEnabler = new FormValidator('.form__section_target_profile', validationConfig);
const validationAddEnabler = new FormValidator('.form__section_target_add', validationConfig);

////Открытие-закрытие модалок
const popupOpen = targetModal => {
  targetModal.classList.add('modal_active');
  mainDocumentPage.addEventListener('keydown', popupCloseEsc);
}

const popupClose = targetModal => {
  targetModal.classList.remove('modal_active');
  mainDocumentPage.removeEventListener('keydown', popupCloseEsc);
}

//Закрытие попапа по Esc
const popupCloseEsc = evt => {
  if (evt.key === 'Escape') {
    modalsList.forEach(modalElem => {
      if (modalElem.classList.contains('modal_active')) {
        popupClose(modalElem);
      }
    });
  }
}

// Подготовка карточки
const createCard = (titleImage, srcImage, altImage, cardIdSelector) => {
  const card = new Card(titleImage, srcImage, altImage, cardIdSelector);
  return card.generateCard();
}

//Добавление карточек на страницу
const addListItems = arr => {
  arr.forEach(elem => {
    list.append(createCard(elem.name, elem.link, elem.alt, '#listItem'));
  });
};
addListItems(initialCards);

//Закрытие с соханиением
const formSubmitHandler = evt => {
  evt.preventDefault();
  popupClose(modalProfile);
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;
}

const formSubmitCard = evt => {
  evt.preventDefault();
  list.prepend(createCard(inputTitle.value, inputSrc.value, inputTitle.value, '#listItem'));
  popupClose(modalCard);
};

//Закрытие модалок кликом на оверлей
const modalsCloseByOverlay = modalsList => {
  modalsList.forEach(modal => {
    const overlayElement = modal.querySelector('.modal__overlay');
    overlayElement.addEventListener('click', _ => popupClose(modal));
  });
};
modalsCloseByOverlay(modalsList);

//Открытие формы профайла
profileEditButton.addEventListener('click', _ => {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  validationProfileEnabler.resetValidation();
  validationProfileEnabler.enableValidation();
  popupOpen(modalProfile);
});

//Закрытие формы профайла
profileCloseButton.addEventListener('click', _ => {
  popupClose(modalProfile);
});

//Открытие формы добавления карточек
cardAddButton.addEventListener('click', _ => {
  inputTitle.value = '';
  inputSrc.value = '';
  validationAddEnabler.resetValidation();
  validationAddEnabler.enableValidation();
  popupOpen(modalCard);
});

//Закрытие формы добавления карточек
cardCloseButton.addEventListener('click', _ => {
  popupClose(modalCard);
});

//Закрытие формы с увеличенной картинкой
modalCloseButton.addEventListener('click', _ => {
  popupClose(modalZoom);
})

//Слушатели сабмитов
formCardAdd.addEventListener('submit', formSubmitCard);
formProfile.addEventListener('submit', formSubmitHandler);

