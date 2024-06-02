import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUserProfileAPI } from "../../services/userServices";
import AlertMessage from "../Alert/AlertMessage";

const Dashboard = () => {
    const { isError, isLoading, data, error } = useQuery({
        queryFn: getUserProfileAPI,
        queryKey: ["getUserProfile"],
    });

    if (isLoading) {
        return <AlertMessage type="loading" message="Loading please wait..." />;
    } else if (isError) {
        return (
            <AlertMessage
                type="error"
                message={error?.response?.data?.message}
            />
        );
    }

    return (
        <div className="mx-auto p-6 bg-gray-900 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-blue-500">
                User Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Profile Section */}
                <div className="bg-white p-6 shadow-lg rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Profile Information
                    </h2>
                    <div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="username"
                            >
                                Name
                            </label>
                            <p
                                className="border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight"
                                id="username"
                            >
                                {data?.user?.username}
                            </p>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <p
                                className="border rounded-lg w-full py-2 px-4 text-gray-700 leading-tight"
                                id="email"
                            >
                                {data?.user?.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Credit Usage Section */}
                <div className="bg-white p-6 shadow-lg rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Credit Usage
                    </h2>
                    <div>
                        <p className="mb-4 text-lg">
                            <span className="font-semibold">
                                Monthly Credit:
                            </span>{" "}
                            {data?.user?.monthlyRequestCount}
                        </p>
                        <p className="mb-4 text-lg">
                            <span className="font-semibold">Credit Used:</span>{" "}
                            {data?.user?.apiRequestCount}
                        </p>
                        <p className="mb-4 text-lg">
                            <span className="font-semibold">
                                Credit Remaining:
                            </span>{" "}
                            {data?.user?.monthlyRequestCount -
                                data?.user?.apiRequestCount}
                        </p>
                        <p className="mb-4 text-lg">
                            <span className="font-semibold">
                                Next Billing Date:
                            </span>{" "}
                            {data?.user?.nextBillingDate
                                ? new Date(
                                      data?.user?.nextBillingDate
                                  ).toLocaleDateString("en-GB")
                                : "No Billing date"}
                        </p>
                    </div>
                </div>

                {/* Payment and Plans Section */}
                <div className="bg-white p-6 shadow-lg rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Payment & Plans
                    </h2>
                    <div>
                        <p className="mb-4 text-lg">
                            <span className="font-semibold">Current Plan:</span>{" "}
                            {data?.user?.subscriptionPlan}
                        </p>
                        {data?.user?.subscriptionPlan === "Trial" && (
                            <p className="border mb-2 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight">
                                Trial: 1000 monthly requests
                            </p>
                        )}

                        {data?.user?.subscriptionPlan === "Free" && (
                            <p className="border mb-2 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight">
                                Free: 5 monthly requests
                            </p>
                        )}
                        {data?.user?.subscriptionPlan === "Basic" && (
                            <p className="border mb-2 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight">
                                Basic: 50 monthly requests
                            </p>
                        )}
                        {data?.user?.subscriptionPlan === "Premium" && (
                            <p className="border mb-2 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight">
                                Premium: 100 monthly requests
                            </p>
                        )}
                        <Link
                            to="/plans"
                            className="py-2 px-4 mt-4 inline-block border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Upgrade Plan
                        </Link>
                    </div>
                </div>

                {/* Trial Information Section */}
                <div className="bg-white p-6 shadow-lg rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        Trial Information
                    </h2>
                    <div>
                        <p className="mb-4 text-lg">
                            <span className="font-semibold">Trial Status:</span>{" "}
                            {data?.user?.trialActive ? (
                                <span className="text-green-500">Active</span>
                            ) : (
                                <span className="text-yellow-600">
                                    Inactive
                                </span>
                            )}
                        </p>
                        <p className="mb-4 text-lg">
                            <span className="font-semibold">Expires on:</span>{" "}
                            {new Date(data?.user?.trialExpires).toDateString()}
                        </p>
                        <Link
                            to="/plans"
                            className="py-2 px-4 mt-4 inline-block border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Upgrade to Premium
                        </Link>
                    </div>
                </div>

                {/* History Section */}
                <div className="bg-white p-6 shadow-lg rounded-2xl col-span-1 md:col-span-2 lg:col-span-3">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
                        Payment History
                    </h2>
                    {data?.user?.payments?.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {data?.user?.payments?.map((payment) => (
                                <li
                                    key={payment._id}
                                    className="py-4 hover:bg-gray-50 transition duration-150 ease-in-out"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between">
                                        <div className="mb-2 sm:mb-0">
                                            <p className="text-lg font-semibold text-indigo-600">
                                                {payment?.subscriptionPlan}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    payment?.createdAt
                                                ).toDateString()}
                                            </p>
                                        </div>
                                        <div className="flex items-center">
                                            <p
                                                className={`text-lg font-semibold ${
                                                    payment?.status ===
                                                    "succeeded"
                                                        ? "text-green-500"
                                                        : "text-orange-500"
                                                }`}
                                            >
                                                {payment?.status}
                                            </p>
                                            <p className="text-lg text-gray-700 ml-4">
                                                $ {payment?.amount}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <h1 className="text-lg text-gray-700">
                            No Payment History
                        </h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
