import React, { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HeaderItem } from './HeaderItem';
import Logo from "./../assets/logo.png";
import User_logo from '../assets/default-user.png'

import { HiHome, HiDotsVertical } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { FaSitemap } from "react-icons/fa";
import { TiExport } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { BsBoxArrowInDownRight } from "react-icons/bs";
import { BsBoxArrowInDownLeft } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";

export const Header = () => {
    const { user } = useAuth();
    const [navToggle, setNavToggle] = useState(false);
    const [userMenu, setUserMenu] = useState(false);
    const menuRef = useRef(null); // Ref to track the dropdown element

    useEffect(() => {
        // Add event listener to detect clicks
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup listener on component unmount
        return (() => {
            document.removeEventListener("mousedown", handleClickOutside);
        })
    }, []);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setUserMenu(false); // Close the menu if clicked outside
        }
    }



    if (!user) return <Navigate to="/login" />; // Redirect if not logged in


    const menu = [
        {
            name: 'Home',
            icon: HiHome
        },
        {
            name: 'Picklist',
            icon: TbReport
        },
        {
            name: 'Master',
            icon: FaSitemap
        },
        {
            name: 'Export',
            icon: TiExport
        },

    ]


    return (
        <>
            <header className='header fixed  w-full z-40 flex flex-col   bg-slate-200   ' >
                <div className='flex  justify-between items-center   gap-8   px-4 ' style={{ padding: '5px' }}>
                    <div className='flex items-center gap-2 '>
                        <img src={Logo} alt="brand-logo" className='w-5 md:w-8 rounded-full object-cover' />
                        <span >YAMAHA MOTOR ELECTRONICS INDIA</span>
                    </div>

                    <div className='flex gap-3  items-center    ' >


                        {/* <div className='hidden md:flex gap-8'>
                            {menu.map((item, index) => (
                                <HeaderItem key={index} name={item.name} Icon={item.icon} />
                            ))}
                        </div> */}

                        <div className='flex md:hidden gap-'>
                            {menu.map((item, index) => index < 1 && (
                                <HeaderItem key={index} name={""} Icon={item.icon} />
                            ))}

                            <div className=' md:hidden ' onClick={() => setNavToggle(!navToggle)}>
                                <HeaderItem name={""} Icon={HiDotsVertical} />
                                {navToggle ? <div className='absolute mt-3 border-[1px] px-8 py-4 p-4 border-gray-700 bg-slate-200'>
                                    {menu.map((item, index) => index > 1 && (
                                        <HeaderItem key={index} name={item.name} Icon={item.icon} />
                                    ))}
                                </div> : null
                                }
                            </div>
                        </div>

                    </div>

                    <div className='mr-8' onClick={() => setUserMenu(!userMenu)}>
                        <img src={User_logo} alt="User_logo" className='w-5 md:w-8 rounded-full' />
                    </div>
                    {/* Dropdown menu   */}
                    {userMenu && (
                        <div className='w-40 z-50 px-1 absolute right-5 top-10 rounded-md shadow divide-y  bg-white text-black  divide-gray-600    ' ref={menuRef}>
                            <div className='px-1 py-2'>
                                <ul className=''>
                                    <li className='flex gap-2 items-center p-3 border-b-1 border-gray-300'>
                                        <FaRegUserCircle className='text-blue-800' />User :  <b>{user.username}</b>
                                    </li>
                                    <li className=''>
                                        <Link to='/logout' className='flex gap-2 items-center p-3 hover:cursor-pointer'>
                                            <IoMdLogOut className='text-blue-800' />
                                            Signout
                                        </Link>



                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                </div>



            </header>

            {/* Sidebar  w-10   hover:w-40 */}
            <div className='sidebar fixed bg-gray-900   h-full z-30  left-0 top-0   ' >
                <ul className='mt-10      '>

                    <Link to="/">
                        <li className='text-white flex gap-4 items-center p-4'>

                            <span><HiHome className='text-white' /></span>
                            <span className="menu-text">Home</span>

                        </li>
                    </Link>

                    <Link to="/picklist">
                        <li className='text-white flex gap-4 items-center p-4'>
                            <span><TbReport className='text-white' /></span>

                            <span className="menu-text">Picklist</span>

                        </li>
                    </Link>

                    <Link to="/inward">
                        <li className='text-white flex gap-4 items-center p-4'>
                            <span><BsBoxArrowInDownLeft className='text-white text-xl' /></span>

                            <span className="menu-text">Inward</span>

                        </li>
                    </Link>

                    <Link to="/transaction">
                        <li className='text-white flex gap-4 items-center p-4'>
                            <span><TbReport className='text-white text-xl' /></span>

                            <span className="menu-text">Transaction</span>

                        </li>
                    </Link>

                    <Link to="/outward">
                        <li className='text-white flex gap-4 items-center p-4'>
                            <span><BsBoxArrowUpRight className='text-white text-md' /></span>

                            <span className="menu-text">Outward</span>

                        </li>
                    </Link>

                    <Link to="/master">
                        <li className='text-white flex gap-4 items-center p-4'>
                            <span><FaSitemap className='text-white' /></span>

                            <span className="menu-text">Master</span>

                        </li>
                    </Link>


                </ul>

            </div>
        </>
    )
}
