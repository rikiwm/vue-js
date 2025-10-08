<script lang="ts">
export const description = "A sidebar that collapses to icons."
export const iframeHeight = "800px"
export const containerClass = "w-full h-full"
</script>

<script setup lang="ts">
const title = defineProps({
  title: {
    type: String,
    required: false,
    default: "Dashboard",
  },
});
console.log(title);
import AppSidebar from "@/components/AppSidebar.vue"
import { LineChart } from "@/components/ui/chart-line"
import { faker } from 'https://esm.sh/@faker-js/faker';

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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const widgetData = [
  {
    title: faker.finance.amount({ min: 6, max: 9123780500, autoFormat: true, symbol: 'Rp.',dec:0 }),
    description: "1 hour ago",
  },
  {
     title: faker.finance.amount({ min: 6, max: 9123780500, autoFormat: true, symbol: 'Rp.',dec:0 }),
    description: "1 hour ago",
  },
  {
     title: faker.finance.amount({ min: 6, max: 9123780500, autoFormat: true, symbol: 'Rp.',dec:0 }),
    description: "2 hours ago",
  },
  {
        title: faker.finance.amount({ min: 6, max: 9123780500, autoFormat: true, symbol: 'Rp.',dec:0 }),
    description: "2 hours ago",
  },
]
const data = [
  {
    "year": 1970,
    "Export Growth Rate": 2.04,
    "Import Growth Rate": 1.53,
  },
  {
    "year": 1971,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.58,
  },
  {
    "year": 1972,
    "Export Growth Rate": 1.96,
    "Import Growth Rate": 1.61,
  },
  {
    "year": 1973,
    "Export Growth Rate": 1.93,
    "Import Growth Rate": 1.61,
  },
  {
    "year": 1974,
    "Export Growth Rate": 1.88,
    "Import Growth Rate": 1.67,
  },
  {
    "year": 1975,
    "Export Growth Rate": 1.79,
    "Import Growth Rate": 1.64,
  },
  {
    "year": 1976,
    "Export Growth Rate": 1.77,
    "Import Growth Rate": 1.62,
  },
  {
    "year": 1977,
    "Export Growth Rate": 1.74,
    "Import Growth Rate": 1.69,
  },
  {
    "year": 1978,
    "Export Growth Rate": 1.74,
    "Import Growth Rate": 1.7,
  },
  {
    "year": 1979,
    "Export Growth Rate": 1.77,
    "Import Growth Rate": 1.67,
  },
  {
    "year": 1980,
    "Export Growth Rate": 1.79,
    "Import Growth Rate": 1.7,
  },
  {
    "year": 1981,
    "Export Growth Rate": 1.81,
    "Import Growth Rate": 1.72,
  },
  {
    "year": 1982,
    "Export Growth Rate": 1.84,
    "Import Growth Rate": 1.73,
  },
  {
    "year": 1983,
    "Export Growth Rate": 1.77,
    "Import Growth Rate": 1.73,
  },
  {
    "year": 1984,
    "Export Growth Rate": 1.78,
    "Import Growth Rate": 1.78,
  },
  {
    "year": 1985,
    "Export Growth Rate": 1.78,
    "Import Growth Rate": 1.81,
  },
  {
    "year": 1986,
    "Export Growth Rate": 1.82,
    "Import Growth Rate": 1.89,
  },
  {
    "year": 1987,
    "Export Growth Rate": 1.82,
    "Import Growth Rate": 1.91,
  },
  {
    "year": 1988,
    "Export Growth Rate": 1.77,
    "Import Growth Rate": 1.94,
  },
  {
    "year": 1989,
    "Export Growth Rate": 1.76,
    "Import Growth Rate": 1.94,
  },
  {
    "year": 1990,
    "Export Growth Rate": 1.75,
    "Import Growth Rate": 1.97,
  },
  {
    "year": 1991,
    "Export Growth Rate": 1.62,
    "Import Growth Rate": 1.99,
  },
  {
    "year": 1992,
    "Export Growth Rate": 1.56,
    "Import Growth Rate": 2.12,
  },
  {
    "year": 1993,
    "Export Growth Rate": 1.5,
    "Import Growth Rate": 2.13,
  },
  {
    "year": 1994,
    "Export Growth Rate": 1.46,
    "Import Growth Rate": 2.15,
  },
  {
    "year": 1995,
    "Export Growth Rate": 1.43,
    "Import Growth Rate": 2.17,
  },
  {
    "year": 1996,
    "Export Growth Rate": 1.4,
    "Import Growth Rate": 2.2,
  },
  {
    "year": 1997,
    "Export Growth Rate": 1.37,
    "Import Growth Rate": 2.15,
  },
  {
    "year": 1998,
    "Export Growth Rate": 1.34,
    "Import Growth Rate": 2.07,
  },
  {
    "year": 1999,
    "Export Growth Rate": 1.32,
    "Import Growth Rate": 2.05,
  },
  {
    "year": 2000,
    "Export Growth Rate": 1.33,
    "Import Growth Rate": 2.07,
  },
  {
    "year": 2001,
    "Export Growth Rate": 1.31,
    "Import Growth Rate": 2.08,
  },
  {
    "year": 2002,
    "Export Growth Rate": 1.29,
    "Import Growth Rate": 2.1,
  },
  {
    "year": 2003,
    "Export Growth Rate": 1.27,
    "Import Growth Rate": 2.15,
  },
  {
    "year": 2004,
    "Export Growth Rate": 1.27,
    "Import Growth Rate": 2.21,
  },
  {
    "year": 2005,
    "Export Growth Rate": 1.26,
    "Import Growth Rate": 2.23,
  },
  {
    "year": 2006,
    "Export Growth Rate": 1.26,
    "Import Growth Rate": 2.29,
  },
  {
    "year": 2007,
    "Export Growth Rate": 1.27,
    "Import Growth Rate": 2.34,
  },
  {
    "year": 2008,
    "Export Growth Rate": 1.26,
    "Import Growth Rate": 2.36,
  },
  {
    "year": 2009,
    "Export Growth Rate": 1.26,
    "Import Growth Rate": 2.36,
  },
  {
    "year": 2010,
    "Export Growth Rate": 1.25,
    "Import Growth Rate": 2.35,
  },
  {
    "year": 2011,
    "Export Growth Rate": 1.24,
    "Import Growth Rate": 2.34,
  },
  {
    "year": 2012,
    "Export Growth Rate": 1.25,
    "Import Growth Rate": 2.39,
  },
  {
    "year": 2013,
    "Export Growth Rate": 1.22,
    "Import Growth Rate": 2.3,
  },
  {
    "year": 2014,
    "Export Growth Rate": 1.2,
    "Import Growth Rate": 2.35,
  },
  {
    "year": 2015,
    "Export Growth Rate": 1.17,
    "Import Growth Rate": 2.39,
  },
  {
    "year": 2016,
    "Export Growth Rate": 1.16,
    "Import Growth Rate": 2.41,
  },
  {
    "year": 2017,
    "Export Growth Rate": 1.13,
    "Import Growth Rate": 2.44,
  },
  {
    "year": 2018,
    "Export Growth Rate": 1.07,
    "Import Growth Rate": 2.45,
  },
  {
    "year": 2019,
    "Export Growth Rate": 1.03,
    "Import Growth Rate": 2.47,
  },
  {
    "year": 2020,
    "Export Growth Rate": 0.92,
    "Import Growth Rate": 2.48,
  },
  {
    "year": 2021,
    "Export Growth Rate": 0.82,
    "Import Growth Rate": 2.51,
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
                 Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator class="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{{ title.title }}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid auto-rows-min gap-4 md:grid-cols-4">
           <Card v-for="(item, index) in widgetData" :key="index" class="rounded-lg border border-border bg-muted/50">
            <CardHeader>
              <CardTitle>{{ item.title }}</CardTitle>
              <CardDescription>{{ item.description }}</CardDescription>
            </CardHeader>
            <!-- <CardContent class="grid gap-2 p-2">
              <div class=" flex items-center space-x-4 rounded-md p-2 bg-card">
                <Bell />
                <div class="flex-1 space-y-1">
                  <p class="text-sm font-medium leading-none">
                     Data {{ item.title }}
                  </p>
                </div>
              </div>
            </CardContent> -->
          </Card>
        </div>
        
          <!-- <div class="flex-1 rounded-xl p-2" >
          <LineChart
              :data="data"
              index="year"
              :categories="['Export Growth Rate', 'Import Growth Rate']"
              :y-formatter="(tick, i) => {
                return typeof tick === 'number'
                  ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                  : ''
              }"
            />
          </div> -->
          
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>

    </SidebarInset>
  </SidebarProvider>
</template>
