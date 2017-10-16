<template>
  <h3>component list</h3>
</template>

<script>

  import {get, post} from '@libs/api'
  import Toast from '@components/Toast'
  import Loading from '@components/Loading'

  export default {
    name: 'list',
    props: {
      info: Object,
      tagStatus: Number
    },
    data() {
      return {
        item: 'asda',
        appealUrl: 'javascript:void(0)',
      }
    },
    mounted: function () {
    },
    methods: {},
    computed: {}
  }
</script>
<style lang="scss" scoped src="./list.scss">
</style>
