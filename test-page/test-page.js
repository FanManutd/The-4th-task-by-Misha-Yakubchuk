import App from '../src/plugin/App/App.js';

$(document).ready(() => {
  const sliderHere = document.querySelector('.range-slider__here');
  new App(sliderHere, {
    min: 0,
    max: 1000,
    double: true,
    from: 300,
    to: 700,
  })
});