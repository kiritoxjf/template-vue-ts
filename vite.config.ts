import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3001,
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    visualizer({
      open: true,
      filename: './buildStats.html',
      gzipSize: true,
      brotliSize: true
    }),
    vueDevTools(),
    VueSetupExtend(),
    Icons(),
    AutoImport({
      imports: []
    }),
    Components({
      resolvers: [IconsResolver({ prefix: false, enabledCollections: ['fluent'] })]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/global.scss" as *;'
      }
    }
  },
  build: {
    target: 'modules', //浏览器兼容性modules|esnext
    sourcemap: false, //构建后是否生成source map文件
    minify: 'terser', // 混淆器,terser构建后文件体积更小
    // outDir: envConfig.VITE_OUTPUT_DIR,  //指定输出文件包名
    outDir: 'dist',
    assetsDir: 'assets', // 指定生成静态资源的存放路径
    chunkSizeWarningLimit: 1500, //警报门槛，限制大文件大小B为单位
    assetsInlineLimit: 4096, //小于此阈值的导入或引用资源将内联为base64编码,以避免额外的http请求,设置为0可以完全禁用此项
    // 清除console和debugger(minify: 'terser',)设置后这个terserOptions才有用
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        //自动分割包名输出 chunkSizeWarningLimit 配置大小
        chunkFileNames: 'js/[name]-[hash].js', //入口文件名
        entryFileNames: 'js/[name]-[hash].js', //出口文件名位置
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]', //静态文件名位置
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        }
      }
    }
  }
})
