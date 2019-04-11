<template>
  <Layout>
    <Header :class="{'s-header-xs': isMobile }">
      <div class="header-col menu_ico">
        <img title="菜单"
          v-on:click="toggleMenu"
          class="menu-img"
          src="/image/menu_ico.png" />
      </div>
      <div class="header-col logo">
        <a href="">
          <img v-if="isMobile"
            title="深度传媒"
            src="/image/logo_mobile.png" />
          <img v-else
            title="深度传媒"
            src="/image/logo.png" />
        </a>
      </div>
      <div class="header-col breadcrumb">
        <Breadcrumb :breadCrumbList="breadCrumbList"></Breadcrumb>
      </div>
      <div class="header-col user">
        <sm-poptip class="Poptip"
          content="content"
          width="140"
          placement="bottom-end"
          :arrow="false">
          <Button class="Poptip-btn">
            <template v-if="!isMobile">
              <span>{{userinfo?userinfo.login.username:''}}</span>
              <sm-icon type="arrow-down"
                class="arrow-down"
                size="10"
                color="#7f8fa4" />
            </template>
            <Avatar style="background-color: #87d068"
              icon="ios-person"
              class="ml10" />
          </Button>
          <div slot="content">
            <div class="content-item">
              <sm-icon type="modify" />
              <span class="ml10"
                @click="modify">修改资料</span>
            </div>
            <div class="content-item" @click="exit">
              <sm-icon type="sign-out" />
              <span class="ml10">退出</span>
            </div>
          </div>
        </sm-poptip>
      </div>
    </Header>
    <Layout>
      <Sider v-if="!collapsed"
        :class="{'sider-xs': isMobile }"
        width="siderWidth"
        v-clickoutside="handleClose">
        <side-menu :width="siderWidth">
        </side-menu>
      </Sider>
      <Content class="s-main-content">
        <router-view />
      </Content>
    </Layout>
  </Layout>
</template>


<script>
import { throttle } from 'lodash'
import store from '@/store'
import Poptip from '_c/poptip';
import Icon from "_c/icon";
import Clickoutside from '@/directives/clickoutside';
const SideMenu = () => import(/* webpackChunkName: "Menu" */ '_c/main/components/side-menu');
const Breadcrumb = () => import(/* webpackChunkName: "Menu" */ '_c/main/components/breadcrumb');
import { mapActions, mapState, mapMutations } from 'vuex'
import { Layout, Avatar, Sider, Content, Header } from 'iview';
export default {
  name: "Main",
  components: {
    SideMenu,
    Breadcrumb,
    'sm-icon': Icon,
    'sm-poptip': Poptip,
    Sider,
    Layout,
    Avatar,
    Header,
    Content
  },
  data() {
    return {
      headerHeight: 50,
      collapsed: false,
      siderWidth: '4.5rem'
    };
  },
  watch: {
    isMobile: function (val) {
      if (val) {//移动
        this.siderWidth = '4.5rem';
        this.collapsed = true;
      } else {//PC
        this.siderWidth = '200px';
        this.collapsed = false;
      }
    },
    '$route': {
      handler: function (newRoute) {
        this.SET_BREAD_CRUMB(newRoute)
      },
      immediate: true
    }
  },
  directives: { Clickoutside },
  computed: {
    breadCrumbList() {
      return this.$store.state.breadCrumbList
    },
    ...mapState('basic', [
      'isMobile',
       'userinfo'
    ])
  },
  methods: {
    ...mapActions('basic', [
      'DoLogout'
    ]),
    toggleMenu() {
      this.collapsed = !this.collapsed;
    },
    handleClose(event) {
      if (!this.$el.querySelector('.menu-img').contains(event.target) && this.isMobile) {
        this.collapsed = true;
      }
    },
    ...mapMutations('basic', [
      'SET_BREAD_CRUMB',
    ]),
    ...mapActions('basic', [
      'HandleSetDeviceType',
      'HandleSetDeviceScreen',
      'AutoLogin'
    ]),
    async exit() {
      await this.DoLogout();
      this.$router.push({ name: 'login' })
    },
    modify() {
      console.log('修改');
    },
  },
  mounted() {
      window.addEventListener('resize', throttle(() => {
      this.HandleSetDeviceType();
      this.HandleSetDeviceScreen();
    }, 200), false)
    window.addEventListener('load', () => {
      this.HandleSetDeviceType();
      this.HandleSetDeviceScreen();
    })
  },
  async created(){
      let data=await  this.AutoLogin();
  }
};
</script>
<style lang="less" scoped>
@mobileHeaderHeight: 0.88rem;

.displayflex {
  display: flex;
  display: -webkit-flex;
}
.ivu-layout-header {
  box-shadow: 0px 6px 18px 0px rgba(37, 46, 61, 0.08);
  position: relative;
  z-index: 3;
  .displayflex;
  padding: 0;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  .header-col {
    height: 100%;
  }
  .menu_ico {
    display: none;
  }
  .logo {
    flex: 0 1 200px;
    .displayflex;
    a {
      width: 100%;
      text-align: center;
      img {
        vertical-align: middle;
      }
    }
  }
  .breadcrumb {
    flex-grow: 1;
  }
  .user {
    flex: 0 1 300px;
    text-align: right;
    padding-right: 30px;
  }
}
.s-header-xs {
  height: @mobileHeaderHeight;
  line-height: @mobileHeaderHeight;
  .menu_ico {
    flex: 0 1 1rem;
    display: block;
    width: 0.6rem;
    img {
      width: 0.63rem;
      vertical-align: middle;
    }
  }
  .logo {
    flex: auto;
    flex-grow: 1;
    img {
      width: 1.15rem;
    }
  }
  .breadcrumb {
    display: none;
  }
  .user {
    flex: 0 1 1rem;
    text-align: center;
  }
}
.ivu-layout-sider {
  background-color: #252e3d;
  width: 200px;
}
.s-main-content {
  background-color: #ebedf2;
  overflow: auto;
}
.ivu-layout {
  height: 100%;
}
.sider-xs {
  position: fixed;
  top: @mobileHeaderHeight;
  left: 0;
  width: 4.5rem !important;
  height: 100%;
  z-index: 100;
}
.breadcrumb {
  margin-left: 30px;
}
.ivu-layout-content {
  flex: 1;
  background: #ebedf2;
  .ivu-layout{
    background: #ebedf2;
  }
}

.content-item {
  padding: 0 16px;
  display: flex;
  align-items: center;
  height: 42px;
  cursor: pointer;
}
.content-item:hover {
  background-color: #2a9ff6;
  color: #fff;
}
.ml10 {
  margin-left: 10px;
}
.arrow-down {
  transform: scale(0.6);
}
.Poptip-btn {
  cursor: pointer;
}
</style>




