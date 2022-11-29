import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
    isImg: {
      type: Boolean,
    },
    isFileWord: {
      type: Boolean,
    },
    isFilePdf: {
      type: Boolean,
    },
    isFilePowP: {
      type: Boolean,
    },
    isFileExel: {
      type: Boolean,
    },
    type: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
