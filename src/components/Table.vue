<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { useProducts } from '@/composable/products/useProducts';

// import SidebarMenu component

// Get products
const { data: products, isLoading, isError, error } = useProducts()
</script>

<template>
        <Table class="mt-4 p-2">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead class="w-[100px]">
                Invoice
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead class="text-right">
                Amount
                </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow v-for="product in products" :key="product.id">
                <TableCell class="font-medium">{{ product.title }}</TableCell>
                <TableCell>{{ product.price }}</TableCell>
                <TableCell>{{ product.category }}</TableCell>
                <TableCell class="text-right">{{ product.price }}</TableCell>
            </TableRow>
            </TableBody>
        </Table>
</template>

<!-- "id": 0,
"title": "string",
"price": 0.1,
"description": "string",
"category": "string",
"image": "http://example.com"
} -->