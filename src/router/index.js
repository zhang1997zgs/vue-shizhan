import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/home', 
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/home',
    component: () => import ('@/views/home/Home'), 
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/category',
    component: () => import ('@/views/category/Category')
  },
  {
    path: '/cart',
    component: () => import ('@/views/cart/Cart')
  },
  {
    path: '/profile',
    component: () => import ('@/views/profile/Profile')
  },
  {
    path: '/detail/:iid',
    component: () => import ('@/views/detail/Detail')
  } 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
