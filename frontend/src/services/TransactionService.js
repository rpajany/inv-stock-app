import { GET_Api, POST_Api } from '../services/ApiService';

export const TransactionService = () => {
    return (
        null
    )
}


export const Load_Transact_Service = async (dateRange) => {
    try {
        const result_0 = await POST_Api(`/transact/load`, '',
            {
                StartDate: dateRange.startDate ? dateRange.startDate : '',
                EndDate: dateRange.endDate ? dateRange.endDate : '',
            }
        );
        console.log('Load_Transact_Service :', result_0);
        return result_0.data;
    } catch (error) {
        console.log('Error Load_Transact_Service : ', error);
        return false;
    }
}