const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { geminiAIController } = require("../controllers/geminiAIController");
const checkApiRequestLimit = require("../middlewares/checkAPIRequestLimit");

const geminiAIRouter = express.Router();

geminiAIRouter.post(
    "/generateContent",
    isAuthenticated,
    checkApiRequestLimit,
    geminiAIController
);

module.exports = geminiAIRouter;
