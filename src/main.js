import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { ValidationProvider, extend } from 'vee-validate';
import { required, max } from 'vee-validate/dist/rules';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faPencilAlt, faVideo } from '@fortawesome/free-solid-svg-icons'
import { faImage, faSmile } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export const eventBus = new Vue();

library.add(faSignOutAlt, faPencilAlt, faImage, faVideo, faSmile)

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('ValidationProvider', ValidationProvider);

Vue.config.productionTip = false
Vue.use(BootstrapVue);

extend('required', {
  ...required,
  message: '*This field is required.'
});

extend('max',{
  ...max,
  message: 'Your post can have max 250 characters.'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
