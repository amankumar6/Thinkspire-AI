const express = require("express");
const userController = require("../controllers/userController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const userRouter = express.Router();

// Register
userRouter.post("/register", userController.register);

// Login
userRouter.post("/login", userController.login);

// Logout
userRouter.post("/logout", userController.logout);

// Profile
userRouter.get("/profile", isAuthenticated, userController.profile);

// Change Password
userRouter.put(
    "/changePassword",
    isAuthenticated,
    userController.changeUserPassword
);

// Update Profile
userRouter.put(
    "/updateProfile",
    isAuthenticated,
    userController.updateUserProfile
);

// Check Auth
userRouter.get("/auth", isAuthenticated, userController.checkAuth);

module.exports = userRouter;
