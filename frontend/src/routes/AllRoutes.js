import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, PickList, Login, Logout, Page404, Inward, Transaction } from '../pages';
import { MainLayout } from '../components';
 


export const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/picklist' element={<PickList />} />
                    <Route path='/inward' element={<Inward />} />
                    <Route path='/onward' element={<PickList />} />
                    <Route path='/transaction' element={<Transaction/>} />
                    <Route path='/unauthorized' element={<Page404 />} />
                </Route>

                {/* Login and Logout Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

            </Routes>
        </div>
    )
}
