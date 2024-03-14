import "../pages/index.css";

import { initialCards } from "../scripts/initialCards";

import { createCard, handleLike, handleDelete } from "../scripts/card";

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

initialCards.forEach((data) => {
  const cardItem = createCard(data, {
    onPreviewPicture: handlePicture,
    onLike: handleLike,
    onDelete: handleDelete,
  });
  cardsContainer.append(cardItem);
});

function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keyup", handleHotKey);
  document.addEventListener("mousedown", handleOverlay);
}

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleHotKey);
  document.removeEventListener("mousedown", handleOverlay);
}

function handlePicture(data) {
  openPopup(popupImageView);
  console.log(`handlePicture: ${data.name}`);
  popupImagetitle.textContent = data.name;
  popupImage.alt = data.name;
  popupImage.src = data.link;
}

function handleHotKey(e) {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup && e.key == "Escape") {
    closePopup(activePopup);
  }
}

function handleOverlay(e) {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup && e.target == activePopup) {
    closePopup(activePopup);
  }
}

function setClosePopup(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
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
