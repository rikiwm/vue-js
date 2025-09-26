<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
const mode = useColorMode();

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-vue-next";
</script>

<template>
  <section class="container">
    <div
      class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-10 md:py-12"
    >
      <div class="text-center space-y-8">
        <Badge
          variant="outline"
          class="text-sm py-2"
        >
          <span class="mr-2 text-teal-500">
            <Badge class="bg-teal-900 hover:bg-green-600">New</Badge>
          </span>
          <span> Daftar Sekarang Juga ! </span>
        </Badge>

        <div
          class="max-w-screen-md mx-auto text-center text-5xl md:text-7xl font-bold"
        >
          <h1>
            The 

            <span
              class="text-transparent bg-gradient-to-t from-teal-800 to-teal-900 bg-clip-text"
              >Progressive JavaScript 
            </span>
           Framework
          </h1>
        </div>

        <p class="max-w-screen-md mx-auto text-2xl text-muted-foreground">
       An approachable, performant and versatile framework for building web user interfaces.
        </p>

        <div class="space-y-4 md:space-y-0 md:space-x-4">
          <Button class="w-5/6 md:w-1/4 font-bold group/arrow rouded-2xl bg-green-600">
            Get Started
            <ArrowRight
              class="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform"
            />
          </Button>

          <Button
            as-child
            variant="secondary"
            class="w-5/6 md:w-1/4 font-bold rouded-2xl"
          >
            <a
              href="/shadcn-vue-landing-page.git"
              target="_blank"
              >Github respository</a
            >
          </Button>
        </div>
      </div>

      <div class="relative group mt-14">
        <!-- gradient shadow -->
        <div
          class="absolute -top-6 right-12 w-[90%] h-12 lg:h-[80%] bg-teal-500/50 blur-3xl rounded-full img-shadow-animation"
        ></div>

        <img
          class="w-full md:w-[1400px] mx-auto rounded-2xl relative leading-none flex items-center border border-t-3 border-t-teal-500/30 img-border-animation"
          :src="
            mode == 'light' ? 'vue-img.jpg' : 'hero-image-dark.jpg'
          "
          alt="dashboard using shadcn-vue"
        />

        <!-- gradient effect img -->
        <div
          class="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"
        ></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.img-shadow-animation {
  animation-name: img-shadow-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

.img-border-animation {
  animation-name: img-border-animation;
  animation-iteration-count: infinite;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes img-shadow-animation {
  from {
    opacity: 0.5;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}
@keyframes img-border-animation {
  from {
    @apply border-t-teal-500/10;
  }

  to {
    @apply border-t-teal-500/60;
  }
}
</style>
