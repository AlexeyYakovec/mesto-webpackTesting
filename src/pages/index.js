import "../pages/index.css";

import { initialCards } from "../scripts/initialCards";

import { createCard, handleLike, handleDelete } from "../scripts/card";
import {
  openPopup,
  closePopup,
  setClosePopup,
  handleHotKey,
  handleOverlay,
} from "../scripts/modal";

import {
  formProfile,
  formAddCard,
  popupEditProfile,
  profileInputName,
  profileInputJob,
  profileName,
  profileJob,
  popupAddCard,
  cardNameInput,
  cardLinkInput,
  popupImageView,
  popupImage,
  popupImagetitle,
  closeButtonModal,
  addCardButton,
  profileButton,
  cardsContainer,
} from "../scripts/utils/constants";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

initialCards.forEach((data) => {
  const cardItem = createCard(data, {
    onPreviewPicture: handlePicture,
    onLike: handleLike,
    onDelete: handleDelete,
  });
  cardsContainer.append(cardItem);
});

function handlePicture(data) {
  openPopup(popupImageView);
  popupImagetitle.textContent = data.name;
  popupImage.alt = data.name;
  popupImage.src = data.link;
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileInputName.value;
  profileJob.textContent = profileInputJob.value;
  closePopup(popupEditProfile);
}

function handleCardForSubmit(e) {
  e.preventDefault();
  cardsContainer.prepend(
    createCard(
      {
        name: cardNameInput.value,
        link: cardLinkInput.value,
      },
      {
        onPreviewPicture: handlePicture,
        onLike: handleLike,
        onDelete: handleDelete,
      }
    )
  );

  closePopup(popupAddCard);
  formAddCard.reset();
}

// validation

function showInputError(form, input, errorMessage, settings) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(settings.errorClass);
}

function hideInputError(form, input, settings) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.textContent = "";
  error.classList.remove(settings.errorClass);
}

function isValid(form, input, settings) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
}

function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputs, button, settings);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, settings);
      toggleButtonState(inputs, button, settings);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, button, settings) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
}

// event listeners
addCardButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

profileButton.addEventListener("click", () => {
  openPopup(popupEditProfile);
});

setClosePopup(popupImageView);
setClosePopup(popupEditProfile);
setClosePopup(popupAddCard);

formProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleCardForSubmit);
enableValidation(settings);
