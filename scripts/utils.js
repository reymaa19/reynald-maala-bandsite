// Creates a new element using the provided element name, class name, and content.
export const createEl = (element, className, content) => {
  const newElement = document.createElement(element);

  if (Array.isArray(className))
    className.forEach((name) => newElement.classList.add(name));
  else newElement.classList.add(className);

  if (content) newElement.textContent = content;

  return newElement;
};

// Renders the provided object array data into elements.
// Creates components using the provided create component function.
// Appends the created elements into the provided parent element.
export const renderElements = (objArray, createComponent, parentEl) => {
  // Clears all comments from the page
  parentEl.replaceChildren();

  objArray.forEach((el) =>
    // function that takes in one comment object as a parameter and displays it on the page using JavaScript DOM manipulation.
    parentEl.appendChild(createComponent(el))
  );
};
