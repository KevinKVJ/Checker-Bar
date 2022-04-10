import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [path.resolve(__dirname, 'src/assets/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',

            /**
             * 自定义插入位置
             * @default: body-last
             */
            // inject: 'body-last' | 'body-first',

            /**
             * custom dom id
             * @default: __svg__icons__dom__
             */
            customDomId: '__svg__icons__dom__',
        }),
    ],

    server: {
        proxy: {
            
            // 选项写法
            '/api': {
                target: 'http://10.13.110.27:8000',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
            
            // Proxying websockets or socket.io
            // '/socket.io': {
            //     target: 'ws://localhost:3000',
            //     ws: true,
            // },
        },
    },
});
