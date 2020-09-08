const isAccessCode = (accessCodeInput) => {
  const accessCodeRegex = /^[A-Za-z]{3}[0-9]{3}/;
  if (accessCode.match(accessCodeRegex) && accessCode.length === 6) return "";
  else return "Código inválido";
};

export default isAccessCode;
