import { initialCards } from "../scripts/initialCards";

import { createCard, handleDelete, handleLike } from "../scripts/card";

import "../pages/index.css";

// .popup_opened - для открытия окна

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

/* profile */
const profileInputName = document.querySelector(".popup__input_name");
const profileInputJob = document.querySelector(".popup__input_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

/* forms */
const formProfile = document.forms.formProfile;
const formAddCard = document.forms.formAddCard;

/* add card */
const cardNameInput = document.querySelector("#imageName-input");
const cardLinkInput = document.querySelector("#imageLink-input");

/* image modal */
export const popupImage = document.querySelector(".popup__image");
export const popupImagetitle = document.querySelector(".popup__image-title");
export const popupImageView = document.querySelector(".popup_type_image-view");

/* popups */
export const popupUpdateAvatar = document.querySelector(
  ".popup_type_update-avatar"
);
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);

export const popupDeleteCard = document.querySelector(
  ".popup_type_delete-card"
);
export const popupAddCard = document.querySelector(".popup_type_add-card");

/* buttons */
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const buttonUpdateAvatar = document.querySelector(
  ".profile__avatar-edit-button"
);

/* forms */
export const popupFormProfile = popupEditProfile.querySelector(".popup__form");
export const popupFormAvatar = popupUpdateAvatar.querySelector(".popup__form");
export const popupFormAddCard = popupAddCard.querySelector(".popup__form");

/* fields */
export const popupUserAvatar = document.querySelector(".profile__avatar");
export const popupUserName = document.querySelector(".profile__name");
export const popupUserAbout = document.querySelector(".profile__job");

/* template */
export const templateCard = document.querySelector(".template");
export const cardsContainer = document.querySelector(".cards__list");

/* functions */

initialCards.forEach((card) => {
  const cardItem = createCard(card.name, card.link, {
    onPreviewPicture: handlePicture,
    onLike: handleLike,
    onDelete: handleDelete,
  });
  cardsContainer.append(cardItem);
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleHotKey);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleHotKey);
}

function handlePicture(name, link) {
  openPopup(popupImageView);
  popupImagetitle.textContent = name;
  popupImage.alt = name;
  popupImage.src = link;
}

function handleHotKey(e) {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup && e.key === "Escape") {
    closePopup(popupImageView);
  }
}

export function setCloseModalEventListener(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });

  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
}

setCloseModalEventListener(popupImageView);
setCloseModalEventListener(popupAddCard);
setCloseModalEventListener(popupEditProfile);

buttonAdd.addEventListener("click", () => {
  openPopup(popupAddCard);
});

buttonEdit.addEventListener("click", () => {
  openPopup(popupEditProfile);
});

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileInputName.value;
  profileJob.textContent = profileInputJob.value;
  closePopup(popupEditProfile);
}

function handleCardForSubmit(e) {
  e.preventDefault();
  cardsContainer.prepend(
    createCard(cardNameInput.value, cardLinkInput.value, {
      onPreviewPicture: handlePicture,
      onLike: handleLike,
      onDelete: handleDelete,
    })
  );
  closePopup(popupAddCard);
  formAddCard.reset();
}

formProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleCardForSubmit);
