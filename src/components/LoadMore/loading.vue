<template>
  <div class="zhilin-loading" :class="classname">
    <div class="zhilin-loading-leaf" :class="[`zhilin-loading-leaf-${item}`]" v-for="item in leafs"></div>
  </div>
</template>

<script>
  export default {
    name: 'loading',
    props: ['classname'],
    created() {
      this.leafs = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ];
    }
  }
</script>
<style lang="scss" scoped src="./loading.scss">
</style>
