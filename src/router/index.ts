import type { iPage } from '@/interface/common'
import {
  createRouter,
  createWebHistory,
  type RouteMeta,
  type RouteRecordRaw,
  type RouteComponent
} from 'vue-router'

interface iRouteMeta extends RouteMeta {
  name: string
  level: number
}

const pages: Record<string, iRouteMeta> = import.meta.glob('../views/**/page.ts', {
  eager: true,
  import: 'default'
})
const comps: Record<string, RouteComponent> = import.meta.glob('../views/**/index.vue')

// 格式化pages对象为数组
const arrPages: iPage[] = Object.entries(pages).map(([path, page]) => ({
  path,
  ...page
}))

// 动态初始化路由配置 Routes
const generateRoutes = (arr: iPage[], level: number, parent?: string): Array<RouteRecordRaw> => {
  const routes = arr.filter((item) => item.level === level && (!parent || item.parent === parent))
  return routes.map((item) => {
    const path = item.path?.replace('../views', '').replace('/page.ts', '').toLowerCase() || '/'
    const name = item.name
    const component = item.path ? comps[item.path.replace('page.ts', 'index.vue')] : null
    const meta = {
      title: item.title
    }
    const children = generateRoutes(arr, level + 1, item.parent)
    return {
      path,
      name,
      component,
      meta,
      children
    }
  })
}

const routes: Array<RouteRecordRaw> = generateRoutes(arrPages, 1)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
