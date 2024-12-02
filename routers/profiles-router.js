import express from "express";
import * as profileController from "../controllers/profile-controller.js";
import imageUpload from "../middlewares/imageUpload.js";
import checkAuth from "../middlewares/auth.js";
import resizeImage from "../middlewares/resizeImage.js";

const profilesRouter = express.Router();

profilesRouter
  .route("/")
  .get(checkAuth, profileController.index)
  .post(checkAuth, imageUpload.single("profilePicture"), profileController.add);


profilesRouter
  .route("/:id")
  .get(checkAuth, profileController.findOne)
  .patch(checkAuth, imageUpload.single("profilePicture"), resizeImage, profileController.update)
  .delete(checkAuth, profileController.remove);

profilesRouter
  .route("/:id/skills")
  .post(checkAuth, profileController.addSkills)



export default profilesRouter;
