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
  {
    id: 5,
    email: "mentor3@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 6,
    email: "mentee3@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 7,
    email: "mentor4@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 8,
    email: "mentee4@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 9,
    email: "mentor5@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 10,
    email: "mentee5@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 11,
    email: "mentor6@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 12,
    email: "mentee6@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 13,
    email: "mentor7@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 14,
    email: "mentee7@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 15,
    email: "mentor8@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 16,
    email: "mentee8@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 17,
    email: "mentor9@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 18,
    email: "mentee9@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 19,
    email: "mentor10@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  },
  {
    id: 20,
    email: "mentee10@example.com",
    password: bcrypt.hashSync("password123", saltRounds),
  }
];

export default users;
