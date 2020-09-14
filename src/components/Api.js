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
      .then(errorCheck);
  }

  getPrifileInformation(profileUrl) {
    return fetch(`${this._serverUrl}/${profileUrl}`, {
        method: "GET",
        headers: this._headers
      })
      .then(errorCheck);
  }

  addNewInformation(data, urlCard) {
    return fetch(`${this._serverUrl}/${urlCard}`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorCheck);
  }

  updateInformation(data, url) {
    return fetch(`${this._serverUrl}/${url}`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorCheck);
  }
  updateProfileInformation() {
        return fetch(`${this._serverUrl}/${url}`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorCheck);
  }

  removeCard(id) {
    return fetch(`${this._serverUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(errorCheck);
  }

  putInformation(id) {
    return fetch(`${this._serverUrl}/${id}`, {
        method: "PUT",
        headers: this._headers,
      })
      .then(errorCheck);
  }

  putLike(id) {
    return fetch(`${this._serverUrl}/cards/likes/${id}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(errorCheck);
  }

  deleteLike(id) {
    return fetch(`${this._serverUrl}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(errorCheck);
  }
}