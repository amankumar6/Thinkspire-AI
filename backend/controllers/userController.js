const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const userController = {
    // Register
    register: asyncHandler(async (req, res) => {
        const { username, email, password } = req.body;

        // validate
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("Please all fields are required");
        }

        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        newUser.trialExpires = new Date(
            new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
        );

        await newUser.save();

        res.json({
            message: "Registration Successful",
            user: {
                username,
                email,
            },
        });
    }),

    // Login
    login: asyncHandler(async (req, res) => {
        // get user data
        const { email, password } = req.body;

        // check if email is correct
        const user = await User.findOne({ email });

        // check if no user
        if (!user) {
            res.status(401);
            throw new Error("Invalid login credentials");
        }

        // compare password
        const ifPasswordMatch = await bcrypt.compare(password, user?.password);
        if (!ifPasswordMatch) {
            res.status(401);
            throw new Error("Invalid login credentials");
        }

        // Generate token
        const token = jwt.sign({ id: user?._id }, process.env.SECRET, {
            expiresIn: "3d",
        });

        // set the token into cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "PROD",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Logged In",
            user: {
                _id: user?.id,
                username: user?.username,
                email: user?.email,
            },
        });
    }),

    // Logout
    logout: asyncHandler(async (req, res) => {
        res.cookie("token", "", { maxAge: 1 });
        res.status(200).json({ message: "Logged out successfully" });
    }),

    // Profile
    profile: asyncHandler(async (req, res) => {
        const user = await User.findById(req?.user?.id)
            .select("-password")
            .populate("payments")
            .populate("contentHistory");

        if (user) {
            res.status(200).json({
                user,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    }),

    // Change password
    changeUserPassword: asyncHandler(async (req, res) => {
        const { newPassword } = req.body;

        const user = await User.findById(req.user);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        // Hash New Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        //ReSave
        await user.save({});

        res.json({
            message: "Your Password has been Changed successfully",
        });
    }),

    // Update User Profile
    updateUserProfile: asyncHandler(async (req, res) => {
        const { username, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user,
            {
                username,
                email,
            },
            {
                new: true,
            }
        );

        res.json({
            message: "User Profile has been Updated successfully",
            updatedUser,
        });
    }),

    //checkAuth
    checkAuth: asyncHandler(async (req, res) => {
        const decodedToken = jwt.verify(req.cookies.token, process.env.SECRET);
        if (decodedToken) {
            res.json({
                isAuthenticated: true,
            });
        } else {
            res.json({
                isAuthenticated: false,
            });
        }
    }),
};

module.exports = userController;
