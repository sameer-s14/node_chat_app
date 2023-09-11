import { config } from "dotenv";
config();

export const { PORT, DB_URI, JWT_SECRET, BRCYPT_ROUNDS } = process.env;
