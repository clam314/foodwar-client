/* eslint-disable */
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import state from './assets/js/state';
import VueFetch, {
  $fetch
} from './plugins/fetch';
import VueState from './plugins/state';

import './assets/scss/index.scss';

Vue.config.productionTip = true;

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/'
});
Vue.use(VueState, state);
Vue.use(VueTween);

async function main() {
  // Get user info
  try {
    state.user = await $fetch('user');
  } catch (e) {
    console.warn(e);
  }
  // Launch app
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    data: state,
    router,
    render: h => h(App)
  });
}

main();
