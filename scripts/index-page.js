const comments = [
  {
    name: 'Victor Pinto',
    timestamp: '11/02/2023',
    comment:
      'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
  },
  {
    name: 'Christina Cabrera',
    timestamp: '10/28/2023',
    comment:
      'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
  },
  {
    name: 'Isaac Tadesse',
    timestamp: '10/20/2023',
    comment:
      "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

const newEl = (element, className, content) => {
  const newElement = document.createElement(element);
  newElement.classList.add(className);
  newElement.textContent = content;

  return newElement;
};

createCommentsCard = ({ name, timestamp, comment }) => {
  const commentsCard = newEl('div', 'comments__card');
  const commentsAvatar = newEl('div', 'comments__avatar');
  const commentsDetails = newEl('div', 'comments__details');
  const commentsHead = newEl('div', 'comments__head');
  const commentsName = newEl('h4', 'comments__name', name);
  const commentsDate = newEl('time', 'comments__date', timestamp);
  const commentsText = newEl('p', 'comments__text', comment);

  commentsHead.appendChild(commentsName);
  commentsHead.appendChild(commentsDate);
  commentsDetails.appendChild(commentsHead);
  commentsDetails.appendChild(commentsText);
  commentsCard.appendChild(commentsAvatar);
  commentsCard.appendChild(commentsDetails);

  return commentsCard;
};

const renderComments = () => {
  // Clears all comments from the page
  const commentsGalleryEl = document.querySelector('.comments__gallery');
  commentsGalleryEl.replaceChildren();

  comments
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .forEach((comment) =>
      // function that takes in one comment object as a parameter and displays it on the page using JavaScript DOM manipulation.
      commentsGalleryEl.appendChild(createCommentsCard(comment))
    );
};

const handleCommentsFormSubmit = (e) => {
  // Prevents the page from reloading when submitting a new comment
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const comment = form.comment.value;
  const timestamp = new Date().toLocaleDateString('es-pa');

  // Constructs a new comment object
  // Pushes a new comment object to an array of comments
  comments.push({ name, timestamp, comment });

  // Re-renders to the page all comments from the comment array
  renderComments();

  // Clears the input fields after submitting a new comment
  form.reset();
};

// Form that submits using the `addEventListener`
const commentsFormEl = document.querySelector('.comments-form');
commentsFormEl.addEventListener('submit', handleCommentsFormSubmit);

renderComments();
