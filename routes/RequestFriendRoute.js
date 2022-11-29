import express from "express";
import FriendController from "../app/controllers/FriendController.js";
import RequestFriendController from "../app/controllers/RequestFriendController.js";
import UserController from "../app/controllers/UserController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";
const routerRequestFriend = express.Router();
// /request-friend
routerRequestFriend.get(
  "/:id",
  RequestFriendController.getListRequest,
  UserController.getListUserFromId
);
routerRequestFriend.post("/accept", RequestFriendController.acceptFriend);
routerRequestFriend.post("/decline", RequestFriendController.declineFriend);
routerRequestFriend.post("/send", RequestFriendController.sendRequestFriend);
// Tìm và kiểm tra user có gửi lời mời chưa
// accessToken,username
routerRequestFriend.get(
  "/check/:username",
  authMiddleware.isAuth,
  FriendController.getUserByUsername,
  RequestFriendController.checkRequestFriend
);

export default routerRequestFriend;
