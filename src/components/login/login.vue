<style type="scss" scoped>
  .modal-content {
    width: 100vw;
    position: relative;
    margin-bottom: 1rem;
  }

  .modal-content > div:first-child {
    color: #000;
    text-align: center;
    position: relative;
    font-size: 14px;
    margin-top: 0.59rem;
  }

  .modal-content > div:first-child > span {
    display: block;
    padding: 0.05rem;
  }

  .form-style {
    width: 8.92rem;
    margin-left: 0.54rem;
    margin-top: 1.03rem;
  }

  .input-activity {
    display: inline-block;
    width: 100%;
    outline: none;
    border: none;

    height: 100%;
    box-sizing: border-box;
    border-radius: 15px;
    padding: 0 0.5rem;

    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    -webkit-appearance: none;
    background-color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    color: #000000;
  }

  span.ver-code {
    color: #000;
    font-size: 14px;
    text-align: center;
    width: 35%;
    position: absolute;
    right: 0;
    padding-left: 5px;
    top: 38%;
  }

  span.ver-code:before {
    content: '';
    height: 1.16rem;
    width: 1px;
    position: absolute;
    left: 0.15rem;
    top: -0.35rem;
    background-color: #979797;
    opacity: 0.2;
  }

  span.ver-code-wait {
    color: #FFD940;
    font-size: 14px;
    text-align: center;
    width: 35%;
    position: absolute;
    right: 5%;
    top: 38%;
  }

  .submit-button-wrap {
    text-align: center;
    position: relative;
  }

  .submit-button-wrap-image {
    width: 8.9rem;
    height: 1.12rem;
    line-height: 1.2rem;
    background-color: #FFD940;
    border-radius: 0.11rem;
    display: inline-block;
    font-size: 14px;
    margin-top: 0.4rem;
    color: #000000;
  }

  .ver-code-wrap {
    position: relative;
    height: 1.5rem;
  }

  .ver-code-wrap:before {
    content: '';
    position: absolute;
    width: 8.8rem;
    height: 1px;
    top: 0;
    background-color: #979797;
    opacity: 0.2;
  }

  .phone-wrap {
    position: relative;
    height: 1.5rem;
  }

  .phone-wrap:before {
    content: '';
    position: absolute;
    width: 8.8rem;
    height: 1px;
    top: 0;
    background-color: #979797;
    opacity: 0.2;
  }

  .submit-button-wrap:before {
    content: '';
    position: absolute;
    width: 8.8rem;
    height: 1px;
    top: 0;
    background-color: #979797;
    opacity: 0.2;
  }

</style>

<template>
  <div class="modal-content">
    <div><span>输入手机号登录</span></div>

    <div class="form-style">
      <div class="phone-wrap">
        <input type="text" placeholder="请输入手机号码" class="input-activity" v-model="activityForm.mobilePhone"
               maxlength="11"/>
      </div>
      <div class="ver-code-wrap">
        <input type="text" placeholder="请输入验证码" class="input-activity" v-model="activityForm.verifyCode" maxlength="6"/>
        <span class="ver-code" v-if="showVerify" @click="sendLoginVerifyCode()">发送短信验证码</span>
        <span class="ver-code-wait" v-else>{{formatIndexCount}}</span>
      </div>

      <div class="submit-button-wrap">
        <span @click="verifyCodeLogin()" class='submit-button-wrap-image'
              id="submit-button-wrap-image">
          <span>立即登录</span>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
  import Auth from '../../model/auth'
  import fatch from '../../model/fatch';
  import {Toast} from 'mint-ui';

  export default {
    beforeCreate(){
      let auth = new Auth();
      if (auth.getAccessToken()) {
        this.$emit('loginResult');
      }
    },
    created(){

    },
    data() {
      return {
        intervalInstance: '',
        showVerify: true,
        indexCount: 60,
        clickInstance: null,
        isBind: false,
        thirdInfoId: '',

        activityForm: {
          mobilePhone: '',
          verifyCode: ''
        }
      };
    },
    computed: {
      formatIndexCount () {
        return `${this.indexCount}秒后重发`;
      }
    },
    methods: {
      setAuthToken(result, mobile){

        let auth = new Auth();
//        auth.setAccessToken(result.access_token, result.expires_in);
//        auth.setTokenType(result.token_type);
//        auth.setMobilePhone(mobile);

        this.$emit('loginResult');
      },
      resetPhoneField(){
        this.activityForm.mobilePhone = '';
      },
      validateNumber(mobile, number) {
        let reg = new RegExp("^[0-9]{" + number + "}$");
        return reg.test(mobile);
      },
      enableTimeInterval($this){
        clearInterval($this.intervalInstance);

        $this.intervalInstance = setInterval(function () {
          $this.indexCount--;

          if ($this.indexCount <= 0) {
            $this.indexCount = 60;
            $this.showVerify = true;

            clearInterval($this.intervalInstance);
          }
        }, 1000);
      },
      sendLoginVerifyCode() {
        let $this = this;

        //Avoid double click this button
        window.clearTimeout(this.clickInstance);
        this.clickInstance = window.setTimeout(function () {
          if (!$this.validateNumber($this.activityForm.mobilePhone, 11)) {
            Toast({
              message: '手机号码格式不正确',
              duration: 1000
            });

            return;
          }

          $this.showVerify = false;
          $this.enableTimeInterval($this);

          // Send verification code
        }, 300);
      },
      verifyCodeLogin() {
        let $this = this;

        //Avoid double click this button
        window.clearTimeout(this.clickInstance);
        this.clickInstance = window.setTimeout(function () {
          if (!$this.validateNumber($this.activityForm.mobilePhone, 11)) {
            Toast({
              message: '手机号码格式不正确',
              duration: 1000
            });

            return;
          }

          if (!$this.validateNumber($this.activityForm.verifyCode, 6)) {
            Toast({
              message: '验证码格式不正确',
              duration: 1000
            });

            return;
          }

          //Login logic
          $this.setAuthToken();

        }, 300);
      }
    }
  }
</script>

