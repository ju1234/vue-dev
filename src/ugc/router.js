import Vue from 'vue';
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const Tags = () => import('./views/Tags')
const Result = () => import('./views/Result')

const routes = [
  { path: '/', component: Tags },
  { path: '/tags', component: Tags },
  { path: '/result', component: Result },
];

export default new VueRouter({ routes });
