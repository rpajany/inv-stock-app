import React from 'react'
import { GET_Api } from '../services/ApiService';

export const PickListService = () => {
    return (
        null
    )
}

export const Get_MasterByPN_Service = async (Part_Number) => {
    try {

        if (Part_Number === '') {
            return
        }

        const result_0 = await GET_Api(`/master/getMasterByPN/${Part_Number}`, '');
        console.log('Get_MasterByPN_Service :', result_0);
        return result_0.data;
    } catch (error) {
        console.log('Error Get_MasterByPN_Service : ', error);
        return false;
    }

}

// save pick record
// export const Save_Transaction_Service = async () => {
//     try {

//     } catch (error) {

//     }
// }