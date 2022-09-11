import { createElement, getSubElements } from '../../utils/domHelpers';

const template = () => `
<div class="cookies-notification cookies-notification--hidden">
  <div class="cookies-notification__box wrapper__box">
    <p class="cookies-notification__text">
      We use cookie to improve your experience on our site. By using our site
      you consent cookies. </p>
    <button class="cookies-notification__button" data-element="cookiesNotificationButton">Ok</button>
  </div>
</div>`;

export default class CookiesNotification {
  element = null;
  subElements = null;

  onButtonClick = () => {
    this.element && this.element.classList.add('cookies-notification--hidden');
  };

  render() {
    this.element = createElement(template());
    this.subElements = getSubElements(this.element);
    this.initEventListeners();
    setTimeout(() => {
      this.element && this.element.classList.remove('cookies-notification--hidden');
    }, 0);
    return this.element;
  }

  initEventListeners() {
    this.subElements.cookiesNotificationButton &&
      this.subElements.cookiesNotificationButton.addEventListener('click', this.onButtonClick);
  }
}
