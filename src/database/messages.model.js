import { model, Schema } from "mongoose";
import { messageContentType } from "../constants";

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: "Conversations",
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      enum: messageContentType,
      default: "text",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    sentOn: {
      type: Date,
      default: Date.now,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Messages = model("message_schema", messageSchema);
