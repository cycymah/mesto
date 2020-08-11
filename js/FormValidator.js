class FormValidator {
  
  constructor(formSelector, data) {
    this._formSelector = formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._formInputError = data.formInputError;
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
  
  _findInvalidInput(inputList){
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleSubmitStatus (inputList, buttonElem) {
    if (this._findInvalidInput(inputList)) {
      buttonElem.classList.add(this._inactiveButtonClass);
      buttonElem.disabled = true;
    } else {
      buttonElem.classList.remove(this._inactiveButtonClass);
      buttonElem.disabled = false;
    }
  }
  
  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const submitBtnElem = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleSubmitStatus(inputList, submitBtnElem);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', _ => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitStatus(inputList, submitBtnElem);
      });
    });
  };

  // Сбрасываем декоративные состояния валидации
  resetValidation (modalName) {
  const validationTextField = Array.from(modalName.querySelectorAll(this._formInputError));
  const modalInput = Array.from(modalName.querySelectorAll(this._inputSelector));

  validationTextField.forEach(tetxField => {
    tetxField.textContent = "";
  })
  modalInput.forEach(input => {
    input.classList.remove(this._inputErrorClass);
  })
}

  enableValidation() {
      this._formElement = document.querySelector(this._formSelector);
      this._setEventListeners(this._formElement, this._data);
  }
}
export {FormValidator}