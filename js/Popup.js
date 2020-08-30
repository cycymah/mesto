export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector('.form__close-btn');
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
    this._closeBtn.addEventListener('click', _ => this.close());
  }
}


