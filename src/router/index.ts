import {
  createRouter,
  createWebHistory,
  type RouteMeta,
  type RouteRecordRaw,
  type RouteComponent
} from 'vue-router'

const pages: Record<string, RouteMeta | undefined> = import.meta.glob('../views/**/page.ts', {
  eager: true,
  import: 'default'
})
const comps: Record<string, RouteComponent> = import.meta.glob('../views/**/index.vue')
const routes: Array<RouteRecordRaw> = Object.entries(pages).map(([path, page]) => {
  const originPath = path
  const compPath = originPath.replace('page.ts', 'index.vue')
  path = path.replace('../views', '').replace('/page.ts', '').toLowerCase() || '/'
  const name =
    path
      .split('/')
      .filter((p) => p)
      .join('-') || 'index'
  return {
    path,
    name,
    component: comps[compPath],
    meta: page
  }
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
