import { useMutation } from '@tanstack/vue-query';

//import service API
import Api from '@/services/api';

//interface LoginRequest
interface LoginRequest {
    username: string;
    password: string;
}

export const useLogin = () => {

    return useMutation({
        mutationFn: async (data: LoginRequest) => {
            const response = await Api.post('/auth/login', data);
            console.log(response.data);
            //mengembalikan response 
            return response.data;
        }
    });
};