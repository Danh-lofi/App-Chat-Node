import express from "express";
import ChatController from "../app/controllers/ChatController.js";
const routerChat = express.Router();
//chat
routerChat.post("/createChat", ChatController.createChat);
routerChat.get("/:senderId.:recieverId", ChatController.findChat);
routerChat.get("/:groupId", ChatController.findGroupChat);

export default routerChat;
