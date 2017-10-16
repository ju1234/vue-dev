<template>
  <div>
    <div class="empty-icon">
      <i></i>
      <span></span>
    </div>
    <p class="empty-text">
      您还没有{{tagStatus === 0 ? '报错' : '添加'}}商户记录
    </p>
    <div class="empty-link">
      <a :href="link">{{linkText}}</a>
    </div>
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
    methods: {
      init: function () {
        this.linkText = this.tagStatus === 0 ? '一分钟了解报错' : '添加商户';
        const isProduction = window.location.host.indexOf('dianping') > -1;
        const hostname = isProduction ? 'dianping' : '51ping';
        this.link = this.tagStatus === 0 ? 'https://s.dianping.com/topic/14332459' : `https://m.${hostname}.com/poi/app/shop/addShopEntry`
      }
    },
    mounted: function () {
      this.init()
    }
  }
</script>
<style lang="scss" scoped src="./empty.scss">
</style>
