<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
import { useRoute } from 'vue-router'
import { useProductsId } from '@/composable/products/useProductsId';
import { Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';

const route = useRoute()

const id = Number(route.params.id)

const { data: products } = useProductsId(id)

import Navbar from "@/components/Navbar.vue";
</script>
<template>
      <Navbar />
      <section
    id="team"
    class="container  py-8 sm:py-24"
  >
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">Product Details</h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold uppercase">
          {{ products?.category }}
      </h2>
    </div>
     <Card class="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
      >
        <CardHeader class="p-2 gap-0 lg:w-[50%] mx-auto">
          <div class="h-full overflow-hidden">
            <img
              :src="products?.image"
              alt=""
              class="w-full py-12 px-6 object-cover transition-all duration-200 ease-linear size-full 
               group-hover/hoverimg:scale-[1.01]"
            />
          </div>
        </CardHeader>
      
        <CardTitle class="text-3xl w-full py-2 pb-4 px-6 text-md uppercase">{{ products?.category }}
            <h2 class="text-xs md:text-md font-bold mt-2">{{ products?.rating.rate }} / {{ products?.rating.count }}</h2>
        </CardTitle>
        <CardContent>
          <span class="text-sm">{{ products?.description }}</span>
        </CardContent>

        <CardFooter class="space-x-4 mt-auto">
          <span class="text-md">Price : {{ products?.price }}</span>

        </CardFooter>
      </Card>

    </section>
</template>