import showInputError from "./showInputError";

const handleErrorsFrontEnd = (id, inputState, cb) => {
  let message = "";

  if (!inputState) {
    message = "Esse campo não pode estar vazio";
  } else if (cb) {
    message = cb(inputState);
  }

  showInputError(message, id);

  return message;
};

export default handleErrorsFrontEnd;
