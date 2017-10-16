<template>
  <div>
    <transition name="dialog-bounce">
      <div class="dialog">
        <div class="dialog-wrap">
          <div class="dialog-header">
            <span class="dialog-header-title">{{ title }}</span>
          </div>
          <div class="dialog-body">
            <div>{{content}}</div>
            <mt-progress :value="value" transition="progress-fade">
              <div slot="end" class="mt-progress-end">{{ value }}%</div>
            </mt-progress>
          </div>
          <div class="dialog-btns">
            <button class="dialog-ok-btn dialog-all-btn" @click="handleClick(true)">{{ confirmButtonText }}</button>
          </div>
      </div>
    </div>
  </transition>
  <div class="dialog-mask"></div>
  </div>
</template>

<script>
import mtProgress from '@components/Progress/index.vue'
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
      default: 'ok',
    },
    value: {
      type: Number,
      default: 0
    }
  },
  components: {
    mtProgress
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
