<template>
  <section>
    <a
        class="banner"
        href="https://s.dianping.com/topic/29389185"
    ></a>
    <tags
        :tagStatus="tagStatus"
        :subtagStatus="subtagStatus"
        :addTotal="addTotal"
        :reportTotal="reportTotal"
        :statusChangeHandle="statusChangeHandle"
    />
    <div class="zhilin-more-loader" v-if="loading">
      <loading classname="zhilin-loading-bottom"/>
      <span class="zhilin-loading-info">正在加载中...</span>
    </div>
    <list
        v-if="!hasNoData"
        v-for="item in list"
        :info="item"
        :tagStatus="tagStatus"
        :key="item.shopId || item.dpId"
    />
    <empty
        v-if="hasNoData"
        :tagStatus="tagStatus"
    />
    <load-more
        v-if="!hasNoData"
        :hasNext="hasNext"
        :onLoad="handleLoad"
    />
  </section>
</template>
<script>
  import Tags from './components/tags.vue';
  import List from './components/list.vue';
  import Loading from '@components/LoadMore/loading.vue'
  import LoadMore from '@components/LoadMore';
  import Empty from './components/empty.vue';
  import {get, post} from '@libs/api';
  import {getUrlParamByName,login} from '@libs/util'
  import KNB from '@dp/knb/bundle';

  export default {
    name: 'tags-page',
    components: {
      List,
      Tags,
      LoadMore,
      Loading,
      Empty
    },
    data() {
      return {
        tag: [],
        list: [],
        tagStatus: 1,      // 1 添加 0 报错
        subtagStatus: 3,   // 0 审核中 1 已通过 2 未通过 3 全部
        addTotal: 0,       // 新增列表总数
        reportTotal: 0,    // 报错列表总数
        hasNext: true,

        loading: true,
        hasNoData: false
      }
    },
    mounted() {
      KNB.ready(function () {
        KNB.setBouncesEnabled({enable: 0});
      });

      this.initTagStatus();

      if (window.location.host.indexOf('localhost') > -1 || /^(\d+\.){3}\d+$/.test(location.hostname)) {
        this.userId = 859802394;
        this.handleInitLoad();
        this.getTotal()
      } else if (this.userId) {
        this.handleInitLoad();
        this.getTotal()
      } else {
        KNB.ready(() => {
          KNB.getUserInfo({
            success: (user) => {
              const {userId} = user;
              if(Number(userId) !== -1){
                this.userId = userId;
                this.handleInitLoad();
                this.getTotal()
              }else {
                login().then((userId) => {
                  this.userId = userId;
                  this.handleInitLoad();
                  this.getTotal()
                })
              }
            },
            fail: (err) => {
              login()
            }
          });
        })
      }

    },
    methods: {
      handleInitLoad() {
        this.pageNo = 1;
        this.list = [];
        this.loading = true;
        this.getList();
      },
      // 标签点击事件
      statusChangeHandle(type, value) {
        if (type === 'tagActive') {
          this.tagStatus = value;
          this.subtagStatus = 3;
        } else {
          this.subtagStatus = value;
        }

        this.handleInitLoad();
      },
      // 获取列表
      getList() {
        if (!this.userId || this.userId === -1) {
          console.error('木有 user id');
          this.hasNoData = true;
          this.loading = false;
          return false;
        }
        this.hasNext = true;
        this.hasNoData = false;
        const url = this.tagStatus ? `/poi/app/shop/ajax/addDataList` : `/poi/app/shop/ajax/reportDataList`;
        return get(url, {
          userId: this.userId,
          pageNo: this.pageNo || 1,
          status: this.subtagStatus
        }).then(data => {
          this.loading = false;
          this.list = [].concat(this.list, data.itemList || []);

          this.hasNoData = this.list.length === 0 ? true : false;

          //  判断是否还有更多
          if (this.pageNo === data.totalPage || this.list.length === 0) {
            this.hasNext = false;
          }

          if (this.tagStatus) {
            this.addTotal = data.totalCount;
          } else {
            this.reportTotal = data.totalCount;
          }
        }, err => {
          this.loading = false;
          this.hasNoData = true;
          this.pageNo -= 1;
          console.error(err)
        })
      },
      handleLoad() {
        this.pageNo = this.pageNo + 1;
        return this.getList();
      },
      initTagStatus() {
        const tagStatus = parseInt(getUrlParamByName('tagStatus'));
        if (/^[01]$/.test(tagStatus)) {
          this.tagStatus = tagStatus;
        } else {
          this.tagStatus = 1;
        }
      },
      getTotal() {
        Promise.all([
          get('/poi/app/shop/ajax/addDataList', {
            userId: this.userId,
            pageNo: 1,
            status: 3
          }),
          get('/poi/app/shop/ajax/reportDataList', {
            userId: this.userId,
            pageNo: 1,
            status: 3
          })
        ]).then(data => {
          this.addTotal = data[0].totalCount;
          this.reportTotal = data[1].totalCount;
        })
      }
    }
  }

</script>
<style lang="scss" src="./style.scss"/>
