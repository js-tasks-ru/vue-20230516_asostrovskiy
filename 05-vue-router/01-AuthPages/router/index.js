import { createRouter, createWebHistory } from 'vue-router';
import pageIndex from '../views/PageIndex.vue';
import pageLogin from '../views/PageLogin.vue';
import pageRegister from '../views/PageRegister.vue';

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes: [
	  { path: '/login', name: 'login', component: pageLogin },
	  { path: '/register', name: 'register', component: pageRegister },
	  { path: '/', name: 'main', component: pageIndex },
  ],
});
