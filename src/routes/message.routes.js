import { Router } from "express";
import { messageController } from "../controllers";
import { checkJwt } from "../middlewares";
import { sendMessageSchema, validateReq } from "../validations";

const messageRouters = Router();

messageRouters.get("/", checkJwt, messageController.getMessages);
messageRouters.post(
  "/",
  checkJwt,
  validateReq(sendMessageSchema),
  messageController.sendMessage
);
messageRouters.get(
  "/conversation",
  checkJwt,
  messageController.getConversation
);

export default messageRouters;
