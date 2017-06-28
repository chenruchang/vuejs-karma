<style type="scss" scoped>

</style>

<template>
  <div>

    <mt-popup v-model="loginModel"
              position="bottom"
              :modal="true" :closeOnClickModal="false">
      <login v-on:loginResult="loginResult"></login>
    </mt-popup>

    <weiXinJS :wechat="wechat" ref="wechatRef"></weiXinJS>
  </div>
</template>


<script>
  import {Popup, Toast} from 'mint-ui';
  import login from '../login/login.vue';
  import Auth from '../../model/auth';
  import fatch from '../../model/fatch';
  import remoteJs from '../../mixins/remoteJs';
  import weiXinJS from '../../shared/weiXinJS';

  export default {
    mixins: [remoteJs],
    data () {
      return {
        isLogin: false,
        loginModel: true,

        wechat: {
          url: location.href,
          title: '',
          link: ``,
          imgUrl: ``,
          desc: '',
        }
      }
    },
    created() {
    },
    methods: {
      loginResult(){
        this.isLogin = true;
        this.loginModel = false;
      }
    },
    computed: {

    },
    components: {
      login,
      weiXinJS
    }
  }
</script>

