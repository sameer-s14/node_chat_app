import joi from "joi";

export const loginSchema = joi.object({
  email: joi.string().email().required().label('Email'),
  password: joi.string().min(5).max(20).required(),
});

export const registerSchema = loginSchema.keys({
  name: joi.string().required(),
});
