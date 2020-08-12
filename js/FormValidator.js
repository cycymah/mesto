export default class FormValidator {

  constructor(formSelector, data) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formInputError = data.formInputError;
    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(data.inputSelector));
    this._submitBtnElem = this._formElement.querySelector(data.submitButtonSelector);
    this._validationTextFields = Array.from(this._formElement.querySelectorAll(data.formInputError));
    this._modalInputs = Array.from(this._formElement.querySelectorAll(data.inputSelector));
  }

  _showInputError(inputElement, errorMessage){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError(inputElement){
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  };
  
  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _findInvalidInput(){
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleSubmitStatus () {
    if (this._findInvalidInput()) {
      this._submitBtnElem.classList.add(this._inactiveButtonClass);
      this._submitBtnElem.disabled = true;
    } else {
      this._submitBtnElem.classList.remove(this._inactiveButtonClass);
      this._submitBtnElem.disabled = false;
    }
  }
  
  _setEventListeners () {
    this._toggleSubmitStatus();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', _ => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitStatus();
      });
    });
  };

  // Сбрасываем декоративные состояния валидации
  resetValidation () {
  this._validationTextFields.forEach(tetxField => {
    tetxField.textContent = "";
  })
  this._modalInputs.forEach(input => {
    input.classList.remove(this._inputErrorClass);
  })
}

  enableValidation() {
      this._setEventListeners(this._formElement, this._data);
  }
}
