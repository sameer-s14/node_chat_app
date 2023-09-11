import Joi from "joi";
import { messageContentType } from "../constants";

export const sendMessageSchema = Joi.object({
  content: Joi.string().required(),
  contentType: Joi.string()
    .required()
    .valid(...messageContentType),
  conversationId: Joi.string(),
  receiverId: Joi.string(),
}).or("conversationId", "receiverId");
