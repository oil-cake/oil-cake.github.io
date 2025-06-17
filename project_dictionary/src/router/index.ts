
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Generator from '../views/Generator.vue';
import Parser from '../views/Parser.vue';
import BvHelper from '../views/BvHelper.vue';



const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'Generator' }
  },
  {
    path: '/generator',
    name: 'Generator',
    component: Generator,
  },
  {
    path: '/parser',
    name: 'Parser',
    component: Parser,
  },
  {
    path: '/bv-helper',
    name: 'BvHelper',
    component: BvHelper,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;