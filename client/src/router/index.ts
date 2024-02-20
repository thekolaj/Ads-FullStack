import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authenticate } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/User/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/User/SignupView.vue'),
    },
    {
      path: '/profile',
      name: 'Profile',
      beforeEnter: [authenticate],
      component: () => import('../views/User/ProfileView.vue'),
    },
    {
      path: '/user/:id',
      name: 'User',
      component: () => import('../views/User/UserView.vue'),
    },
    {
      path: '/ad',
      beforeEnter: [authenticate],
      children: [
        {
          path: '/create',
          name: 'AdCreate',
          component: () => import('../views/Ad/CreateView.vue'),
        },
        {
          path: '/update/:id',
          name: 'AdUpdate',
          component: () => import('../views/Ad/UpdateView.vue'),
        },
      ],
    },
    { path: '/ad/:id', name: 'AdDetail', component: () => import('../views/Ad/DetailView.vue') },
    {
      path: '/category/list',
      name: 'CategoryList',
      component: () => import('../views/Category/ListView.vue'),
    },
    {
      path: '/category/:id',
      name: 'CategoryList',
      component: () => import('../views/Category/CategoryView.vue'),
    },
    {
      path: '/reset',
      name: 'Reset',
      component: () => import('../views/ResetView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
