
//Модалки
const profileShow = document.querySelector('.modal_target_profile');        //Модалка с профайлом
const addShow = document.querySelector('.modal_target_addCard');            //Модалка с карточками

//Кнопки
const profileEdit = document.querySelector('.profile__edit-btn');           //Кнопка редактирования профайла
const formClose = document.querySelector('.form__close-btn_target_profile');//Кнопка закрытия профала
const addButton = document.querySelector('.profile__add-button');           //Кнопка добавления карточки 
const formCloseAdd = document.querySelector('.form__close-btn_target_add'); //Кнопка закрытия модалки с карточками

//Текстовый контент
const profileName = document.querySelector('.profile__title-name');         
const profileAbout = document.querySelector('.profile__subtitle-name');

//Формы
const formElement = document.querySelector('.form__section');

//Инпуты
const inputProfile = document.querySelector('.form__input_field_name');
const inputAbout = document.querySelector('.form__input_field_about');

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

// function addListCard () {
//     for (let i = 0; i < initialCards.length; i++) {
//       list.append(listElement);
      
//   }
// }
// window.onload = function () {
//   list.append(listElement);
// }

//Добавление элементов в список

function addListItem () {
  const listTemplate = document.querySelector('#listItem').content;
  for (let i = 0; i < initialCards.length; i++) {
    const listElement = listTemplate.cloneNode(true);  
    list.append(listElement);
  }
};

window.onload = addListItem();

//Открытие-закрытие модалок
function profileOn() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  profileShow.classList.add('modal_activ');
};

function addCardOn() {
  addShow.classList.add('modal_activ');
}

function modalOff() {
  addShow.classList.remove('modal_activ');
  profileShow.classList.remove('modal_activ');
};

//Удаление элементов (корзина)
const trashButton = document.querySelector('.elements__trash');             //Корзина

function itemTrash(evt) {
  const listItem = trashButton.closest('.elements__item');
  listItem.remove();
  console.log('!!!');
}

//Закрытие с соханиением
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputProfile.value;;
    profileAbout.textContent = inputAbout.value;;
    modalOff();
}

//События
formElement.addEventListener('submit', formSubmitHandler);  //Добавление инфы в профайл
profileEdit.addEventListener('click', profileOn);           //Открытие формы профайла
addButton.addEventListener('click', addCardOn);             //Открытие формы добавления карточек
formClose.addEventListener('click', modalOff);              //Закрытие формы профайла
formCloseAdd.addEventListener('click', modalOff);           //Закрытие формы добавления карточек
trashButton.addEventListener('click', itemTrash(evt));      //Удаление в корзину

//При загрузке страницы
