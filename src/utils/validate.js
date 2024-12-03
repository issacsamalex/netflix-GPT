export const checkValidData = (email, password) => {
  const isValidEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  if (!isValidEmail) return "Email ID is not valid";

  return null;
};
