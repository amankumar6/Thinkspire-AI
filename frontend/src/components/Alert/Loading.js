import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full rounded-full bg-blue-500 opacity-50"></div>
                <div className="absolute top-0 left-0 w-1/2 h-full rounded-full bg-blue-500 animate-spin"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full rounded-full bg-blue-500 animate-reverse-spin"></div>
            </div>
            <p className="ml-2 text-white font-semibold">Loading...</p>
        </div>
    );
};

export default Loading;
