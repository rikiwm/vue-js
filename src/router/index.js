import { createWebHistory, createRouter } from 'vue-router'
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contact from '../components/Contact.vue';
import Logins from '../views/Logins.vue';
import Cookie from 'js-cookie'
const getToken = () => Cookie.get('token')

const routes = [
  { path: '/', name:'Home', component: Home},
  { path: '/about', name:'Product', component: About},
  { path: '/about/:id', name:'Product.Detail', component: () => import('../components/ProductDetail.vue')},
  { path: '/contact', name:'Contact', component: Contact},
  { path: '/faq', name:'Faq', component: () => import('../components/FAQ.vue')},
  { path: '/login', name:'Login', component: Logins},
  { path: '/admin/dashboard', name: 'Dashboard', component: () => import('../views/admin/Dashboard.vue'), meta: { requiresAuth: true }},
  { path: '/admin/products', name: 'Products', component: () => import('../views/admin/Products.vue'), meta: { requiresAuth: true }},
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
    // Ambil token otentikasi pengguna
    const token = getToken();

    // Jika rute tujuan membutuhkan otentikasi dan pengguna tidak memiliki token
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        // Alihkan pengguna ke halaman login
        next({ name: 'login' });
    } 
    // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
    else if ((to.name === 'login') && token) {
        // Alihkan pengguna ke halaman dashboard
        next({ name: 'dashboard' });
    } 
    // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
    else {
        next();
    }
});


export default router;