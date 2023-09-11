import { Users } from "../database";

export const getUsersList = async (req, res, next) => {
  try {
    const usersList = await Users.find({
      id: {
        $ne: req?.user?.id,
      },
    });
    return res.json({
      status: true,
      message: "success",
      data: usersList,
    });
  } catch (err) {
    return next(
      new ApiError("User controller :: getUsersList ::", err?.message)
    );
  }
};
