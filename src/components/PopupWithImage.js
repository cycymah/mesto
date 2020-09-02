import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, closeBtnSelector }) {
    super(popupSelector, closeBtnSelector);
    this._popupSelector = popupSelector;
    this._closeBtnSelector = closeBtnSelector;
    this._imageTitle = document.querySelector('.zoom__text-image');
    this._zoomImage = document.querySelector('.zoom__image');
  }

  open(titleImage, srcImage) {
    this._imageTitle.textContent = titleImage.textContent;
    this._zoomImage.src = srcImage.src;
    this._zoomImage.alt = srcImage.alt;
    super.open();
  }
}