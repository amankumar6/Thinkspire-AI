import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./AuthContext";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
    "pk_test_51PGMfrSHkraZ4Y5AJ9C36NAxEv6yskbiqjLyQWi8r1ivqzIvcgKSsH4XNHE327UBlU4HlIHs5vhYrwHYf3TcJmFM00X9V7LkB1"
);

const stripeOptions = {
    mode: "payment",
    currency: "inr",
    amount: 1099,
    appearance: {
        theme: "stripe",
    },
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// Create a client
const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Elements stripe={stripePromise} options={stripeOptions}>
                    <App />
                </Elements>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
