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
            path: '/base',
            name: 'base',
            title: 'Base',
            component: () => import('@/pages/SelectMode.vue'),
        },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/NotFound.vue'), },
    ],
});

export default router;
