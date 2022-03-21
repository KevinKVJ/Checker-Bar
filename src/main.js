import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import 'normalize.css'

if (import.meta.hot) {
    import.meta.hot.on(
      "vite:beforeUpdate",
      () => console.clear()
    );
}

createApp(App).use(router).mount('#app')
