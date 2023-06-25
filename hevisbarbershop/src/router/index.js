import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:catchAll(.*)', // Wildcard route to catch all undefined routes
      redirect: '/login' // Redirect to /login
    }
  ]
});



export default router;
