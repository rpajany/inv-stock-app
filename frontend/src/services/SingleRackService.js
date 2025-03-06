import React from 'react'
import { GET_Api, POST_Api } from '../services/ApiService';

export const SingleRackService = () => {
    return (
        null
    )
}


export const Load_RackData_Service = async (Rack) => {
    try {
        console.log('Rack :', Rack)
        const result_0 = await GET_Api(`/master/getRackData/${Rack}`, '');
        console.log('Load_RackData_Service:', result_0);
        return result_0.data;

    } catch (error) {
        console.log('Error Load_RackData_Service : ', error);
        return false;
    }
}