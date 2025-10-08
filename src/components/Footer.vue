<script setup lang="ts">
import { ChevronsDown } from "lucide-vue-next";
import Separator from "./ui/separator/Separator.vue";
</script>

<template>
  <footer
    id="footer"
    class="w-full px-6 py-6 "
  >
    <div class="p-4 bg-muted dark:bg-card border rounded-xl">
      <div
        class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8"
      >
        <div class="col-span-full xl:col-span-2">
          <a
            href="#"
            class="flex font-bold items-center"
          >
            <ChevronsDown
              class="bg-gradient-to-tr from-green-500 via-green-900/70 to-green-500 rounded-lg w-9 h-8 mr-2 border text-white"
            />

            <h3 class="text-2xl">Vue.js</h3>
          </a>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Contact</h3>
          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Github
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Twitter
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Instagram
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Platforms</h3>
          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              iOS
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Android
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Web
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Help</h3>
          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Contact Us
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              FAQ
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Feedback
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Socials</h3>
          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Twitch
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Discord
            </a>
          </div>

          <div>
            <a
              href="#"
              class="opacity-60 hover:opacity-100"
            >
              Dribbble
            </a>
          </div>
        </div>
      </div>

      <Separator class="my-6" />
      <section className="">
        <h3 class="">
          &copy; 2025 Designed and developed by
          <a
            target="_blank"
            href=""
            className="text-teal transition-all border-primary hover:border-b-2"
          >
            Open Source
          </a>
        </h3>
      </section>
    </div>
  </footer>
</template>
