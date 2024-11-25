import initKnex from "knex";
import configuration from "../knexfile.js";
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

export { index, findOne, remove };
