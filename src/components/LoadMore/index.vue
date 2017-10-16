<template>
  <div ref="loadmore">
    <div class="zhilin-more-loader" v-show="loading" v-if="hasNext">
      <loading classname="zhilin-loading-bottom"/>
      <span class="zhilin-loading-info">正在加载中...</span>
    </div>
    <div class="zhilin-loading-nomore" v-if="!hasNext">没有更多内容</div>
  </div>
</template>

<script>
  import Loading from './loading.vue'
  // 业务较为简单只提供 滚动为document.body 的情况，不提供初始加载
  export default {
    name: 'loadmore',
    props: {
      onLoad: Function,
      hasNext: {
        type: Boolean,
        default: true,
      }
    },
    components: {
      Loading
    },
    data() {
      return {
        loading: false
      }
    },
    mounted() {
      this.scrollDom = document.documentElement;
      this.listNode = this.$el.previousElementSibling;
      this.attachEvent();
    },
    destroyed() {
      this.detachEvent();
    },
    methods: {
      loadMoreFunc() {
        try {
          this.loading = true;
          this.onLoad && this.onLoad().then(() => {
            this.loading = false;
          }, () => {
            this.loading = false;
          })
        } catch (e) {
          throw new Error('刷新函数不支持Promise');
        }
      },
      handleLoadMore() {
        if (this.loading || !this.hasNext) return;
        const clientHeight = document.documentElement.clientHeight;

        const bottom = this.$refs.loadmore.getBoundingClientRect().bottom;
        if (bottom - 20 <= clientHeight) {
          this.loadMoreFunc();
        }
      },
      attachEvent() {
        document.documentElement.classList.add('zhilin-scroll-html');
        document.body.classList.add('zhilin-scroll-body');
        document.body.addEventListener('scroll', this.handleLoadMore, false);

//        function stopScrolling(touchEvent) {
//          touchEvent.preventDefault();
//        }
//
//        document.addEventListener('touchstart', stopScrolling, false);
//        document.addEventListener('touchmove', stopScrolling, false);

      },
      detachEvent() {
        document.documentElement.classList.remove('zhilin-scroll-html');
        document.body.classList.remove('zhilin-scroll-body');
        document.body.removeEventListener('scroll', this.handleLoadMore, false);

//        function stopScrolling(touchEvent) {
//          touchEvent.preventDefault();
//        }
//
//        document.removeEventListener('touchstart', stopScrolling, false);
//        document.removeEventListener('touchmove', stopScrolling, false);
      },
    }
  }
</script>

<style lang="scss" scoped src="./index.scss">
</style>
