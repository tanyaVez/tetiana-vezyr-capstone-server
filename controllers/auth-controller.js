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

  const { email, password, firstName, lastName, role } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const trx = await knex.transaction();
  try {
    const user  = await knex("user").where({ email: normalizedEmail});

    if (user.length > 0) {
      res.status(400).json({ message: "An user with the provided email already exists." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

    const [userId] = await trx('user').insert({
      email: normalizedEmail,
      password: hashedPassword,
    })
   
    await trx('user_profile').insert({
      user_id: userId,
      first_name: firstName,
      last_name: lastName,
      role,
    });

    await trx.commit();

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(201).send({ id: userId, token });
  } catch (error) {
    console.error(error)
    await trx.rollback();
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
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ id: user.id, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signup, login };
