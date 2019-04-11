<template>
  <div class="login-box">
    <Loading :visible="loading"
      class="Loading"></Loading>
    <div class="login-content">
      <div class="logo">
        <a href="">
          <img title="深度传媒"
            src="/image/logo_mobile.png" />
        </a>
      </div>
      <div class="login-form">
        <p class="error-info"
          v-show="fail">
          <sn-icon type="warning" />{{errorInfo}}
        </p>
        <div class="login-item">
          <input type="text"
            placeholder="请输入用户名"
            v-model="username"
            @keyup.enter="submit">
          <sn-icon type="username" />
        </div>
        <div class="login-item">
          <input type="password"
            placeholder="请输入密码"
            v-model="password"
            @keyup.enter="submit">
          <sn-icon type="password" />
        </div>
        <sn-checkbox-group class="login-keep"
          v-model="savePassword">
          <sn-checkbox value="true">保存密码</sn-checkbox>
        </sn-checkbox-group>
        <sn-button type="primary"
          size="large"
          shape="circle"
          @click.native="submit">登录</sn-button>
      </div>
    </div>
    <div class="login-ad"></div>
  </div>
</template>

<script>
import {Icon,Button,Checkbox,CheckboxGroup} from "_c"
import { mapActions} from 'vuex'
export default {
  components: {
    'sn-icon':Icon,
    'sn-checkbox':Checkbox,
    'sn-checkbox-group':CheckboxGroup,
    'sn-button':Button
  },
  data() {
    return {
      username: '',
      password: '',
      fail: false,
      savePassword: [],
      remember: 0,
      loading: false,
      errorInfo: ''
    }
  },
  watch: {
    savePassword(val) {
      val.length > 0 ? this.remember = 1 : this.remember = 0;
    }
  },
  methods: {
    ...mapActions('basic', [
      'DoLogin', 'AutoLogin','setMenu'
    ]),
    async submit() {
      let username = this.username.trim();
      let password = this.password.trim();
      let remember = this.remember;
      try {

        let {data}=await this.DoLogin({ remember, username, password });
        this.fail = false;

        /*删除*/
        data.agent_id='1231231';
        data.user_type=2;
        /*删除*/

        if(data.agent_id ===""){ //直客
            this.setMenu(3);
            this.$router.push({ name: 'advertiserIndex' });
        }else if(data.user_type===1){//广告商
            this.setMenu(2);
            this.$router.push({ name: 'advertiserIndex' });
        }else {  //代理商
            this.setMenu(1);
            this.$router.push({ name: 'agentIndex' });
        }

      } catch (errMsg) {
          this.fail = true;
          this.errorInfo = errMsg.data.msg;
      }
    }
  },
  mounted(){

  }
};
</script>

<style lang="less">
html,
body {
  min-height: auto !important;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f8fa;
}
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  box-shadow:0 40px 40px rgba(219,220,223,.5);
  @media screen and (min-width: 750px) {
    height: auto;
  }
  background: #fff;
  .login-ad {
    display: none;
    @media screen and (min-width: 750px) {
      display: block;
      flex: 0 0 50%;
    }
    @media screen and (min-width: 970px) {
      flex: 0 0 62%;
    }
    min-height: 650px;
    background: url("/image/login-ad.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .login-content {
    flex: 0 0 100%;
    @media screen and (min-width: 750px) {
      flex: 0 0 50%;
    }
    @media screen and (min-width: 970px) {
      flex: 0 0 38%;
    }
    .logo {
      margin-bottom: 80px;
      text-align: center;
      img {
        width: 86px;
      }
    }
    .login-form {
      position: relative;
      width: 80%;
      @media screen and (min-width: 750px) {
        width: 60%;
      }
      margin: 0 auto;
    }
    .login-item {
      position: relative;
      padding-left: 37px;
      border-bottom: #e3e4e4 1px solid;
      input {
        display: block;
        width: 100%;
        .line-height(50px);
        border: none;
        background: none;
        color: #354052;
        outline: none;
        &:focus + i {
          color: #1f96ee;
        }
        &::-webkit-input-placeholder {
          color: #c5ccd4;
        }
        &:-moz-placeholder {
          color: #c5ccd4;
        }
        &::-moz-placeholder {
          color: #c5ccd4;
        }
        &:-ms-input-placeholder {
          color: #c5ccd4;
        }
      }
      .s-icon {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .login-keep {
      display: block;
      margin: 20px 0 60px;
    }
  }
  .error-info {
    position: absolute;
    width: 100%;
    .line-height(34px);
    bottom: 100%;
    background: #fef3f3;
    border-radius: @border-radius-l;
    color: @error-color;
    .s-icon {
      margin: -2px 13px 0;
    }
  }
}
</style>
<style scoped>
.login-box {
  position: relative;
}
.Loading {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -ms-transform: translateY(-50%); /* IE 9 */
  -moz-transform: translateY(-50%); /* Firefox */
  -webkit-transform: translateY(-50%); /* Safari 和 Chrome */
  -o-transform: translateY(-50%); /* Opera */
}
</style>
