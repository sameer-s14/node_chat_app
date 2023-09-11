import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateToken = (payload) => JWT.sign(payload, JWT_SECRET);
export const verifyToken = (token) => JWT.verify(token, JWT_SECRET);