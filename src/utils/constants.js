
//Кнопки
const profileEditButton = document.querySelector('.profile__edit-btn');
const cardAddButton = document.querySelector('.profile__add-button');
const profileAvatarButton = document.querySelector('.profile__edit-avatar-btn');

//Инпуты
const inputProfile = document.querySelector('.form__input_field_name');
const inputAbout = document.querySelector('.form__input_field_about');

//Форма картинки аватара 
const avatarImage = document.querySelector('.profile__avatar');

//Формы окна-сообщения об ошибках
const messageForm = document.querySelector('.loading');
const messageText = messageForm.querySelector('.loading__message');
export {profileEditButton, cardAddButton, inputProfile, inputAbout, profileAvatarButton, avatarImage, messageForm, messageText};