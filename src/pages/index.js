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
  settings,
  cardsContainer,
} from "../scripts/utils/constants";

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

function showInputError(formEl, inputEl, errorMessage, settings) {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(settings.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(settings.errorClass);
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
