import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({
    popupSelector,
    formSubmitHandler,
    closeBtnSelector
  }) {
    super(popupSelector, closeBtnSelector);
    this._popup = document.querySelector(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formInputs = Array.from(this._popup.querySelectorAll('.form__input'));
    this._formSection = this._popup.querySelector('.form__section');
  }

  //Получение значений инпутов
  _getInputValues() {
    this._inputValues = {};
    this._formInputs.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSection.addEventListener('submit', evt => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._formSubmitHandler(inputValues);
    });
  }

  close() {
    super.close();
    this._formInputs.forEach(input => {
      input.value = '';
    });
  }
}