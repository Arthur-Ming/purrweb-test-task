import Slider from './components/Slider';

const sliderRoot = document.getElementById('slider-root');

function slidesCreater(slidesNum /*number*/) {
  return Array.from(Array(slidesNum), (_, index) => ({
    id: index + 1,
    value: index + 1,
  }));
}

const slides = slidesCreater(5);

if (sliderRoot) {
  sliderRoot.append(new Slider({ slides, delay: 600 }).render());
}
