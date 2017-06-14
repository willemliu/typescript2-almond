export default class Offset {
  private el: Element = document.querySelector('#offset');
  constructor() {
    console.debug('Initialized offset');
  }
  
  setText(text) {
    this.el.textContent = text;
  }
}