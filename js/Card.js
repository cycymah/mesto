export class Card {
  constructor(titleImage, srcImage, altImage, cardIdSelector) {
    this._name = titleImage;
    this._src = srcImage;
    this._alt = altImage;
    this._cardIdSelector = cardIdSelector;
  }

  //Создаем template клон
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardIdSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  //Удаление карточки
  _cardRemoveByTrash(trash) {
    const trashElem = trash.closest('.elements__item');
    trashElem.remove();
  }

  //Функционал лайков
  _cardLikeToggle(evt) {
    evt.target.classList.toggle('elements__like_active');
  }

  //Закрытие попапа картинки
  _zoomModalClose() {
    document.querySelector('.modal_target_photoZoom').classList.remove('modal_active');
    document.removeEventListener('keydown', this._popupCloseByEsc.bind(this));
  }

  //Закрытие модалки по Esc
  _popupCloseByEsc(evt) {
    if (evt.key === 'Escape') {
        this._zoomModalClose();
    }
  }

  //Открытие попапа
  _zoomModalOpen() {
    document.querySelector('.modal_target_photoZoom').classList.add('modal_active');
    document.addEventListener('keydown', this._popupCloseByEsc.bind(this));
  }

  //Увеличение картинки по клику
  _cardZoomPicture() {
    document.querySelector('.zoom__text-image').textContent = this._imageTitle.textContent;
    document.querySelector('.zoom__image').src = this._elementImage.src;
    this._zoomModalOpen();
  }

  //Слушатели для карточек
  _cardActionListeners(trash, likes, cardPicture) {
    trash.addEventListener('click', _ => {
      this._cardRemoveByTrash(trash);
    })
    likes.addEventListener('click', evt => {
      this._cardLikeToggle(evt);
    })
    cardPicture.addEventListener('click', _ => {
      this._cardZoomPicture();
    })
  }

  //Наполняем карточку
  generateCard() {
    this._card = this._getTemplate();
    this._singleTrash = this._card.querySelector('.elements__trash');
    this._likeButton = this._card.querySelector('.elements__like');
    this._imageTitle = this._card.querySelector('.elements__image-description');
    this._elementImage = this._card.querySelector('.elements__image');

    this._imageTitle.textContent = this._name;
    this._elementImage.src = this._src;
    this._elementImage.alt = this._alt;

    this._cardActionListeners(this._singleTrash, this._likeButton, this._elementImage);
    return this._card;
  }
}