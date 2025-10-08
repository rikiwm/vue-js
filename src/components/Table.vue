<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table"
import {
  createColumnHelper,
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table"
import { ArrowUpDown, ChevronDown } from "lucide-vue-next"
import { valueUpdater } from "@/utils"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const dataTable = ref([]);
const pagination = ref({
  current_page: 1,
  last_page: 1,
  prev_page_url: null,
  next_page_url: null,
});

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("nama", {
    header: "Nama",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("ringkasan", {
    header: "Ringkasan",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("instansi_nama", {
    header: "Instansi",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("kategori_nama", {
    header: "Kategori",
    cell: (info) => info.getValue(),
  }),  
  columnHelper.accessor("jenis_nama", {
    header: "Jenis",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("is_publish_text", {
    header: "Publish",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("path_url_download", {
    header: "Download",
    cell: ({ getValue }) =>
      h(
        "a",
        {
          href: getValue(),
          target: "_blank",
          class: "bg-muted/50 border px-2 rounded-sm text-muted-foreground text-xs py-1",
        },
        "Download"
      ),
  }),
];

const table = useVueTable({
  get data() {
    return dataTable.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(), //  filter row
  enableColumnFilters: true,
});

const fetchData = async (page = 1) => {
  try {
    const res = await fetch(`https://ppid.padang.go.id/api/v1/informasi?page=${page}`);
    const json = await res.json();
 
    dataTable.value = json.result.data;
    pagination.value = {
      current_page: json.result.current_page,
      last_page: json.result.last_page,
      prev_page_url: json.result.prev_page_url,
      next_page_url: json.result.next_page_url,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const toggleSort = (column: any) => {
  const current = column.getIsSorted();
  if (current === false) column.toggleSorting(true); // ASC
  else if (current === "asc") column.toggleSorting(false); // DESC
  else column.clearSorting(); // NONE
};


onMounted(() => {
  fetchData();
});
</script>


<template>
  <div class="w-full">
    <div class="p-0">
      <div class="flex items-center p-2 bg-muted/50 rounded-lg border border-border">
          <Input
            class="max-w-md rounded-md"
            placeholder="Cari Nama..."
            :model-value="table.getColumn('nama')?.getFilterValue() as string"
            @update:model-value="table.getColumn('nama')?.setFilterValue($event)"/>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="ml-auto">
               Filter Columns <ChevronDown class="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
                :key="column.id"
                class="capitalize rounded-md"
                :model-value="column.getIsVisible()"
                @update:model-value="(value) => {
                  column.toggleVisibility(!!value)
                }"
              >
                {{ column.id }}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

      <div class="mt-4 bg-muted/50 rounded-lg border border-border p-3">
      <Table>
        <TableHeader>
          <TableRow>
              <TableHead v-for="header in table.getHeaderGroups()[0].headers" :key="header.id">
                  <button
                      class="flex items-center gap-1"
                      @click="header.column.toggleSorting()"
                  >
                      {{ header.column.columnDef.header }}
                      <span v-if="header.column.getIsSorted() === 'asc'">🔼</span>
                      <span v-else-if="header.column.getIsSorted() === 'desc'">🔽</span>
                  </button>
                  </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
              <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id" class="capitalize">
              <component :is="() => cell.column.columnDef.cell(cell)" />
              </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </div>

      <div class="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          size="sm"
          :disabled="!pagination.prev_page_url"
          @click="fetchData(pagination.current_page - 1)"
        >
          Prev
        </Button>
        <span> Page {{ pagination.current_page }} / {{ pagination.last_page }} </span>
        <Button
          variant="outline"
          size="sm"
          :disabled="!pagination.next_page_url"
          @click="fetchData(pagination.current_page + 1)"
        >
          Next
        </Button>
        
      </div>

    </div>
  </div>
</template>