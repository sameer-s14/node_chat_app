import { Router } from "express";
import { authController } from "../controllers";
import { loginSchema, registerSchema, validateReq } from "../validations";

const authRoutes = Router();

authRoutes.post(
  "/register",
  validateReq(registerSchema),
  authController.register
);
authRoutes.post("/login", validateReq(loginSchema), authController.login);

export default authRoutes;
