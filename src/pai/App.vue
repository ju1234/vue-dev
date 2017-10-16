<template>
  <section class="pai-page">
    <header class="header-bg"></header>
    <div class="btns">
      <div class="downbtn" @click="handleDown">马上下载</div>
    </div>
    <div class="qa">
      <p class="question">美团拍店是什么？</p>
      <p class="answer">美团旗下首款门店采集兼职软件，赚零花，全靠它</p>
      <div class="qaimg qaimg0"/>
    </div>
    <div class="qa">
      <p class="question">靠它怎么赚钱？</p>
      <p class="answer">拍下身边门店照片，美团必有重谢</p>
      <div class="qaimg qaimg1"/>
    </div>
    <div class="footer clearfix">
      <div class="logo"/>
      <div class="tip">
        <p class="title">美团拍店</p>
        <p>想赚钱 来拍店</p>
      </div>
      <div class="btn" @click="handleDown">
        马上下载
      </div>
    </div>
    <div v-if="iscover" v-show="cover" class="applink-cover" @click="handleClose"/>
  </section>
</template>

<script>
  import {getMobileOS, isWeixinOrWeibo, isBrowerVisible} from '@libs/util';

  export default {
    data() {
      return {
        cover: false,
      }
    },
    created() {
      this.iscover = isWeixinOrWeibo;
    },
    methods: {
      handleDown(e) {
        e.preventDefault();
        if (isWeixinOrWeibo) {
          this.cover = true;
        } else {
//          const openapp = require('@dp/openapp');
          const androidUrl = 'http://msstest.sankuai.com/v1/mss_eb5771f7842c412fad0dae6127c9cead/zb-apk/pai-3.9-release-20170925.apk';
          const iosUrl = 'https://itunes.apple.com/cn/app/id1062216675?mt=8';

          const os = getMobileOS;
          if (os === 'iOS') {
            window.location.href = iosUrl;
          }else {
            window.location.href = androidUrl;
          }

//          const applink = (url) => {
//            const clickedAt = Number(new Date);
//            const ifr = document.createElement('iframe');
//            const link = iosUrl;
//            ifr.src = link;
//            ifr.style.display = 'none';
//            document.body.appendChild(ifr);
//            setTimeout(() => {
//              if (isBrowerVisible()) {
//                const os = getMobileOS();
//                if (os === 'iOS') {
//                  window.location.href = link;
//                }
//                setTimeout(() => {
//                  if (isBrowerVisible() && Number(new Date) - clickedAt < 2000) {
//                    if (os === 'iOS') {
//                      window.location = '';
//                    } else {
//                      window.location = '';
//                    }
//                  }
//                  document.body.removeChild(ifr);
//                }, 500);
//              }
//            }, 500);
//          };

//          applink();
//          openapp('paiapp://HomePage', {
//            androidDownloadUrl: androidUrl,
//            iosDownloadUrl: iosUrl,
//          });

        }
      },
      handleClose() {
        this.cover = false;
      },
    }
  }
</script>
<style lang="scss" scoped src="./style.scss">
</style>
