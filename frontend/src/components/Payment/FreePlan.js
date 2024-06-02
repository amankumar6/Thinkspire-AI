import { useMutation } from "@tanstack/react-query";
import React from "react";
import { handleFreeSubscriptionAPI } from "../../services/paymentServices";
import AlertMessage from "../Alert/AlertMessage";

const FreePlan = () => {
    const planDetails = {
        name: "Free",
        price: "$0.00/month",
        features: ["5 Credits", "1 User", "Basic Support"],
    };

    // Mutation
    const mutation = useMutation({ mutationFn: handleFreeSubscriptionAPI });

    // Handle confirm payment
    const handleConfirmClick = () => {
        mutation.mutate();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 flex justify-center items-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Confirm Your {planDetails.name} Plan
                </h2>

                {/* isError */}
                {mutation?.isError && (
                    <AlertMessage
                        type="error"
                        message={mutation?.error?.response?.data?.error}
                    />
                )}

                {/* isLoading */}
                {mutation?.isLoading && (
                    <AlertMessage
                        type="loading"
                        message="Loading please wait..."
                    />
                )}

                {/* isSuccess */}
                {mutation?.isSuccess && (
                    <AlertMessage
                        type="success"
                        message="Plan has been upgraded"
                    />
                )}

                <p className="text-center text-gray-600 mb-8">
                    Enjoy our free plan with no costs involved. Get started now
                    and upgrade anytime to access more features.
                </p>

                <ul className="space-y-3 text-gray-600 mb-8">
                    {planDetails.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <svg
                                className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 13l4 4L19 7"
                                ></path>
                            </svg>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>

                <div className="text-center text-green-600 font-bold mb-8">
                    {planDetails.price} - No Payment Required
                </div>

                <button
                    onClick={handleConfirmClick}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Confirm Free Plan: $0.00/month
                </button>
            </div>
        </div>
    );
};

export default FreePlan;
