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

//Открытие-закрытие модалок
function toggleModals(targetModal) {
  targetModal.classList.toggle('modal_activ');
}

function zoomPicture(targetPicture, targetTitle) {
  targetPicture.addEventListener('click', (evt) => {
    zoomText.textContent = targetTitle.textContent;
    zoomImage.src = targetPicture.src;
    toggleModals(modalZoom);
  });
};

function addCardListeners(trash, likes) {
  trash.addEventListener('click', (evt) => {
    const trashElem = trash.closest('.elements__item');
    trashElem.remove();
  });

  likes.addEventListener('click', (evt) => {
    const trashElem = likes.closest('.elements__like');
    trashElem.classList.toggle('elements__like_active');
  });
}

const createPhotoCard = function createCard(titleImage, srcImage, altImage) {
  const listElement = listTemplate.cloneNode(true);
  const imageTitle = listElement.querySelector('.elements__image-description');
  const listImage = listElement.querySelector('.elements__image'); 
  const oneTrash = listElement.querySelector('.elements__trash'); 
  const like = listElement.querySelector('.elements__like'); 
  imageTitle.textContent = titleImage; 
  listImage.src = srcImage;
  listImage.alt = altImage;
  addCardListeners(oneTrash, like);
  zoomPicture(listImage, imageTitle);
  return listElement;
};

//рендер карточек
function renderCards(card) {
  return list.prepend(card);
}

//Добавление элементов в список
function addListItems(arr) {
  arr.forEach((elem) => {
    renderCards(createPhotoCard(elem.name, elem.link, elem.alt));
  });
};
addListItems(initialCards);

function profileFillInformation() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}
profileFillInformation();

//Закрытие с соханиением
function formSubmitHandler(evt) {
  evt.preventDefault();
  toggleModals(modalProfile);
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;
}

function formSubmitCard(evt) {
  evt.preventDefault();
  renderCards(createPhotoCard(inputTitle.value, inputSrc.value));
  toggleModals(modalCard);
};

function modalsCloseByOverlay(modalsList) { //Закрытие модалок кликом на оверлей
  modalsList.forEach((modal) => {
    const overlayElement = modal.querySelector('.modal__overlay');
    overlayElement.addEventListener('click', () => {
      toggleModals(modal);
    });
  });
};
modalsCloseByOverlay(modalsList);

//Закрытие модалок по Esc
mainDocumentPage.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    modalsList.forEach((modalElem) => {
      if (modalElem.classList.contains('modal_activ')) {
        toggleModals(modalElem);
      };
    });
  };
});

//Сбрасываем состояние валидации
function resetValidation(modalName, inactivButtonClass) {
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
zoomCLoseButton.addEventListener('click', () => {
  toggleModals(modalZoom);
});

//Открытие формы профайла
profileEditButton.addEventListener('click', () => {
  profileFillInformation();
  resetValidation(modalProfile, validationConfig.inactiveButtonClass);
  toggleModals(modalProfile);
});

//Закрытие формы профайла
profileCloseButton.addEventListener('click', () => {
  toggleModals(modalProfile);
});

//Открытие формы добавления карточек
cardAddButton.addEventListener('click', () => {
  toggleModals(modalCard);
  inputTitle.value = '';
  inputSrc.value = '';
  resetValidation(modalCard, validationConfig.inactiveButtonClass);
});

//Закрытие формы добавления карточек
cardCloseButton.addEventListener('click', () => {
  toggleModals(modalCard);
});
formCardAdd.addEventListener('submit', formSubmitCard);
formProfile.addEventListener('submit', formSubmitHandler);