import { ApiError } from "../utils";

export const validateReq =
  (schema, type = "body") =>
  (req, _res, next) => {
    try {
      const { error } = schema.validate(req[type]);
      if (error) {
        const message = error?.details[0]?.message?.replace(/\"/g,'') ?? "Validation error: ";
        throw new Error(message);
      }
      next();
    } catch (err) {
      return next(new ApiError("Validation Error ::", err?.message));
    }
  };
