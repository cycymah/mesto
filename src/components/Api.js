const errorReturn = res => {
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
      .then(errorReturn)
      .catch(err => console.log(err));
  }

  addNewCard(data) {
    return fetch(this._serverUrl, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(errorReturn)
      .catch(err => console.log(err));
  }

  // removeCard(id) {
  //   return fetch(this._serverUrl, {
  //       method: "DELETE",
  //       headers: this._headers,
  //       body: JSON.stringify(data)
  //     })
  //     .then(errorReturn)
  //     .catch(err => console.log(err));
  // }
}