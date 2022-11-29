import express from "express";
import CloudinaryController from "../app/controllers/CloudinaryController.js";
import UserController from "../app/controllers/UserController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

const routerUser = express.Router();
// /user
routerUser.post(
  "/update",
  authMiddleware.isAuth,
  CloudinaryController.uploadAvatar,
  UserController.update
);

routerUser.get("/:username.:idGroup", UserController.findUserExistInGroup);
routerUser.post("/m-update", authMiddleware.isAuth, UserController.update);
routerUser.get(
  "/getProfileUserFromId/:id",
  UserController.getProfileUserFromId
);

export default routerUser;
