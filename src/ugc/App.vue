<template>
  <transition name="slide">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>
<style lang="scss" src="./style.scss">
</style>
<style>
  html, body {
    background-color: #f7f7f7;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>

<!-- 使用动态的 transition name -->
<!-- <transition :name="transitionName">
  <router-view></router-view>
</transition>
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
} -->
