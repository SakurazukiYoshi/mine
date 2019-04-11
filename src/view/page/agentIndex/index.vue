<template>
  <sn-layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <div class="s-content-top">
      <div class="f-card">
        <financial-card :Balance="user.balance"
                        :freeze="user.balance_freeze"
                        type="dsp"
                        @withdraw="withdraw"></financial-card>
      </div>
      <div>
        <money-card
              :money="user.expend?user.expend.price:0" icon="balance" iconColor="#7ACE4C"
              title="所有广告商账户金额"></money-card>
      </div>
      <div>
        <money-card
                :money="user.expend?user.expend.preday_price:0" icon="zuorixiaofei
" iconColor="#F0AE1F" :ex="true"
                title="所有广告商昨日总消费"></money-card>
      </div>
      <div>
        <money-card
                :money="user.expend?user.expend.today_price:0" icon="jinrixiaofei
            " iconColor="#EB4D44"
                title="所有广告商今日已经消费" :ex="true"></money-card>
      </div>
    </div>
    <sn-header class="s-content-header">
      <div class="header-left">
        <template v-if="!isMobile">
          <sn-select :width="130" class="mr10"
                     placeholder="全部"
                     v-model="filterObj.user_type"
            >
              <sn-option v-for="(item,key) in selectType" :label="item.name" :value="item.val" :key="key"/>
            </sn-select>
            <sn-search :width="270"
                    showName="label"
                    :pretext="'请输入代理商或广告商名称'"
                    :Level="true"
                    :disabled="true"
                    v-model="filterObj.username"
            />
        </template>
      </div>
    </sn-header>
    <sn-content ref="tableContent">
      <sn-table v-if="!isMobile"
                :height="tableHeight"
                :columns="columns"
                :data="tableData"
                :loading="loading"
                ref="table"
                @on-sort-change="handleSortChange"
      >
        <template slot-scope="{row}"
                  slot="action">
          <div class="s-table-btn-group">
            <sn-button type="primary"
                       size="stretch"
                       ghost
                       class="mr10"
            >广告投放</sn-button>
            <sn-button type="success"
                       size="stretch"
                       ghost
            >详情</sn-button>
          </div>
        </template>
      </sn-table>

<!--      <sn-table v-if="isMobile"
             class="table-xs"
             :columns="columnsMobile"
             :data="tableData"
             :loading="loading"
             @on-sort-change="handleSortChange">
        <template slot-scope="{row}"
                  slot="action">
          <div class="s-table-btn-group">
            <sn-button type="primary"
                    size="stretch"
                    ghost
                    >修改</sn-button>
            <sn-button type="error"
                    size="stretch"
                    ghost
                    >删除</sn-button>
          </div>
        </template>

      </sn-table>-->
      <sn-page :total="totalCount"
               :current="filterObj.page"
               :page-size="filterObj.row"
               show-sizer
               show-elevator
               show-total
               placement="bottom"
               @on-change="handleChangePage"
               class="page"
               @on-page-size-change="handleChangeSizePage">
      </sn-page>
    </sn-content>
  </sn-layout>
</template>
<script>
import {Select,Option,SnPage,TableExpand,Search,Button,FinancialCard,moneyCard} from "_c"
import { mapState } from 'vuex'
import { Layout, Content, Header, Table } from 'iview'
import { api_financial } from '@/api'
import { tableMixin } from '@/mixins'
import { toRegularNum } from '@/mixins/globalMixin'
import {deepCopy} from '@/utils/assist'

const components={
    'sn-table':Table,
    'sn-layout':Layout,
    'sn-content':Content,
    'sn-header':Header,
    'sn-select':Select,
    'sn-option':Option,
    'sn-page':SnPage,
    'sn-search':Search,
    'sn-button':Button,
    'financial-card':FinancialCard,
    'money-card':moneyCard,
};

const columns = [
    {
        title: '广告商/代理商名称',
        key: 'username',
    }, {
        title: '身份类型',
        key: 'user_type',
        render: (h, params) =>{
            let str=(params.row.user_type===1?'广告商':'代理商');
            (params.row.level===2&&params.row.user_type===2)&&(str='二级'+str);
            return h('span', {domProps: {innerHTML: str}})
        },
    }, {
        title: '可用余额（元）',
        render: (h, params) =>h('span',{domProps: {innerHTML: `￥${toRegularNum(params.row.balance?params.row.balance:'0')}`}}),
        align:'right',
    }, {
        title: '今日已消费（元）',
        render: (h, params) =>h('span',{domProps: {innerHTML: `￥${toRegularNum(params.row.consumption.today_price)}`}}),
        align:'right',
    }, {
        title: '昨日总消费（元）',
        render: (h, params) =>h('span',{domProps: {innerHTML: `￥${toRegularNum(params.row.consumption.preday_price)}`}}),
        align:'right',
    }, {
        title: '最近7日平均消费',
        render: (h, params) =>{
            let  price=params.row.consumption.sevenday_price?params.row.consumption.sevenday_price:params.row.consumption.preday_price;
            return h('span',{domProps: {innerHTML: `￥${toRegularNum(price)}`}})
        },
        align:'right',
    }, {
        title: '操作',
        slot: 'action'
    }]

