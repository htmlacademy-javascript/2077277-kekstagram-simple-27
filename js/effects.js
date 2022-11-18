const photoPreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let currentEffect = DEFAULT_EFFECT;

const isDefault = () => currentEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  effectLevelSlider.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
  });
  if (isDefault()) {
    effectLevelSlider.classList.add('hidden');
  }
};

const formChangeHandler = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  currentEffect = EFFECTS.find((effect) =>
    effect.name === evt.target.value);
  updateSlider();
};

const sliderUpdateHandler = () => {
  photoPreview.style.filter = 'none';
  photoPreview.className = '';
  effectLevel.value = '';
  if (isDefault()) {
    return;
  }
  const sliderValue = effectLevelSlider.noUiSlider.get();
  photoPreview.style.filter = `${currentEffect.style}(${sliderValue}${currentEffect.unit})`;
  photoPreview.classList.add(`effects__preview--${currentEffect.name}`);
  effectLevel.value = sliderValue;
};

const resetEffect = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();

effectLevelSlider.noUiSlider.on('update', sliderUpdateHandler);

export { resetEffect, formChangeHandler };
