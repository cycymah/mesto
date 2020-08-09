//Закрытие попапа по 
const popupCloseEsc = (evt) => {
  if (evt.key === 'Escape') {
    modalsList.forEach((modalElem) => {
      if (modalElem.classList.contains('modal_activ')) {
        popupClose(modalElem);
      };
    });
  };
}

const zoomPicture = (targetPicture, targetTitle) => {
  targetPicture.addEventListener('click', _ => {
    mainDocumentPage.addEventListener('keydown', popupCloseEsc);
    zoomText.textContent = targetTitle.textContent;
    zoomImage.src = targetPicture.src;
    popupOpen(modalZoom);
  });
};

const addCardListeners = (trash, likes) => {
  trash.addEventListener('click', _ => {
    const trashElem = trash.closest('.elements__item');
    trashElem.remove();
  });

  likes.addEventListener('click', _ => {
    const trashElem = likes.closest('.elements__like');
    trashElem.classList.toggle('elements__like_active');
  });
}

const createPhotoCard =  (titleImage, srcImage, altImage) => {
  const listElement = listTemplate.cloneNode(true);
  const imageTitle = listElement.querySelector('.elements__image-description');
  const listImage = listElement.querySelector('.elements__image');
  const oneTrash = listElement.querySelector('.elements__trash');
  const like = listElement.querySelector('.elements__like');
  imageTitle.textContent = titleImage;
  listImage.src = srcImage;
  listImage.alt = altImage;
  addCardListeners(oneTrash, like);
  zoomPicture(listImage, imageTitle);
  return listElement;
};

//рендер карточек
const renderCards = (card) => {
  return list.prepend(card);
}

//Добавление элементов в список
const addListItems = (arr) => {
  arr.forEach((elem) => {
    renderCards(createPhotoCard(elem.name, elem.link, elem.alt));
  });
};
addListItems(initialCards);

function profileFillInformation() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}
profileFillInformation();

//Закрытие с соханиением
const formSubmitHandler = (evt) => {
  evt.preventDefault();
  popupClose(modalProfile);
  profileName.textContent = inputProfile.value;
  profileAbout.textContent = inputAbout.value;
}

const formSubmitCard = (evt) => {
  evt.preventDefault();
  renderCards(createPhotoCard(inputTitle.value, inputSrc.value));
  popupClose(modalCard);
};

//Закрытие модалок кликом на оверлей
const modalsCloseByOverlay = (modalsList) => { 
  modalsList.forEach((modal) => {
    const overlayElement = modal.querySelector('.modal__overlay');
    overlayElement.addEventListener('click', _ => popupClose(modal));
  });
};
modalsCloseByOverlay(modalsList);

//Сбрасываем состояние валидации
const resetValidation = (modalName, inactivButtonClass) => {
  const validationTextField = Array.from(modalName.querySelectorAll('.form__input-error'));
  const modalInput = Array.from(modalName.querySelectorAll('.form__input'));
  const validationButton = modalName.querySelector('.form__submit-btn');

  validationTextField.forEach((tetxField) => {
    tetxField.textContent = "";
  })
  modalInput.forEach((input) => {
    input.classList.remove('form__input_type_error');
  })
  toggleSubmitStatus(modalInput, validationButton, inactivButtonClass);
}

//События
//Закрытие зум-картинки
zoomCLoseButton.addEventListener('click', _ => {
  popupClose(modalZoom);
  mainDocumentPage.removeEventListener('keydown', popupCloseEsc);
});

//Открытие формы профайла
profileEditButton.addEventListener('click', _ => {
  mainDocumentPage.addEventListener('keydown', popupCloseEsc);
  profileFillInformation();
  resetValidation(modalProfile, validationConfig);
  popupOpen(modalProfile);
});

//Закрытие формы профайла
profileCloseButton.addEventListener('click', _ => {
  popupClose(modalProfile);
  mainDocumentPage.removeEventListener('keydown', popupCloseEsc);
});

//Открытие формы добавления карточек
cardAddButton.addEventListener('click', _ => {
  mainDocumentPage.addEventListener('keydown', popupCloseEsc);
  popupOpen(modalCard);
  inputTitle.value = '';
  inputSrc.value = '';
  resetValidation(modalCard, validationConfig);
});

//Закрытие формы добавления карточек
cardCloseButton.addEventListener('click', _ => {
  popupClose(modalCard);
  mainDocumentPage.removeEventListener('keydown', popupCloseEsc);
});

formCardAdd.addEventListener('submit', formSubmitCard);
formProfile.addEventListener('submit', formSubmitHandler);