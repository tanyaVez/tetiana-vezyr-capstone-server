import express from "express";
import * as connectionController from "../controllers/connection-controller.js";
import checkAuth from "../middlewares/auth.js";

const connectionsRouter = express.Router();

connectionsRouter.use(checkAuth);

connectionsRouter.route("/:userId").get(checkAuth, connectionController.index)
connectionsRouter.route("/:userId/connect").post(checkAuth, connectionController.add)
connectionsRouter.route("/:userId/disconnect").delete(checkAuth, connectionController.remove)

export default connectionsRouter;
