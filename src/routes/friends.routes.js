import { Router } from "express";
import { friendsController } from "../controllers";
import { checkJwt } from "../middlewares";

const friendsRoutes = Router();

friendsRoutes.get("/", checkJwt, friendsController.getRequests);
friendsRoutes.get("/send/:id", checkJwt, friendsController.sendRequest);
friendsRoutes.post(
  "/accept-reject/:id",
  checkJwt,
  friendsController.acceptRejectRequest
);
friendsRoutes.get("/remove/:id", checkJwt, friendsController.removeFriend);
friendsRoutes.get("/block/:id", checkJwt, friendsController.blockUser);

export default friendsRoutes;
