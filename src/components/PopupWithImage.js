import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, closeBtnSelector }) {
    super(popupSelector, closeBtnSelector);
    this._popupSelector = popupSelector;
    this._closeBtnSelector = closeBtnSelector;
    this._imageTitle = document.querySelector('.zoom__text-image');
    this._zoomImage = document.querySelector('.zoom__image');
  }

  open(elem) {
    this._imageTitle.textContent = elem.name;
    this._zoomImage.src = elem.link;
    this._zoomImage.alt = elem.name;
    super.open();
  }
}