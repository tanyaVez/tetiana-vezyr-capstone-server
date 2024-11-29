import express from "express";
import * as skillController from "../controllers/skill-controller.js";

const skillsRouter = express.Router();

skillsRouter.route("/").get(skillController.getAllSkills);

// skillsRouter
// .route("/profiles/:profileId/skills")
// .get(skillController.getSkillsForUserProfile)
// .put(skillController.updateSkillsForUserProfile)


export default skillsRouter;


