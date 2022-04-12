import { createRouter, createWebHistory } from 'vue-router';
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
            title: 'HomePage',
            component: () => import('@/pages/HomePage.vue'),
        },
        {
            path: '/login',
            name: 'login',
            title: 'Login',
            component: () => import('@/pages/Login/Login.vue'),
            beforeEnter: () => {
                sessionStorage.clear();
                return true;
            },
        },
        {
            path: '/signup',
            name: 'signup',
            title: 'Signup',
            component: () => import('@/pages/SignUpPage.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            title: 'Profile',
            component: () => import('@/pages/ProfilePage/ProfilePage.vue'),
        },
        {
            path: '/records',
            name: 'records',
            title: 'Records',
            component: () => import('@/pages/RecordsPage.vue'),
        },
        {
            path: '/compete',
            name: 'compete',
            title: 'Compete',
            component: () => import('@/pages/Compete/Compete.vue'),
        },
        {
            path: '/spectate',
            name: 'spectate',
            title: 'Spectate',
            component: () => import('@/pages/Spectate/Spectate.vue'),
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
            path: '/csb4',
            name: 'chessboard4',
            title: 'chessboard',
            component: () => import('@/components/Checker/CheckerBoard4.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/pages/NotFound.vue'),
        },
    ],
});

export default router;
