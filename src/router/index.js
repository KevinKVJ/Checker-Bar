import { createRouter, createWebHistory } from 'vue-router';
// import Login from '@/pages/Login.vue'
import Base from '@/components/Base.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            title: 'Index',
            component: Base,
        },
        {
            path: '/selectMode',
            name: 'selectMode',
            title: 'selectMode',
            component: () => import('@/pages/SelectMode.vue'),
        },
        {
            path: '/homePage',
            name: 'homePage',
            title: 'homePage',
            component: () => import('@/pages/HomePage.vue'),
        },
        {
            path: '/login',
            name: 'login',
            title: 'login',
            component: () => import('@/pages/Login.vue'),
        },
        {
            path: '/signup',
            name: 'signup',
            title: 'signup',
            component: () => import('@/pages/SignUpPage.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            title: 'profile',
            component: () => import('@/pages/ProfilePage.vue'),
        },
        {
            path: '/records',
            name: 'records',
            title: 'records',
            component: () => import('@/pages/RecordsPage.vue'),
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/NotFound.vue'), },
    ],
});

export default router;
