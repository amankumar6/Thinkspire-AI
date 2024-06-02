import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AlertMessage from "../Alert/AlertMessage";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../AuthContext";
import { loginAPI } from "../../services/userServices";

// Validation schema using Yup
const validationSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, loginUser } = useAuth();
    const from = location.state?.from?.pathname || "/dashboard";

    // Mutation
    const { mutate, isPending, isError, error, isSuccess } = useMutation({
        mutationFn: loginAPI,
        mutationKey: ["login"],
    });

    const formik = useFormik({
        initialValues: {
            email: "Kumar@gmail.com",
            password: "12345",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            mutate(values);
        },
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, from, navigate]);

    useEffect(() => {
        if (isSuccess) {
            loginUser();
        }
    }, [isSuccess, loginUser]);

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Login to Your Account
                </h2>

                {isPending && (
                    <AlertMessage type="loading" message="Loading..." />
                )}
                {isError && (
                    <AlertMessage
                        type="error"
                        message={error?.response?.data?.message}
                    />
                )}
                {isSuccess && (
                    <AlertMessage type="success" message="Login success" />
                )}

                {/* Form for login */}
                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Email input field */}
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700 block mb-2"
                        >
                            Your Email
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
                            Your Password
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

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link
                                to="/register"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
