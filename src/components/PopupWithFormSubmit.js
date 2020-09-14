import Popup from './Popup.js';

export default class PopupWithFormSubmit extends Popup {
  constructor({
    popupSelector,
    handleOkRemove,
    closeBtnSelector
  }) {
    super(popupSelector, closeBtnSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleOkRemove = handleOkRemove;
    this._confirmButton = this._popup.querySelector('.confirm__confirm-btn');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', _ => this._handleOkRemove(this._confirmButton));
  }
}