const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: ".env" });
const cookieParser = require("cookie-parser");

const connectDB = require("./utils/connectDB");
const userRouter = require("./routers/userRouter");
const paymentRouter = require("./routers/paymentRouter");
const geminiAIRouter = require("./routers/geminiAIRouter");
const errorHandler = require("./middlewares/errorHandlers");
require("./utils/checkTrialPeriod");

const app = express();

// MongoDB Connection
connectDB();

// CORS config
const corsOptions = {
    origin: process.env.FRONT_END,
    credentials: true,
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Router
app.use("/api/v1/users", userRouter);
app.use("/api/v1/gemini", geminiAIRouter);
app.use("/api/v1/payment", paymentRouter);

// Error Handling
app.use(errorHandler.notFound);

if (app.get("env") === "DEVELOPMENT") {
    app.use(errorHandler.developmentErrors);
}

app.use(errorHandler.productionErrors);

// start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
