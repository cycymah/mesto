
//Модалки
const profileShow = document.querySelector('.modal_target_profile');        //Модалка с профайлом
const addShow = document.querySelector('.modal_target_addCard');            //Модалка с карточками
const zoomShow = document.querySelector('.modal_target_photoZoom');

//Кнопки
const profileEdit = document.querySelector('.profile__edit-btn');           //Кнопка редактирования профайла
const formClose = document.querySelector('.form__close-btn_target_profile');//Кнопка закрытия профала
const addButton = document.querySelector('.profile__add-button');           //Кнопка добавления карточки 
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
const list = document.querySelector('.elements__list');                     //Список элементов


//Массив карточек
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
//Template объект
const listTemplate = document.querySelector('#listItem').content;

//Добавление элементов в список
function addListItems (arr, blockUl) {
  for (let i = 0; i < arr.length; i++) {
    const listElement = listTemplate.cloneNode(true);  
    listElement.querySelector('.elements__image-description').textContent = arr[i].name;
    listElement.querySelector('.elements__image').src = arr[i].link;
    blockUl.append(listElement);
  };
};

addListItems(initialCards, list);        //Вызов функции для создания карточек по массиву

//Увеличение картинки
function showModal(target) {
  target.classList.toggle('modal_activ');
}

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
      showModal(zoomShow);
    });
  });
};

zoomPicture();


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
  addShow.classList.remove('modal_activ');
  profileShow.classList.remove('modal_activ');
};


// Лайки
function likesAll() {
  const likeButtons = document.querySelectorAll('.elements__like');

  likeButtons.forEach((like) => {
    like.addEventListener('click', (evt) => {
      like.classList.toggle('elements__like_active');
    })
  })
};

likesAll();
//Удаление элементов (корзина)
function trashAllItems(){
  const allTrash = document.querySelectorAll('.elements__trash'); //Все корзины
  allTrash.forEach((elem) => {                                      //Для каждой отдельной корзины
  elem.addEventListener('click', () => {                          //Слушаем клики
    const listElem = elem.closest('.elements__item');             //Ищем ближайщий __item
    listElem.remove();                                            //Удаляем карточку
    })
  });
};
trashAllItems();                                                  //Вызываем функцию для всех существующих уже эл-тов

// Добавление карточки
function addCard (titleImage, srcImage) {
  const listElement = listTemplate.cloneNode(true);  
  listElement.querySelector('.elements__image-description').textContent = titleImage;
  listElement.querySelector('.elements__image').src = srcImage;
  list.prepend(listElement);
};

function formSubmitCard (evt) {
  evt.preventDefault();
  addCard(inputTitle.value, inputSrc.value);
  modalOff();
  trashAllItems();
  likesAll();
  zoomPicture()
};

//Закрытие с соханиением
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputProfile.value;;
    profileAbout.textContent = inputAbout.value;;
    modalOff();
};
//Закрытие зум-фотки

const zoomCLose = zoomShow.querySelector('.zoom__close-btn');
zoomCLose.addEventListener('click', (evt) => {
  showModal(zoomShow);
  console.log(evt);
});

//События
formProfile.addEventListener('submit', formSubmitHandler);  //Добавление инфы в профайл
profileEdit.addEventListener('click', profileOn);           //Открытие формы профайла
formClose.addEventListener('click', modalOff);              //Закрытие формы профайла
addButton.addEventListener('click', addCardOn);             //Открытие формы добавления карточек
formCloseAdd.addEventListener('click', modalOff);           //Закрытие формы добавления карточек
formAdd.addEventListener('submit', formSubmitCard);         //Добавление картинке по субмит

