const elementsObject = {
  formSelector: '.form__section',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => { //показываем сообщение об ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); //ищем нужный инпут
  inputElement.classList.add(inputErrorClass); //Подсвечиваем бордер
  errorElement.textContent = errorMessage; //Наполняем содержимое validationMessage'ом
  errorElement.classList.add(errorClass); //Показываем сообщение
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { //Скрываем сообщения об ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => { //Проверяем валидность инпутов
  if (!inputElement.validity.valid) {//Если не валидно
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass); //показываем сообщение
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass); //скрываем сообщение
  }
};

function findInvalidInput(inputList) { //Проверяет есть ли хоть один невалидный инпут
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
  }

function toggleSubmitStatus(inputList, buttonElem, inactiveButtonClass) { //Переключаем кнопку из активного в неактивное
  if (findInvalidInput(inputList)) {
    buttonElem.classList.add(inactiveButtonClass);
    buttonElem.disabled = true;
  } else {
    buttonElem.classList.remove(inactiveButtonClass); 
    buttonElem.disabled = false;
  }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {//слушатели
  const inputList = Array.from(formElement.querySelectorAll(inputSelector)); //находим все инпуты
  const submitBtnElem = formElement.querySelector(submitButtonSelector);

  toggleSubmitStatus(inputList, submitBtnElem, inactiveButtonClass); //Переключаем кнопку до проверки

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);  //проверяем валидность инпутов
      toggleSubmitStatus(inputList, submitBtnElem, inactiveButtonClass);
    });
  });
};

function validationActiv({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  let formList = Array.from(document.querySelectorAll(formSelector)); //находим все формы на странице
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass); //Добавляем слушатели формам
    const fieldSectionList = Array.from(formElement.querySelectorAll(formSelector));
    fieldSectionList.forEach((fieldSection) => {
      evt.preventDefault();
      setEventListeners(fieldSection, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    })
  });
}
validationActiv(elementsObject); //Запускаем все проверки

//Спасибо за ревью! Счастья, добра, печенек и всего самого лучшего:)