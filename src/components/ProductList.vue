

<script setup lang="ts">
import { ref, watchEffect, h } from "vue"
import { useRouter } from 'vue-router'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from "@tanstack/vue-table"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/toast/use-toast";
import { Button } from "@/components/ui/button"
import { useProducts, useDeleteProduct }  from '@/composable/products/useProducts';
// definisi tipe data produk
interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
}
const { toast } = useToast();
const router = useRouter()
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
                Button,
                { variant: "outline", size: "sm" 
                , onClick: () => goToEdit(row.id)
                },
                "Edit"
              ),
          h(
        AlertDialog,
        {},
        {
          default: () => [
                // Trigger tombol
                h(
                  AlertDialogTrigger,
                  { asChild: true },
                  {
                    default: () =>
                      h(
                        Button,
                        { variant: "outline", size: "sm" },
                        "Hapus"
                      ),
                  }
                ),
                // Konten dialog
                h(
                  AlertDialogContent,
                  {},
                  {
                    default: () => [
                      h(AlertDialogHeader, {}, {
                        default: () => [
                          h(AlertDialogTitle, {}, "Yakin ingin Hapus data ini?"),
                          h(
                            AlertDialogDescription,
                            {},
                            "Pastikan kamu sudah memverifikasi data sebelum menghapus."
                          ),
                        ],
                      }),

                      h(AlertDialogFooter, {}, {
                        default: () => [
                          h(AlertDialogCancel, {}, "Batal"),
                          h(
                            AlertDialogAction,
                            {
                              onClick: () => removeProduct(row.id),
                            },
                            "Lanjutkan"
                          ),
                        ],
                      }),
                    ],
                  }
                ),
              ],
            }
          )
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
    // await deleteMutation.mutateAsync(id)
    // console.log('Produk dengan ID', id, 'berhasil dihapus');
    toast({
      title: "Berhasil",
      description: `Produk dengan ID ${id} berhasil dihapus.`,
      duration: 3000,
    });
    // if (confirm("Yakin hapus produk ini?")) {
  // }
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
  <div class="p-2">
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
     <div  v-else class=" bg-muted/10 rounded-lg border border-border p-4">
    <Table>
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
  </div>
</template>
