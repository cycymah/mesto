const validationConfig = {
  formSelector: '.form__section',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

function findInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleSubmitStatus(inputList, buttonElem, inactiveButtonClass) {
  if (findInvalidInput(inputList)) {
    buttonElem.classList.add(inactiveButtonClass);
    buttonElem.disabled = true;
  } else {
    buttonElem.classList.remove(inactiveButtonClass);
    buttonElem.disabled = false;
  }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => { //слушатели
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitBtnElem = formElement.querySelector(submitButtonSelector);

  toggleSubmitStatus(inputList, submitBtnElem, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', _ => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleSubmitStatus(inputList, submitBtnElem, inactiveButtonClass);
    });
  });
};

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    const fieldSectionList = Array.from(formElement.querySelectorAll(formSelector));
    fieldSectionList.forEach((fieldSection) => {
      evt.preventDefault();
      setEventListeners(fieldSection, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    })
  });
}
enableValidation(validationConfig);