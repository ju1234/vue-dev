<template>
  <div>
    <h1>hello vue</h1>
    <empty></empty>
    <list></list>
  </div>
</template>
<script>
  import Empty from './components/empty.vue';
  import List from './components/list.vue';
//  import {get, post} from '@libs/api';
//  import {getUrlParamByName,login} from '@libs/util'

  export default {
    name: 'tags-page',
    components: {
      Empty,
      List
    },
    data() {
      return {
      }
    },
    mounted() {},
    methods: {}
  }

</script>
<style lang="scss" src="./style.scss"/>
