import React from 'react'
import { GET_Api, POST_Api } from '../services/ApiService';

export const RackViewService = () => {
    return (
        null
    )
}

export const Load_MasterList = async () => {
    try {
        const result_0 = await GET_Api(`/master/load`, '');
        console.log('Load_MasterList :', result_0);
        return result_0.data;

    } catch (error) {
        console.log('Error Load_MasterList : ', error);
        return false;
    }
}

export const Save_Transaction_Service = async (masterData) => {
    try {

        if (!masterData || typeof masterData !== 'object') {
            console.error('❌ masterData is invalid or Empty:', masterData);
            return false;
        }

        console.log('📌 masterData before API call:', masterData);

        const { MS_ID, Type, Stock_Qty, Transact_Qty, Part_Number } = masterData;

        // Check for missing required fields
        if (!MS_ID || !Type || Stock_Qty === undefined || Transact_Qty === undefined || !Part_Number) {
            console.error('❌ Missing required fields in masterData:', masterData);
            return false;
        }

        // 0. Calculate the new Hand_Qty
        let Hand_Qty;
        if (Type === 'OUTWARD') {
            Hand_Qty = Stock_Qty - Transact_Qty;
        } else if (Type === 'INWARD') {
            Hand_Qty = Stock_Qty + Transact_Qty;
        } else {
            throw new Error('Invalid transaction type');
        }

        // 1. save tbl_transaction detail ...
        console.log('📌 Sending data to /transact/insert:', { ...masterData, Hand_Qty });
        const result_1 = await POST_Api(`/transact/insert`, '', { masterData: { ...masterData, Hand_Qty } });
        console.log('✅ 1. Save transaction Data:', result_1);

        // 2. update tbl_master  minus (Stock_Qty) by MS_ID ...  
        console.log('📌 Sending data to /master/updateStock:', { Stock_Qty: Hand_Qty, MS_ID });
        const result_2 = await POST_Api(`/master/updateStock`, '', { Stock_Qty: Hand_Qty, MS_ID });
        console.log('✅ 2. Update_MasterStock:', result_2);
        return true;

    } catch (error) {
        console.error('❌ Error in Save_Transaction_Service:', error);
        return false;
    }
}