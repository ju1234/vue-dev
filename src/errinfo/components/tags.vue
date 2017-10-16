<template>
  <div class="tags-wrap">
    <div class="tags">
      <div
          class="tag"
          :class="{'tag-active': tagStatus}"
          @click="checkTag('tagActive',1)"
      >
                <span class="tag-text">
                  商户添加({{addTotal}})
                </span>
      </div>
      <div
          class="tag"
          :class="{'tag-active': !tagStatus}"
          @click="checkTag('tagActive',0)"
      >
                <span class="tag-text">
                  商户报错({{reportTotal}})
                </span>
      </div>
    </div>
    <div class="subtags">
      <div class="subtag" :class="{'subtag-active': subtagStatus === 3}"
           @click="checkTag('subtagStatus',3)"
      >全部
      </div>
      <div class="subtag" :class="{'subtag-active': subtagStatus === 0}"
           @click="checkTag('subtagStatus',0)"
      >审核中
      </div>
      <div class="subtag" :class="{'subtag-active': subtagStatus === 1}"
           @click="checkTag('subtagStatus',1)"
      >已通过
      </div>
      <div class="subtag" :class="{'subtag-active': subtagStatus === 2}"
           @click="checkTag('subtagStatus',2)"
      >未通过
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped src="./tags.scss">
</style>
<script>
  export default {
    name: 'tags',
    props: {
      tagStatus: Number,
      subtagStatus: Number,
      addTotal: Number,
      reportTotal: Number,
      statusChangeHandle: Function
    },
    data() {
    },
    methods: {
      checkTag(type, value) {
        if(value === this[type]) return false;
        this[type] = value;
        this.statusChangeHandle(type, value); // 修改标签状态
      }
    }
  }
</script>
