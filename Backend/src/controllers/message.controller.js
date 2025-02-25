import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../../app.js";

const sendMessage = asyncHandler(async (req, res) => {
  try {
    const senderId = req?.user?._id;
    const receiverId = req?.params.id;
    const { message } = req.body;

    console.log(senderId);
    console.log(receiverId);
    console.log(message);

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);
    // await gotConversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    // console.log("receivedSocketId", receiverSocketId);
    try {
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
        console.log(`Message sent to socket ID: ${receiverSocketId}`);
      }
    } catch (error) {
      console.error(
        `Error sending message to socket ${receiverSocketId}:`,
        error
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(201, newMessage, "message sent "));
  } catch (error) {
    throw new ApiError(400, "Error in send Message", error);
  }
});

const getMessage = asyncHandler(async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req?.user?._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    throw new ApiError(400, "Error in getMessage", error);
  }
});

export { sendMessage, getMessage };
