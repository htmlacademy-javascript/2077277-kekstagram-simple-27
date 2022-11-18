import { isEscapeKey, isActiveBlock } from './util.js';
import { resetScaleInput, zoomOutButtonClickHandler, zoomInButtonClickHandler } from './scale.js';
import { resetEffect, formChangeHandler } from './effects.js';
import { sendData } from './api.js';
import { renderSuccessMessage, renderFailMessage } from './modal-message.js';

const modalForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const userModal = document.querySelector('.img-upload__overlay');
const modalClose = document.querySelector('#upload-cancel');
const body = document.body;
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomOutButton = document.querySelector('.scale__control--smaller');
const modalSubmitButton = document.querySelector('#upload-submit');

const openModal = () => {
  isActiveBlock(userModal, 'remove', 'hidden');
  isActiveBlock(body, 'add', 'modal-open');
};

const closeModal = () => {
  isActiveBlock(userModal, 'add', 'hidden');
  isActiveBlock(body, 'remove', 'modal-open');
};

const resetAndCloseModal = () => {
  modalForm.reset();
  resetScaleInput();
  resetEffect();
  closeModal();
};

const closeModalByEscape = (evt) => {
  evt.preventDefault();
  resetAndCloseModal();
};

const openModalAndAddEscapeEventListener = () => {
  openModal();
  document.addEventListener('keydown', imgEventUploadHandler);
};

const closeModalAndRemoveEscapeEventListener = () => {
  closeModal();
  document.removeEventListener('keydown', imgEventUploadHandler);
};

const clearFormHandlerState = () => {
  modalClose.removeEventListener('click', imgEventUploadHandler);
  document.removeEventListener('keydown', imgEventUploadHandler);
  zoomOutButton.removeEventListener('click', zoomOutButtonClickHandler);
  zoomInButton.removeEventListener ('click', zoomInButtonClickHandler);
  modalForm.removeEventListener('change', formChangeHandler);
};

function imgEventUploadHandler (evt) {
  switch (evt.type) {
    case 'click':
      resetAndCloseModal();
      clearFormHandlerState();
      break;
    case 'keydown':
      if (!isEscapeKey(evt)) {
        return;
      }
      closeModalByEscape(evt);
      clearFormHandlerState();
      break;
    default:
      resetAndCloseModal();
      break;
  }
}

const imgUploadHandler = () => {
  openModal();
  modalClose.addEventListener('click', imgEventUploadHandler);
  document.addEventListener('keydown', imgEventUploadHandler);
  zoomOutButton.addEventListener ('click', zoomOutButtonClickHandler);
  zoomInButton.addEventListener ('click', zoomInButtonClickHandler);
  modalForm.addEventListener('change', formChangeHandler);
};

uploadFile.addEventListener('change', imgUploadHandler);

const blocModalSubmitButton = () => {
  modalSubmitButton.disabled = true;
  modalSubmitButton.textContent = 'Публикуется...';
};

const unblockModalSubmitButton = () => {
  modalSubmitButton.disabled = false;
  modalSubmitButton.textContent = 'Опубликовать';
};

const setModalFormSubmit = () => {
  modalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blocModalSubmitButton();
    sendData(
      () => {
        renderSuccessMessage();
        resetAndCloseModal();
        clearFormHandlerState();
        unblockModalSubmitButton();
      },
      () => {
        closeModalAndRemoveEscapeEventListener();
        renderFailMessage();
        unblockModalSubmitButton();
      },
      new FormData(evt.target),
    );
  });
};

export { setModalFormSubmit, openModalAndAddEscapeEventListener };
