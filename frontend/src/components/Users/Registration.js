import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "../../AuthContext";
import { registerAPI } from "../../services/userServices";

// Validation schema
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
});

const Registration = () => {
    const navigate = useNavigate();
    const { isAuthenticated, loginUser } = useAuth();

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard");
    }, [isAuthenticated]);

    // mutations
    const { mutate, isPending, isError, isSuccess, error } = useMutation({
        mutationFn: registerAPI,
        mutationKey: ["registerAPI"],
    });
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutate(values);
            setTimeout(() => {
                navigate("/login");
            }, 500);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Create an Account
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Create an account to get free access for 3 days. No credit
                    card required.
                </p>

                {isPending && (
                    <AlertMessage type="loading" message="Loading..." />
                )}
                {isError && (
                    <AlertMessage
                        type="error"
                        message={error.response.data.message}
                    />
                )}
                {isSuccess && (
                    <AlertMessage
                        type="success"
                        message="Registration successful"
                    />
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Username input field */}
                    <div>
                        <label
                            htmlFor="username"
                            className="text-sm font-medium text-gray-700 block mb-2"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...formik.getFieldProps("username")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            placeholder="John Doe"
                        />
                        {formik.touched.username && formik.errors.username && (
                            <div className="text-red-500 mt-1">
                                {formik.errors.username}
                            </div>
                        )}
                    </div>

                    {/* Email input field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 block mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...formik.getFieldProps("email")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                            placeholder="you@example.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 mt-1">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    {/* Password input field */}
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700 block mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...formik.getFieldProps("password")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 mt-1">
                                {formik.errors.password}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>
                </form>
                <div className="text-sm mt-2">
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        Already have an account? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Registration;
