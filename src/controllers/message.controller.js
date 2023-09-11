import { Types } from "mongoose";
import { Conversations, Messages } from "../database";
import { createAlterQueryObj } from "../helpers";
import { ApiError } from "../utils";

export const sendMessage = async (req, res, next) => {
  try {
    const { id: userId } = req?.user;
    const { contentType, content, conversationId, receiverId } = req?.body;

    const messageObj = {
      senderId: userId,
      content,
      type: contentType,
    };
    if (receiverId) {
      messageObj.receiverId = receiverId;
      const messageFound = await Messages.findOne({
        $or: createAlterQueryObj(receiverId, userId),
      });
      if (messageFound) {
        messageObj.conversationId = messageFound?.conversationId;
      } else {
        const createConversation = await Conversations.create({
          type: "individual",
        });
        messageObj.conversationId = createConversation?.id;
      }
    } else {
      messageObj.conversationId = conversationId;
    }
    await Messages.create(messageObj);
    return res.json({
      status: true,
      message: "Success",
      data: {
        conversationId: messageObj.conversationId,
      },
    });
  } catch (err) {
    return next(
      new ApiError("Message controller :: sendMessage ::", err?.message)
    );
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { id } = req.params; // conversationId;
    const messages = await Messages.find({ conversationId: id });
    return res.json({
      status: true,
      message: "Success",
      data: messages,
    });
  } catch (err) {
    return next(
      new ApiError("Message controller :: getMessages ::", err?.message)
    );
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const { userId } = req?.user;
    const messages = await Messages.aggregate([
      {
        $match: {
          $or: [
            { senderId: Types.ObjectId(userId) },
            { receiverId: Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: { sentOn: -1 },
      },
      {
        $group: {
          _id: "conversationId",
          message: { $first: "$$ROOT" },
        },
      },
    ]);
    return res.json({
      status: true,
      message: "Success",
      data: messages,
    });
  } catch (err) {
    return next(
      new ApiError("Message controller :: getConversation ::", err?.message)
    );
  }
};
