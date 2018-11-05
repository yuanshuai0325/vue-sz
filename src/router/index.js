import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: resolve => { require(['components/login'], resolve)},
    name: 'login',
  },
  {
    path: '/dashboard',
    component: resolve => { require(['components/dashboard'], resolve)},
    name: 'dashboard',
  },
  {
    path: '/search',
    component: resolve => { require(['components/search'], resolve)},
    name: 'search',
  },
  {
    path: '/use',
    component: resolve => { require(['components/use'], resolve)},
    name: 'use',
  },
  {
    path: '/storage',
    component: resolve => { require(['components/storage'], resolve)},
    name: 'storage',
  },
  {
    path: '/',
    redirect: 'login',
  },
]

export default new Router({
  routes: constantRouterMap
})
