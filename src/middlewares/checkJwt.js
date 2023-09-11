import { ApiError, verifyToken } from "../utils";

export const checkJwt = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) throw new Error();
    req.user = verifyToken(token);
    next();
  } catch (err) {
    console.log("🚀 ~ checkJwt ~ err:", err?.message);
    return next(new ApiError("Middleware :: checkJwt ::", "UN_AUTHORIZED"));
  }
};
