<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { useRoute } from 'vue-router';
import { useProductsId } from '@/composable/products/useProducts';
import { Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
const mode = useColorMode();
const route = useRoute()
const id = Number(route.params.id)
const { data: products, isLoading, isError, error } = useProductsId(id)
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
      <div v-if="isLoading" class="w-full  justify-center space-y-4">
        <div  class="animate-pulse bg-muted rounded-lg p-4 h-80"></div>
        <div  class="animate-pulse bg-muted rounded-lg p-4 h-10"></div>
        <div  class="animate-pulse bg-muted rounded-lg p-4 h-10"></div>
        <div  class="animate-pulse bg-muted rounded-lg p-4 h-10"></div>
      </div>

      <!-- Error -->
      <div v-else-if="isError" class="text-center text-red-500">
        {{ error }}
      </div>

      <!-- Data -->
      <div v-else>
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
      </div>
    </section>
</template>