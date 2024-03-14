export function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keyup", handleHotKey);
  document.addEventListener("mousedown", handleOverlay);
}

export function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleHotKey);
  document.removeEventListener("mousedown", handleOverlay);
}

export function setClosePopup(popup) {
  const closeButton = popup.querySelector(".popup__close-button");
  closeButton.addEventListener("click", () => {
    closePopup(popup);
  });
}

export function handleHotKey(e) {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup && e.key == "Escape") {
    closePopup(activePopup);
  }
}

export function handleOverlay(e) {
  const activePopup = document.querySelector(".popup_opened");
  if (activePopup && e.target == activePopup) {
    closePopup(activePopup);
  }
}
