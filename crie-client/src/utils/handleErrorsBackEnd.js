import showInputError from "./showInputError";

const handleErrorsBackEnd = (id, messageFromBackEnd) => {
  let message = "";

  if (
    messageFromBackEnd.message === "Usuário não encontrado." ||
    messageFromBackEnd.message === "Senha incorreta."
  ) {
    message = "Credenciais erradas, por favor tente novamente.";
  } else if (messageFromBackEnd.error === "auth/too-many-requests") {
    message =
      "Muitas tentativas de realizar o login. Tente novamente mais tarde";
  }

  showInputError(message, id);

  return message;
};

export default handleErrorsBackEnd;
