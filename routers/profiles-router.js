import express from "express";
import * as profileController from "../controllers/profile-controller.js";
import imageUpload from "../middlewares/imageUpload.js";

const profilesRouter = express.Router();

profilesRouter
  .route("/")
  .get(profileController.index)
  .post(imageUpload.single("profilePicture"), profileController.add);


profilesRouter
  .route("/:id")
  .get(profileController.findOne)
  .patch(imageUpload.single("profilePicture"), profileController.update)
  .delete(profileController.remove);


export default profilesRouter;
