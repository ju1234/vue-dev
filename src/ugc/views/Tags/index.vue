<template>
  <div class="tags-page">
    <header class="tags-page-header" v-if="title">
      邀您补充‘{{title}}’商户信息。
      <div>
        审核通过后，我们将在24小时内给予
        <span class="bounds">2元抵用券</span>
        在点评闪惠、团购渠道无门槛使用。
      </div>
    </header>
    <section v-for="item in data" :key="item.groupId">
      <checkbox v-if="item.multi" :title="item.showName" :items="item.tagDtos" />
      <radiobox v-if="!item.multi" :title="item.showName" :items="item.tagDtos" />
    </section>
    <section class="footer">
      <div class="footer-btn" @click="handleSubmit">完成</div>
    </section>
  </div>
</template>
<script>

import { get, post } from '@libs/api'
import { getUrlParamByName } from '@libs/util'
import Toast from '@components/Toast'
import Loading from '@components/Loading'
import Checkbox from '@components/CheckBoxs/checkbox'
import Radiobox from '@components/CheckBoxs/radiobox'

export default {
  name: 'tags-page',
  components: {
    Radiobox,
    Checkbox,
  },
  data () {
    return {
      title: '',
      data: []
    }
  },
  created() {
    this.initOldBeacon();
  },
  mounted() {
    let entryId = getUrlParamByName('entryId') || '';
    this.entryId = parseInt(entryId);
    Loading.show();
    get(`/poi/gather/tag/getShopTags`, { entryId }).then((res) => {
      if (res.hasSubmit == 1) {
        this.$router.replace({ path: 'result' });
        return;
      }
      this.title = res.title;
      this.data = res.tagList;
      Loading.hide();
    }, () => {
      Loading.hide();
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      let tagIds = [];
      this.data.map((data) => {
        const tagDtos = data.tagDtos || [];
        const arr = tagDtos.filter((item) => item.checked).map((item) => item.tagId);
        if (arr.length) {
          tagIds = tagIds.concat(arr);
        }
      });
      if (tagIds.length === 0) {
        Toast("请选择标签~");
        return;
      }
      Loading.show();

      post('/poi/gather/tag/submittag', {
        entryId: this.entryId, tagIds:tagIds
      }).then((res) => {
        Loading.hide();
        this.$router.replace({ path: 'result' });
      }, () => {
        Loading.hide();
      });
    },
    initOldBeacon() {
      const source = getUrlParamByName('source') || '0';
      Analytics('send', 'pv', {
        cid: 'poi_ugc_33003',
        val: {
          custom: {
            source
          }
        }
      });
      // view打点
      Analytics('event', {
        nm: 'mge',
        val_bid: 'poi_ugc_source',
        event_type: 'view',
        val_lab: {source}
      });
    }
  }
}
</script>
<style lang="scss" scoped src="./index.scss">
</style>
