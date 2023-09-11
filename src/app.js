import express from "express";
import baseRouter from "./routes";
import { errorHandler } from "./utils";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", baseRouter);
app.use("*", (_req, res) => {
  return res.json({
    status: true,
    data: null,
    message: "Server running fine !!",
  });
});
app.use(errorHandler);

export default app;
