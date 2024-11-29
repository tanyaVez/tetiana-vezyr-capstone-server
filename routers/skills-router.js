import express from "express";
import * as skillController from "../controllers/skill-controller.js";

const skillsRouter = express.Router();

skillsRouter.route("/").get(skillController.getAllSkills);

export default skillsRouter;


