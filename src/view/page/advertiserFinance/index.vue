<template>
  <sn-layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <div class="s-content-top">
      <div class="f-card">
        <financial-card :Balance="'45,876.45'"
                        :freeze="'2,653.23'"
                        type="dsp"
                        @withdraw="withdraw"></financial-card>
      </div>
      <div>
        <money-card
                money="25,055.55" icon="balance" iconColor="#7ACE4C"
                title="充值总金额"></money-card>
      </div>
      <div>
        <money-card
                money="10,055.55" icon="balance" iconColor="#7ACE4C"
                title="消费总金额"></money-card>
      </div>
    </div>
    <sn-header class="s-content-header">
      <div class="header-left ">
        <sn-tabs type="card"
              class="Tabs-box"
              @on-click="tabsClick">
          <sn-tabPane label="交易记录"></sn-tabPane>
          <sn-tabPane label="消费记录"></sn-tabPane>
        </sn-tabs>
      </div>
      <div class=" header-right">
        <template v-if="!isMobile">
          <sn-select :width="130" class="mr10"
                     placeholder="交易状态"
          >
            <sn-option v-for="(label,value) in statusType"
                       :label="label"
                       :value="value"
                       :key="selectType+value"
            >
            </sn-option>
          </sn-select>
          <sn-select :width="130" class="mr10"
                     placeholder="广告平台"
          >
            <sn-option v-for="(label,value) in selectType"
                       :label="label"
                       :value="value"
                       :key="selectType+value"
            >
            </sn-option>
          </sn-select>
          <date-picker type="daterange"
                      :options="options1"
                      :confirm="true"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 274px"
                      class="mr10"
                      @on-ok="selectDate"
                      v-model="date"
          >
          </date-picker>
          <div class="download"
               @click="down"
               v-if="!isMobile">
              <sn-icon type="download"
                       color="#c5ccd4"
                       size="18" />
          </div>

        </template>
      </div>
    </sn-header>
    <sn-content ref="tableContent">
        <sn-table0 :tableHeight="tableHeight" :tableData="tableData" :loading="loading" @handleSortChange="handleSortChange" v-if="tableShow==0" ref="table"></sn-table0>

        <sn-table1 :tableHeight="tableHeight" :tableData="tableData" :loading="loading" @handleSortChange="handleSortChange" v-else-if="tableShow==1" ref="table"></sn-table1>




      <sn-page :total="totalCount"
               :current="tableReq.pageInfo.page"
               :page-size="tableReq.pageInfo.count"
               show-sizer
               show-elevator
               show-total
               placement="bottom"
               class="page"
               @on-change="handleChangePage"
               @on-page-size-change="handleChangeSizePage">
      </sn-page>
      <div class="total">充值总额 &nbsp;&nbsp;&nbsp;￥ 99 ,998, 26.00</div>
    </sn-content>
    <sn-recharge :visible="modal" @visibleChange="visibleChange"></sn-recharge>
  </sn-layout>
