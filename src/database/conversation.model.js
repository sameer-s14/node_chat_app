import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["group", "individual"],
      default: "individual",
      required: true,
    },
    name: {
      type: String,
      required: false, // for groups only
    },
  },
  { timestamps: true }
);

export const Conversations = model("conversations", conversationSchema);
