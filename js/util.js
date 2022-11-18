const isEscapeKey = (evt) => evt.key === 'Escape';

const isActiveBlock = (element, method, className) => {
  element.classList[method](className);
};

export { isEscapeKey, isActiveBlock };
