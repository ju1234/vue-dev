<template>
  <div class="checkbox-component">
    <header class="checkbox-header">{{ title }}</header>
    <ul class="checkbox-tags clearfix">
      <li class="checkbox-tag" @click="handleClick(index)" v-for="(item, index) in items" :key="item.tagId">
        <i class="radio" :class="{'checked': item.checked}"></i>
        <span>{{ item.showName }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'radio-component',
  props: {
    title: String,
    items: {
      type: Array,
      default: [],
    },
  },
  methods: {
    handleClick(index) {
      const item = {...this.items[index], checked: !this.items[index].checked};
      this.$set(this.items, index, item);
    },
  }
}
</script>

<style lang="scss" scoped src="./index.scss">
</style>
