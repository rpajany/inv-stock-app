import React, { useState } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { Auth_Login_Service } from '../services/LoginService';
import { useAuth } from '../context/AuthContext';

import store_logo from '../assets/Store.png';
import wave_2 from '../assets/yamaha_logo4.png';

export const Login = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false); // Track Form submission state
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginData, setLoginData] = useState({ username: "admin", password: "123" })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((preve) => ({
            ...preve,
            [name]: value
        }));
    };

    const handle_FormSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage("");
        setIsSubmitting(true);
        setLoading(true);

        const result = await Auth_Login_Service(loginData);
        // console.log('result.data :', result?.data[0])
        if (result.success) {

            setUser(result?.data);
            console.log('user', user);
            navigate('/', { replace: true });
        } else if (!result.success) {
            setErrorMessage(result.message);
        }

        setIsSubmitting(false);
        setLoading(false);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-100">

                <div className="flex justify-between border-2 border-white shadow-2xl rounded-lg overflow-hidden max-w-4xl p-4">
                    {/* Logo Section */}
                    <div className="hidden lg:flex lg:w-1/2  items-center ">
                        <img src={store_logo} alt="store-logo" className="w-[90%] rounded-md" />
                    </div>

                    {/* Form Section */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-center">
                            <span className="text-3xl font-semibold text-gray-800">Login</span>
                        </div>
                        <form onSubmit={handle_FormSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={handleChange}
                                    value={loginData.username}
                                    autoComplete="username"
                                    required
                                    className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                                />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleChange}
                                    value={loginData.password}
                                    autoComplete="current-password"
                                    required
                                    className="border border-gray-300 rounded py-2 px-4 block w-full focus:outline-none focus:ring-2 focus:ring-blue-700"
                                />
                            </div>

                            <div className="mt-6">
                                <button type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-2 px-4 rounded text-white font-bold ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-600'}`}
                                >
                                    Login
                                </button>
                            </div>
                            {errorMessage && (
                                <span className="text-red-500 text-sm mt-4 block text-center">{errorMessage}</span>
                            )}
                        </form>
                    </div>

                    {/* Decorative Wave Image */}
                    <div className="absolute bottom-5 left-2   hidden lg:flex  ">
                        <img src={wave_2} alt="brand-logo" className="w-48" />
                    </div>

                </div>

            </div>
        </>
    )
}
