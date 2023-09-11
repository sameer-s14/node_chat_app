import { Schema, model } from "mongoose";
const fileSchema = new Schema(
  {
    messageID: {
      type: Schema.Types.ObjectId,
      ref: "Messages",
    },
    fileName: String,
    filePath: String,
  },
  {
    timestamps: true,
  }
);

export const Files = model("files", fileSchema);

