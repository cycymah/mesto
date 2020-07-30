//Модалки
const modalProfile = document.querySelector('.modal_target_profile'); //Модалка с профайлом
const modalCard = document.querySelector('.modal_target_addCard'); //Модалка с карточками
const modalZoom = document.querySelector('.modal_target_photoZoom'); //Модалка с увеличенными картинками

//Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn'); //Кнопка редактирования профайла
const profileCloseButton = document.querySelector('.form__close-btn_target_profile'); //Кнопка закрытия профала
const cardAddButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки 
const cardCloseButton = document.querySelector('.form__close-btn_target_add'); //Кнопка закрытия модалки с карточками
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
const list = document.querySelector('.elements__list'); //Список элементов
const zoomWindow = document.querySelector('.zoom'); //Раскрытая форма картинки
const zoomText = document.querySelector('.zoom__text-image');
const zoomImage = document.querySelector('.zoom__image');

//Массив карточек
const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Вид на горы вдали'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Лес в снегу и озеро'

  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Изображения домов'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Лысое поле с лишайником и большая гора вдали'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Железная дорога уходящая за горизонт'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Гора, у подножья заледеневшее озеро'
  }
];
//Template объект
const listTemplate = document.querySelector('#listItem').content;


function zoomPicture(targetPicture, targetTitle) {//
  targetPicture.addEventListener('click', (evt) => {
    zoomText.textContent = targetTitle.textContent;
    zoomImage.src = targetPicture.src;
    showZoom();
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

function renderCards(createPhotoCard) {
    return list.prepend(createPhotoCard);
}

//Добавление элементов в список
function addListItems(arr) {
  arr.forEach((elem) => {
    renderCards(createPhotoCard(elem.name, elem.link, elem.alt));
  });
};
addListItems(initialCards); //Вызов функции для создания карточек по массиву

//Открытие-закрытие модалок
function profileOpen() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  modalProfile.classList.remove('modal_animation_close');
  formProfile.classList.remove('modal_animation_close');
  modalProfile.classList.add('modal_activ');
};

function profileClose() {
  modalProfile.classList.add('modal_animation_close');
  formProfile.classList.add('modal_animation_close');
  modalProfile.classList.remove('modal_activ');
}

function addCardOpen() {
  modalCard.classList.add('modal_activ');
  formCardAdd.classList.remove('modal_animation_close');
  modalCard.classList.remove('modal_animation_close');
  inputTitle.value = '';
  inputSrc.value = '';
}

function addCardClose() {
  modalCard.classList.remove('modal_activ');
  modalCard.classList.add('modal_animation_close');
  formCardAdd.classList.add('modal_animation_close');
};

//Увеличение картинки
function showZoom() {
  modalZoom.classList.add('modal_activ');
  zoomWindow.classList.add('zoom_animation_activ');
  zoomWindow.classList.remove('zoom_animation_close');
};
//Закрытие уввеличенной картинки
function zoomClose() {
  zoomWindow.classList.add('zoom_animation_close');
  modalZoom.classList.remove('modal_activ');
}
//Закрытие с соханиением
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;
  profileClose();
}


function formSubmitCard(evt) {
  evt.preventDefault();
  renderCards(createPhotoCard(inputTitle.value, inputSrc.value, inputTitle.value));
  addCardClose();
};

//События
zoomCLoseButton.addEventListener('click', zoomClose); //Закрытие зум-картинки
formProfile.addEventListener('submit', formSubmitHandler); //Добавление инфы в профайл
profileEditButton.addEventListener('click', profileOpen); //Открытие формы профайла
profileCloseButton.addEventListener('click', profileClose); //Закрытие формы профайла
cardAddButton.addEventListener('click', addCardOpen); //Открытие формы добавления карточек
cardCloseButton.addEventListener('click', addCardClose); //Закрытие формы добавления карточек
formCardAdd.addEventListener('submit', formSubmitCard); //Добавление картинке по субмит
