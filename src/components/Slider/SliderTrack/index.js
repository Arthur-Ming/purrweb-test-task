import { createElement, emit } from '../../../utils/domHelpers';
import { SLIDER_ANIMATION, START, END } from '../../../constans';

const template = () => `<div class="slider__inner"></div>`;

export default class SliderTrack {
  element = null;
  slides = [];
  delay;
  currentSlideIndex = 0;

  constructor({ slides, delay } = {}) {
    this.slides = slides;
    this.delay = delay;
  }

  render() {
    this.element = createElement(template());
    this.element.append(...this.getSlideElems());
    this.setTrackState(-100);
    return this.element;
  }

  getSlideElems() {
    const slideElems = this.slides.map(({ value }) =>
      createElement(`
      <div class="slider__slide slider-slide">
        <div class="slider-slide__content">
            <div class="slider__text">${value}</div>
        </div>
      </div>
        `)
    );

    const lastSlide = slideElems[this.slides.length - 1].cloneNode(true);
    const firstSlide = slideElems[0].cloneNode(true);
    return [lastSlide, ...slideElems, firstSlide];
  }

  slideTo(slideIndex) {
    const isForward = this.currentSlideIndex < slideIndex;
    this.animate(slideIndex, isForward);
  }

  animate(slideIndex) {
    const start = Date.now();
    emit({ event: SLIDER_ANIMATION + START, elem: this.element });
    let timerId = setInterval(() => {
      const timePassed = Date.now() - start;

      let value = timePassed / this.delay;
      if (value >= 1) {
        value = 1;
        this.currentSlideIndex = slideIndex;
        clearInterval(timerId);
        emit({ event: SLIDER_ANIMATION + END, elem: this.element });
        if (this.checkIndexIsOutOfSlides(slideIndex)) return;
      }
      this.setTrackState(this.getTrackShift(slideIndex, value));
    }, 16);
  }

  checkIndexIsOutOfSlides = (slideIndex) => {
    if (slideIndex !== -1 && slideIndex !== this.slides.length) return false;

    if (slideIndex === -1) this.currentSlideIndex = this.slides.length - 1;
    if (slideIndex === this.slides.length) this.currentSlideIndex = 0;

    this.setTrackState(this.getTrackShift(this.currentSlideIndex));
    return true;
  };

  getTrackShift = (slideIndex, value = 1) => {
    return 100 * (value * (this.currentSlideIndex - slideIndex) - this.currentSlideIndex - 1);
  };

  setTrackState = (state, units = '%') => {
    this.element.style.transform = `translateX(${state}${units})`;
  };
}
