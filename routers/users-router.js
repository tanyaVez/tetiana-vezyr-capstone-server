import express from "express";
import * as userController from "../controllers/user-controller.js";

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(userController.index)

usersRouter
  .route("/:id")
  .get(userController.findOne)
  .delete(userController.remove);


export default usersRouter;