</template>
<script>
    import {SnPage,Search,Button,FinancialCard,moneyCard,DatePicker,Icon,Select,Option,Recharge} from "_c"
    import {table0,table1} from './components'
    import { mapState } from 'vuex'
    import { Layout, Content, Header ,Tabs,TabPane} from 'iview'
    import { api_common,api_report } from '@/api'
    import { tableMixin } from '@/mixins'
    import { toRegularNum } from '@/mixins/globalMixin'
    import moment from 'moment'
    import mock from '../api'

    const  components={
            'sn-layout':Layout,
            'sn-select':Select,
            'sn-option':Option,
            'sn-content':Content,
            'sn-header':Header,
            'sn-page':SnPage,
            'sn-search':Search,
            'sn-button':Button,
            'financial-card':FinancialCard,
            'money-card':moneyCard,
            'sn-tabs':Tabs,
            'sn-tabPane':TabPane,
            'sn-table0':table0,
            'sn-table1':table1,
            'date-picker':DatePicker,
            'sn-icon':Icon,
            'sn-recharge':Recharge,
    };


    let tableReq = {
        funcName: 'report_list',
        funcResName: 'data()',
        tableName: 'V2ReportSsp',
        column: ['date','type','aid','price','total.pv','total.show','total.uv','total.ip','fillper','cpm'],
        tableInfo: {
            "resource":"site",		//必传参,site  app  soft
            "search":"",			//搜索框参数
            "date%d":"20180821,20180827",	//时间
            "@order": "date-",
        },
    }





    let filterObj = {
        "resource":"soft",
        "search":"qudao9910/qudao9910",
        "date%d":"20180821,20180827",
        "@order":"date+",
    };



    export default {
        name:'agentIndex',
        mixins: [tableMixin],
        data() {
            return {
                tableReq,
                filterObj,
                tableData: mock.tableData,
                tableHeight: 400,
                tableShow: 0,
                options1: {
                    shortcuts: [
                        {
                            text: "今天",
                            value() {
                                const start = new Date();
                                const end = new Date();
                                return [start, end];
                            },
                            onClick: (picker) => {
                                this.isMobile && (picker.handlePickSuccess());
                            }
                        },
                        {
                            text: "昨天",
                            value() {
                                const start = new Date();
                                const end = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24);
                                end.setTime(end.getTime() - 3600 * 1000 * 24);
                                return [start, end];
                            },
                            onClick: (picker) => {
                                this.isMobile && (picker.handlePickSuccess());
                            }
                        },
                        {
                            text: "最近7天",
                            value() {
                                const start = new Date();
                                const end = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            },
                            onClick: (picker) => {
                                this.isMobile && (picker.handlePickSuccess());
                            }
                        },
                        {
                            text: "最近30天",
                            value() {
                                const start = new Date();
                                const end = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            },
                            onClick: (picker) => {
                                this.isMobile && (picker.handlePickSuccess());
                            }
                        },
                        {
                            text: "本月",
                            value() {
                                const start = new Date();
                                const end = new Date();
                                start.setTime(start.setDate(1));
                                return [start, end];
                            },
                            onClick: (picker) => {
                                this.isMobile && (picker.handlePickSuccess());
                            }
                        },
                        {
                            text: "上月",
                            value() {
                                var start = new Date();
                                const end = new Date();
                                var now = new Date();
                                now.setDate(1);
                                now.setHours(0, 0, 0, 0);
                                var time = now.getTime() - 1;
                                end.setTime(now.setTime(time));
                                start.setTime(now.setDate(1));
                                return [start, end];
                            },
                            onClick: (picker) => {
                                this.isMobile && (picker.handlePickSuccess());
                            }
                        }
                    ]
                },
                date:'',
                selectType:{
                    1:'全部',
                    2:'微信',
                    3:'广点通',
                    4:'其他',
                },
                statusType:{
                    1:'全部',
                    2:'失败',
                    3:'交易中',
                    4:'成功',
                },
                modal:false
            }
        },
        computed: {
            ...mapState('basic', [
                'isMobile','mediaTypes','userinfo'
            ]),
        },
        components,
        methods: {
            getQuery() {
                return { }
            },
            withdraw(){
               this.modal=true;
            },
            tabsClick(active) {
                this.tableShow=active;
            },
            selectDate(){
                let date=this.date.map(item=>{
                    if(item){
                        return moment(item).format('YYYYMMDD')
                    }
                });
                this.$set(this.filterObj,'date%d',date.join(','));
                this.getLineTableData();
                this.getLineData();
            },
            async getLineTableData(){
                return false;
                let type=this.filterObj.resource;
                let date=this.filterObj["date%d"];
                let {data}=await api_common.getLineTableData({type,date});
                this.lineData=toString.call(data)==='[object Array]'?lineData:data
            },
            down(){

            },
            visibleChange(val){
                this.modal=val;
            }
        },
        created(){
        },
        watch:{
        },
        mounted() {

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
    padding:0 15px 0 0;
    box-sizing: border-box;
  }
  .s-content-top>div:last-child{
    flex: 0 1 422px;
    overflow: hidden;
    padding:0  0 0 15px;
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
      width: 760px;
      height: 36px;
      line-height: 36px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
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
    position: relative;
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

  /*dsp*/
  /deep/ .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab{
    background-color: #fff;
    color:rgba(53,64,82,1);
  }
  /deep/ .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active{
    background-color: #1F96EE;
    color:#fff;
  }
  .download{
    width: 36px;
    height: 36px;
    line-height: 36px;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #dfe2e6;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
  }


  /deep/ .ivu-modal-wrap{
    top: 0;
  }
  /deep/ .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    .ivu-modal{
      top: 0;
    }
  }

  .total{
    position: absolute;
    bottom: 27px;
    left: 30px;
    font-size:14px;
    font-weight:bold;
    color:rgba(53,64,82,1);
  }



  /*dsp*/
</style>

