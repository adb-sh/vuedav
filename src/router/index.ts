import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import { auth } from '@/middleware/auth';
import { runMiddleware } from '@/lib/runMiddleware';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import('../views/Files.vue'),
    meta: {
      middleware: [auth],
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.middleware) runMiddleware({ from, to, next, router });
  else next();
});

export default router;
