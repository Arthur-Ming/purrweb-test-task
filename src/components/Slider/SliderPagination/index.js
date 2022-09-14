import { createElement, emit } from '../../../utils/domHelpers';
import { SLIDER_DOT_CLICK } from '../../../constans';

const template = () => `<ul class="slider-pagination"></ul>`;

const activeDotClass = 'slider-pagination__dot--active';

export default class SliderPagination {
  element = null;
  slidesCount = 0;
  dotElems = [];
  activeDotIndex = 0;

  onClick = (event) => {
    const target = event.target.closest('[data-slider-dot-index]');
    if (target) {
      const newActiveDotIndex = Number(target.dataset.sliderDotIndex);
      if (newActiveDotIndex === this.activeDotIndex) return;
      this.activeDotIndex = newActiveDotIndex;
      emit({
        event: SLIDER_DOT_CLICK,
        elem: this.element,
        payload: {
          sliderDotIndex: Number(this.activeDotIndex),
        },
      });
    }
  };

  constructor({ slidesCount, activeDotIndex = 0 } = {}) {
    this.slidesCount = slidesCount;
    this.activeDotIndex = activeDotIndex;
  }

  render() {
    this.element = createElement(template());
    this.element.append(...this.getDotElems());
    this.initEventListeners();
    return this.element;
  }

  getDotElems() {
    this.dotElems = [...Array(this.slidesCount)].map((_, index) =>
      createElement(`
      <button class="slider-pagination__button${
        index === this.activeDotIndex ? ` ${activeDotClass}` : ''
      }"   data-slider-dot-index=${index}>
        <span class="slider-pagination__dot"></span>
      </button>
      `)
    );

    return this.dotElems;
  }

  setActiveDot = (dotIndex) => {
    console.log(dotIndex);
    this.activeDotIndex = dotIndex;
    this.dotElems.forEach((dot) => {
      dot.classList.contains(activeDotClass) && dot.classList.remove(activeDotClass);
    });
    this.dotElems[dotIndex].classList.add(activeDotClass);
  };

  initEventListeners() {
    this.element && this.element.addEventListener('click', this.onClick);
  }
}
