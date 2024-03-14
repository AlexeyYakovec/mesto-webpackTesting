function getTemplate() {
  const template = document.querySelector(".template");
  const card = template.content.querySelector(".cards__item").cloneNode(true);
  return card;
}

export const createCard = (data, { onPreviewPicture, onLike, onDelete }) => {
  const card = getTemplate();
  const cardLikeButton = card.querySelector(".cards__item-like");
  const cardDeleteButton = card.querySelector(".cards__delete");
  const cardTitle = card.querySelector(".cards__item-title");
  const cardImage = card.querySelector(".cards__item-image");

  cardTitle.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;

  if (onLike) {
    cardLikeButton.addEventListener("click", onLike);
  }
  if (onDelete) {
    cardDeleteButton.addEventListener("click", onDelete);
  }
  if (onPreviewPicture) {
    cardImage.addEventListener("click", () => {
      onPreviewPicture(data);
    });
  }

  return card;
};

export function handleLike(e) {
  e.target.classList.toggle("cards__item-like_active");
}

export function handleDelete(e) {
  e.target.closest(".cards__item").remove();
}
