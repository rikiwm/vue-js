import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import Api from '@/services/api';

//interface Product
export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    title: string;
    description: string;
    category?: string;
    rating?: {
        rate: number;
        count: number;
    };
}

//  Get All Products
export const useProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await Api.get('/products')
      return response.data as Product[]
    },
  })
}

//  Get One Product by ID
export const useProductsId = (id: number) => {
  return useQuery<Product, Error>({
    queryKey: ['products', id],
    queryFn: async () => {
      const response = await Api.get(`/products/${id}`)
      return response.data as Product
    },
    enabled: !!id, // hanya jalan kalau id ada
  })
}

//  Create Product
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProduct: Product) => {
      const response = await Api.post('/products', newProduct)
      console.log('Created Product:', response.data)
      return response.data
    },
    onSuccess: () => {
      // refresh daftar produk setelah create
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

//  Update Product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedProduct: Product) => {
      if (!updatedProduct.id) throw new Error('Product ID is required')
      const response = await Api.put(`/products/${updatedProduct.id}`, updatedProduct)
      return response.data
    },
    onSuccess: () => {
      // refresh daftar produk & detail
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}

//  Delete Product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await Api.delete(`/products/${id}`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}