const columnsMobile = [
    {
        type: 'expand',
        width: 50,
        render: (h, params) => h(TableExpand, {
            props: {
                row: params.row,
                fields: [{
                    key: 'price',
                    label: '预估收入',
                    render:()=>`￥${toRegularNum(params.row.price)}`
                }, {
                    label: '请求量',
                    render:()=>toRegularNum(params.row.total.pv,0)
                }, {
                    label: '展现量',
                    render:()=>toRegularNum(params.row.total.show,0)
                }, {
                    label: '填充率',
                    render:()=>`${params.row.fillper}%`
                }, {
                    label: '每千次展现收入',
                    render:()=>`￥${toRegularNum(params.row.cpm,2)}`
                }, {
                    label: '独立访客',
                    render:()=>`${toRegularNum(params.row.total.uv,0)}`
                }, {
                    label: '独立IP',
                    render:()=>`${toRegularNum(params.row.total.ip,0)}`
                }]
            }
        })
    }, {
        title: '日期',
        key: 'date'
    }, {
        title: '媒体商',
        key: 'agent_username'
    }, {
        title: '媒体名称',
        key: 'resource',
    }, {
        title: '广告位',
        key: 'adzone',
    }]


let filterObj = {
    row:10,
    page:1,
    need_consumption:1,
    user_type:'1,2',
    username:''
};



export default {
  name:'agentIndex',
  mixins: [tableMixin],
  data() {
    return {
        columnsMobile,
        tableHeight:400,
        tableData: [],
        columns:deepCopy(columns),
        filterObj:deepCopy(filterObj),
        getUrl:'/aderAccount/aderAccountList.json',
        isFuzzy:true,
        fuzzyDel:['page','row','need_consumption','user_type'],
        selectType:[
            {name:'全部',val:"1,2"},
            {name:'代理商',val:"2"},
            {name:'广告商',val:"1"},
        ],
        user:{}
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile','mediaTypes','userinfo'
    ]),
  },
  components,
  methods: {
      withdraw(){},
      async getAderAccount(){
          //合并请求
          const all = await Promise.all([api_financial.getAderAccount(),api_financial.getExpendAccount({user_type:2})]);
          this.user=all[0].data;
          this.user.expend=all[1].data;
      }
  },
  created(){
      this.getAderAccount();
  },
  watch:{
  },
}
</script>
<style lang="less" scoped>
  /deep/ .none{
     display: none!important;
  }

.s-content-top{
  height: 230px;
  padding: 30px;
  box-sizing: border-box;
  background: #ebedf2;
  display: flex;
}
.s-content-top>div{
  flex: 0 1 422px;
  overflow: hidden;
  padding:0 15px;
  box-sizing: border-box;
}
.s-content-top>div:first-child{
  flex: 0 1 422px;
  overflow: hidden;
  padding:0 30px 0 0;
  box-sizing: border-box;
}
.s-content-top>div:last-child-child{
  flex: 0 1 422px;
  overflow: hidden;
  padding:0  0 0 30px;
  box-sizing: border-box;
}

.s-content-header {
  height: 96px;
  padding: 30px;
  line-height: 36px;
  background: #ebedf2;
  display: flex;
  .header-left {
    flex: 1;
    display: flex;
  }
  .header-right {
    width: 36px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    border: 1px solid #dfe2e6;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }
}
.ivu-layout{
  background: #ebedf2;
}
.ivu-layout-content {
  background: @white-color;
  padding-bottom: 90px;
  box-sizing: border-box;
  position: relative;
  margin: 0 30px;
  margin-bottom: 30px;
  border:1px solid #dfe2e6;

}
.ivu-table-wrapper{
   border: none;
}
.page{
  position: absolute;
  bottom: 20px;
  right: 30px;
}
.open-icon {
  position: relative;
  top: -1px;
}

.mr10 {
  margin-right: 10px;
}

.s-home-web {
  .s-report-echarts {
    height: 500px;
    margin-bottom: 30px;
    /deep/ .s-report-main-legend {
      -webkit-box-flex: 0;
      -ms-flex: 0 1 60px;
      flex: 0 1 60px;
    }
  }
  .s-report-table {
    flex: 1;
  }
  .h30 {
    height: 30px;
  }
}
@v: 100vw/750;
.s-home-xs {
  display: block;
  background-color: transparent;
  .header-left {
    flex-wrap: wrap;
  }
  .DatePicker {
    width: 475 * @v;
    height: 36px;
    margin-right: 20 * @v;
  }
  /deep/ .el-select,
  /deep/ .el-select-menu {
    width: 200 * @v!important;
    margin-right: 0;
  }
  .s-content-header {
    padding: 30 * @v 20 * @v;
  }
  .mt20 {
    margin-top: 24 * @v;
  }
  .s-report-echarts {
    padding-top: 20 * @v;
  }
  .s-report-table {
    padding-top: 30 * @v;
  }
  .SearchXs {
    margin-top: 20 * @v;
  }
  /deep/ .ivu-date-picker .ivu-select-dropdown {
    width: 475 * @v;
    overflow: hidden;
  }
}

.ivu-date-picker /deep/ .ivu-input-icon,
.ivu-date-picker /deep/ .ivu-input {
  height: 36px;
  line-height: 36px;
}
</style>

