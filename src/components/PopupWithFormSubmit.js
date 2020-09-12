import Popup from './Popup.js';

export default class PopupWithFormSubmit extends Popup {
  constructor(popupSelector, closeBtnSelector) {
    super(popupSelector, closeBtnSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    
  }
}