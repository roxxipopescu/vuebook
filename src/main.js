import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false
Vue.use(BootstrapVue, VeeValidate);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
