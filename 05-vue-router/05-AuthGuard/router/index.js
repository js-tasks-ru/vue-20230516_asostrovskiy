import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      path: '/',
	  name: 'main',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/login',
	  name: "login",
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/register',
	  name: 'registr',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      path: '/meetups/create',
	  name: 'create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      path: '/meetups/:meetupId(\\d+)/edit',
	  name: 'edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

router.beforeEach((to, from) => {

	if (to.meta?.requireGuest && isAuthenticated()) return { name: 'main' }
	if (to.meta?.requireGuest && !isAuthenticated()) return true

	if (to.meta?.requireAuth && isAuthenticated())  return true
	if (to.meta?.requireAuth && !isAuthenticated()) {
		console.log(from.path)
		return { name: 'login', query: {from: to.path} }
	}

	return true }
)

export { router };
