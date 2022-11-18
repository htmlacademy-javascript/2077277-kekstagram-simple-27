import { isEscapeKey } from './util.js';
import { openModalAndAddEscapeEventListener } from './modal.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const failMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const messageClickHandler = () => {
  hideMessage();
};

const messageEscKeydownHandler = (evt) => {
  if (isEscapeKey(evt)){
    evt.preventDefault();
    hideMessage();
  }
};

const documentSuccessClickHandler = (evt) => {
  const parentNodeElement = evt.target.parentNode;
  if (parentNodeElement.classList.contains('success__inner') || parentNodeElement.classList.contains('success')) {
    return;
  }
  messageClickHandler();
};

const documentErrorClickHandler = (evt) => {
  const parentNodeElement = evt.target.parentNode;
  if (parentNodeElement.classList.contains('error__inner') || parentNodeElement.classList.contains('error')) {
    return;
  }
  messageClickHandler();
};

function hideMessage () {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');

  if (successMessage) {
    successMessage.remove();
  }
  if (errorMessage) {
    openModalAndAddEscapeEventListener();
    errorMessage.remove();
  }
  document.removeEventListener('click', messageClickHandler);
  document.removeEventListener('keydown', messageEscKeydownHandler);
  window.removeEventListener('click', documentSuccessClickHandler);
  window.removeEventListener('click', documentErrorClickHandler);
}

const renderSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.append(successMessage);
  successMessage.querySelector('.success__button').addEventListener('click', messageClickHandler);
  document.addEventListener('keydown', messageEscKeydownHandler);
  window.addEventListener('click', documentSuccessClickHandler);
};

const renderFailMessage = () => {
  const failMessage = failMessageTemplate.cloneNode(true);
  document.body.append(failMessage);
  failMessage.querySelector('.error__button').addEventListener('click', messageClickHandler);
  document.addEventListener('keydown', messageEscKeydownHandler);
  window.addEventListener('click', documentErrorClickHandler);
};

export { renderSuccessMessage, renderFailMessage };
