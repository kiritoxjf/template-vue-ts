import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/Login/index.vue')
        },
        {
          path: '/',
          name: 'layout',
          component: () => import('@/views/Layout/index.vue'),
          children: [
            {
              path: '/',
              name: 'home',
              component: () => import('@/views/Home/index.vue')
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from) => {
  const token = sessionStorage.getItem('token')
  if (!token && to.name !== 'login') {
    return { name: 'login' }
  }
})

export default router
