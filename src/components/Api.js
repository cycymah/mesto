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

  getInitialData() {
    return fetch(this._serverUrl, {
        method: "GET",
        headers: this._headers
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }

  addNewInformation(data) {
    return fetch(this._serverUrl, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorCheck)
      .catch(err => consoe.log(err));
  }

  updateInformation(data) {
    return fetch(this._serverUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then(errorCheck)
    .catch(err => console.log(err));
  }

  removeCard(id) {
    return fetch(`${this._serverUrl}/${id}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then(errorCheck)
      .catch(err => console.log(err));
  }
}