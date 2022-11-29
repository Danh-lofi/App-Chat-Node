import express from "express";
import FriendController from "../app/controllers/FriendController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

const routerFriend = express.Router();

// friend
routerFriend.get(
  "/get-all-friend",
  authMiddleware.isAuth,
  FriendController.getAllFriend
);
routerFriend.get("/", authMiddleware.authApp, FriendController.getAllFriend);
routerFriend.get("/:username", FriendController.getUserByUsername);
routerFriend.get("/id/:id", FriendController.getUserById);
routerFriend.post(
  "/deleteFriend",
  authMiddleware.isAuth,
  FriendController.deleteFriend
);

export default routerFriend;
