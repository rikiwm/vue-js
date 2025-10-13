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
    default: "Product",
  },
});
import { faker } from 'https://esm.sh/@faker-js/faker';
import { ref} from "vue";
import { Separator } from "@/components/ui/separator";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AppSidebar from "@/components/AppSidebar.vue";

import ProductForm from "@/components/ProductForm.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";

// const randomName = faker.helpers.uniqueArray(faker.person.jobTitle(),3);
// console.log(randomName.data);

const widgetData = [
  {
    title: faker.finance.amount({ min: 6, max: 9123780500, autoFormat: true, symbol: 'Rp.',dec:0 }),
    description: faker.person.jobTitle(),
    persen:faker.git.commitDate(),
  },
  {
 title:faker.finance.amount({ min: 7, max: 9780503, autoFormat: true, symbol: 'Rp.', dec:0 }),
    description: faker.finance.currencyName() ,
    persen:faker.git.commitDate(),

  },
  {
 title:faker.number.romanNumeral(),
    description: faker.finance.transactionType(),
    persen:faker.git.commitDate(),

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
          <div class="grid auto-rows-min gap-4 md:grid-cols-3">
           
          </div>
          <div class="flex-1 rounded-xl" >
            <ProductForm />
            <Toaster />
          </div>
      </div>

    </SidebarInset>
 </SidebarProvider>
</template>
