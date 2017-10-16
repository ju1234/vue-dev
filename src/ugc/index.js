import fastclick from 'fastclick'
fastclick.attach(document.body)
import Vue from 'vue'
import '@libs/common.scss'

import App from './App.vue'
import router from './router'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});

import Promise from 'promise';
window.Promise = Promise;

window.log = console.log.bind(console);
// if (/eruda=true/.test(window.location) || localStorage.getItem('active-eruda') == 'true') {
//   import('eruda/eruda.min.js').then((eruda) => {
//     eruda.init();
//     (() => {
//       const erudaBtn = document.querySelector('.eruda-entry-btn');
//       erudaBtn.style.top = (window.innerHeight || document.documentElement.offsetHeight) - 200 + 'px';
//       erudaBtn.style.width = '80px';
//       erudaBtn.style.height = '80px';
//       erudaBtn.style.lineHeight = '80px';
//       erudaBtn.style.fontSize = '50px';
//       erudaBtn.style.left = '500px';
//     })();
//   });
// }
