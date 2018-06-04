import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import config from './config'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
