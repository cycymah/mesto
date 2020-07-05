
const profileEdit = document.querySelector('.profile__edit-btn');
const formShow = document.querySelector('.modal');
const formClose = document.querySelector('.form__close-btn');
const profileName = document.querySelector('.profile__title-name');
const inputProfile = document.querySelector('.form__input_name');
const profileAbout = document.querySelector('.profile__subtitle-name');
const inputAbout = document.querySelector('.form__input_about');



function modalOn() {
  inputProfile.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  formShow.classList.add('modal_activ');
};

function modalOff() {
  formShow.classList.remove('modal_activ');
};

profileEdit.addEventListener('click', modalOn);
formClose.addEventListener('click', modalOff);

// Находим форму в DOM
// Воспользуйтесь методом querySelector()

const formElement = document.querySelector('.form__section');

function formSubmitHandler (evt) {
    evt.preventDefault();

    let profileNameValue = inputProfile.value;
    let profileAboutValue = inputAbout.value;
    console.log(profileNameValue);
    
    // Выберите элементы, куда должны быть вставлены значения полей
    profileName.textContent = profileNameValue;
    profileAbout.textContent = profileAboutValue;

    // Вставьте новые значения с помощью textContent
    console.log('Form');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('submit', modalOff);