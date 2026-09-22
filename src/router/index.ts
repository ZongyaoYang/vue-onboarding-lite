import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/members' },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    {
      path: '/members',
      name: 'members',
      component: () => import("@/views/MembersView.vue"),
      meta: { requiresAuth: true },
    }
  ],
})

router.beforeEach(to => {
  const auth = useAuthStore();
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

export default router
