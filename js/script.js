//Модалки
const modalProfile = document.querySelector('.modal_target_profile'); //Модалка с профайлом
const modalCard = document.querySelector('.modal_target_addCard'); //Модалка с карточками
const modalZoom = document.querySelector('.modal_target_photoZoom'); //Модалка с увеличенными картинками
const modalOverlayAll = document.querySelectorAll('.modal__overlay');

const modalsList = document.querySelectorAll('.modal');


//Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn'); //Кнопка редактирования профайла
const profileCloseButton = document.querySelector('.form__close-btn_target_profile'); //Кнопка закрытия профала
const cardAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки 
const cardCloseButton = document.querySelector('.form__close-btn_target_add'); //Кнопка закрытия модалки с карточками
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
const list = document.querySelector('.elements__list'); //Список элементов
const zoomWindow = document.querySelector('.zoom'); //Раскрытая форма картинки
const zoomText = document.querySelector('.zoom__text-image');
const zoomImage = document.querySelector('.zoom__image');
const mainDocumentPage = document.querySelector('.page');

//Template объект
const listTemplate = document.querySelector('#listItem').content;


function zoomPicture(targetPicture, targetTitle) { //Открытие картинки в
  targetPicture.addEventListener('click', (evt) => {
    zoomText.textContent = targetTitle.textContent;
    zoomImage.src = targetPicture.src;
    toggleModals(modalZoom);
  });
};

function addCardListeners(trash, likes) {
  trash.addEventListener('click', (evt) => { //Слушаем клики
    const trashElem = trash.closest('.elements__item'); //Ищем ближайщий __item
    trashElem.remove(); //Удаляем карточку
  });

  likes.addEventListener('click', (evt) => {
    const trashElem = likes.closest('.elements__like');
    trashElem.classList.toggle('elements__like_active');
  });
}

const createPhotoCard = function createCard(titleImage, srcImage, altImage) {
  const listElement = listTemplate.cloneNode(true);
  const imageTitle = listElement.querySelector('.elements__image-description');
  const listImage = listElement.querySelector('.elements__image'); //Находим картинки
  const oneTrash = listElement.querySelector('.elements__trash'); //Находим корзинки
  const like = listElement.querySelector('.elements__like'); //находим лайки
  imageTitle.textContent = titleImage; //Записывае
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
addListItems(initialCards); //Вызов функции для создания карточек по массиву

function profileFillInformation() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

profileFillInformation();

//Открытие-закрытие модалок

function toggleModals(targetModal) {
  targetModal.classList.toggle('modal_animation_open');
  targetModal.classList.toggle('modal_activ');
}

//Закрытие с соханиением
function formSubmitHandler(evt) {
  evt.preventDefault();
  toggleModals(modalProfile);
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;

}

function formSubmitCard(evt) {
  evt.preventDefault();
  renderCards(createPhotoCard(inputTitle.value, inputSrc.value, inputTitle.value));
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

mainDocumentPage.addEventListener('keydown', (evt) => { //Закрытие модалок по Esc
  if (evt.key === 'Escape') {
    modalsList.forEach((modalElem) => {
      if (modalElem.classList.contains('modal_activ')) {
        toggleModals(modalElem);
      };
    });
  };
});

//Сбрасываем состояние валидации на 0
function resetValidation(modalName) {
  const validationTextField = Array.from(modalName.querySelectorAll('.form__input-error')); //Ищем поля с сообщением валидации
  const modalInput = Array.from(modalName.querySelectorAll('.form__input')); //Ищем инпуты внутри модалки
  const validationButton = modalName.querySelector('.form__submit-btn'); //Ищем субмиты

  validationTextField.forEach((tetxField) => { //Обнуляем текст сообщений валидации
    tetxField.textContent = "";
  })
  modalInput.forEach((input) => { //Обнуляем нижнее подчеркивание
    input.classList.remove('form__input_type_error');
  })
  validationButton.classList.remove('form__submit_btn_inactiv'); //Обнуляем неактивную кнопку
}

//События
//Закрытие зум-картинки
zoomCLoseButton.addEventListener('click', () => {
  toggleModals(modalZoom);
});

//Открытие формы профайла
profileEditButton.addEventListener('click', () => {

  profileFillInformation();
  toggleModals(modalProfile);
});

//Закрытие формы профайла
profileCloseButton.addEventListener('click', () => {
  toggleModals(modalProfile);
  resetValidation(modalProfile);
});

//Открытие формы добавления карточек
cardAddButton.addEventListener('click', () => {
  resetValidation(modalCard);
  toggleModals(modalCard);
  inputTitle.value = '';
  inputSrc.value = '';
});

//Закрытие формы добавления карточек
cardCloseButton.addEventListener('click', () => {
  toggleModals(modalCard);
});
formCardAdd.addEventListener('submit', formSubmitCard); //Добавление картинке по субмит
formProfile.addEventListener('submit', formSubmitHandler); //Добавление инфы в профайл