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
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

//composable useProducts dengan return type Product
export const useProductsId = (id: number) => {

    return useQuery<Product, Error>({

        //query key
        queryKey: ['products', id],

        //query function
        queryFn: async () => {

          const response = await Api.get(`/products/${id}`);
          console.log(`id ${id}`);

            //return data
            return response.data as Product;
        },
        
    });
}