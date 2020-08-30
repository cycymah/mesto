//Спасибо за ревью и труд! Печенек, радости и чтобы код радовал глаз!:)

import Card from './Card.js';
import {
  initialCards
} from './initial-cards.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';

//Параметры валидации
export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
  formInputError: '.form__input-error'
};

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

//Создание элемет класса для валидации формы
const validationProfileEnabler = new FormValidator('.form__section_target_profile', validationConfig);
const validationAddEnabler = new FormValidator('.form__section_target_add', validationConfig);

//Установка валидации
validationProfileEnabler.enableValidation();
validationAddEnabler.enableValidation();

//Открытие/закрытие попапов 
const profilePopup = new PopupWithForm({
  popupSelector: '.modal_target_profile',
  formSubmitHandler: _ => {
    console.log('сработал профайл');
    profilePopup.close();
  }
});


//Создаем элемент класса
const newCardsSection = new Section({
    data: initialCards,
    renderer: elem => {
      const card = new Card(elem, '#listItem');
      const elementCard = card.generateCard();
      newCardsSection.addItem(elementCard);
    }
  },
  '.elements__list');

newCardsSection.renderElements();

//Форма добавления карточки на страницу
const addCardPopup = new PopupWithForm({
  popupSelector: '.modal_target_addCard',
  formSubmitHandler: _ => {
    console.log('Сработало добавление');
    const singleCard = new Section({
        data: {
          name: inputTitle.value,
          link: inputSrc.value,
          alt: inputTitle.value
        },
        renderer: elem => {
          console.log('Ренлерер!');
          const card = new Card(elem, '#listItem');
          const elementCard = card.generateCard();
          console.log(elementCard);
          singleCard.addItem(elementCard);
          
        }
      },
      '.elements__list');
      singleCard.renderOneElement();
    addCardPopup.close();
  }
});

profilePopup.setEventListeners();
addCardPopup.setEventListeners();


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
// profileName.textContent = inputProfile.value;
// profileAbout.textContent = inputAbout.value;
// };

const formSubmitCard = evt => {
  evt.preventDefault();
  list.prepend(createCard(inputTitle.value, inputSrc.value, inputTitle.value, '#listItem'));
  // popupClose(modalCard);
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
  profilePopup.open();
});

//Закрытие формы профайла
// profileCloseButton.addEventListener('click', _ => {
//   profilePopup.close();
// });

//Открытие формы добавления карточек
cardAddButton.addEventListener('click', _ => {
  inputTitle.value = '';
  inputSrc.value = '';
  validationAddEnabler.resetValidation();
  addCardPopup.open();
});

//Закрытие формы добавления карточек
// cardCloseButton.addEventListener('click', _ => {
//   popupClose(modalCard);
// });

//Закрытие формы с увеличенной картинкой
// modalCloseButton.addEventListener('click', _ => {
//   popupClose(modalZoom);
// })

//Слушатели сабмитов
// formCardAdd.addEventListener('submit', formSubmitCard);
// formProfile.addEventListener('submit', formSubmitHandler);