export default class Api {
  constructor(options) {
    this._serverUrl = options.baseUrl;
    this._token = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(this._serverUrl, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(err));
  }
}