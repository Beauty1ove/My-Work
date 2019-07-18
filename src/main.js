import Vue from 'vue'
import App from './App.vue'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import router from './router/index.js'

import axios from './api/axios.js'

import components from './components/index.js'

import './styles/index.less'
Vue.use(components)

Vue.prototype.$http = axios

Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
