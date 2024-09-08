import { createElement, renderElements } from './utils.js';

const formNameInputEl = document.getElementById('name');
const formCommentInputEl = document.getElementById('comment');
const commentsFormEl = document.querySelector('.comments-form');
const commentsFeedEl = document.querySelector('.comments__feed');

const comments = [
  {
    name: 'Victor Pinto',
    timestamp: '09/08/2023, 12:34:56',
    comment:
      'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
  },
  {
    name: 'Christina Cabrera',
    timestamp: '08/20/2024, 12:34:56',
    comment:
      'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
  },
  {
    name: 'Isaac Tadesse',
    timestamp: '09/08/2024, 16:34:56',
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

// Sorts the comments array from recent to oldest.
const sortedComments = () => {
  return comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
};

// Formats the comments timestamp to a more human-readable format.
const formatTimestamp = (timestamp) => {
  const diffInSeconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 2592000;

  if (diffInSeconds < secondsInMinute) {
    return 'Just now';
  } else if (diffInSeconds < secondsInHour) {
    const minutes = Math.floor(diffInSeconds / secondsInMinute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < secondsInDay) {
    const hours = Math.floor(diffInSeconds / secondsInHour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < secondsInMonth) {
    const days = Math.floor(diffInSeconds / secondsInDay);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return timestamp.split(',')[0];
  }
};

// Creates the Comments Card Component.
const createCommentsCard = ({ name, timestamp, comment }) => {
  const commentsCard = createElement('div', 'comments__card');
  const commentsAvatar = createElement('div', 'comments__avatar');
  const commentsDetails = createElement('div', 'comments__details');
  const commentsHead = createElement('div', 'comments__head');
  const commentsName = createElement('h4', 'comments__name', name);
  const commentsDate = createElement('time', 'comments__date', formatTimestamp(timestamp));
  const commentsText = createElement('p', 'comments__text', comment);

  commentsHead.appendChild(commentsName);
  commentsHead.appendChild(commentsDate);
  commentsDetails.appendChild(commentsHead);
  commentsDetails.appendChild(commentsText);
  commentsCard.appendChild(commentsAvatar);
  commentsCard.appendChild(commentsDetails);

  return commentsCard;
};

// Handles the submit event of the Comments Form.
const handleCommentsFormSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const comment = form.comment.value;
  const timestamp = new Intl.DateTimeFormat('es-pa', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: 'CST',
  }).format(new Date());

  if (!name) {
    formNameInputEl.classList.add('comments-form__input--error');
  }
  if (!comment) {
    formCommentInputEl.classList.add('comments-form__input--error');
  }
  if (!name || !comment) { return; }

  comments.push({ name, timestamp, comment });

  renderElements(sortedComments(), createCommentsCard, commentsFeedEl);

  form.reset();
};

// Handles the input event of the forms input fields.
const handleInputChange = (e) => {
  if (e.target.value) {
    e.target.classList.remove('comments-form__input--error');
  }
};

formNameInputEl.addEventListener('input', handleInputChange);
formCommentInputEl.addEventListener('input', handleInputChange);

commentsFormEl.addEventListener('submit', handleCommentsFormSubmit);

renderElements(sortedComments(), createCommentsCard, commentsFeedEl);
