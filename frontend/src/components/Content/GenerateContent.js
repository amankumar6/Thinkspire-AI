import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfileAPI } from "../../services/userServices";
import AlertMessage from "../Alert/AlertMessage";
import { generateContentAPI } from "../../services/geminiServices";
import { formatContent } from "../../utils/formatContent";

const validationSchema = Yup.object({
    prompt: Yup.string().required("A prompt is required"),
    tone: Yup.string().required("Selecting a tone is required"),
    category: Yup.string().required("Selecting a category is required"),
});

const GenerateContent = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: getUserProfileAPI,
        queryKey: ["getUserProfile"],
    });

    const mutation = useMutation({ mutationFn: generateContentAPI });

    // Formik setup for handling form data
    const formik = useFormik({
        initialValues: {
            prompt: "",
            tone: "",
            category: "",
        },
        validationSchema,
        onSubmit: (values) => {
            mutation.mutate(
                `Generate a blog post based ${values.prompt}, ${values.category}, ${values.tone} in 200 words.`
            );
        },
    });

    if (isLoading) {
        return <AlertMessage type="loading" message="Loading please wait..." />;
    }
    if (isError) {
        return (
            <AlertMessage
                type="error"
                message={error?.response?.data?.message}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full p-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
                    AI Blog Post Generator
                </h2>

                {/* Alert messages */}
                {mutation?.isPending && (
                    <AlertMessage
                        type="loading"
                        message="Loading please wait..."
                    />
                )}
                {mutation?.isSuccess && (
                    <AlertMessage
                        type="success"
                        message="Content generation is successful"
                    />
                )}
                {mutation?.isError && (
                    <AlertMessage
                        type="error"
                        message={mutation?.error?.response?.data?.message}
                    />
                )}

                {/* Plan and Credits display */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm font-medium bg-green-100 text-green-800 px-4 py-2 rounded-full">
                        Plan: {data?.user?.subscriptionPlan}
                    </span>
                    <span className="text-sm font-medium bg-green-100 text-green-800 px-4 py-2 rounded-full">
                        Credits: {data?.user?.apiRequestCount} /{" "}
                        {data?.user?.monthlyRequestCount}
                    </span>
                </div>

                {/* Content generation form */}
                <form onSubmit={formik.handleSubmit} className="space-y-6 mt-8">
                    {/* Topic input field */}
                    <div>
                        <label
                            htmlFor="prompt"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Enter a topic or idea
                        </label>
                        <input
                            id="prompt"
                            type="text"
                            {...formik.getFieldProps("prompt")}
                            className="block w-full px-4 py-3 border-0 rounded-md focus:ring-2 focus:ring-indigo-500"
                            placeholder="E.g., The future of AI in healthcare"
                        />
                        {formik.touched.prompt && formik.errors.prompt && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.prompt}
                            </p>
                        )}
                    </div>

                    {/* Tone selection field */}
                    <div>
                        <label
                            htmlFor="tone"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Select Tone
                        </label>
                        <select
                            id="tone"
                            {...formik.getFieldProps("tone")}
                            className="block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Choose a tone...</option>
                            <option value="formal">Formal</option>
                            <option value="informal">Informal</option>
                            <option value="humorous">Humorous</option>
                        </select>
                        {formik.touched.tone && formik.errors.tone && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.tone}
                            </p>
                        )}
                    </div>

                    {/* Category selection field */}
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Select Category
                        </label>
                        <select
                            id="category"
                            {...formik.getFieldProps("category")}
                            className="block w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Choose a category...</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="business">Business</option>
                        </select>
                        {formik.touched.category && formik.errors.category && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.category}
                            </p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        className="block w-full py-3 px-6 rounded-md shadow-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Generate Content
                    </button>

                    {/* History link */}
                    <div className="text-center">
                        <Link
                            to="/history"
                            className="text-indigo-500 hover:underline"
                        >
                            View history
                        </Link>
                    </div>
                </form>

                {/* Generated content display */}
                {/* {mutation.isSuccess && (
                    <div className="mt-8 p-6 bg-gray-100 rounded-xl">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                            Generated Content:
                        </h3>
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {mutation.data}
                        </p>
                    </div>
                )} */}
                {mutation.isSuccess && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Generated Content:
                        </h3>
                        <div
                            className="text-gray-600 whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{
                                __html: formatContent(mutation.data),
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateContent;
