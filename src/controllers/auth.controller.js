import { Users } from "../database";
import { ApiError, generateToken } from "../utils";

export const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const userFound = await Users.findOne({ email });
    if (userFound) {
      throw new Error("User Already Registered");
    }
    await Users.create({ email: email, name: name, password: password });
    return res.json({
      status: true,
      message: "User Registered",
      data: null,
    });
  } catch (err) {
    return next(new ApiError("Auth controller :: register ::", err?.message));
  }
};

export const login = async (req, res,next ) => {
  try {
    const { email, password } = req.body;
    const userFound = await Users.findOne({ email }).select('password');
    if (!userFound) {
      throw new Error("email/password is invalid");
    }
    if (!(await userFound?.comparePassword(password))) {
      throw new Error("email/password is invalid");
    }
    const token = generateToken({ id: userFound?.id });
    return res.json({
      status: true,
      message: "Login successful",
      data: { token },
    });
  } catch (err) {
    return next(new ApiError("Auth controller :: login ::", err?.message));
  }
};
