const cron = require("node-cron");
const User = require("../models/User");

// check for TRAIL period daily and change it to FREE
cron.schedule("0 0 * * * *", async () => {
    try {
        const today = new Date();
        await User.updateMany(
            {
                trialActive: true,
                trialExpires: { $lt: today },
            },
            {
                trialActive: false,
                subscriptionPlan: "Free",
                monthlyRequestCount: 5,
            }
        );
    } catch (error) {
        console.log(error);
    }
});

// check for membership 
cron.schedule("0 0 1 * * *", async () => {
    try {
        const today = new Date();
        await User.updateMany(
            {
                subscriptionPlan: { $in: ["Premium", "Basic", "Free"] },
                nextBillingDate: { $lt: today },
            },
            {
                monthlyRequestCount: 0,
            }
        );
    } catch (error) {
        throw new Error(error);
    }
});
