import bandSiteApi from "./band-site-api.js";
import { createElement, renderElements } from "./utils.js";

const formNameInputEl = document.getElementById("name");
const formCommentInputEl = document.getElementById("comment");
const commentsFormEl = document.querySelector(".comments-form");
const commentsFeedEl = document.querySelector(".comments__feed");

const api = new bandSiteApi("b6a6f675-fae8-4ff5-b77f-5719b3869876");

const comments = await api.getComments();

// Formats the comment's timestamp to a more human-readable format.
const formatTimestamp = (timestamp) => {
  const difference = Math.floor(new Date() - new Date(timestamp)) / 1000;
  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const month = 2592000;

  if (difference < minute) {
    return "Just now";
  } else if (difference < hour) {
    const minutes = Math.floor(difference / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (difference < day) {
    const hours = Math.floor(difference / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (difference < month) {
    const days = Math.floor(difference / Day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return new Date(timestamp).toLocaleDateString("es-pa");
  }
};

// Creates the Comment's delete and like Buttons.
const createCommentButtons = (likes) => {
  const commentButtons = createElement("div", "comments__buttons");
  const commentDeleteButton = createElement("button", ["comments__button", "comments__button--delete"]);
  const commentDeleteIcon = createElement("img", "comments__icon");
  const commentLikesWrapper = createElement("div", "comments__wrapper");
  const commentLikes = createElement("p", "comments__likes", `${likes} likes`);
  const commentLikeButton = createElement("button", ["comments__button", "comments__button--like"]);
  const commentLikeIcon = createElement("img", "comments__icon");

  commentDeleteIcon.setAttribute("src", "../assets/icons/icon-delete.svg");
  commentDeleteIcon.setAttribute("alt", "Delete Icon");
  commentLikeIcon.setAttribute("src", "../assets/icons/icon-like.svg");
  commentLikeIcon.setAttribute("alt", "Like Icon");

  commentDeleteButton.addEventListener("click", handleDeleteClick);
  commentLikeButton.addEventListener("click", handleLikeClick);

  commentDeleteButton.appendChild(commentDeleteIcon);
  commentLikeButton.appendChild(commentLikeIcon);

  commentLikesWrapper.appendChild(commentLikeButton);
  commentLikesWrapper.appendChild(commentLikes);

  commentButtons.appendChild(commentDeleteButton);
  commentButtons.appendChild(commentLikesWrapper);

  return commentButtons;
};

// Creates the Comment Card Component.
const createCommentCard = ({ name, timestamp, comment, id, likes }) => {
  const commentCard = createElement("div", "comments__card");
  const commentAvatar = createElement("div", "comments__avatar");
  const commentDetails = createElement("div", "comments__details");
  const commentHead = createElement("div", "comments__head");
  const commentName = createElement("h4", "comments__name", name);
  const commentDate = createElement("p", "comments__date", formatTimestamp(timestamp));
  const commentText = createElement("p", "comments__text", comment);

  const commentButtons = createCommentButtons(likes);

  commentCard.setAttribute("id", id);

  commentHead.appendChild(commentName);
  commentHead.appendChild(commentDate);

  commentDetails.appendChild(commentHead);
  commentDetails.appendChild(commentText);
  commentDetails.appendChild(commentButtons);

  commentCard.appendChild(commentAvatar);
  commentCard.appendChild(commentDetails);

  return commentCard;
};

// Renders a single comment to the top of the comments feed.
const renderSingleComment = (comment) => {
  const newCommentCard = createCommentCard(comment);
  commentsFeedEl.prepend(newCommentCard);
};

// Checks whether the form inputs are valid.
const validInputs = (name, comment) => {
  let valid = true;

  if (!name) {
    formNameInputEl.classList.add("comments-form__input--error");
    valid = false;
  }
  if (!comment) {
    formCommentInputEl.classList.add("comments-form__input--error");
    valid = false;
  }

  return valid;
};

// Handles the submit event of the comments form.
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const comment = form.comment.value;

  if (!validInputs(name, comment)) {
    return;
  }

  try {
    const result = await api.postComment({ name, comment });

    comments.unshift(result);
    renderSingleComment(result);

    form.reset();
  } catch (error) {
    console.log("An error occurred while submitting your comment.", error);
    alert("Failed to add comment. Please try again.")
  }
};

// Handles the click event of the comment delete button.
const handleDeleteClick = async (e) => {
  const commentCard = e.target.closest(".comments__card");
  const commentId = commentCard.id;
  const text = commentCard.querySelector(".comments__text").textContent;
  const name = commentCard.querySelector(".comments__name").textContent;

  const message = `${name}\n${text}\n\nAre you sure you want to delete this comment?`

  try {
    if (confirm(message)) {
      const result = await api.deleteComment(commentId);

      const removedIndex = comments.findIndex(({ id }) => id === result.id);
      comments.splice(removedIndex, 1);

      commentCard.remove();
    }
  } catch (error) {
    console.log("An error occurred while deleting a comment.", error);
    alert("Failed to delete the comment. Please try again.")
  }
};

// Handles the click event of the comment like button.
const handleLikeClick = async (e) => {
  const commentCard = e.target.closest(".comments__card");
  const commentId = commentCard.id;

  try {
    const updatedComment = await api.likeComment(commentId);

    const likedIndex = comments.findIndex(({ id }) => id === updatedComment.id);
    comments[likedIndex] = updatedComment;
    
    commentCard.replaceWith(createCommentCard(updatedComment));
  } catch (error) {
    console.log("An error occurred while liking a comment.", error);
    alert("Failed to like comment. Please try again.")
  }
};

// Handles the removal of the form input error.
const handleResetError = (e) => {
  e.target.classList.remove("comments-form__input--error");
};

formNameInputEl.addEventListener("input", handleResetError);
formCommentInputEl.addEventListener("input", handleResetError);
commentsFormEl.addEventListener("submit", handleFormSubmit);

renderElements(comments, createCommentCard, commentsFeedEl);
