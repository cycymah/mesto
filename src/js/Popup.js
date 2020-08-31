export default class Popup {
  constructor(popupSelector, closeBtnSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector(closeBtnSelector);
    this._modal = this._popup.querySelector('.modal__overlay');
    this._handleCloseEsc = this._handleCloseEsc.bind(this);
  }

  close() {
    this._popup.classList.remove('modal_active');
    document.removeEventListener('keydown', this._handleCloseEsc);
  }

  open() {
    this._popup.classList.add('modal_active');
    document.addEventListener('keydown', this._handleCloseEsc);
  }

  _handleCloseEsc(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._modal.addEventListener('click', _ => this.close());
    this._closeBtn.addEventListener('click', _ => this.close());
  }
}