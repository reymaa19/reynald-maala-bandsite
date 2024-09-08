import { createElement, renderElements } from './utils.js';

const shows = [
  {
    timestamp: 'Mon Sept 09 2024',
    venue: 'Ronald Lane',
    location: 'San Francisco, CA',
  },
  {
    timestamp: 'Tue Sept 17 2024',
    venue: 'Pier 3 East',
    location: 'San Francisco, CA',
  },
  {
    timestamp: 'Sat Oct 12 2024',
    venue: 'View Lounge',
    location: 'San Francisco, CA ',
  },
  {
    timestamp: 'Sat Nov 16 2024',
    venue: 'Hyatt Agency',
    location: 'San Francisco, CA',
  },
  {
    timestamp: 'Fri Nov 29 2024',
    venue: 'Moscow Center',
    location: 'San Francisco, CA',
  },
  {
    timestamp: 'Wed Dec 18 2024',
    venue: 'Press Club',
    location: 'San Francisco, CA',
  },
];

// Creates the Shows Row Component.
const createShowsRow = ({ timestamp, venue, location }) => {
  const showRow = createElement('tr', 'shows-table__row');
  const dateLabel = createElement('th', 'shows-table__label', 'DATE');
  const dateCell = createElement('td', ['shows-table__cell', 'shows-table__cell--focus'], timestamp);
  const venueLabel = createElement('th', 'shows-table__label', 'VENUE');
  const venueCell = createElement('td', 'shows-table__cell', venue);
  const locationLabel = createElement('th', 'shows-table__label', 'LOCATION');
  const locationCell = createElement('td', 'shows-table__cell', location);
  const ctaCell = createElement('td', 'shows-table__cell');
  const ctaButton = createElement('button', 'cta-button', 'BUY TICKETS');

  showRow.appendChild(dateLabel);
  showRow.appendChild(dateCell);
  showRow.appendChild(venueLabel);
  showRow.appendChild(venueCell);
  showRow.appendChild(locationLabel);
  showRow.appendChild(locationCell);
  showRow.appendChild(ctaCell);
  ctaCell.appendChild(ctaButton);

  return showRow;
};

// Handles the click event of the Shows Row Component.
const handleRowClick = (e) => {
  const row = e.target.closest('.shows-table__row');

  if (!row) { return; }

  document
    .querySelectorAll('.shows-table__row')
    .forEach((r) => r.classList.remove('shows-table__row--active'));

  row.classList.add('shows-table__row--active');
};

const showsTableBodyEl = document.querySelector('.shows-table__body');
const showsBodyEl = document.querySelector('.shows-table__body');

renderElements(shows, createShowsRow, showsBodyEl);

showsTableBodyEl.addEventListener('click', handleRowClick);
