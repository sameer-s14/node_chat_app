import { model, Schema } from "mongoose";
import { comparePassword, hashPassword } from "../utils";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified('password')) return next();
  const hash =await hashPassword(this.password);
  this.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const data = await comparePassword(password, this.password);
  return data;
};

export const Users = model("users", userSchema);
