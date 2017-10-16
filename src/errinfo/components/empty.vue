<template>
  <div class="empty">
    component empty
  </div>
</template>

<script>
  export default {
    name: 'empty',
    data: function () {
      return {
        linkText: '',
        link: ''
      }
    },
    props: {
      tagStatus: Number
    },
    methods: {},
    mounted: function () {
    }
  }
</script>
<style lang="scss" scoped src="./empty.scss">
</style>
