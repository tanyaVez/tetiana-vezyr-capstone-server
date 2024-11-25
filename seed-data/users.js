import bcrypt from "bcryptjs";

const saltRounds = 10;

const users = [
  {
    id: 1,
    email: "mentor1@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 2,
    email: "mentee1@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 3,
    email: "mentor2@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 4,
    email: "mentee2@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
];

export default users;
