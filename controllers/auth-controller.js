import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
import userValidator from "../validators/userValidator.js";

const signup = async (req, res) => {
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

    const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

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

export { signup, login };
