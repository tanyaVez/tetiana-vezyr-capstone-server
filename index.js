import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();
const { PORT, CORS_ORIGIN } = process.env;

app.use(cors(CORS_ORIGIN));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Mentor&Mentee App!");

});

app.listen(PORT, () => console.log(`App running on port ${PORT}`));
