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
        {
            path: '/compete',
            name: 'compete',
            title: 'compete',
            component: () => import('@/pages/Compete.vue'),
        },
        {
            path: '/csb',
            name: 'chessboard1',
            title: 'chessboard',
            component: () => import('@/components/Checker/CheckerBoard1.vue'),
        },
        {
            path: '/csb2',
            name: 'chessboard2',
            title: 'chessboard',
            component: () => import('@/components/Checker/CheckerBoard2.vue'),
        },
        {
            path: '/csb3',
            name: 'chessboard3',
            title: 'chessboard',
            component: () => import('@/components/Checker/CheckerBoard3.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/pages/NotFound.vue'),
        },
    ],
});

export default router;
