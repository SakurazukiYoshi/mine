<template>
    <sn-menu
        :active-name="activeName"
        accordion
        width="siderWidth">
        <template v-if="menuType===1">
            <sn-menu-item name="agentIndex" to="/agentIndex">
                <sn-icon type="dailishangshouye" :ex="true"/>系统首页
            </sn-menu-item>
            <sn-menu-group title="客户管理">
                <sn-menu-item name="agentList" to="/agentList">
                    <sn-icon type="dailishangliebiao" :ex="true"/>代理商列表
                </sn-menu-item>
                <sn-menu-item name="agentAdvertise" to="/agentAdvertise">
                    <sn-icon type="guanggaoshangliebiao" :ex="true" />广告商列表</sn-menu-item>
            </sn-menu-group>
            <sn-menu-group title="财务管理">
                <sn-menu-item name="agentFinance" to="/agentFinance">
                    <sn-icon type="caiwuxinxi" :ex="true"/>财务信息</sn-menu-item>
            </sn-menu-group>
            <sn-menu-group title="操作管理">
                <sn-menu-item name="agentLog" to="/agentLog">
                    <sn-icon type="caozuorizhi" :ex="true"/>操作日志</sn-menu-item>
            </sn-menu-group>
        </template>
        <template v-if="menuType===2||menuType===3">
            <sn-menu-item name="advertiserIndex" to="/advertiserIndex"><sn-icon type="home" />系统首页</sn-menu-item>
            <sn-menu-group title="财务管理">
                <sn-menu-item name="advertiserFinance" to="/advertiserFinance"><sn-icon type="finance" />财务信息</sn-menu-item>
            </sn-menu-group>
            <sn-menu-group title="账户管理">
                <sn-menu-item name="advertiserUser" to="/advertiserUser"><sn-icon type="ad-plan" />账户信息</sn-menu-item>
            </sn-menu-group>
        </template>
        <template v-if="menuType===4">
            <sn-menu-group title="微信">
            </sn-menu-group>
            <sn-menu-item name="home" to="/home"><sn-icon type="home" />系统首页</sn-menu-item>
            <sn-menu-group title="广告管理">
                <sn-menu-item name="AdPlan" to="/AdPlan"><sn-icon type="ad-plan" />广告计划</sn-menu-item>
                <sn-menu-item name="AdGroup" to="/AdGroup"><sn-icon type="ad-group" />广告组</sn-menu-item>
                <sn-menu-item name="AdCreates" to="/AdCreates"><sn-icon type="ad-creativity" />广告创意</sn-menu-item>
            </sn-menu-group>
            <sn-menu-group title="数据统计">
                <sn-menu-item name="report" to="/report"><sn-icon type="count" />效果报告</sn-menu-item>
            </sn-menu-group>
        </template>
        <template v-if="menuType===5">
            <sn-menu-group title="广点通">
                <sn-menu-item name="1" to="/"><sn-icon type="home" />系统首页</sn-menu-item>
                <sn-menu-item name="2" to="/"><sn-icon type="finance" />广告计划</sn-menu-item>
                <sn-menu-item name="2" to="/"><sn-icon type="ad-group" />广告组</sn-menu-item>
                <sn-menu-item name="2" to="/"><sn-icon type="ad-creativity" />广告创意</sn-menu-item>
                <sn-menu-item name="2" to="/"><sn-icon type="count" />数据报表</sn-menu-item>
            </sn-menu-group>
        </template>
    </sn-menu>
</template>
<script>
import Icon from '_c/icon'
import { MenuItem,Menu,MenuGroup} from 'iview';
import {mapState} from 'vuex'
const components={
    'sn-icon':Icon,
    'sn-menu-item':MenuItem,
    'sn-menu-group':MenuGroup,
    'sn-menu':Menu,
};
export default {
    name:'sideMenu',
    components,
    data() {
        return {
            theme2: 'light',
            type:1,
            activeName:''
        }
    },
    props: {
        siderWidth: {
            String,
            default: '200px'
        }
    },
    methods:{
        home_click:function(){
            alert('home_click')
        }
    },
    computed:{
        ...mapState('basic', [
            'userinfo','menuType'
        ])
    },
    watch:{
        '$route.name': {
            handler(val) {
                this.activeName=val;
            },
            immediate: true
        }
    }
}
</script>
<style lang="less" scoped>
.ivu-menu {
  background-color: transparent;
}

.ivu-menu-vertical.ivu-menu-light:after {
  background: #252e3d;
}
.ivu-menu-item>i {
    margin: -4px 10px 0 0;
}
.ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title {
       padding: 19px 30px;
}
.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background: none;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background: none;
    border: none;
    &:after {
        display: none;
    }
}
.ivu-menu{
     color: #7f8fa4;
    .s-icon{
        color: #445363;
    }
    .ivu-menu-item .s-icon{
        transition: all 0.2s ease-in-out;
    }
    .ivu-menu-item:hover .s-icon{
        color: #2d8cf0;
        z-index: 2;
    }
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
    .s-icon{
         color: #2d8cf0;
         z-index: 2;
     }
}

/deep/ .ivu-menu-item-group-title{
    font-size:14px;
    font-weight:400;
    color:rgba(68,83,99,1);
}
</style>
