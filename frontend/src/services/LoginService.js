import { POST_Api } from './ApiService';


export const LoginService = () => {
    return (
        null
    )
}

export const Auth_Login_Service = async (loginData) => {
    try {
        const result_1 = await POST_Api(`/auth/login`, '', { loginData });
        console.log('Login_Service :', result_1.data);
        return result_1.data;

    } catch (error) {
        console.log('Error Login_Service : ', error);
        return false;
    }
}

