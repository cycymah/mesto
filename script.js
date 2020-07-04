
const profileEdit = document.querySelector('.profile__edit-btn');
const formShow = document.querySelector('.modal');
const formClose = document.querySelector('.form__close-btn');

function modalOn() {
  let profileName = document.querySelector('.profile__title-name');
  let inputProfile = document.querySelector('.form__input_name');
  let profileAbout = document.querySelector('.profile__subtitle-name');
  let inputAbout = document.querySelector('.form__input_about');

  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formShow.classList.add('modal_activ');

};


function modalOff() {
  formShow.classList.remove('modal_activ');
};

profileEdit.addEventListener('click', modalOn);
formClose.addEventListener('click', modalOff);
// // Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formSubmitHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                         // Так мы можем определить свою логику отправки.
//                         // О том, как это делать, расскажем позже.

//     // Находим поля формы в DOM
//     let nameInput = // Воспользуйтесь инструментом .querySelector()
//     let jobInput = // Воспользуйтесь инструментом .querySelector()

//     // Получите значение полей из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);