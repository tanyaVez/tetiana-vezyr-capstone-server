import initKnex from "knex";
import configuration from "../knexfile.js";
import userValidator from "../validators/userValidator.js";
import bcrypt from "bcryptjs";

const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
};

const findOne = async (req, res) => {
  try {
    const usersFound = await knex("user").where({ id: req.params.id });

    if (usersFound.length === 0) {
      return res.status(404).json({
        message: `User with ID ${req.params.id} not found`,
      });
    }

    const userData = usersFound[0];
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: `Unable to retrieve user data for user with ID ${req.params.id}`,
    });
  }
};

const add = async (req, res) => {
  const validationErrors = userValidator(req.body);

  if (validationErrors.length > 0) {
    res.status(400).json({ message: `${validationErrors.join(", ")}` });
    return;
  }

  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const user  = await knex("user").where({ email: normalizedEmail});

    if (user.length > 0) {
      res.status(400).json({ message: "An user with the provided email already exists." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      email: normalizedEmail,
      password: hashedPassword
    };

    const result = await knex("user").insert(newUser);

    const newUserId = result[0];
    const createdUser = await knex("user").where({ id: newUserId });

    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Unable to create new user",
    });
  }
};

const remove = async (req, res) => {
  try {
    const rowsDeleted = await knex("user")
      .where({ id: req.params.id })
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `User with ID ${req.params.id} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to delete user",
    });
  }
};

export { index, findOne, add, remove };
