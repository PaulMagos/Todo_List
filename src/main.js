import Vue from 'vue'
import App from './App.vue'
import 'w3-css'


Vue.config.productionTip = false
Vue.use(`w3-css`)


new Vue({
  render: h => h(App),
}).$mount('#app')
