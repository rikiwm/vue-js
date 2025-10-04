<script lang="ts">
export const description = "A sidebar that collapses to icons."
export const iframeHeight = "800px"
export const containerClass = "w-full h-full"
</script>

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

import AppSidebar from "@/components/AppSidebar.vue"
import { LineChart } from "@/components/ui/chart-line"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Bell } from "lucide-vue-next"


import { useUsers } from '@/composable/users/useUsers'
const { data: users, isLoading, isError, error } = useUsers()
// console.log('data :',users);

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]
</script>

<template>

 <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem class="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
           <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div class="flex-1 rounded-xl p-4" >
                 <div class="w-full">
                    <div class="p-2">
                        <div class="flex items-center py-4 border rounded-lg px-2">
                          <Table>
                             <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                              <TableRow>
                                <TableHead class="w-[100px]">
                                  Name
                                </TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead class="text-right">
                                  Address
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow v-for="user in users" :key="user.id">
                                <TableCell class="font-medium">
                                  {{ user.name.firstname }} {{ user.name.lastName }}
                                </TableCell>
                                <TableCell>{{ user.phone }}</TableCell>
                                <TableCell>{{ user.email }}</TableCell>
                                <TableCell class="text-right"> {{ user.address.number }},{{ user.address.street }},{{ user.address.zipcode }},
                                  {{ user.address.city }}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </SidebarInset>
  </SidebarProvider>


</template>
