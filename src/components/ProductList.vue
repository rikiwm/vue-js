

<script setup lang="ts">
import { ref, watchEffect, h } from "vue"
import { useRouter } from 'vue-router'

// import table hooks dari TanStack
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/vue-table"

// import komponen Table dari shadcn-vue
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

// definisi tipe data produk
interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
}
import { useProducts, useDeleteProduct }  from '@/composable/products/useProducts';
const router = useRouter()
// ambil data dari API pakai Vue Query
const { data, isLoading, isError, error } = useProducts()
const deleteMutation = useDeleteProduct()

// definisi kolom table
const columnHelper = createColumnHelper<Product>()

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Nama Produk",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Harga",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("category", {
    header: "Kategori",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("image", {
    header: "Gambar",
    cell: ({ getValue }) =>
      h(
        "img",
        {
          src: getValue(),
          alt: "Product",
          class: "h-10 w-10 object-contain mx-auto rounded",
        },
        []
      ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Aksi",
    cell: (info) => {
      const row = info.row.original
      return (
       h("div", { class: "flex gap-2 justify-center" }, [
          h(
            "button",
            {
              class:
                "px-2 py-1 border btn btn-xs rounded",
              onClick: () => goToEdit(row.id), 
            },
            "Edit"
          ),
          h(
            "button",
            {
              class:
                "px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700",
              onClick: () => removeProduct(row.id),
            },
            "Hapus"
          ),
        ])
      )
    },
  }),
]

// fungsi edit & delete
const goToEdit = (id: number) => {
  router.push({ name: "EditProduct", params: { id } })
}

const removeProduct = async (id: number) => {
  if (confirm("Yakin hapus produk ini?")) {
    await deleteMutation.mutateAsync(id)
  }
}

// reactive data table
const tableData = ref<Product[]>([])
watchEffect(() => {
  if (data.value) tableData.value = data.value
})

// buat instance table
const table = useVueTable({
  data: tableData,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-xl font-semibold">Daftar Produk</h2>
      <router-link
        to="/admin/products/create"
        class="px-2 py-1 border rounded-lg"
      >
        + Tambah Produk
      </router-link>
    </div>

    <!-- Loading / Error -->
    <div v-if="isLoading" class="text-gray-500">Memuat data produk...</div>
    <div v-else-if="isError" class="text-red-600">Error: {{ error.message }}</div>

    <!-- Table -->
    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead
            v-for="header in table.getHeaderGroups()[0].headers"
            :key="header.id"
          >
            <button
              class="flex items-center gap-1"
              @click="header.column.getToggleSortingHandler()?.()"
            >
              {{ header.column.columnDef.header }}
              <span v-if="header.column.getIsSorted() === 'asc'">🔼</span>
              <span v-else-if="header.column.getIsSorted() === 'desc'">🔽</span>
            </button>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class=""
        >
          <TableCell
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="capitalize"
          >
            <component :is="() => cell.column.columnDef.cell(cell)" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
