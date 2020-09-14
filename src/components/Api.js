const errorCheck = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
  constructor(options) {
    this._serverUrl = options.url;
    this._headers = options.headers;
  }

  getInitialCards(cardsUrl) {
    return fetch(`${this._serverUrl}/${cardsUrl}`, {
        method: "GET",
        headers: this._headers
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }

  getPrifileInformation(profileUrl) {
    return fetch(`${this._serverUrl}/${profileUrl}`, {
        method: "GET",
        headers: this._headers
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }

  addNewInformation(data, urlCard) {
    return fetch(`${this._serverUrl}/${urlCard}`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorCheck)
      .catch(err => consoe.log(err));
  }

  updateInformation(data, url) {
    return fetch(`${this._serverUrl}/${url}`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }
  updateProfileInformation() {
        return fetch(`${this._serverUrl}/${url}`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }
  
  removeCard(id) {
    return fetch(`${this._serverUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }

  putInformation(id) {
    return fetch(`${this._serverUrl}/${id}`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }

  putLike(id) {
    return fetch(`${this._serverUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(errorCheck)
    .catch(err => console.log(err));
  }

  deleteLike(id) {
    return fetch(`${this._serverUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(errorCheck)
    .catch(err => console.log(err));
  }
}