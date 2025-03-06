import { GET_Api, POST_Api } from '../services/ApiService';

export const TransactMenuService = () => {
    return (
        null
    )
}


export const Get_MasterByName_Service = async (nameSearch) => {
    try {
        // const result_0 = await GET_Api(`/master/getMasterByName/${encodeURIComponent(Part_Name)}`, '');
        const result_0 = await POST_Api(`/master/getMasterByName`, '', { SearchObj: nameSearch } );
        // console.log('Get_MasterByName_Service :', result_0);
        return result_0.data;
    } catch (error) {
        console.log('Error Get_MasterByName_Service : ', error);
        return false;
    }
}