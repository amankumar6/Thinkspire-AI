const express = require("express");

const isAuthenticated = require("../middlewares/isAuthenticated");
const paymentController = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post(
    "/checkout",
    isAuthenticated,
    paymentController.handlePayment
);
paymentRouter.post(
    "/free-plan",
    isAuthenticated,
    paymentController.handleFreeSub
);
paymentRouter.post(
    "/verify-payment/:paymentId",
    isAuthenticated,
    paymentController.verifyPayment
);

module.exports = paymentRouter;
