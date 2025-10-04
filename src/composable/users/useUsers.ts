// import hook useQuery from vue-query
import { useQuery } from '@tanstack/vue-query';

//import service Api
import Api from '@/services/api';

// import js-cookie

//interface Product
export interface Users {
    id: number;
    email: string;
    username: number;
    password: string;
}

// "id": 1,
//     "email": "john@gmail.com",
//     "username": "johnd",
//     "password": "m38rmF$",

//composable useProducts dengan return type Product
export const useUsers = () => {

    return useQuery<Users[], Error>({

        //query key
        queryKey: ['users'],

        //query function
        queryFn: async () => {

            //get Users from api
            const response = await Api.get('/users');
            console.log(response);

            //return data
            return response.data as Users[];
        },
        
    });
}