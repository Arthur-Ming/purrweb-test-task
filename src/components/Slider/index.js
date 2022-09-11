import SliderTrack from './SliderTrack';
import SliderPagination from './SliderPagination';
import { createElement, getSubElements } from '../../utils/domHelpers';
import { SLIDER_DOT_CLICK, SLIDER_ANIMATION, START, END } from '../../constans';

const template = () => {
  return `
<div class="slider__box">
  <div class="slider__content" data-element="sliderTrack"></div>
  <button class="slider__arrow-btn slider__arrow-btn--left" data-element="buttonPrev">
    <svg class="slider__arrow-icon" viewBox="0 0 21 36">
      <use xlink:href="assets/svg/sprite.svg#arrow-left"></use>
    </svg>
  </button>
  <button class="slider__arrow-btn slider__arrow-btn--right" data-element="buttonNext">
    <svg class="slider__arrow-icon" viewBox="0 0 21 36">
      <use xlink:href="assets/svg/sprite.svg#arrow-right"></use>
    </svg>
  </button>
 <div class="slider__pagination" data-element="sliderPagination"></div>
</div>
    `;
};

export default class Slider {
  element = null;
  subElements = null;
  components = {};
  slides = [];
  activeSlideIndex = 0;
  delay; /* Boolean */
  isTrackAnimated = false;

  onButtonPrevClick = () => {
    if (this.isTrackAnimated) return;
    this.activeSlideIndex -= 1;
    this.syncSubcomponents();
  };

  onButtonNextClick = () => {
    if (this.isTrackAnimated) return;
    this.activeSlideIndex += 1;
    this.syncSubcomponents();
  };

  onDotClick = (event) => {
    if (this.isTrackAnimated) return;
    this.activeSlideIndex = Number(event.detail.sliderDotIndex);
    this.syncSubcomponents();
  };

  initComponents() {
    const sliderPagination = new SliderPagination({ slidesCount: this.slides.length });
    const sliderTrack = new SliderTrack({ slides: this.slides, delay: this.delay });
    this.components = {
      sliderPagination,
      sliderTrack,
    };

    this.renderComponents(this.components);
  }

  onTrackAnimationStart = () => (this.isTrackAnimated = true);
  onTrackAnimationEnd = () => (this.isTrackAnimated = false);

  constructor({ slides = [], delay = 300 } = {}) {
    this.slides = slides;
    this.delay = delay;
  }

  render() {
    this.element = createElement(template());
    this.subElements = getSubElements(this.element);
    this.initComponents();
    this.initEventListeners();
    return this.element;
  }
  syncSubcomponents = () => {
    this.components.sliderTrack.slideTo(this.activeSlideIndex);
    this.activeSlideIndex === -1 && (this.activeSlideIndex = this.slides.length - 1);
    this.activeSlideIndex === this.slides.length && (this.activeSlideIndex = 0);
    this.components.sliderPagination.setActiveDot(this.activeSlideIndex);
  };

  renderComponents(components) {
    Object.entries(components).forEach(([name, component]) => {
      this.subElements[name].append(component.render());
    });
  }

  initEventListeners() {
    this.subElements.buttonPrev.addEventListener('click', this.onButtonPrevClick);
    this.subElements.buttonNext.addEventListener('click', this.onButtonNextClick);

    const { element: sliderPagination } = this.components.sliderPagination;
    sliderPagination && sliderPagination.addEventListener(SLIDER_DOT_CLICK, this.onDotClick);

    const { element: sliderTrack } = this.components.sliderTrack;
    if (sliderTrack) {
      sliderTrack.addEventListener(SLIDER_ANIMATION + START, this.onTrackAnimationStart);
      sliderTrack.addEventListener(SLIDER_ANIMATION + END, this.onTrackAnimationEnd);
    }
  }
}
