<template>
  <div class="item">
    <div class="item-header">
      <!--审核状态-->
      <span
          class="item-tag"
          :class="{'item-tag-pass': info.auditStatus === 0}"
      >{{info.auditStatusName}}</span>
      <strong class="item-name">{{info.shopName}}</strong>
      <span class="item-date">{{info.submitTime.substring(0,10)}}</span>
    </div>
    <div class="item-content">
      <div class="item-detail" v-if="info.auditStatus === 0">感谢分享。</div>
      <div class="item-detail" v-if="info.feedBackInfo">{{feedBackInfo}}</div>
      <div class="item-reason" v-if="info.rejectReason">未通过原因：{{rejectReason}}</div>
      <div class="item-detail" v-if="info.appealStatus !== 0 && info.auditStatus !== 2">{{infoText}}</div>
    </div>
    <div class="item-footer">
      <!--申诉-->
      <a
          class="item-btn"
          v-if="info.appealStatus && info.appealStatus !== 0 && tagStatus === 0"
          :class="info.appealStatus === 2 ? 'item-btn-disabled' : 'item-btn-active'"
          :href="appealUrl"
          @click="appeal_submit"
      >{{info.appealStatusName}}</a>
      <a
          class="item-btn"
          v-if="(info.auditStatus === 1 || info.auditStatus === 13) && (info.shopId || info.dpId)"
          :href="`dianping://shopinfo?id=${info.shopId || info.dpId}`"
          @click="see_productdetail_click"
      >查看商户详情</a>
      <a
          class="item-btn"
          v-if="tagStatus === 1"
          :href="`${URL_PREFIX}/poi/app/shop/showAddInfo?poiId=${info.poiId}&flowStatus=${info.flowStatus || ''}&refuseType=${info.refuseType || ''}`"
          @click="see_adddetail"
      >查看添加详情</a>
      <a
          class="item-btn"
          v-if="tagStatus === 0"
          :href="`${URL_PREFIX}/poi/app/shop/showUpdateInfo?entryId=${info.entryId}`"
          @click="see_erro_detail"
      >查看报错详情</a>
    </div>
  </div>
</template>

<script>

  import {get, post} from '@libs/api'
  import Toast from '@components/Toast'
  import Loading from '@components/Loading'
  import {URL_PREFIX} from '@libs/env'

  export default {
    name: 'list-page',
    props: {
      info: Object,
      tagStatus: Number
    },
    data() {
      return {
        item: 'asda',
        appealUrl: 'javascript:void(0)',
        URL_PREFIX: URL_PREFIX
      }
    },
    mounted: function () {
      this.init()
    },
    methods: {
      init() {
        // 申诉链接
        this.appealUrlInit();
      },
      appealUrlInit() {
        const {appealStatus, entryId, poiId, flowId} = this.info;
        if (appealStatus !== 1) return false;
        if (this.tagStatus === 0) {
          this.appealUrl = `${URL_PREFIX}/poi/app/shop/appeal?entryId=${entryId}`;
        } else if (this.tagStatus === 1) {
          this.appealUrl = `${URL_PREFIX}/poi/app/shop/appeal?poiId=${poiId}&flowId=${flowId}`;
        }
      },

      see_productdetail_click(){
        if(this.tagStatus === 0){
          //  报错
          LXAnalytics('moduleClick', 'b_xr2zk70z');
        }else {
          LXAnalytics('moduleClick', 'b_p4clwafa');
        }
      },
      see_adddetail(){
        LXAnalytics('moduleClick', 'b_3xmzg9y2');
      },
      see_erro_detail(){
        LXAnalytics('moduleClick', 'b_vb0khm46');
      },
//      appeal_submit(){
//        if(this.info.appealStatus === 1 && this.tagStatus === 1){
//          LXAnalytics('moduleClick', 'b_beqyy05d');
//        }else if(this.info.appealStatus === 1 && this.tagStatus === 0){
//          LXAnalytics('moduleClick', 'b_5ovposn4');
//        }
//      },
    },
    computed: {
      infoText: function () {
        const {auditStatus} = this.info;
        if (auditStatus === 0) {
          return '预计两个工作日内完成审核。'
        }else if(auditStatus === 1){
          return this.tagStatus === 0 ? '感谢及时共享信息。' : '帮助大家发现美好生活，感觉棒棒哒。'
        }else if(auditStatus === 2){
          return '若误判，可在72小时内“戳小编申诉”'
        }else if(auditStatus === 13){
          return '感谢及时共享信息。'
        }
      },
      rejectReason: function () {
        let rejectReasonStr = this.info.rejectReason;
        if(/^\[.+\]$/.test(rejectReasonStr)){
          return JSON.parse(rejectReasonStr).join('，')
        }else {
          return rejectReasonStr
        }
      },
      feedBackInfo: function () {
        const {feedBackInfo,auditStatus} = this.info;
        if(auditStatus === 1 || auditStatus === 13){
          return `${feedBackInfo.join('')}正确。`
        }else if(auditStatus === 2){
          return `${feedBackInfo.join('')}暂未采纳。`
        }else {
          return `已收到${feedBackInfo.join('')}。`
        }

      }
    }
  }
</script>
<style lang="scss" scoped src="./list.scss">
</style>
