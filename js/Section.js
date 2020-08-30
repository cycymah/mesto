export default class Section {
  constructor({
    data,
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._renderItems = data;
    this._container = document.querySelector(containerSelector);
  }

  addItem(newCard) {
    this._container.prepend(newCard);
  }

  renderElements() {
    this._renderItems.forEach(elem => {
      this._renderer(elem);
    });
  }

  renderOneElement() {
    console.log(this._renderItems);
    this._renderer(this._renderItems);
  }
}