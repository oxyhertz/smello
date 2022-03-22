import { createRouter, createWebHistory } from 'vue-router';
import home from '../views/home.vue';
import workspace from '../views/workspace.vue';
import boardDetails from '../views/board-details.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/board',
      name: 'board',
      component: workspace,
    },
    {
      path: '/board/:boardId',
      name: 'board-details',
      component: boardDetails,
    },
  ],
});

export default router;
