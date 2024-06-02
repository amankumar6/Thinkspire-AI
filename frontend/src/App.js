import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./components/Users/Registration";
import Login from "./components/Users/Login";
import Dashboard from "./components/Users/Dashboard";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import Home from "./components/Home/Home";
import { useAuth } from "./AuthContext";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import GenerateContent from "./components/Content/GenerateContent";
import Plans from "./components/Plans/Plan";
import FreePlan from "./components/Payment/FreePlan";
import CheckoutForm from "./components/Payment/CheckoutForm";
import PaymentSuccess from "./components/Payment/PaymentSuccess";
import Features from "./components/Features/Features";
import AboutUs from "./components/About/AboutUs";
import ContentHistory from "./components/Content/ContentHistory";
import NotFound from "./components/NotFound/NotFound";
// import HistoryDetails from "./components/Content/HistoryDetails";

export default function App() {
    const { isAuthenticated } = useAuth();
    
    return (
        <BrowserRouter>
            {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/features" element={<Features />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/success" element={<PaymentSuccess />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <AuthRoute>
                            <Dashboard />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/generate-content"
                    element={
                        <AuthRoute>
                            <GenerateContent />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/free-plan"
                    element={
                        <AuthRoute>
                            <FreePlan />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/checkout/:plan"
                    element={
                        <AuthRoute>
                            <CheckoutForm />
                        </AuthRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <AuthRoute>
                            <ContentHistory />
                        </AuthRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
                {/* <Route
                    path="/history-details/:id"
                    element={
                        <AuthRoute>
                            <HistoryDetails />
                        </AuthRoute>
                    }
                /> */}
            </Routes>
        </BrowserRouter>
    );
}
