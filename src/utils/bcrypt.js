import { hash, compare, genSalt } from "bcrypt";
import { BRCYPT_ROUNDS } from "../config";

export const hashPassword = (password) => hash(password, +BRCYPT_ROUNDS);

export const comparePassword = async (password, hash) =>
  compare(password, hash);
