import axios from "axios";

export const generateContentAPI = async (prompt) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/v1/gemini/generateContent",
            {
                prompt,
            },
            {
                withCredentials: true,
            }
        );

        if (response.status === 200) {
            return response.data.answer;
        } else {
            throw new Error("Failed to generate content");
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to generate content");
    }
};
