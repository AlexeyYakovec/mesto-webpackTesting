export function handleLike(evt) {
  evt.target.classList.toggle("cards__item-like_active");
}

export function handleDelete(evt) {
  evt.target.closest(".cards__item").remove();
}

function getTemplate() {
  const templateCard = document.querySelector(".template");
  const newCard = templateCard.content
    .querySelector(".cards__item")
    .cloneNode(true);
  return newCard;
}

export function createCard(name, link, { onPreviewPicture, onLike, onDelete }) {
  const card = getTemplate();

  const buttonDelete = card.querySelector(".cards__delete");
  const buttonLike = card.querySelector(".cards__item-like");
  const cardTitle = card.querySelector(".cards__item-title");
  const cardImage = card.querySelector(".cards__item-image");

  if (onLike) {
    buttonLike.addEventListener("click", onLike);
  }
  if (onDelete) {
    buttonDelete.addEventListener("click", onDelete);
  }
  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => {
      onPreviewPicture(name, link);
    });
  }

  cardTitle.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;

  return card;
}
