function userValidator(user) {
  const errorMessages = [];

  if (!user) {
    errorMessages.push("Missing user information");
    return errorMessages;
  }

  if (!user.email?.trim()) errorMessages.push("Email is required");
  if (!user.password) errorMessages.push("Password is required");

  return errorMessages;
}

  export default userValidator;
