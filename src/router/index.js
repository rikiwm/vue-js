// import { createMemoryHistory, createRouter } from 'vue-router'
import { createWebHistory, createRouter } from 'vue-router'

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contact from '../components/Contact.vue';

const routes = [
  { path: '/', name:'Home', component: Home},
  { path: '/about', name:'About', component: About},
  { path: '/contact', name:'Contact', component: Contact},
  { path: '/faq', name:'Faq', component: () => import('../components/FAQ.vue')},

]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;