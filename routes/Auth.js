import express from "express";
import UserController from "../app/controllers/AuthController.js";
import authMiddleware from "../app/middleware/authMiddleware.js";

const routerAuth = express.Router();
routerAuth.get("/getAllUser", UserController.getAllUser);
routerAuth.post("/login", UserController.login);
routerAuth.post("/register", UserController.register);
routerAuth.post("app/register", UserController.registerApp);
routerAuth.post("/register/info", UserController.registerInfomation);
routerAuth.post("/register/verify", UserController.verifyUsername);
routerAuth.post("/refresh", UserController.refreshToken);
routerAuth.post("/forgot/verify", UserController.existUsername);
routerAuth.post("/forgot/reset-password", UserController.resetPassword);
routerAuth.post("/change-password", UserController.changePassword);
routerAuth.get("/profile", authMiddleware.isAuth, UserController.profile);
routerAuth.get("/me", authMiddleware.authApp, UserController.me);
export default routerAuth;
