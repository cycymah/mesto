export default class UserInfo {
  constructor({profileName, profileAbout}) {
    this._profileName = document.querySelector(profileName);
    this._profileAbout = document.querySelector(profileAbout);
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
  }
}