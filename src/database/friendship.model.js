import { model, Schema } from "mongoose";
import { FriendshipStatus } from "../constants";

const friendshipSchema = new Schema(
  {
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
    status: {
      type: String,
      enum: FriendshipStatus,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

export const Friendships= model("friendship_schema", friendshipSchema);

