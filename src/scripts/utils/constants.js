/* form */
export const formProfile = document.forms.formProfile;
export const formAddCard = document.forms.formAddCard;

/* profile */
export const popupEditProfile = document.querySelector(
  ".popup_type_edit-profile"
);
export const profileInputName = document.querySelector(".popup__input_name");
export const profileInputJob = document.querySelector(".popup__input_job");
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__job");

/* add card */
export const popupAddCard = document.querySelector(".popup_type_add-card");
export const cardNameInput = document.querySelector("#imageName-input");
export const cardLinkInput = document.querySelector("#imageLink-input");

/* image modal */
export const popupImageView = document.querySelector(".popup_type_image-view");
export const popupImage = document.querySelector(".popup__image");
export const popupImagetitle = document.querySelector(".popup__image-title");

/* cards list */
export const cardsContainer = document.querySelector(".cards__list");

export const closeButtonModal = document.querySelectorAll(
  ".popup__close-button"
);

/* buttons */
export const addCardButton = document.querySelector(".profile__add-button");
export const profileButton = document.querySelector(".profile__edit-button");

export const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};
