const isAccessCode = (accessCodeInput) => {
  const accessCodeRegex = /^[A-Z]{3}[0-9]{3}/;
  const accessCode = accessCodeInput.toUpperCase();
  if (accessCode.match(accessCodeRegex) && accessCode.length === 6) return "";
  else return "Código inválido";
};

export default isAccessCode;
