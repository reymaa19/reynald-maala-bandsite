// Creates a new element using the provided element name, class name, and content.
export const createElement = (tagName, className, textContent) => {
  const newElement = document.createElement(tagName);

  if (Array.isArray(className)) {
    className.forEach((name) => newElement.classList.add(name));
  } else {
    newElement.classList.add(className);
  }

  if (textContent) {
    newElement.textContent = textContent;
  }

  return newElement;
};

// Renders an array of objects into DOM elements and appends to a parent element.
export const renderElements = (objArray, createComponent, parentEl) => {
  parentEl.replaceChildren();

  objArray.forEach((obj) => parentEl.appendChild(createComponent(obj)));
};
