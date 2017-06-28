import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  linkActiveClass: 'is-active',

  routes: store.state.route
});

router.beforeEach((to, from, next) => {
  next();
});

export default router
