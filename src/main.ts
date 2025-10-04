import { createApp } from "vue";
import App from "./App.vue";
import "./assets/index.css";
import router from './router/index.ts';
import axios from './services/api.js';


import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App);

app.use(router)
app.use(VueQueryPlugin)
app.mount("#app")
