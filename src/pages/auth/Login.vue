<script setup lang="ts">

import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Logins from "@/components/Login.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
   <div>
    <Navbar />
    <Logins />
    <Toaster />
    <Footer />
  </div>
</template>
