import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";
import { getUserProfileAPI } from "../../services/userServices";
import { useQuery } from "@tanstack/react-query";
import AlertMessage from "../Alert/AlertMessage";

const ContentHistory = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryFn: getUserProfileAPI,
        queryKey: ["getUserProfile"],
    });

    if (isLoading) {
        return <AlertMessage type="loading" message="Loading please wait..." />;
    }
    if (isError) {
        return (
            <AlertMessage
                type="error"
                message={error?.response?.data?.error?.message}
            />
        );
    }

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
                    Content Generation History
                </h2>
                
                <Link
                    to="/generate-content"
                    className="mb-4 w-72 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 flex items-center"
                >
                    <FaPlusSquare className="mr-2" /> Create New Content
                </Link>

                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    {data?.user?.contentHistory?.length <= 0 ? (
                        <h1>NO HISTORY FOUND</h1>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            
                            {data?.user?.contentHistory?.map((content) => {
                                return (
                                    <li
                                        key={content._id}
                                        className="px-6 py-4 flex items-center justify-between space-x-4"
                                        // className="px-6 py-4 flex items-center justify-between space-x-4 transition duration-300 ease-in-out hover:shadow-lg cursor-pointer"
                                        // onClick={() =>
                                        //     (window.location.href = `/history-details/${content._id}`)
                                        // }
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {content?.content}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(
                                                    content?.createdAt
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                        {/* <div className="flex items-center space-x-4">
                                            <FaEye className="text-green-500 hover:text-green-600 cursor-pointer" />
                                            <FaTrashAlt className="text-red-500 hover:text-red-600 cursor-pointer" />
                                        </div> */}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentHistory;
