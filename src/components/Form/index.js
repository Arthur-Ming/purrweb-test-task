import { createElement } from '../../utils/domHelpers';

const template = () => `
<form class="form">
  <input class="form__input" placeholder="Name" name="name" type="text">
  <input class="form__input" placeholder="Venue Name" name="venueName" type="text">
  <input class="form__input form__input--short" placeholder="Venue City" name="venueCity" type="text">
  <input class="form__input form__input--short" placeholder="State City" name="stateCity" type="text">
  <input class="form__input" placeholder="Email" type="email" name="email">
  <input class="form__input" placeholder="Subject" type="text" name="subject">
  <textarea class="form__input form__textarea" placeholder="Message" type="textarea"
    placeholder="Message" name="message"></textarea>
  <button type="submit" name="submit" class="form__submit">Send</button>
</form>`;

const errorClass = 'form__input--error';

const errorTypes = {
  noValue: 'noValue',
};

const inputs = {
  name: {
    required: true,
  },
  venueName: {
    required: true,
  },
  venueCity: {
    required: true,
  },
  stateCity: {
    required: true,
  },
  email: {
    required: true,
  },
  subject: {
    required: true,
  },
  message: {
    required: true,
  },
};

export default class Form {
  element;
  inputs;
  submitButton;
  inputErrors = {}; //{ [key: inputName]: errorType | null }

  onSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    this.checkForm();
    if (!this.isFormOk()) {
      this.submitButton && (this.submitButton.disabled = true);
      return;
    }

    console.log('all ok!');
  };

  onInput = (event) => {
    const target = event.target;
    if (target) {
      target.classList.contains(errorClass) && target.classList.remove(errorClass);
    }
    this.submitButton && (this.submitButton.disabled = false);
  };

  render() {
    this.element = createElement(template());
    this.initSubElements();
    this.initEventListeners();
    return this.element;
  }

  initSubElements() {
    this.inputs = this.element.elements;
    this.submitButton = this.element.elements.submit;
  }

  checkForm = () =>
    Object.entries(inputs).forEach(([inputName, options]) => {
      this.inputErrors[inputName] = null;
      const value = this.inputs[inputName].value.trim();
      if (options.required && !value) {
        this.inputs[inputName].classList.add(errorClass);
        this.inputErrors[inputName] = errorTypes.noValue;
      }
    });

  isFormOk = () => Object.values(this.inputErrors).every((error) => error === null);

  initEventListeners() {
    this.element && this.element.addEventListener('submit', this.onSubmit);
    this.element && this.element.addEventListener('input', this.onInput);
  }
}
