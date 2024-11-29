import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import profileValidator from "../validators/profileValidator.js";
import { deleteFileIfExists } from "../utils/file-utils.js";


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

    const userProfileId = profilesFound[0].id;

    const profileData = await knex("user_profile")
      .select("user_profile.*", "skills.name")
      .leftJoin("user_skills", "user_profile.id", "user_skills.user_profile_id")
      .leftJoin("skills", "user_skills.skill_id", "skills.id")
      .where("user_profile.id", userProfileId);

    const profile = profileData[0];
    profile.skills = profileData
      .map((row) => row.name)
      .filter((skill) => skill !== null);

    res.json(profile);
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

  const { user_id, role, name, bio, location, mode, experience, goals } =
    req.body;
  const profilePicture = req.file ? `/uploads/images/${req.file.filename}` : "";

  const profilesFound = await knex("user_profile").where({
    user_id: req.body.user_id,
  });

  if (profilesFound.length > 0) {
    return res.status(400).json({ message: "User already has a profile" });
  }

  try {
    const usersFound = await knex("user").where({ id: user_id });

    if (usersFound.length === 0) {
      res
        .status(400)
        .json({ message: `User with provided id ${user_id} doesn't exist.` });
      return;
    }

    const result = await knex("user_profile").insert({
      user_id,
      name,
      role,
      bio,
      location,
      profile_picture_url: profilePicture,
      mode,
      experience,
      goals,
    });

    res.status(201).json({
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

const update = async (req, res) => {
  const profilePicture = req.file
    ? `/images/${req.file.filename}`
    : null;

  try {
    const profilesFound = await knex("user_profile").where({
      user_id: req.params.id,
    });

    if (profilesFound.length === 0) {
      return res.status(400).json({
        message: `There is no profile for user with id: ${req.params.id}.`,
      });
    }

    const ownerId = req.userData.id;

    if (profilesFound[0].user_id.toString() !== ownerId.toString()) {
      return res
        .status(401)
        .send("User is not authorized to perform this action");
    }

    const updateData = { ...req.body };

    if (profilePicture) {
      deleteFileIfExists(profilesFound[0].profile_picture_url);
      updateData.profile_picture_url = profilePicture;
    }

    const rowsUpdated = await knex("user_profile")
      .where({ user_id: req.params.id })
      .update(updateData);

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `User Profile with ID ${req.params.id} not found`,
      });
    }

    const updatedProfile = await knex("user_profile").where({
      user_id: req.params.id,
    });

    res.status(200).json(updatedProfile[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to update profile for user with ID ${req.params.id}`,
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


export { index, findOne, add, update, remove };
