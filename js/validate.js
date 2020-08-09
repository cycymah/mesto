
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

const checkInputValidity = (formElement, inputElement, {inputErrorClass, errorClass}) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

const findInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const toggleSubmitStatus = (inputList, buttonElem, {inactiveButtonClass}) => {
  if (findInvalidInput(inputList)) {
    buttonElem.classList.add(inactiveButtonClass);
    buttonElem.disabled = true;
  } else {
    buttonElem.classList.remove(inactiveButtonClass);
    buttonElem.disabled = false;
  }
}

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => { //слушатели
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitBtnElem = formElement.querySelector(submitButtonSelector);

  toggleSubmitStatus(inputList, submitBtnElem, rest);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', _ => {
      checkInputValidity(formElement, inputElement, rest);
      toggleSubmitStatus(inputList, submitBtnElem, rest);
    });
  });
};

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
    const fieldSectionList = Array.from(formElement.querySelectorAll(formSelector));
    fieldSectionList.forEach((fieldSection) => {
      evt.preventDefault();
      setEventListeners(fieldSection, rest);
    })
  });
}
enableValidation(validationConfig);