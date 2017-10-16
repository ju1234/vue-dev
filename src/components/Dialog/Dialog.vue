<template>
  <div>
    <transition name="dialog-bounce">
      <div v-if="show" class="dialog">
        <div class="dialog-wrap">
          <div class="dialog-header">
            <span class="dialog-header-title">{{ title }}</span>
          </div>
          <div class="dialog-body">
            <div>{{content}}</div>
          </div>
          <div class="dialog-btns">
            <button class="dialog-cancel-btn" v-if="type === 'confirm'" @click="handleClick(false)">{{ cancelButtonText }}</button>
            <button class="dialog-ok-btn":class="{'dialog-all-btn': type == 'alert'  }" @click="handleClick(true)">{{ confirmButtonText}}</button>
          </div>
      </div>
    </div>
  </transition>
  <div class="dialog-mask"></div>
  </div>
</template>

<script>
export default {
  name: 'dialog',
  props: {
    show: Boolean,
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    confirmButtonText: {
      type: String,
      default: '确定',
    },
    cancelButtonText: {
      type: String,
      default: '取消',
    }
  },
  methods: {
    handleClick(flag = true) {
      this.$nextTick(() => {
        setTimeout(() => {
          flag &&  this.okClick && this.okClick();
          !flag && this.cancelClick && this.cancelClick();
          // this.destroy();
        }, 200);
      });
    },
    destroy () {
      this.show = false;
      setTimeout(() => {
        this.$el.parentNode.removeChild(this.$el);
      }, 200);
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
