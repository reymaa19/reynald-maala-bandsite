import bandSiteApi from "./band-site-api.js";
import { createElement, renderElements } from "./utils.js";

const formNameInputEl = document.getElementById("name");
const formCommentInputEl = document.getElementById("comment");
const commentsFormEl = document.querySelector(".comments-form");
const commentsFeedEl = document.querySelector(".comments__feed");
const api = new bandSiteApi("b6a6f675-fae8-4ff5-b77f-5719b3869876");

const comments = await api.getComments();

// Formats the comments timestamp to a more human-readable format.
const formatTimestamp = (timestamp) => {
  const diffInSeconds = Math.floor(new Date() - new Date(timestamp)) / 1000;
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000;

  if (diffInSeconds < secondsInMinute) {
    return "Just now";
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return new Date(timestamp).toLocaleDateString("es-pa");
  }
};

// Creates the Comments Card Component.
const createCommentsCard = ({ name, timestamp, comment }) => {
  const commentsCard = createElement("div", "comments__card");
  const commentsAvatar = createElement("div", "comments__avatar");
  const commentsDetails = createElement("div", "comments__details");
  const commentsHead = createElement("div", "comments__head");
  const commentsName = createElement("h4", "comments__name", name);
  const commentsDate = createElement("time", "comments__date", formatTimestamp(timestamp));
  const commentsText = createElement("p", "comments__text", comment);

  commentsHead.appendChild(commentsName);
  commentsHead.appendChild(commentsDate);
  commentsDetails.appendChild(commentsHead);
  commentsDetails.appendChild(commentsText);
  commentsCard.appendChild(commentsAvatar);
  commentsCard.appendChild(commentsDetails);

  return commentsCard;
};

// Renders a single comment to the top of the comments feed.
const renderComment = (comment) => {
  const newCommentsCard = createCommentsCard(comment);
  commentsFeedEl.prepend(newCommentsCard);
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

// Handles the submit event of the form.
const handleCommentsFormSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const comment = form.comment.value;

  if (!validInputs(name, comment)) { return; }

  try {
    const result = await api.postComment({ name, comment });

    comments.unshift(result);
    renderComment(result);
    form.reset();
  } catch (error) {
    console.log("An error occurred while submitting your comment.", error);
  }
};

// Removes the form input error.
const resetErrors = (e) => {
  e.target.classList.remove("comments-form__input--error");
};

formNameInputEl.addEventListener("input", resetErrors);
formCommentInputEl.addEventListener("input", resetErrors);

commentsFormEl.addEventListener("submit", handleCommentsFormSubmit);

renderElements(comments, createCommentsCard, commentsFeedEl);
