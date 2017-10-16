import fastclick from 'fastclick'

fastclick.attach(document.body)
import Vue from 'vue'
import '@libs/common.scss'

import App from './App.vue'

window.log = console.log.bind(console);

new Vue({
  el: '#app',
  render: h => h(App)
});
