import { Router } from "express";
import authRoutes from "./auth.routes";
import friendsRoutes from "./friends.routes";
import messageRouters from "./message.routes";
import userRouters from "./user.routes";

const baseRouter = Router();

baseRouter.use("/auth", authRoutes);
baseRouter.use("/friends", friendsRoutes);
baseRouter.use("/messages", messageRouters);
baseRouter.use("/users", userRouters);
export default baseRouter;
