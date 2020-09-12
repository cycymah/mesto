//Еще раз спасибо! Приношу извинения за тупеж в начале! Отличного дня!
import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  profileEditButton,
  cardAddButton,
  inputProfile,
  inputAbout,
  profileAvatarButton,
  avatarImage
} from '../utils/constants.js';


//Параметры валидации
export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  formInputError: '.form__input-error'
};

//Элемент класса для попапов с картинкой 
const popupWithImage = new PopupWithImage({
  popupSelector: '.modal_target_photoZoom',
  closeBtnSelector: '.zoom__close-btn'
});

//Элемент API для карточек
const apiCard = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/cards',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'e25f3c22-3477-48f3-a377-dbd53dc14614'
  }
});

const apiProfileInformation = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'e25f3c22-3477-48f3-a377-dbd53dc14614'
  }
});

const apiAvatarUpdate = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'e25f3c22-3477-48f3-a377-dbd53dc14614'
  }
});

const renderCards = apiCard.getInitialData();
const userInformation = apiProfileInformation.getInitialData();

//Элемент класса UserInfo
const userProfileInformation = new UserInfo({
  profileName: '.profile__title-name',
  profileAbout: '.profile__subtitle-name',
  profileAvatar: '.profile__avatar'
});

userInformation
  .then(data => {
    userProfileInformation.setUserInfo(data);
  })
  .catch(err => console.log(err));


//Функция подготовки карточки
const createCard = (cardData, cardIdSelector, handleCardClick, api) => {
  const card = new Card(cardData, cardIdSelector, handleCardClick, api);
  const elementCard = card.generateCard();
  return elementCard;
};

//Создание элемет класса для валидации формы
const validationProfileEnabler = new FormValidator('.form__section_target_profile', validationConfig);
const validationAddEnabler = new FormValidator('.form__section_target_add', validationConfig);
const validationAvatarEnabler = new FormValidator('.form__section_target_avatar', validationConfig);

//Установка валидации
validationProfileEnabler.enableValidation();
validationAddEnabler.enableValidation();
validationAvatarEnabler.enableValidation();

//Элемент класа профайла 
const profilePopup = new PopupWithForm({
  popupSelector: '.modal_target_profile',
  formSubmitHandler: inputValues => {
    console.log(inputValues);
    apiProfileInformation.updateInformation({
        name: inputValues.profileName,
        about: inputValues.about
      })
      .then(inputValues => {
        userProfileInformation.setUserInfo(inputValues);
        profilePopup.close();
      })
      .catch(err => console.log(err));
  },
  closeBtnSelector: '.form__close-btn'
});

//Элемент класса Попап Аватара
const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.modal_target_profile-avatar',
  formSubmitHandler: inputValues => {
    apiAvatarUpdate.updateInformation({
        avatar: inputValues.pictureSource,
      })
      .then(inputValues => {
        avatarImage.src = inputValues.pictureSource;
        avatarUpdatePopup.close();
      })
      .catch(err => console.log(err));
  },
  closeBtnSelector: '.form__close-btn'
});

//Создаем элемент класса для рендера всех карточек на странице
renderCards
  .then(data => {
    const newCardsSection = new Section({
        data,
        renderer: elem => {
          const newCard = createCard(elem, '#listItem', (titleImage, srcImage) => {
            popupWithImage.open(titleImage, srcImage);
          }, apiCard);
          newCardsSection.addItem(newCard);
        }
      },
      '.elements__list');
    newCardsSection.renderElements();
  })
  .catch(err => console.log(err));


//Форма добавления карточки на страницу
const addCardPopup = new PopupWithForm({
  popupSelector: '.modal_target_addCard',
  formSubmitHandler: inputValues => {
    console.log(inputValues);
    apiCard.addNewInformation({
        name: inputValues.name,
        link: inputValues.link
      })
      .then(data => {
        const singleCard = new Section({
            data: {
              name: data.name,
              link: data.link,
              alt: data.name,
              owner: {
                name: userProfileInformation.getUserInfo().name
              }
            },
            renderer: elem => {
              const newCard = createCard(elem, '#listItem', (titleImage, srcImage) => {
                popupWithImage.open(titleImage, srcImage);
              }, apiCard);
              singleCard.addItem(newCard);
            }
          },
          '.elements__list');
        singleCard.renderOneElement();
        addCardPopup.close();
      })
      .catch(err => console.log(err));
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

const profileAvatarOpen = _ => {
  validationAvatarEnabler.resetValidation();
  avatarUpdatePopup.open();
};

//Открытие формы добавления карточек
profileEditButton.addEventListener('click', profileOpen);
cardAddButton.addEventListener('click', cardAddOpen);
profileAvatarButton.addEventListener('click', profileAvatarOpen);

//Слушатели на модалки
avatarUpdatePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupWithImage.setEventListeners();