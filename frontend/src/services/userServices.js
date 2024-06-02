import axios from "axios";

// LOGIN
export const loginAPI = async ({ email, password }) => {
    const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
            email,
            password,
        },
        {
            withCredentials: true,
        }
    );

    return response.data;
};

// REGISTER
export const registerAPI = async (userData) => {
    const response = await axios.post(
        "http://localhost:5000/api/v1/users/register",
        {
            username: userData?.username,
            email: userData?.email,
            password: userData?.password,
        },
        {
            withCredentials: true,
        }
    );
    return response?.data;
};

// LOGOUT
export const logoutAPI = async () => {
    const response = await axios.post(
        "http://localhost:5000/api/v1/users/logout",
        {},
        {
            withCredentials: true,
        }
    );
    return response?.data;
};

// PROFILE
export const getUserProfileAPI = async () => {
    const response = await axios.get(
        "http://localhost:5000/api/v1/users/profile",
        {
            withCredentials: true,
        }
    );
    return response?.data;
};

// AUTH
export const authAPI = async () => {
    const response = await axios.get(
        "http://localhost:5000/api/v1/users/auth",
        {
            withCredentials: true,
        }
    );
    return response?.data;
};
