import { FriendshipStatusObj } from "../constants";
import { Friendships } from "../database";
import { createAlterQueryObj } from "../helpers";
import { ApiError } from "../utils";

export const sendRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findFriends = await Friendships.findOne({
      $or: createAlterQueryObj(id, req?.user?.id),
    });
    if (findFriends) {
      throw new Error("Can't send friend request");
    }
    await Friendships.create({
      senderId: req?.user?.id,
      receiverId: id,
    });
    return res.json({
      status: true,
      message: "Friend request sent",
      data: null,
    });
  } catch (err) {
    return next(
      new ApiError("Friends controller :: sendRequest ::", err?.message)
    );
  }
};

export const acceptRejectRequest = async (req, res, next) => {
  try {
    const { id: _id } = req.params; //Friendship primary id;
    const { status } = req?.body;
    const { id: userId } = req?.user;
    if (!status) {
      throw new Error("Status is required");
    }
    const findFriends = await Friendships.findOne({
      _id,
      status: FriendshipStatusObj.PENDING,
    });
    if (!findFriends) {
      throw new Error("Friend request not found");
    }
    if (findFriends?.receiverId != userId) {
      throw new Error("You cant accept or reject request");
    }
    findFriends.status = status
      ? FriendshipStatusObj.ACCEPTED
      : FriendshipStatusObj.REJECTED;
    await findFriends.save();
    const message = "Friend request" + status ? "accepted" : "rejected";
    return res.json({
      status: true,
      message,
      data: null,
    });
  } catch (err) {
    return next(
      new ApiError("Friends controller :: acceptRejectRequest ::", err?.message)
    );
  }
};

export const removeFriend = async (req, res, next) => {
  try {
    const { id } = req.params; // userID
    const findFriends = await Friendships.findOne({
      $or: createAlterQueryObj(id, req?.user?.id),
      status: FriendshipStatusObj.PENDING,
    });
    if (!findFriends) {
      throw new Error("Friend request not found");
    }
    findFriends.status = FriendshipStatusObj.UN_FRIEND;
    await findFriends.save();
    return res.json({
      status: true,
      message: "Success",
      data: null,
    });
  } catch (err) {
    return next(
      new ApiError("Friends controller :: removeFriend ::", err?.message)
    );
  }
};

export const blockUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findFriends = await Friendships.findOne({
      $or: createAlterQueryObj(id, req?.user?.id),
    });
    if (findFriends.status === FriendshipStatusObj.BLOCKED) {
      throw new Error("User is already blocked");
    }
    if (findFriends) {
      findFriends.status = FriendshipStatusObj.BLOCKED;
      await findFriends.save();
    } else {
      await Friendships.create({
        senderId: req?.user?.id,
        receiverId: id,
        status: FriendshipStatusObj.BLOCKED,
      });
    }
    return res.json({
      status: true,
      message: "User Blocked Successfully",
      data: null,
    });
  } catch (err) {
    return next(
      new ApiError("Friends controller :: blockUser ::", err?.message)
    );
  }
};

export const getRequests = async (req, res, next) => {
  try {
    const request = await Friendships.find({
      receiverId: req.user?.id,
    });
    return res.json({
      status: true,
      message: "Friend request Found",
      data: request,
    });
  } catch (err) {
    return next(
      new ApiError("Friends controller :: getRequests ::", err?.message)
    );
  }
};
