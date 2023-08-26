export const validatePasswordRepeat = (
  passwordRepeat: string,
  originalPassword: string
) => {
  const passwordMatch = passwordRepeat === originalPassword;

  return passwordMatch || "Passwords do not match";
};
