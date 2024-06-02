const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const User = require("../models/User");
const Payment = require("../models/Payment");
const renewPlan = require("../utils/renewPlan");
const nextPaymentDate = require("../utils/nextPaymentDate");

const paymentController = {
    // handle payment
    handlePayment: asyncHandler(async (req, res) => {
        const { amount, subscriptionPlan } = req.body;
        const user = req?.user;

        try {
            // create stripe payment intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Number(amount) * 100,
                statement_descriptor_suffix: `Payment of RS${amount} using Stripe`,
                currency: "inr",
                metadata: {
                    userId: user?._id?.toString(),
                    userEmail: user?.email,
                    subscriptionPlan,
                },
            });

            res.json({
                message: "Success",
                clientSecret: paymentIntent?.client_secret,
                paymentId: paymentIntent?.id,
                metadata: paymentIntent?.metadata,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: error });
        }
    }),

    // verify payment
    verifyPayment: asyncHandler(async (req, res) => {
        const { paymentId } = req.params;
        try {
            // get payment intent
            const paymentIntent = await stripe.paymentIntents.retrieve(
                paymentId
            );

            // check if payment intent is succeeded or not
            if (paymentIntent.status === "succeeded") {
                const metadata = paymentIntent?.metadata;

                const subscriptionPlan = metadata?.subscriptionPlan;
                const userId = metadata?.userId;

                const user = await User.findById(userId);

                if (!user) {
                    return res.status(404).json({
                        message: "User not found",
                    });
                }

                // create payment in DB
                const newPayment = await Payment.create({
                    user: userId,
                    reference: paymentIntent?.id,
                    currency: paymentIntent?.currency,
                    status: "success",
                    subscriptionPlan,
                    amount: paymentIntent?.amount / 100,
                    monthlyRequestCount: 5,
                });

                if (subscriptionPlan === "Basic") {
                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        {
                            subscriptionPlan,
                            trialPeriod: 0,
                            nextBillingDate: nextPaymentDate(),
                            apiRequestCount: 0,
                            monthlyRequestCount: 50,
                            $addToSet: { payments: newPayment?._id },
                        },
                        { new: true }
                    );

                    res.json({
                        status: true,
                        message: "Payment verified, user updated",
                        updatedUser,
                    });
                }
                if (subscriptionPlan === "Premium") {
                    const updatedUser = await User.findByIdAndUpdate(
                        userId,
                        {
                            subscriptionPlan,
                            trialPeriod: 0,
                            nextBillingDate: nextPaymentDate(),
                            apiRequestCount: 0,
                            monthlyRequestCount: 100,
                            $addToSet: { payments: newPayment?._id },
                        },
                        { new: true }
                    );

                    res.json({
                        status: true,
                        message: "Payment verified, user updated",
                        updatedUser,
                    });
                }
            }
            res.json({ paymentIntent });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }),

    // handle Rs 0 payment
    handleFreeSub: asyncHandler(async (req, res) => {
        const user = req?.user;

        try {
            // check if user account should be renew or not
            const shouldRenew = renewPlan(user);
            if (shouldRenew) {
                user.subscriptionPlan = "Free";
                user.monthlyRequestCount = 5;
                user.apiRequestCount = 0;
                user.nextBillingDate = nextPaymentDate();
                user.trialActive = false;
                // user.trialExpires = new Date(0);

                // create payment in DB
                const newPayment = await Payment.create({
                    user: user?._id,
                    reference: Math.random().toString(36).substring(7),
                    currency: "inr",
                    status: "success",
                    subscriptionPlan: "Free",
                    amount: 0,
                    monthlyRequestCount: 5,
                });

                // update user in DB
                user.payments.push(newPayment?._id);
                await user.save();

                res.json({
                    message: "Subscription Plan Updated",
                    user,
                });
            } else {
                return res
                    .status(403)
                    .json({ error: "Subscription renewal not due yet" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }),
};

module.exports = paymentController;
