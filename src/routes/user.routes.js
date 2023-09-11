import { Router } from "express";
import { userController } from "../controllers";
import { checkJwt } from "../middlewares";
const userRouters = Router();

userRouters.get("/", checkJwt, userController.getUsersList);
export default userRouters;
