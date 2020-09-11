export default class UserInfo {
  constructor({profileName, profileAbout, profileAvatar}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
      const infoData = {
        name: this._profileName.textContent,
        about: this._profileAbout.textContent
      }
      return infoData;
  }

  setUserInfo(inputValues) {
    this._profileName.textContent = inputValues.name;
    this._profileAbout.textContent = inputValues.about;
    this._profileAvatar.src = inputValues.avatar;
  }
}