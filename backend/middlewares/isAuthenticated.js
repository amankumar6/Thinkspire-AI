const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        req.user = await User.findById(decodedToken?.id).select("-password");
        return next();
    } else {
        return res
            .status(401)
            .json({ message: "Not authorized, Token expired" });
    }
});

module.exports = isAuthenticated;
