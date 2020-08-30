const showInputError = (message, id) => {
  const inputElement = document.getElementById(id);

  if (message) {
    inputElement.classList.add("error");
  } else {
    inputElement.classList.remove("error");
  }
};

export default showInputError;
