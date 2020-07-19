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

// Добавление карточки
function addCard(titleImage, srcImage, altImage) {
  const listElement = listTemplate.cloneNode(true);
  const listImage = listElement.querySelector('.elements__image');
  const RegExp = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;
  listElement.querySelector('.elements__image-description').textContent = titleImage;

  if (RegExp.test(srcImage)) {
    listImage.src = srcImage;
  } else {
    alert('Введите корректную ссылку!');
  }
  if (!altImage) {
    listImage.alt = titleImage;
  } else {
    listImage.alt = altImage;
  }
  list.prepend(listElement);
};

//Добавление элементов в список
function addListItems(arr) {
  for (let i = 0; i < arr.length; i++) {
    addCard(arr[i].name, arr[i].link, arr[i].alt);
  };
};
addListItems(initialCards); //Вызов функции для создания карточек по массиву

//Открытие-закрытие модалок
function profileOn() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  profileShow.classList.add('modal_activ');
};

function addCardOn() {
  addShow.classList.add('modal_activ');
  inputTitle.value = '';
  inputSrc.value = '';
}

function modalOff() {
  profileShow.classList.remove('modal_animation_close');
  addShow.classList.remove('modal_animation_close');
  addShow.classList.remove('modal_activ');
  profileShow.classList.remove('modal_activ');
  formAdd.classList.remove('modal_animation_close');
  formProfile.classList.remove('modal_animation_close');
};

//Затухание 
function closeModal() {
  profileShow.classList.add('modal_animation_close');
  formProfile.classList.add('modal_animation_close');
  addShow.classList.add('modal_animation_close');
  formAdd.classList.add('modal_animation_close');
  setTimeout(modalOff, 400);
}

// Лайки

function likeToggle(targetLike) {
  let likeElem = targetLike.closest('.elements__like');
  likeElem.classList.toggle('elements__like_active');
};

function likesAll() {                                                 //Находим все лайки
  const likeButtons = list.querySelectorAll('.elements__like');
  likeButtons.forEach((like) => {
    like.addEventListener('click', (evt) => {
      likeToggle(like);
      console.log(evt);
    });
  });
  console.log(likeButtons);
}
likesAll();

//Закрытие с соханиением
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;
  closeModal();
};

//Удаление элементов (корзина)
function oneTrashRemove(targetTrash) {
  const listElem = targetTrash.closest('.elements__item'); //Ищем ближайщий __item
  listElem.remove(); //Удаляем карточку
}

function trashAllItems() {
  const allTrash = list.querySelectorAll('.elements__trash'); //Все корзины
  allTrash.forEach((elem) => { //Для каждой отдельной корзины
    elem.addEventListener('click', (evt) => { //Слушаем клики
      oneTrashRemove(elem);
      console.log(evt);
    });
  });
};
trashAllItems(); //Вызываем функцию для всех существующих уже эл-тов

function formSubmitCard(evt) {
  evt.preventDefault();
  addCard(inputTitle.value, inputSrc.value);
  const oneLike = list.querySelector('.elements__like');  
  const oneTrash = list.querySelector('.elements__trash');
  oneLike.addEventListener('click', (evt) => {             //Подключаем лайки к добавленной карточке
    likeToggle(oneLike);
    console.log(evt);
  });
  oneTrash.addEventListener('click', (evt) => {           //Подключаем корзину к добавленной карточке
    oneTrashRemove(oneTrash);
  });
  trashAllItems();
  zoomPicture();
  closeModal();
};

//Увеличение картинки
function showModal() {
  zoomShow.classList.toggle('modal_activ');
  zoom.classList.remove('zoom_animation_close');
};

//Закрытие уввеличенной картинки
const zoomCLose = zoomShow.querySelector('.zoom__close-btn');

function zoomAnimation() {
  zoom.classList.add('zoom_animation_close');
  setTimeout(showModal, 400);
};

function zoomPicture() {
  const pictures = document.querySelectorAll('.elements__item-card');
  let zoomText = document.querySelector('.zoom__text-image');
  let zoomImage = document.querySelector('.zoom__image');

  pictures.forEach((elem) => {
    const elementPicture = elem.querySelector('.elements__image');
    const elementText = elem.querySelector('.elements__image-description');

    elementPicture.addEventListener('click', (evt) => {
      zoomText.textContent = elementText.textContent;
      zoomImage.src = elementPicture.src;
      showModal();
    });
  });
};
zoomPicture();

//Закрытие зум-фотки
zoomCLose.addEventListener('click', zoomAnimation);

//События
formProfile.addEventListener('submit', formSubmitHandler); //Добавление инфы в профайл
profileEdit.addEventListener('click', profileOn); //Открытие формы профайла
formClose.addEventListener('click', closeModal); //Закрытие формы профайла
addButton.addEventListener('click', addCardOn); //Открытие формы добавления карточек
formCloseAdd.addEventListener('click', closeModal); //Закрытие формы добавления карточек
formAdd.addEventListener('submit', formSubmitCard); //Добавление картинке по субмит

//Спасибо за труд! Чая кофе и печенек, много счастья тебе! Заранее прошу извинения, если код вызывает боль:) 