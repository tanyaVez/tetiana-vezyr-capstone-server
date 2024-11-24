import express from "express";
import * as profileController from "../controllers/profile-controller.js";

const profilesRouter = express.Router();

profilesRouter
  .route("/")
  .get(profileController.index)
  .post(profileController.add);


profilesRouter
  .route("/:id")
  .get(profileController.findOne)
  .delete(profileController.remove);


export default profilesRouter;
