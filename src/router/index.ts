import { createWebHistory, createRouter } from 'vue-router'
import LandingLayout from '@/layouts/LandingLayout.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

// import Home from '../views/Home.vue';
import Product from '@/pages/landing/Product.vue';
import Contact from '@/components/Contact.vue';
import LoginPage from '@/pages/auth/Login.vue'
import DashboardHome from '@/pages/dashboard/Index.vue'
import DashboardProducts from '@/pages/dashboard/Products.vue'
import DashboardUsers from '@/pages/dashboard/User.vue'
import Cookie from 'js-cookie'

import LandingPage from '@/pages/landing/Index.vue'
const getToken = () => Cookie.get('token')

const routes = [
   {
      path: '/',
      component: LandingLayout,
      children: [
        { path: '', name: 'Home', component: LandingPage },
        { path: '/products', name:'Product', component: Product},
        { path: '/products/:id', name:'Product.Detail', component: () => import('../components/ProductDetail.vue')},
        { path: '/contact', name:'Contact', component: Contact},
        { path: '/faq', name:'Faq', component: () => import('../components/FAQ.vue')},
      ],
    },
    
    {
      path: '/auth',
      children: [
        { path: 'login', name: 'Login', component: LoginPage },
      ],
    },

    {
      path: '/admin',
      component: DashboardLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', name: 'Dashboard', component: DashboardHome },
        { path: 'products', name: 'Products',  component: DashboardProducts},
        { path: 'users', name: 'Users',  component: DashboardUsers},
        { path: 'fakeapi', name: 'FakeApi',  component: () => import('@/pages/dashboard/FakeApi.vue')},
        { path: 'products/:id', name: 'EditProduct', component: () => import('@/pages/dashboard/produk/ProductEdit.vue') },
      ],
    },
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
        next({ name: 'Login' });
    } 
    
    // Jika rute tujuan adalah halaman login atau register dan pengguna sudah login
    else if ((to.name === 'Login') && token) {
        // Alihkan pengguna ke halaman dashboard
        next({ name: 'Dashboard' });
    } 
    
    // Jika tidak ada kondisi khusus, izinkan navigasi ke rute tujuan
    else {
        next();
    }
});


export default router;