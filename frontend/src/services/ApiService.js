import React from 'react'
import api from "./api"; // Import the Axios instance



export const ApiService = () => {
    return (
        null
    )
}


// Insert api (POST)
export const POST_Api = async (API_URL, token = "", data) => {
    try {
        // Determine Content-Type based on the data type
        const headers = {
            "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
        };

        // Token handling is now centralized in `api.js`, so it's optional here
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // Make the POST request using the Axios instance
        const Post_ApiResponse = await api.post(API_URL, data, { headers });
        return Post_ApiResponse;

    } catch (error) {
        console.error(`Error POST_Api Response for ${API_URL}:`, error.message);
        throw error; // Re-throw the error for the caller to handle
    }
};


// GET api (GET)
export const GET_Api = async (API_URL, token = "", config = {}) => {
    console.log('API_URL :', API_URL)
    try {
        // Prepare headers
        const headers = {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if provided
        };

        // Merge additional config (if any)
        const finalConfig = { ...config, headers };

        // Make the GET request using the Axios instance
        const Get_ApiResponse = await api.get(API_URL, finalConfig);

        return Get_ApiResponse.data;

    } catch (error) {
        console.error(`Error GET_Api Response for ${API_URL}:`, error.message);
        throw error; // Re-throw for handling in the caller function
    }
};


// Update api (PUT)
export const UPDATE_Api = async (API_URL, token = "", updatedData) => {
    try {
        // Prepare headers
        const headers = {
            "Content-Type": updatedData instanceof FormData ? "multipart/form-data" : "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if provided
        };

        // Make the PUT request using the Axios instance
        const Put_ApiResponse = await api.put(API_URL, updatedData, { headers });

        return Put_ApiResponse.data;

    } catch (error) {
        console.error(`Error PUT_Api Response for ${API_URL}:`, error.message);
        throw error; // Re-throw for better error handling
    }
};


// Delete api (DELETE)
export const DELETE_Api = async (API_URL, token = "") => {
    try {
        // Prepare headers
        const headers = {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if provided
        };

        // Make the DELETE request using the Axios instance
        const response = await api.delete(API_URL, { headers });

        return response.data;

    } catch (error) {
        console.error(`Error DELETE_Api Response for ${API_URL}:`, error.message);
        throw error; // Re-throw for better error handling
    }
};

// upload file api - same as POST_Api
export const Upload_Api = async (API_URL, token = "", formData) => {
    try {
        // Prepare headers
        const headers = {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if provided
        };

        // Make the POST request using the Axios instance
        const response = await api.post(API_URL, formData, { headers });

        return response.data; // Return only `response.data` for cleaner usage

    } catch (error) {
        console.error(`Error in Upload_Api for ${API_URL}:`, error.message);
        throw error; // Ensure the calling function can handle the error
    }
};


// POST_Api to handle file download
export const DOWNLOAD_Api = async (API_URL, token = "", data) => {
    try {
        // Prepare headers
        const headers = {
            "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if provided
        };

        // Make the POST request using the Axios instance with responseType 'blob'
        const response = await api.post(API_URL, data, {
            headers,
            responseType: "blob", // Important for handling file downloads
        });

        return response;

    } catch (error) {
        console.error(`Error DOWNLOAD_Api Response for ${API_URL}:`, error.message);
        throw error; // Re-throw the error for better handling
    }
};