export default class Section {
  constructor({
    data,
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._renderItems = data;
    this._container = document.querySelector(containerSelector);
    
  }

  //Позиция рендеринга карточек
  addItem(newCard) {
    if (!Array.isArray(this._renderItems)) {
      this._container.prepend(newCard);
    } else {
      this._container.append(newCard);
    }
  }

  renderElements() {
    this._renderItems.forEach(elem => {
      this._renderer(elem);
    });
  }

  renderOneElement() {
    this._renderer(this._renderItems);
  }
}