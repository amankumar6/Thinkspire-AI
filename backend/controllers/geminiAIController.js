const asyncHandler = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const ContentHistory = require("../models/ContentHistory");
const User = require("../models/User");

const geminiAIController = asyncHandler(async (req, res) => {
    try {
        const { prompt } = req.body;

        // Gemini Config
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const generationConfig = {
            maxOutputTokens: 500,
            temperature: 0.9,
            topP: 0.1,
            topK: 16,
        };

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig,
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        if (!text) {
            return res.status(400).send("Generated content is empty.");
        }

        // create new content
        const newContent = await ContentHistory.create({
            user: req?.user?._id,
            content: text,
        });

        // update user
        const user = await User.findById(req?.user?.id);
        user.contentHistory.push(newContent?._id);
        user.apiRequestCount += 1;
        await user.save();

        res.status(200).json({
            message: "success",
            answer: text,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to generate content");
    }
});

module.exports = { geminiAIController };
