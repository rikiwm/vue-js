<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import LinkedInIcon from "@/icons/LinkedInIcon.vue";
import GithubIcon from "@/icons/GithubIcon.vue";
import XIcon from "@/icons/XIcon.vue";


import { useProducts } from '@/composable/products/useProducts';
const { data: products, isLoading, isError, error } = useProducts()


const socialIcon = (socialName: string) => {
  switch (socialName) {
    case "LinkedIn":
      return LinkedInIcon;

    case "Github":
      return GithubIcon;

    case "X":
      return XIcon;
  }
};
</script>

<template>
  <section
    id="team"
    class="container lg:w-[75%] py-24 sm:py-32"
  >
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary text-center mb-2 tracking-wider">Product</h2>

      <h2 class="text-3xl md:text-4xl text-center font-bold">
        The Product Company 
      </h2>
    </div>
  <!-- Loading Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div v-for="n in 8" :key="n" class="animate-pulse bg-muted rounded-lg p-4 h-80"></div>
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="text-center text-red-500">
      {{ error }}
    </div>

    <!-- Data -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <Card
        v-for="(item, index ) in products"
        :key="index"
        class="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
      >
        <CardHeader class="p-0 gap-0">
          <div class="h-full overflow-hidden">
             <router-link :to="`/products/${item.id}`">
              <img
                :src="item.image"
                alt=""
                class="w-full p-2 aspect-square object-cover saturate-0 transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
              />
            </router-link>

          </div>
          <CardTitle class="py-2 pb-4 px-6 text-md"
            >{{ item.title }}
            
          </CardTitle>
        </CardHeader>

        <CardContent>
          <span class="text-xs">{{ item.description }}</span>
        </CardContent>

        <CardFooter class="space-x-4 mt-auto">
          <span class="text-md">{{ item.price }}</span>
      
        </CardFooter>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
</style>