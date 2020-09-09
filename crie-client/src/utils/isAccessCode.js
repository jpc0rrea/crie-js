const isAccessCode = (accessCodeInput) => {
  const accessCodeRegex = /^[A-Za-z]{3}[0-9]{3}/;
  if (accessCodeInput.match(accessCodeRegex) && accessCodeInput.length === 6)
    return "";
  else return "Código inválido";
};

export default isAccessCode;
