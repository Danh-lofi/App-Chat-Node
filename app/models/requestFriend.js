import mongoose from "mongoose";

const RequestFriendSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RequestFriendModel = mongoose.model(
  "friendrequests",
  RequestFriendSchema
);
export default RequestFriendModel;
