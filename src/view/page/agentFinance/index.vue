<template>
  <sn-layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <div class="s-content-top">
      <div class="f-card">
        <financial-card :Balance="'45,876.45'"
                        :freeze="'2,653.23'"
                        type="dsp"
                        @withdraw="withdraw"></financial-card>
      </div>
      <div><money-card money="10,055.55" icon="balance" iconColor="#7ACE4C" title="总金额"></money-card></div>
      <div>
        <money-card
                money="31,100.50" icon="xiane" iconColor="#F0AE1F" :ex="true"
                title="每日总限额"></money-card>
      </div>
      <div>
        <money-card
                money="3,555,500.50" icon="zongxiaofei" iconColor="#EB4D44" :ex="true"
                title="昨日总消费"></money-card>
      </div>
    </div>
    <sn-header class="s-content-header">
      <div class="header-left ">
        <sn-tabs type="card" class="Tabs-box" @on-click="tabsClick">
          <sn-tabPane label="广告商账户"></sn-tabPane>
          <sn-tabPane label="广告商转账记录"></sn-tabPane>
          <sn-tabPane label="代理商充值记录"></sn-tabPane>
          <sn-tabPane label="消费情况"></sn-tabPane>
        </sn-tabs>
      </div>
      <div class=" header-right">
        <template v-if="!isMobile">
          <sn-search :width="270"
                     showName="label"
                     :pretext="'请输入广告商名称'"
                     :Level="true"
                     :disabled="true"
                     v-if="tableShow==0||tableShow==1||tableShow==3"
                     class="mr10"
                     v-model="filterObj.username"
          />
          <sn-select :width="130" class="mr10"
                     placeholder="全部"
                     v-if="tableShow==3"
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
                       v-if="tableShow==1||tableShow==2||tableShow==3"
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


        <sn-table2 :tableHeight="tableHeight" :tableData="tableData" :loading="loading" @handleSortChange="handleSortChange" v-else-if="tableShow==2" ref="table"></sn-table2>

        <sn-table3 :tableHeight="tableHeight" :tableData="tableData" :loading="loading" @handleSortChange="handleSortChange" v-else-if="tableShow==3" ref="table"></sn-table3>



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
    <sn-recharge :visible="modal" @visibleChange="visibleChange"></sn-recharge>
  </sn-layout>
</template>
<script>
    import {SnPage,Search,Button,FinancialCard,moneyCard,DatePicker,Icon,Select,Option,Recharge} from "_c"
    import {table0,table1,table2,table3} from './components'
    import { mapState } from 'vuex'
    import { Layout, Content, Header ,Tabs,TabPane} from 'iview'
    import {deepCopy} from '@/utils/assist'
    import { tableMixin } from '@/mixins'


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
            'sn-table2':table2,
            'sn-table3':table3,
            'date-picker':DatePicker,
            'sn-icon':Icon,
            'sn-recharge':Recharge,
    };

    /*用于tab切换的筛选*/
    const fuzzyDels=[['page','row'],['page','row'],['page','row'],['page','row']];
    let filterObjs = [
        {
            row:10,
            page:1,
            need_consumption:1,
            user_type:'1,2',
            username:''
        },
        {
            row:10,
            page:1,
            username:'',
        },
        {
            row:10,
            page:1,
            username:''
        },
        {
            row:10,
            page:1,
        }
    ];
    const urls=['/aderAccount/aderAccountList.json','/aderAccountLog/transferList.json','/financial/charge/list.json','/financial/cost/aderList.json'];



    export default {
        name:'agentFinance',
        mixins: [tableMixin],
        data() {
            return {
                tableShow:0,
                tableHeight:400,
                tableData: [],
                filterObj:deepCopy(filterObjs[0]),
                getUrl:deepCopy(urls[0]),
                fuzzyDel:deepCopy(fuzzyDels[0]),
                isFuzzy:true,
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
                    2:'只看代理商',
                    3:'只看广告主',
                },
                modal:false,
            }
        },
        computed: {
            ...mapState('basic', [
                'isMobile','mediaTypes','userinfo'
            ]),
        },
        components,
        methods: {
            withdraw(){
               this.modal=true;
            },
            tabsClick(active) {
                this.tableShow=active;
                this.filterObj=deepCopy(filterObjs[active]);
                this.fuzzyDel=deepCopy(fuzzyDels[active]);
                this.getUrl=deepCopy(urls[active]);
            },
            selectDate(){
/*                let date=this.date.map(item=>{
                    if(item){
                        return moment(item).format('YYYYMMDD')
                    }
                });
                this.$set(this.filterObj,'date%d',date.join(','));
                this.getLineTableData();
                this.getLineData();*/
            },
            down(){

            },
            visibleChange(val){
                this.modal=val;
            }
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



  /*dsp*/
</style>

