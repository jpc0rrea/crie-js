const handleErrors = (id, inputState, cb) => {
  let message = "";

  if (!inputState) {
    message = "Esse campo não pode estar vazio";
  } else if (cb) {
    message = cb(inputState);
  }

  const inputStateElement = document.getElementById(id);

  if (message) {
    inputStateElement.classList.add("error");
  } else {
    inputStateElement.classList.remove("error");
  }

  return message;
};

export default handleErrors;
