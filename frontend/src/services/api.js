import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// Create a reusable Axios instance
const api = axios.create({
    baseURL: BASE_URL, // "http://192.168.1.10:8080/api", // Update with your local API URL
    timeout: 5000, // Request timeout (optional)
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true // ✅ Ensures cookies are sent with requests
});

// Request Interceptor (Automatically adds Authorization token if available)
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("token"); // Example: Fetch token from localStorage
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// 🔹 Remove manual token handling; Cookies will handle auth automatically
api.interceptors.request.use(
    (config) => {
        return config; // No need to modify headers, as cookies are auto-sent
    },
    (error) => Promise.reject(error)
);

export default api;