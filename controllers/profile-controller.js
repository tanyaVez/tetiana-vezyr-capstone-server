import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import profileValidator from "../validators/profileValidator.js"

const index = async (_req, res) => {
  try {
    const data = await knex("user_profile");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Profiles: ${err}`);
  }
};

const findOne = async (req, res) => {
  try {
    const profilesFound = await knex("user_profile").where({
      user_id: req.params.id,
    });

    if (profilesFound.length === 0) {
      return res.status(404).json({
        message: `Profile for user with ID ${req.params.id} not found`,
      });
    }

    const profileData = profilesFound[0];
    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve profile data for user with ID ${req.params.id}`,
    });
  }
};

const add = async (req, res) => {
  const validationErrors = profileValidator(req.body);

  if (validationErrors.length > 0) {
    res.status(400).json({ message: `${validationErrors.join(", ")}` });
    return;
  }

  const {
    user_id,
    role,
    first_name,
    last_name,
    profile_picture_url,
    bio,
    skills,
    availability,
    areas_of_interest,
    location,
    mentoring_style,
    previous_experience,
    goals,
    mentoring_mode,
  } = req.body;

  

  const profilesFound = await knex("user_profile").where({ user_id: req.body.user_id });
  
  if (profilesFound.length > 0) {
    return res.status(400).json({ message: "User already has a profile" });
  }

  try {
    const usersFound  = await knex("user").where({ id: user_id});

    if (usersFound.length === 0) {
      res.status(400).json({ message: `User with provided id ${user_id} doesn't exist.` });
      return;
    }

    const result = await knex("user_profile").insert({
      user_id,
      first_name,
      last_name,
      role,
      bio,
      skills: JSON.stringify(skills),
      availability: JSON.stringify(availability),
      areas_of_interest: JSON.stringify(areas_of_interest),
      location,
      profile_picture_url,
      mentoring_style,
      previous_experience,
      goals,
      mentoring_mode,
    });

    res
      .status(201)
      .json({
        userProfileId: result[0],
        message: "User profile created successfully",
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to create new profile",
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("user_profile")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Profile with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete profile",
    });
  }
};

export { index, findOne, add, remove };
