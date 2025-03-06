import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { POST_Api } from '../services/ApiService';

export const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {

        const handleLogout = async () => {
            try {
                await POST_Api('/auth/logout'); // Backend API call to remove cookies
            } catch (error) {
                console.error("Logout failed:", error);
            }
        }

        logout();  // Clear user from AuthContext

        // Clear user session data (e.g., token, cookies, or localStorage)
        localStorage.removeItem('authToken'); // Example: Remove authentication token
        sessionStorage.clear(); // Clear session storage if used
        // Any other cleanup tasks (e.g., API logout calls)

        // Redirect to the login or home page
        navigate('/login', { replace: true }); // Adjust path as needed

        handleLogout();


    }, [navigate]);

    return (
        <div><p>Logging out...</p></div>
    )
}
