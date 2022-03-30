import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/index.js';
import 'normalize.css';
import 'virtual:svg-icons-register';
import {Popup} from 'vant';


if (import.meta.hot) {
    import.meta.hot.on('vite:beforeUpdate', () => console.clear());
}

createApp(App).use(router).use(Popup).mount('#app');
