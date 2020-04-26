import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/pages/login';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'loginpage',
    component: LoginPage
  }]
});
