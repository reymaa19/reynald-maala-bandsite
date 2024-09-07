import { createEl, renderElements } from './utils.js';

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

// Creates the Shows Body Row Component.
const createShowsRow = ({ timestamp, venue, location }) => {
  const showRow = createEl('tr', 'shows-table__row');
  const dateLabel = createEl('th', 'shows-table__label', 'DATE');
  const venueLabel = createEl('th', 'shows-table__label', 'VENUE');
  const locationLabel = createEl('th', 'shows-table__label', 'LOCATION');
  const dateCell = createEl('td',['shows-table__cell', 'shows-table__cell--focus'],timestamp);
  const venueCell = createEl('td', 'shows-table__cell', venue);
  const locationCell = createEl('td', 'shows-table__cell', location);
  const ctaCell = createEl('td', 'shows-table__cell');
  const ctaButton = createEl('button', 'cta-button', 'BUY TICKETS');

  dateLabel.setAttribute('scope', 'row');
  venueLabel.setAttribute('scope', 'row');
  locationLabel.setAttribute('scope', 'row');

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

// Creates the Shows Head Row Component.
const createShowHeadRow = () => {
  const showRow = createEl('tr', ['shows-table__row','shows-table__row--head',]);
  const dateLabel = createEl('th',['shows-table__label', 'shows-table__label--head'],'DATE');
  const venueLabel = createEl('th',['shows-table__label', 'shows-table__label--head'],'VENUE');
  const locationLabel = createEl('th',['shows-table__label', 'shows-table__label--head'],'LOCATION');
  const emptyLabel = createEl('th', ['shows-table__label','shows-table__label--head',]);

  showRow.appendChild(dateLabel);
  showRow.appendChild(venueLabel);
  showRow.appendChild(locationLabel);
  showRow.appendChild(emptyLabel);

  return showRow;
};

const showsBody = document.querySelector('.shows-table__body');
const showsHead = document.querySelector('.shows-table__head');

showsHead.appendChild(createShowHeadRow());

// Renders all the shows on page load.
renderElements(shows, createShowsRow, showsBody);
