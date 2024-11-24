import "dotenv/config";
import express from "express";
import cors from "cors";
import usersRouter from "./routers/users-router.js";
import profilesRouter from "./routers/profiles-router.js"

const app = express();
const { PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));

app.use(express.json());

app.use("/users", usersRouter);
app.use("/profiles", profilesRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Mentor&Mentee App!");

});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
