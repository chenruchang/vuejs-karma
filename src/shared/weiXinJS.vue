
<!--wechat: {-->
          <!--url: location.href,-->
          <!--title: '微信定制测试',-->
          <!--link:  location.href,-->
          <!--imgUrl: `${configData.wechatUrl}static/img/default_avatar.png`,-->
          <!--desc: '微信定制描述'-->
        <!--}-->

<template lang="html">
  <div>
     <remoteJS src="//res.wx.qq.com/open/js/jweixin-1.0.0.js "></remoteJS>
  </div>
</template>

<script>
  import fatch from '../model/fatch';
  import remoteJs from '../mixins/remoteJs'

  export default {
    props: ['wechat'],
    mixins: [remoteJs],
    data() {
      return {
      };
    },
    methods: {
       configWeChat(result){
         let that = this;

         wx.config({
           debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
           appId: result.appId, // 必填，公众号的唯一标识
           timestamp: result.timestamp, // 必填，生成签名的时间戳
           nonceStr: result.noncestr, // 必填，生成签名的随机串
           signature: result.sign,// 必填，签名，见附录1
           jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
         });

         wx.ready(function () {

           wx.onMenuShareTimeline({
             title: `${that.wechat.title}`, // 分享标题
             link: `${that.wechat.link}`, // 分享链接
             imgUrl:`${that.wechat.imgUrl}`, // 分享图标
             success: function () {

             },
             cancel: function () {
               // 用户取消分享后执行的回调函数
             }
           });

           wx.onMenuShareAppMessage({
             title: `${that.wechat.title}`, // 分享标题
             link: `${that.wechat.link}`, // 分享链接
             imgUrl: `${that.wechat.imgUrl}`, // 分享图标
             desc: `${that.wechat.desc}`,
             type: '', // 分享类型,music、video或link，不填默认为link
             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
             success: function () {

             },
             cancel: function () {
               // 用户取消分享后执行的回调函数
             }
           });

           wx.error(function (res) {

             console.log(res);

           });
         });
       },
      manuallyConfig(){
        if (/micromessenger/i.test(window.navigator.userAgent)) {
          let url = encodeURIComponent(this.wechat.url.split('#')[0]);

          //Get the js sdk sign from server
          fatch('post', `wechatJsApiSign?url=${url}`)
            .then((res) => {
              this.configWeChat(res);
            })
            .catch(() => {

            });
        }
      }
    },
    mounted(){
        if(!this.wechat.manually) {
          if (/micromessenger/i.test(window.navigator.userAgent)) {
            this.$nextTick(() => {
              let url = encodeURIComponent(this.wechat.url.split('#')[0]);

              //Get the js sdk sign from server
              fatch('post', `wechatJsApiSign?url=${url}`)
                .then((res) => {
                  this.configWeChat(res);
                })
                .catch(() => {

                });
            });
          }
        }
    }
  };
</script>


