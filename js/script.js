//Модалки
const profileShow = document.querySelector('.modal_target_profile'); //Модалка с профайлом
const addShow = document.querySelector('.modal_target_addCard'); //Модалка с карточками
const zoomShow = document.querySelector('.modal_target_photoZoom'); //Модалка с увеличенными картинками

//Кнопки
const profileEdit = document.querySelector('.profile__edit-btn'); //Кнопка редактирования профайла
const formClose = document.querySelector('.form__close-btn_target_profile'); //Кнопка закрытия профала
const addButton = document.querySelector('.profile__add-button'); //Кнопка добавления карточки 
const formCloseAdd = document.querySelector('.form__close-btn_target_add'); //Кнопка закрытия модалки с карточками

//Добавляемый контент
const profileName = document.querySelector('.profile__title-name');
const profileAbout = document.querySelector('.profile__subtitle-name');

//Формы
const formProfile = document.querySelector('.form__section_target_profile');
const formAdd = document.querySelector('.form__section_target_add');

//Инпуты
const inputProfile = document.querySelector('.form__input_field_name');
const inputAbout = document.querySelector('.form__input_field_about');
const inputTitle = document.querySelector('.form__input_field_title');
const inputSrc = document.querySelector('.form__input_field_src');

//Отдельные блоки
const list = document.querySelector('.elements__list'); //Список элементов
const zoom = document.querySelector('.zoom'); //Раскрытая форма картинки
const zoomCLose = zoom.querySelector('.zoom__close-btn');
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


function zoomPicture(targetPicture, targetTitle) {
  targetPicture.addEventListener('click', (evt) => {
    zoomText.textContent = targetTitle.textContent;
    zoomImage.src = targetPicture.src;
    console.log(targetPicture);
    showZoom();
  });
};

function addListeners(trash, likes) {
  trash.addEventListener('click', (evt) => { //Слушаем клики
    const trashElem = trash.closest('.elements__item'); //Ищем ближайщий __item
    trashElem.remove(); //Удаляем карточку
  });

  likes.addEventListener('click', (evt) => {
    const trashElem = likes.closest('.elements__like');
    trashElem.classList.toggle('elements__like_active');
  });
}

const card = function createCard(titleImage, srcImage, altImage) {
  const listElement = listTemplate.cloneNode(true);
  const imageTitle = listElement.querySelector('.elements__image-description');
  const listImage = listElement.querySelector('.elements__image'); //Находим картинки
  const oneTrash = listElement.querySelector('.elements__trash'); //Находим корзинки
  const like = listElement.querySelector('.elements__like'); //находим лайки
  const RegExp = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

  if (RegExp.test(srcImage)) { // проверяем валидность ссылки
    imageTitle.textContent = titleImage; //Записывае
    listImage.src = srcImage;
    listImage.alt = altImage;
    addListeners(oneTrash, like);
    zoomPicture(listImage, imageTitle);
    return listElement;
  } else {
    alert('Введите корректную ссылку!');
  }
};

function renderCards(card) {
  list.prepend(card);
}

//Добавление элементов в список
function addListItems(arr) {
  arr.forEach((elem) => {
    renderCards(card(elem.name, elem.link, elem.alt));
  });
};
addListItems(initialCards); //Вызов функции для создания карточек по массиву

//Открытие-закрытие модалок
function profileOn() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  profileShow.classList.remove('modal_animation_close');
  formProfile.classList.remove('modal_animation_close');
  profileShow.classList.add('modal_activ');
};

function addCardOn() {
  addShow.classList.add('modal_activ');
  formAdd.classList.remove('modal_animation_close');
  addShow.classList.remove('modal_animation_close');
  inputTitle.value = '';
  inputSrc.value = '';
}
//Закрытие профайла
function profileOff() {
  profileShow.classList.add('modal_animation_close');
  formProfile.classList.add('modal_animation_close');
  profileShow.classList.remove('modal_activ');
}

function addOff() {

  addShow.classList.remove('modal_activ');

  addShow.classList.add('modal_animation_close');
  formAdd.classList.add('modal_animation_close');
};

//Увеличение картинки
function showZoom() {
  zoomShow.classList.add('modal_activ');
  zoom.classList.add('zoom_animation_activ');
  zoom.classList.remove('zoom_animation_close');
};
//Закрытие уввеличенной картинки
function zoomOff() {
  zoom.classList.add('zoom_animation_close');
  zoomShow.classList.remove('modal_activ');
}
//Закрытие с соханиением
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;
  profileOff();
};


function formSubmitCard(evt) {
  evt.preventDefault();
  renderCards(card(inputTitle.value, inputSrc.value));
  addOff();
};

//События
zoomCLose.addEventListener('click', zoomOff); //Закрытие зум-картинки
formProfile.addEventListener('submit', formSubmitHandler); //Добавление инфы в профайл
profileEdit.addEventListener('click', profileOn); //Открытие формы профайла
formClose.addEventListener('click', profileOff); //Закрытие формы профайла
addButton.addEventListener('click', addCardOn); //Открытие формы добавления карточек
formCloseAdd.addEventListener('click', addOff); //Закрытие формы добавления карточек
formAdd.addEventListener('submit', formSubmitCard); //Добавление картинке по субмит

//Спасибо за труд! Чая кофе и печенек, много счастья тебе! Заранее прошу извинения, если код вызывает боль:) 