// import hook useQuery from vue-query
import { useQuery } from '@tanstack/vue-query';

//import service Api
import Api from '@/services/api';

// import js-cookie

//interface Product
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    title: string;
    description: string;
}

//composable useProducts dengan return type Product
export const useProducts = () => {

    return useQuery<Product[], Error>({

        //query key
        queryKey: ['products'],

        //query function
        queryFn: async () => {

            //get products from api
            const response = await Api.get('/products');
            console.log(response);

            //return data
            return response.data as Product[];
        },
        
    });
}