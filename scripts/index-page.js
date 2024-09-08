import { createElement, renderElements } from './utils.js';

const comments = [
  {
    name: 'Isaac Tadesse',
    timestamp: '10/20/2021',
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
  {
    name: 'Victor Pinto',
    timestamp: '11/02/2022',
    comment:
      'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
  },
  {
    name: 'Christina Cabrera',
    timestamp: '10/28/2023',
    comment:
      'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
  },
];

// Sorts the comments array from recent to oldest.
const sortedComments = () =>
  comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

// Creates the Comments Card Component.
const createCommentsCard = ({ name, timestamp, comment }) => {
  const commentsCard = createElement('div', 'comments__card');
  const commentsAvatar = createElement('div', 'comments__avatar');
  const commentsDetails = createElement('div', 'comments__details');
  const commentsHead = createElement('div', 'comments__head');
  const commentsName = createElement('h4', 'comments__name', name);
  const commentsDate = createElement('time', 'comments__date', timestamp);
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
  const timestamp = new Date().toLocaleDateString('es-pa');

  comments.push({ name, timestamp, comment });

  renderElements(sortedComments(), createCommentsCard, commentsFeedEl);

  form.reset();
};

const commentsFormEl = document.querySelector('.comments-form');
const commentsFeedEl = document.querySelector('.comments__feed');

commentsFormEl.addEventListener('submit', handleCommentsFormSubmit);

renderElements(sortedComments(), createCommentsCard, commentsFeedEl);
