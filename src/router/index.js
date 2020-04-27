import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/pages/login';
import GamePage from '@/pages/game';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/login',
    name: 'loginpage',
    component: LoginPage
  }, {
    path: '/',
    name: 'gamepage',
    component: GamePage
  }]
});
