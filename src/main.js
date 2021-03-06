// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import router from './router';
import Layout from './components/layout';

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
});
