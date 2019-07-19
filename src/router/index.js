import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Home from '@/views/home/index.vue'
import Welcome from '@/views/welcome/index.vue'
import NotFound from '@/views/404/index.vue'
import Article from '@/views/article/index.vue'
import Image from '@/views/image/index.vue'
import Publish from '@/views/publish/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'notFound', path: '*', component: NotFound }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const user = window.sessionStorage.getItem('user')
  if (user) {
    return next()
  }
  next('/login')
})

export default router
