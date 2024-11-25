import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex("user")
      .where({ email: email.trim().toLowerCase() })
      .first();

    if (!user) {
      return res
        .status(401)
        .json({ message: "User with provided email doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { login };
