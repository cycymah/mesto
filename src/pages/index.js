//Добрый день! Спасибо за труд! Плюшек, радости и счатья. Извиняюсь, если мой код приносит боль и страдания:)
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithFormSubmit from '../components/PopupWithFormSubmit';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import {
  profileEditButton,
  cardAddButton,
  inputProfile,
  inputAbout,
  profileAvatarButton,
  avatarImage,
} from '../utils/constants.js';

//Записываем ID удаляемой карточки
let itemDelete;
let trashElem;

//Параметры валидации
export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  formInputError: '.form__input-error'
};

//Сообщение о загрузке
const renderLoading = (loading, button, message) => {
  if (loading) {
    button.textContent = message;
  } else {
    button.textContent = message;
  }
};

//Элемент API для карточек
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    'Content-Type': 'application/json',
    authorization: 'e25f3c22-3477-48f3-a377-dbd53dc14614'
  }
});

const renderCards = api.getInitialCards('cards');
const userInformation = api.getProfileInformation('users/me');

userInformation
  .then(data => {
    userProfileInformation.setUserInfo(data);
  })
  .catch(err => console.log(err));

//Функция подготовки карточки
const createCard = (cardData, cardIdSelector, handleCardClick, handleTrashClick, handlePutLike, handleLikeDelete) => {
  const card = new Card(cardData, cardIdSelector, handleCardClick, handleTrashClick, handlePutLike, handleLikeDelete);
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

//Элемент класса UserInfo
const userProfileInformation = new UserInfo({
  profileName: '.profile__title-name',
  profileAbout: '.profile__subtitle-name',
  profileAvatar: '.profile__avatar'
});

//Элемент класса для попапов с картинкой 
const popupWithImage = new PopupWithImage({
  popupSelector: '.modal_target_photoZoom',
  closeBtnSelector: '.zoom__close-btn'
});

//Элемент класса формы подтверждения
const popupDeleteCard = new PopupWithFormSubmit({
  popupSelector: '.modal_target_confirm',
  handleOkRemove: button => {
    renderLoading(true, button, 'Ок...');
    api.removeCard(itemDelete)
      .then(_ => {
        popupDeleteCard.close();
      })
      .then(_ => trashElem.remove())
      .catch(err => console.log(err))
      .finally(_ => renderLoading(false, button, 'Ок'));
  },
  closeBtnSelector: '.confirm__close-btn'
});

//Элемент класса формы профайла 
const profilePopup = new PopupWithForm({
  popupSelector: '.modal_target_profile',
  formSubmitHandler: (inputValues, button) => {
    
    api.updateInformation({
        name: inputValues.profileName,
        about: inputValues.about
      }, 'users/me')
      .then(renderLoading(true, button, 'Сохранение...'))
      .then(inputValues => {
        userProfileInformation.setUserInfo(inputValues);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(_ => renderLoading(false, button, 'Сохранить'));
  },
  closeBtnSelector: '.form__close-btn'
});

//Элемент класса Попап Аватара
const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.modal_target_profile-avatar',
  formSubmitHandler: (inputValues, button) => {
    renderLoading(true, button, 'Сохранение...');
    api.updateInformation({
        avatar: inputValues.pictureSource,
      }, 'users/me/avatar')
      .then( _ => {
        avatarImage.src = inputValues.pictureSource;
        avatarUpdatePopup.close();
      })
      .catch(err => console.log(err))
      .finally( _ => renderLoading(false, button, 'Сохранить'));
  },
  closeBtnSelector: '.form__close-btn'
});

//Форма добавления карточки на страницу
const addCardPopup = new PopupWithForm({
  popupSelector: '.modal_target_addCard',
  formSubmitHandler: (inputValues, button) => {
    renderLoading(true, button, 'Создание...');
    api.addNewInformation({
        name: inputValues.name,
        link: inputValues.link
      }, 'cards')
      .then(data => renderCard(data, api))
      .catch(err => console.log(err))
      .finally( _ => renderLoading(false, button, 'Создать'));
  },
  closeBtnSelector: '.form__close-btn'
});

//Подготовка карточеки
const createNewCard = cardData => {
  const newCard = createCard(
    cardData, 
      '#listItem',
      _ => { popupWithImage.open(cardData) },
      evt => {
        trashElem = evt.target.closest('.elements__item');
        itemDelete = cardData._id;
        popupDeleteCard.open();
      },
      cardId => { return api.putLike(cardId) },
      cardId => { return api.deleteLike(cardId)}
    );
  return newCard;
}

//Подготовка и рендер всех карточек на страницу
const renderAllCards = data => {
  const newCardsSection = new Section({
      data,
      renderer: elem => {
        newCardsSection.addItem(createNewCard(elem));
      }
    },
    '.elements__list');
  newCardsSection.renderElements();
};

//Подготовка и рендер одной карточки на страницу
renderCards
  .then(data => renderAllCards(data))
  .catch(err => console.log(err));

//Добавление карточки на страницу
const renderCard = data => {
  {
    const singleCard = new Section({
        data,
        renderer: elem => singleCard.addItem(createNewCard(elem))
      },
      '.elements__list');
    singleCard.renderOneElement();
    addCardPopup.close();
  }
}

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

//Открытие форм
profileEditButton.addEventListener('click', profileOpen);
cardAddButton.addEventListener('click', cardAddOpen);
profileAvatarButton.addEventListener('click', profileAvatarOpen);

//Слушатели
avatarUpdatePopup.setEventListeners();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
popupWithImage.setEventListeners();
popupDeleteCard.setEventListeners();
