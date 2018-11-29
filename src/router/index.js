import Vue from 'vue'
import Router from 'vue-router'
 import { Message } from 'element-ui'

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
    path: '/userlist',
    component: resolve => { require(['components/userlist'], resolve)},
    name: 'userlist',
  },
  {
    path: '/',
    redirect: 'login',
  },
]



const router = new Router({
  routes: constantRouterMap
})

router.beforeEach((to,from,next) => {
  // if (to.meta.requireAuth) {
  // }
  var token = sessionStorage.getItem("token");

  if (token || to.name === 'login') {
    console.log('已获取token')
    if ( to.name === 'login' ) {
      sessionStorage.removeItem("token")
      token = ''
    }
    next()
  } else {
    console.log('未获取token')
    Message({
      message: '请登录',
      type: 'error',
      duration: 5*1000
    })
    next('/')
  }
  console.log(to,from)
  if ( to.fullPath === "/4-2" ) {
    next(from.fullPath)
  }
  // if ( token ) {
  //   next();
  // } else {
  //   next({
  //     path: '/login',
  //   })
  // }
  // if (token) {

  // console.log(token)
  // next({
  //     path: '/login'
  //   })
  // } else {

  // }

})

// router.beforeEach((to, from, next) => {
//   console.log(11111111);
//   this.$store.dispatch('ChSearchDevice',false);
//   next();
// })

// export default new Router({
//   routes: constantRouterMap
// })

export default router