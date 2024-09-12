import bandSiteApi from "./band-site-api.js";
import { createElement, renderElements } from "./utils.js";

const showsListEl = document.querySelector(".shows__list");
const api = new bandSiteApi("b6a6f675-fae8-4ff5-b77f-5719b3869876");

const shows = await api.getShows();

// Formats the date to a more human-readable format.
const formatDate = (date) => {
  const dateFormat = {
    day: "2-digit",
    weekday: "short",
    month: "short",
    year: "numeric",
    timeZone: "GMT",
  };

  return new Intl.DateTimeFormat("en-US", dateFormat)
    .format(new Date(date))
    .replace(",", "")
    .replace(",", " ");
};

// Creates the Shows Item Component.
const createShowsItem = ({ date, place, location }) => {
  const showsItem = createElement("li", "shows__item");
  const dateLabel = createElement("h4", "shows__label", "DATE");
  const dateValue = createElement("p", ["shows__value", "shows__value--focus"], formatDate(date));
  const venueLabel = createElement("h4", "shows__label", "VENUE");
  const venueValue = createElement("p", "shows__value", place);
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

showsListEl.addEventListener("click", handleItemClick);

renderElements(shows, createShowsItem, showsListEl);
