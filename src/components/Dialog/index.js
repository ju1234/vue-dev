import Vue from 'vue';

const DialogConstructor = Vue.extend(require('./Dialog.vue'));
let instance;

const Dialog = function() {

}

Dialog.alert = (options) => {
  if (instance && instance.vm.show) instance.destroy();
  instance = new DialogConstructor({
    data: options
  });
  instance.vm = instance.$mount();
  instance.vm.show = true;
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop];
    }
  }
  instance.type = 'alert';
  document.body.appendChild(instance.vm.$el);
}

Dialog.confirm = (options) => {
  if (instance && instance.vm.show) instance.destroy();
  instance = new DialogConstructor();
  instance.vm = instance.$mount();
  instance.vm.show = true;
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      instance[prop] = options[prop];
    }
  }
  instance.type = 'confirm';
  document.body.appendChild(instance.vm.$el);
}

Dialog.close = () => {
  if (instance && instance.vm.show) {
    instance.destroy();
    // document.body.removeChild(instance.vm.$el);
  }
};

export default Dialog;
