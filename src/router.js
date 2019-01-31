import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'

Vue.use(Router)

const router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/autenticado',
      name: 'home',
      component: () => import(/* webpackChunkName: "about" */ './views/Autenticado.vue'),
      meta:{
        requiresAuth:true
      }
    }
  ]
})

router.beforeEach((to, from , next) => {

  const currentUser = firebase.auth().currentUser;
  
  if(to.meta.requiresAuth && !currentUser)
    next('/')
  else
    if( to.meta.requiresAuth && currentUser ){
      next()
      console.log(currentUser)
    }
  else
   next()
})
 
export default router;
