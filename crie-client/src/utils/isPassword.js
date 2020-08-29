const isPassword = (password) => {
  if (password.length < 6) {
    return "A senha deve conter mais de 6 caracteres";
  } else {
    return "";
  }
};

export default isPassword;
