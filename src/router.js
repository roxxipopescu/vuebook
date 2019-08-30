import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import NewsFeed from './views/NewsFeed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/feed',
      name: 'feed',
      component: NewsFeed
    }
  ]
})
