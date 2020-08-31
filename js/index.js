//Спасибо за ревью и труд! Печенек, радости и чтобы код радовал глаз!:)

import Card from './Card.js';
import {
  initialCards
} from './initial-cards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';


//Параметры валидации
export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  formInputError: '.form__input-error'
};

//Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const cardAddButton = document.querySelector('.profile__add-button');

//Инпуты
const inputProfile = document.querySelector('.form__input_field_name');
const inputAbout = document.querySelector('.form__input_field_about');

//Элемент класса для попапов с картинкой 
const popupWithImage = new PopupWithImage('.modal_target_photoZoom', '.zoom__close-btn');

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

//Открытие-закрытие профайла 
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
      const card = new Card(elem, '#listItem', (titleImage, srcImage) => {
        popupWithImage.open(titleImage, srcImage);
      });
      const elementCard = card.generateCard();
      newCardsSection.addItem(elementCard);
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
          const card = new Card(
            elem,
            '#listItem',
            (titleImage, srcImage) => {
              popupWithImage.open(titleImage, srcImage);
            }
          );
          const elementCard = card.generateCard();
          singleCard.addItem(elementCard);
        }
      },
      '.elements__list');
    singleCard.renderOneElement();
    addCardPopup.close();
  },
  closeBtnSelector: '.form__close-btn'
});

//Слушатели для попапов
// profilePopup.setEventListeners();
// addCardPopup.setEventListeners();


////Открытие-закрытие модалок
// const popupOpen = targetModal => {
//   targetModal.classList.add('modal_active');
//   mainDocumentPage.addEventListener('keydown', popupCloseEsc);
// };

// const popupClose = targetModal => {
//   targetModal.classList.remove('modal_active');
//   mainDocumentPage.removeEventListener('keydown', popupCloseEsc);
// };

//Закрытие попапа по Esc
// const popupCloseEsc = evt => {
//   if (evt.key === 'Escape') {
//     modalsList.forEach(modalElem => {
//       if (modalElem.classList.contains('modal_active')) {
//         popupClose(modalElem);
//       }
//     });
//   }
// };

// Подготовка карточки
// const createCard = (titleImage, srcImage, altImage, cardIdSelector) => {
//   const card = new Card(titleImage, srcImage, altImage, cardIdSelector);
//   return card.generateCard();
// };

// //Добавление карточек на страницу
// const addListItems = arr => {
//   arr.forEach(elem => {
//     list.append(createCard(elem.name, elem.link, elem.alt, '#listItem'));
//   });
// };
// addListItems(initialCards);

//Закрытие с соханиением
// const formSubmitHandler = evt => {
//   evt.preventDefault();
// popupClose(modalProfile);

// };

// const formSubmitCard = evt => {
//   evt.preventDefault();
//   list.prepend(createCard(inputTitle.value, inputSrc.value, inputTitle.value, '#listItem'));
// popupClose(modalCard);
// };

//Закрытие модалок кликом на оверлей
// const modalsCloseByOverlay = modalsList => {
//   modalsList.forEach(modal => {
//     const overlayElement = modal.querySelector('.modal__overlay');
//     overlayElement.addEventListener('click', _ => Popup.close());
//   });
// };
// modalsCloseByOverlay(modalsList);

//Открытие формы профайла
const profileOpen = _ => {
  const userInfoGet = userProfileInformation.getUserInfo();
  inputProfile.value = userInfoGet.name;
  inputAbout.value = userInfoGet.about;
  validationProfileEnabler.resetValidation();
  profilePopup.open();
}

const cardAddOpen = _ => {
  validationAddEnabler.resetValidation();
  addCardPopup.open();
}
//Открытие формы добавления карточек

profileEditButton.addEventListener('click', profileOpen);
cardAddButton.addEventListener('click', cardAddOpen);

//Закрытие формы профайла
// profileCloseButton.addEventListener('click', _ => {
//   profilePopup.close();
// });




//Закрытие формы добавления карточек
// cardCloseButton.addEventListener('click', _ => {
//   popupClose(modalCard);
// });

// Закрытие формы с увеличенной картинкой
// modalCloseButton.addEventListener('click', _ => {
//   popupWithImage.close();
// });

//Слушатели сабмитов
// formCardAdd.addEventListener('submit', formSubmitCard);
// formProfile.addEventListener('submit', formSubmitHandler);