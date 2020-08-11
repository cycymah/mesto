import {Card} from './Card.js';
import {initialCards} from './initial-cards.js';
import {validationConfig, toggleSubmitStatus} from './FormValidator.js';

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
const zoomCLoseButton = modalZoom.querySelector('.zoom__close-btn');

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
const zoomText = document.querySelector('.zoom__text-image');
const zoomImage = document.querySelector('.zoom__image');
const mainDocumentPage = document.querySelector('.page');

//Template объект
// const listTemplate = document.querySelector('#listItem').content;

////Открытие-закрытие модалок
const popupOpen = targetModal => {
  targetModal.classList.add('modal_activ');
  mainDocumentPage.addEventListener('keydown', popupCloseEsc);
}

const popupClose = targetModal => {
  targetModal.classList.remove('modal_activ');
  mainDocumentPage.removeEventListener('keydown', popupCloseEsc);
}

//Закрытие попапа по 
const popupCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    modalsList.forEach((modalElem) => {
      if (modalElem.classList.contains('modal_activ')) {
        popupClose(modalElem);
      };
    });
  };
}

//рендер карточек
const renderCards = (card) => {
  return list.prepend(card);
}

//Добавление элементов в список
const addListItems = arr => {
  arr.forEach((elem) => {
    const card = new Card(elem.name, elem.link, elem.alt, '#listItem');
    const cardElement = card.generateCard();

    renderCards(cardElement);
  });
};
addListItems(initialCards);

const profileFillInformation = _ => {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}
profileFillInformation();

//Закрытие с соханиением
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  popupClose(modalProfile);
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;
}

const formSubmitCard = (evt) => {
  evt.preventDefault();
  const card = new Card(inputTitle.value, inputSrc.value, inputTitle.value, '#listItem');
  const cardElement = card.generateCard();

  renderCards(cardElement);
  popupClose(modalCard);
};

//Закрытие модалок кликом на оверлей
const modalsCloseByOverlay = (modalsList) => { 
  modalsList.forEach((modal) => {
    const overlayElement = modal.querySelector('.modal__overlay');
    overlayElement.addEventListener('click', _ => popupClose(modal));
  });
};
modalsCloseByOverlay(modalsList);

//Сбрасываем состояние валидации
const resetValidation = (modalName, inactivButtonClass) => {
  const validationTextField = Array.from(modalName.querySelectorAll('.form__input-error'));
  const modalInput = Array.from(modalName.querySelectorAll('.form__input'));
  const validationButton = modalName.querySelector('.form__submit-btn');

  validationTextField.forEach((tetxField) => {
    tetxField.textContent = "";
  })
  modalInput.forEach((input) => {
    input.classList.remove('form__input_type_error');
  })
  toggleSubmitStatus(modalInput, validationButton, inactivButtonClass);
}

//События
//Закрытие зум-картинки
zoomCLoseButton.addEventListener('click', _ => {
  popupClose(modalZoom);
});

//Открытие формы профайла
profileEditButton.addEventListener('click', _ => {
  profileFillInformation();
  resetValidation(modalProfile, validationConfig);
  popupOpen(modalProfile);
});

//Закрытие формы профайла
profileCloseButton.addEventListener('click', _ => {
  popupClose(modalProfile);
});

//Открытие формы добавления карточек
cardAddButton.addEventListener('click', _ => {
  popupOpen(modalCard);
  inputTitle.value = '';
  inputSrc.value = '';
  resetValidation(modalCard, validationConfig);
});

//Закрытие формы добавления карточек
cardCloseButton.addEventListener('click', _ => {
  popupClose(modalCard);
});

formCardAdd.addEventListener('submit', formSubmitCard);
formProfile.addEventListener('submit', formSubmitHandler);