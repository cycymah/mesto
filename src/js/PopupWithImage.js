import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, closeBtnSelector }) {
    super(popupSelector, closeBtnSelector);
    this._popupSelector = popupSelector;
    this._closeBtnSelector = closeBtnSelector;
  }
  open(titleImage, srcImage) {
    document.querySelector('.zoom__text-image').textContent = titleImage.textContent;
    document.querySelector('.zoom__image').src = srcImage.src;
    super.open();
  }
}