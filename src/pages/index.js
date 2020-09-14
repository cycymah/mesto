//Еще раз спасибо! Приношу извинения за тупеж в начале! Отличного дня!
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

//Информация о загрузке информации
const renderLoading = (loading, submitBtn) => {
  if (loading) {
    submitBtn.textContent = 'Сохранение...';
  } else {
    submitBtn.textContent = 'Сохранить';
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

//Элемент класса для попапов с картинкой 
const popupWithImage = new PopupWithImage({
  popupSelector: '.modal_target_photoZoom',
  closeBtnSelector: '.zoom__close-btn'
});

const popupDeleteCard = new PopupWithFormSubmit({
  popupSelector: '.modal_target_confirm',
  handleOkRemove: id => {
    console.log(id);
    api.removeCard(id).
    catch(err => console.log(err));
  },
  closeBtnSelector: '.confirm__close-btn'
});

const renderCards = api.getInitialCards('cards');
const userInformation = api.getPrifileInformation('users/me');

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
const createCard = (cardData, cardIdSelector, handleCardClick, handleTrashClick, api) => {
  const card = new Card(cardData, cardIdSelector, handleCardClick, handleTrashClick, api);
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
  formSubmitHandler: (inputValues, formBtn) => {
    renderLoading(true, formBtn);
    api.updateInformation({
        name: inputValues.profileName,
        about: inputValues.about
      }, 'users/me')
      .then(inputValues => {
        userProfileInformation.setUserInfo(inputValues);
        profilePopup.close();
      })
      .catch(err => console.log(err))
      .finally(renderLoading(false, formBtn));
  },
  closeBtnSelector: '.form__close-btn'
});

//Элемент класса Попап Аватара
const avatarUpdatePopup = new PopupWithForm({
  popupSelector: '.modal_target_profile-avatar',
  formSubmitHandler: (inputValues, formBtn) => {
    renderLoading(true, formBtn);
    api.updateInformation({
        avatar: inputValues.pictureSource,
      }, 'users/me/avatar')
      .catch(err => console.log(err))
      .finally(renderLoading(false, formBtn));
    avatarImage.src = inputValues.pictureSource;
    avatarUpdatePopup.close();
  },
  closeBtnSelector: '.form__close-btn'
});

//Подготовка и рендер всех карточек на страницу
const renderAllCards = (data, api) => {
  const newCardsSection = new Section({
      data,
      renderer: elem => {
        const newCard = createCard(
          elem, {
            cardIdSelector: '#listItem',
            handleCardClick: (titleImage, srcImage) => popupWithImage.open(titleImage, srcImage),
            handleTrashClick: _ => {
              popupDeleteCard.open();
            },
            popupConfirmClose: _ => {
              popupDeleteCard.close();
            },
            api: api
          });
        newCardsSection.addItem(newCard);
      }
    },
    '.elements__list');
  newCardsSection.renderElements();
};

//Подготовка и рендер одной карточки на страницу
renderCards
  .then(data => renderAllCards(data, api))
  .catch(err => console.log(err));

//Добавление карточки на страницу
const renderCard = (data, api) => {
  {
    const singleCard = new Section({
        data,
        renderer: elem => {
          const newCard = createCard(
            elem, {
              cardIdSelector: '#listItem',
              handleCardClick: (titleImage, srcImage) => {
                popupWithImage.open(titleImage, srcImage);
              },
              handleTrashClick: _ => {
                popupDeleteCard.open()
              },
              api: api
            });
          singleCard.addItem(newCard);
        }
      },
      '.elements__list');
    singleCard.renderOneElement();
    addCardPopup.close();
  }
}

//Форма добавления карточки на страницу
const addCardPopup = new PopupWithForm({
  popupSelector: '.modal_target_addCard',
  formSubmitHandler: (inputValues, formBtn) => {
    console.log(formBtn);
    renderLoading(true, formBtn);
    api.addNewInformation({
        name: inputValues.name,
        link: inputValues.link
      }, 'cards')
      .then(data => renderCard(data, api))
      .catch(err => console.log(err))
      .finally(renderLoading(false, formBtn));
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
popupDeleteCard.setEventListeners();