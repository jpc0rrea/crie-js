const isCpf = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, "");
  if (
    cpf.length !== 11 ||
    cpf === "00000000000" ||
    cpf === "11111111111" ||
    cpf === "22222222222" ||
    cpf === "33333333333" ||
    cpf === "44444444444" ||
    cpf === "55555555555" ||
    cpf === "66666666666" ||
    cpf === "77777777777" ||
    cpf === "88888888888" ||
    cpf === "99999999999"
  ) {
    return "CPF inválido.";
  } else {
    return "";
  }
};

export default isCpf;
