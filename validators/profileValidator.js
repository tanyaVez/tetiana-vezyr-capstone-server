function profileValidator(profile) {
  const errorMessages = [];
  const validRoles = ["mentor", "mentee", "admin"];
  const validMentoringModes = ["in-person", "online", "both"];

  if (!profile.user_id || !profile.user_name || !profile.role) {
    errorMessages.push("UserId, name, and role are required.");
  }

  if (profile.role && !validRoles.includes(profile.role)) {
    errorMessages.push("Role must be one of: 'mentor', 'mentee', or 'admin'.");
  }

  if (
    profile.mode &&
    !validMentoringModes.includes(profile.mode)
  ) {
    errorMessages.push(
      "Mentoring mode must be one of: 'in-person', 'online', or 'both'."
    );
  }

  return errorMessages;
}

export default profileValidator;
