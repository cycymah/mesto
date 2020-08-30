import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open() {
    super.open();
    document.querySelector('.zoom__text-image').textContent = this._imageTitle.textContent;
    document.querySelector('.zoom__image').src = this._elementImage.src;
  }
}