export default class Card {
  constructor({
      name,
      link,
      alt,
      _id,
      owner,
      likes
    },
    cardIdSelector,
    handleCardClick,
    handleTrashClick,
    handlePutLike,
    handleLikeDelete
  ) {
    this._name = name;
    this._src = link;
    this._alt = alt;
    this._id = _id;
    this._likes = likes;
    this._owner = owner.name;
    this._cardIdSelector = cardIdSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handlePutLike = handlePutLike;
    this._handleLikeDelete = handleLikeDelete;
    this._pageOwner = document.querySelector('.profile__title-name').textContent;
  }

  //Создаем template клон
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardIdSelector)
      .content
      .cloneNode(true);
    return cardElement;
  }

  //Проверям мои карточки
  _checkTrashToOwner() {
    if (this._owner !== this._pageOwner) {
      this._singleTrash.classList.add('elements__trash_display_none');
    }
  }

  //Вытягиваем количество уже проставленных лайков
  _likeCounterGet(likes) {
    if (!likes.length) {
      this._likeCounter.textContent = '';
    } else {
      this._likeCounter.textContent = likes.length;
    }
  }

  //проверка на мои лайки
  _likesOwnerCheck() {
    this._likes.some(item => {
      if (item.name === this._pageOwner) this._likeButton.classList.add('elements__like_active');
    });
  }
  

  //Функционал лайков
  _cardLikeToggle(evt) {
    const targetButton = evt.target;
    if (targetButton.classList.contains('elements__like_active')) {
      console.log(this._handleLikeDelete(this._id));
      this._handleLikeDelete(this._id).
      then(data => {
        targetButton.classList.remove('elements__like_active');
        this._likeCounterGet(data.likes);
      }).
      catch(err => console.log(err));
    } else {
      this._handlePutLike(this._id).
      then( data => {
        targetButton.classList.add('elements__like_active');
        this._likeCounterGet(data.likes);
      }).
      catch(err => console.log(err));
    }
  }

  //Слушатели для карточек
  _cardActionListeners(trash, likes, cardPicture) {
    trash.addEventListener('click', evt => this._handleTrashClick(evt));
    likes.addEventListener('click', evt => this._cardLikeToggle(evt));
    cardPicture.addEventListener('click', this._handleCardClick);
  }

  //Наполняем карточку
  generateCard() {
    this._card = this._getTemplate();
    this._singleTrash = this._card.querySelector('.elements__trash');
    this._likeButton = this._card.querySelector('.elements__like');
    this._imageTitle = this._card.querySelector('.elements__image-description');
    this._elementImage = this._card.querySelector('.elements__image');
    this._likeCounter = this._card.querySelector('.elements__like-counter');

    this._imageTitle.textContent = this._name;
    this._elementImage.src = this._src;
    this._elementImage.alt = this._alt;

    //Проверка на ужеотмеченные корзины и клики
    this._checkTrashToOwner();
    this._likesOwnerCheck();
    this._likeCounterGet(this._likes);
    this._cardActionListeners(this._singleTrash, this._likeButton, this._elementImage);
    return this._card;
  }
}