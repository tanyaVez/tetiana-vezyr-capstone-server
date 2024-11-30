import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (req, res) => {
  const userId = req.params.userId;
  try {
    const profilesFound = await knex("user_profile").where({ user_id: userId });

    if (profilesFound.length === 0) {
      return res.status(404).json({
        message: `Profile for user with ID ${req.params.id} not found`,
      });
    }

    const connections = await knex("connections")
      .where(function () {
        this.where("connections.sender_id", userId).orWhere(
          "connections.receiver_id",
          userId
        );
      })
      .select(
        "connections.id",
        "connections.sender_id",
        "connections.receiver_id"
      );

    const filteredIds = connections
      .map((conn) => {
        if (conn.sender_id == userId) {
          return conn.receiver_id;
        }
        if (conn.receiver_id == userId) {
          return conn.sender_id;
        }
        return null;
      })
      .filter((conn) => conn !== null);

    const connectedProfiles = await knex("user_profile").whereIn(
      "user_id",
      filteredIds
    );

    res.json(connectedProfiles);
  } catch (error) {
    res.status(500).send(error);
  }
};

const add = async (req, res) => {
  const userId = req.params.userId;
  const { receiverUserId } = req.body;

  if (!receiverUserId) {
    res.status(400).json({ message: "The userId to connect with is missing." });
    return;
  }

  if (userId == receiverUserId) {
    res
      .status(400)
      .json({ message: "User and the user to connect with are the same." });
    return;
  }

  try {
    const senderProfile = await knex("user_profile")
      .where({ user_id: userId })
      .first();
    const receiverProfile = await knex("user_profile")
      .where({ user_id: receiverUserId })
      .first();

    if (!senderProfile) {
      return res.status(404).json({ message: "Profile doesn't exist" });
    }

    if (!receiverProfile) {
      res.status(404).json({ message: "Receiver profile doesn't exist" });
      return;
    }

    const sortedIds = [userId, receiverUserId].sort().join("-");

    const existingConnection = await knex("connections")
      .where("sorted_sender_receiver", sortedIds)
      .first();

    if (existingConnection) {
      res.status(400).json({ message: "Already connected with this user" });
      return;
    }

    await knex("connections").insert([
      {
        sender_id: userId,
        receiver_id: receiverUserId,
        sorted_sender_receiver: sortedIds,
      },
    ]);

    res.status(201).json({ message: "Connection added successfully" });
  } catch (error) {
    console.error;
    res.status(500).json({ message: "Error adding connection" });
  }
};

const remove = async (req, res) => {
  const userId = req.params.userId;
  const { receiverUserId } = req.query;

  if (!receiverUserId) {
    res.status(400).json({ message: "The userId to connect with is missing." });
    return;
  }

  try {
    const senderProfile = await knex("user_profile")
      .where({ user_id: userId })
      .first();
    const receiverProfile = await knex("user_profile")
      .where({ user_id: receiverUserId })
      .first();

    if (!senderProfile) {
      return res.status(404).json({ message: "Profile doesn't exist" });
    }

    if (!receiverProfile) {
      res.status(404).json({ message: "Receiver profile doesn't exist" });
      return;
    }

    const sortedIds = [userId, receiverUserId].sort().join("-");

    const rowsDeleted = await knex("connections")
      .where("sorted_sender_receiver", sortedIds)
      .delete();

    if (rowsDeleted === 0) {
      return res
        .status(404)
        .json({ message: `Connection for ${sortedIds} not found` });
    }

    res.sendStatus(204);
  } catch (error) {
    await trx.rollback();
    res.status(500).send(error);
  }
};

export { index, add, remove };
