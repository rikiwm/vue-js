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

import { ref, computed, onMounted, onUnmounted } from "vue";
import { useProducts } from "@/composable/products/useProducts";

// Ambil data produk dari API via TanStack Query
const { data: products, isLoading, isError, error } = useProducts();

// --- State untuk Infinite Scroll ---
const limit = ref(8); // jumlah item per "halaman"
const displayedProducts = computed(() =>
  products?.value ? products.value.slice(0, limit.value) : []
);
const hasMore = computed(
  () => (products?.value?.length || 0) > limit.value
);

// --- Intersection Observer ---
const bottom = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function loadMore() {
  if (hasMore.value) {
    limit.value += 8;
  }
}

function setupObserver() {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && hasMore.value) {
        loadMore();
      }
    });
  });
  if (bottom.value) observer.observe(bottom.value);
}

onMounted(() => {
  setupObserver();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <section id="products" class="container lg:w-[75%] py-24 sm:py-32">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-lg text-primary mb-2 tracking-wider">Product</h2>
      <h2 class="text-3xl md:text-4xl font-bold">The Product Company</h2>
    </div>

    <!-- Loading -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="animate-pulse bg-muted rounded-lg p-4 h-80"
      ></div>
    </div>

    <!-- Error -->
    <div v-else-if="isError" class="text-center text-red-500">
      {{ error?.message || "Gagal memuat data produk." }}
    </div>

    <!-- Product Cards -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
    >
      <Card
        v-for="(item, index) in displayedProducts"
        :key="item.id || index"
        class="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
      >
        <CardHeader class="p-0 gap-0">
          <div class="h-full overflow-hidden">
            <router-link :to="`/products/${item.id}`">
              <img
                :src="item.image"
                alt="Product Image"
                class="w-full p-2 aspect-square object-cover saturate-0 transition-all duration-200 ease-linear group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.02]"
              />
            </router-link>
          </div>

          <CardTitle class="py-2 pb-4 px-6 text-md truncate">
            {{ item.title }}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <span class="text-xs line-clamp-3">
            {{ item.description }}
          </span>
        </CardContent>

        <CardFooter class="space-x-4 mt-auto">
          <span class="text-md font-semibold">${{ item.price }}</span>
        </CardFooter>
      </Card>
    </div>

    <!-- Loading More Indicator -->
    <div v-if="!isLoading && hasMore" class="flex justify-center mt-8">
      <div class="animate-pulse text-muted-foreground">
        Memuat lebih banyak...
      </div>
    </div>

    <!-- Target Observer -->
    <div ref="bottom" class="h-8"></div>

    <!-- End Message -->
    <div
      v-if="!hasMore && !isLoading"
      class="text-center mt-6 text-muted-foreground"
    >
      — Tidak ada produk lagi —
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
