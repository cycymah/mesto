//Спасибо за ревью и труд! Печенек, радости и чтобы код радовал глаз!:)
import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  profileEditButton,
  cardAddButton,
  inputProfile,
  inputAbout
} from '../utils/constants.js';
import {
  initialCards
} from '../utils/initial-cards.js';


//Параметры валидации
export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  formInputError: '.form__input-error'
};

//Функция подготовки карточки
const createCard = (cardData, cardIdSelector, handleCardClick) => {
  const card = new Card(cardData, cardIdSelector, handleCardClick);
  const elementCard = card.generateCard();
  return elementCard;
};

//Элемент класса для попапов с картинкой 
const popupWithImage = new PopupWithImage({
  popupSelector: '.modal_target_photoZoom',
  closeBtnSelector: '.zoom__close-btn'
});

//Элемент класса UserInfo
const userProfileInformation = new UserInfo({
  profileName: '.profile__title-name',
  profileAbout: '.profile__subtitle-name'
});

//Создание элемет класса для валидации формы
const validationProfileEnabler = new FormValidator('.form__section_target_profile', validationConfig);
const validationAddEnabler = new FormValidator('.form__section_target_add', validationConfig);

//Установка валидации
validationProfileEnabler.enableValidation();
validationAddEnabler.enableValidation();

//Элемент класа профайла 
const profilePopup = new PopupWithForm({
  popupSelector: '.modal_target_profile',
  formSubmitHandler: inputValues => {
    userProfileInformation.setUserInfo(inputValues);
    profilePopup.close();
  },
  closeBtnSelector: '.form__close-btn'
});

//Создаем элемент класса для рендера всех карточек на странице
const newCardsSection = new Section({
    data: initialCards,
    renderer: elem => {
      const newCard = createCard(elem, '#listItem', (titleImage, srcImage) => {
        popupWithImage.open(titleImage, srcImage);
      });
      newCardsSection.addItem(newCard);
    }
  },
  '.elements__list');
newCardsSection.renderElements();

//Форма добавления карточки на страницу
const addCardPopup = new PopupWithForm({
  popupSelector: '.modal_target_addCard',
  formSubmitHandler: inputValues => {
    const singleCard = new Section({
        data: {
          name: inputValues.titleImage,
          link: inputValues.pictureSource,
          alt: inputValues.titleImage
        },
        renderer: elem => {
          const newCard = createCard(elem, '#listItem', (titleImage, srcImage) => {
            popupWithImage.open(titleImage, srcImage);
          });
          singleCard.addItem(newCard);
        }
      },
      '.elements__list');
    singleCard.renderOneElement();
    addCardPopup.close();
  },
  closeBtnSelector: '.form__close-btn'
});

//Открытие формы профайла
const profileOpen = _ => {
  const userInfoGet = userProfileInformation.getUserInfo();
  inputProfile.value = userInfoGet.name;
  inputAbout.value = userInfoGet.about;
  validationProfileEnabler.resetValidation();
  profilePopup.open();
};

const cardAddOpen = _ => {
  validationAddEnabler.resetValidation();
  addCardPopup.open();
};

//Открытие формы добавления карточек
profileEditButton.addEventListener('click', profileOpen);
cardAddButton.addEventListener('click', cardAddOpen);

//Слушатели на модалки
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupWithImage.setEventListeners();