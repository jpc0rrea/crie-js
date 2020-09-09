import showInputError from "./showInputError";

const validateConfirmPassword = (
  password,
  confirmPassword,
  passwordMessage,
  confirmPasswordMessage
) => {
  let newPasswordMessage = passwordMessage;
  let newConfirmPasswordMessage = confirmPasswordMessage;
  if (password !== confirmPassword) {
    if (!passwordMessage) {
      newPasswordMessage = "Senha e confirmação de senha estão diferentes.";
      showInputError(newPasswordMessage, "password");
    }

    if (!confirmPasswordMessage) {
      newConfirmPasswordMessage =
        "Senha e confirmação de senha estão diferentes.";
      showInputError(newConfirmPasswordMessage, "confirmPassword");
    }
    return [newPasswordMessage, newConfirmPasswordMessage];
  }

  return [passwordMessage, confirmPasswordMessage];
};

export default validateConfirmPassword;
