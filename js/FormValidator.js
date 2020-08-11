//Параметры валидации
const validationConfig = {
  inputSelector: '.form__input', 
  submitButtonSelector: '.form__submit-btn', 
  inactiveButtonClass: 'form__submit_btn_inactiv',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

class FormValidator {
  constructor(formSelector, data) {
    this._formSelector = formSelector;
    this._data = data;
  }

  _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  
  _hideInputError(formElement, inputElement, inputErrorClass, errorClass){
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
  };
  
  _checkInputValidity(formElement, inputElement, {inputErrorClass, errorClass}){
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
      this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
  };
  
  _findInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleSubmitStatus (inputList, buttonElem, {inactiveButtonClass}) {
    if (this._findInvalidInput(inputList)) {
      buttonElem.classList.add(inactiveButtonClass);
      buttonElem.disabled = true;
    } else {
      buttonElem.classList.remove(inactiveButtonClass);
      buttonElem.disabled = false;
    }
  }
  
  _setEventListeners (formElement, {inputSelector, submitButtonSelector, ...rest}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitBtnElem = formElement.querySelector(submitButtonSelector);
  
    this._toggleSubmitStatus(inputList, submitBtnElem, rest);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', _ => {
        this._checkInputValidity(formElement, inputElement, rest);
        this._toggleSubmitStatus(inputList, submitBtnElem, rest);
      });
    });
  };

  enableValidation() {
      const formSelector = document.querySelector(this._formSelector);
      this._setEventListeners(formSelector, this._data);
  }
}
export {validationConfig, FormValidator}