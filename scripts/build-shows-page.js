import { createElement, renderElements } from "./utils.js";

const showsListEl = document.querySelector(".shows__list");
const shows = [
  {
    timestamp: "Mon Sept 09 2024",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    timestamp: "Tue Sept 17 2024",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    timestamp: "Sat Oct 12 2024",
    venue: "View Lounge",
    location: "San Francisco, CA ",
  },
  {
    timestamp: "Sat Nov 16 2024",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    timestamp: "Fri Nov 29 2024",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    timestamp: "Wed Dec 18 2024",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

// Creates the Shows Item Component.
const createShowsItem = ({ timestamp, venue, location }) => {
  const showsItem = createElement("li", "shows__item");
  const dateLabel = createElement("h4", "shows__label", "DATE");
  const dateValue = createElement("p", ["shows__value", "shows__value--focus"], timestamp);
  const venueLabel = createElement("h4", "shows__label", "VENUE");
  const venueValue = createElement("p", "shows__value", venue);
  const locationLabel = createElement("h4", "shows__label", "LOCATION");
  const locationValue = createElement("p", "shows__value", location);
  const ctaValue = createElement("div", "shows__action");
  const ctaButton = createElement("button", "cta-button", "BUY TICKETS");

  showsItem.appendChild(dateLabel);
  showsItem.appendChild(dateValue);
  showsItem.appendChild(venueLabel);
  showsItem.appendChild(venueValue);
  showsItem.appendChild(locationLabel);
  showsItem.appendChild(locationValue);
  showsItem.appendChild(ctaValue);
  ctaValue.appendChild(ctaButton);

  return showsItem;
};

// Handles the click event of the Shows Item Component.
const handleItemClick = (e) => {
  const showsItemEl = e.target.closest(".shows__item");

  document
    .querySelectorAll(".shows__item")
    .forEach((item) => item.classList.remove("shows__item--active"));

  showsItemEl.classList.add("shows__item--active");
};

renderElements(shows, createShowsItem, showsListEl);

showsListEl.addEventListener("click", handleItemClick);
