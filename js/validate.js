const formErrorProfile = formProfile.querySelector('.form__input-error');
const formErrorAdd = formAdd.querySelector('.form__input-error');



const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //ищем нужный инпут
  inputElement.classList.add('form__input_type_error'); //Подсвечиваем бордер
  errorElement.textContent = errorMessage; //Наполняем содержимое validationMessage'ом
  errorElement.classList.add('form__input-error_active'); //Показываем сообщение
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
};

const checkInputValidity = (formElement, inputElement) => { //Проверяем валидность
  if (!inputElement.validity.valid) {//Если не валидно
    showInputError(formElement, inputElement, inputElement.validationMessage); //показываем сообщение
  } else {
    hideInputError(formElement, inputElement); //скрываем сообщение
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input')); //находим все инпуты
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);  //проверяем валидность инпутов
    });
  });
};

const enableValidation = () => {
  let formList = Array.from(document.querySelectorAll('.form__section')); //находим все формы на странице
  formList.forEach((formElement) => {
    setEventListeners(formElement); //Добавляем слушатели формам
});
}
enableValidation();