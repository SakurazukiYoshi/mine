<template>
  <sn-layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <sn-header class="s-content-header">
      <div class="header-left"
        v-if="!isMobile">
        <sn-button @click.native="editForm = true"
          type="primary"
          class="open-btn"
          size="stretch-h36"
          v-if="!isMobile">
          <sn-icon type="open"
            color="#fff"
            size="12"
            class="open-icon"
            @click.native="del(item,i)" />
          新建广告组</sn-button>
        <date-picker type="daterange"
                    :options="options1"
                    :confirm="true"
                    placement="top-start"
                    placeholder="选择日期"
                    class="mr10 date-picker"
                    @on-ok="selectDate"
                    v-model="date"
        >
        </date-picker>
        <level-checkbox
                :width="126"
                placeholder="自定义列"
                v-model="listSelected"
                :defaultProps="{children: 'children',label: 'title'}"
                class="mr10"
                defaultValue="title"
                :labelsShow="false"
        >
          <level-checkbox-item
                  :items="columns"
                  :button="true"
                  :defaultProps="{children: 'children',label: 'title'}"
                  v-model="listSelectedItem"
          ></level-checkbox-item>
        </level-checkbox>
        <sn-select :width="126" placeholder="购买方式" class="mr10">
          <sn-option :value="''"  :key="''">全部</sn-option>
          <sn-option :value="1">排期</sn-option>
          <sn-option :value="2">竞价</sn-option>
        </sn-select>
        <sn-select :width="126" placeholder="状态" class="mr10">
          <sn-option :value="''"  :key="''">全部</sn-option>
          <sn-option :value="1">投放中</sn-option>
          <sn-option :value="2">待投放</sn-option>
          <sn-option :value="3">审核中</sn-option>
          <sn-option :value="4">未通过审核</sn-option>
        </sn-select>
        <sn-select
                :width="150"
                :search="true"
                placeholder="广告组"
                :scrollLoad="true"
                @downLoad="downLoad"
                @search="search"
                v-model="filterObj.username$"
                class="mr10"
        >
          <sn-option :value="''"  :key="''">全部广告组</sn-option>
          <sn-option :value="item.username" v-for="item in titleList" :key="item._id">{{item.username}}</sn-option>
        </sn-select>
      </div>
      <div class="header-right">
        <template v-if="!isMobile">
          <sn-button  class="open-btn mr10" size="stretch-h36">
            <sn-icon type="start" size="12" color="rgb(197, 204, 212)"/>
            启用
          </sn-button>
          <sn-button  class="open-btn mr10" size="stretch-h36">
            <sn-icon type="pause" size="12" color="rgb(197, 204, 212)"/>
            暂停
          </sn-button>
          <sn-button  class="open-btn mr10" size="stretch-h36">
            <sn-icon type="delete" size="12" color="rgb(197, 204, 212)"/>
            删除
          </sn-button>
          <div class="refresh-box">
            <sn-icon type="refresh" color="#c5ccd4" size="18" />
          </div>
        </template>
<!--        <template v-else>
          <div class="mr10">
            <sn-select
                    :width="130"
                    :search="true"
                    placeholder="全部媒体商"
                    :scrollLoad="true"
                    @downLoad="downLoad"
                    @search="search"
                    v-model="filterObj.username$"
            >
              <sn-option :value="''"  :key="''">全部媒体商</sn-option>
              <sn-option :value="item.username" v-for="item in titleList" :key="item._id">{{item.username}}</sn-option>
            </sn-select>
          </div>
          <div class="mr10">
            <sn-select :width="110"
                    placeholder="全部状态"
                    v-model="filterObj.enable">
              <sn-option v-for="item in status"
                      :label="item.label"
                      :value="item.value">
              </sn-option>
            </sn-select>
          </div>
        </template>-->

      </div>
    </sn-header>
    <sn-content  ref="tableContent">
      <sn-table v-if="!isMobile"
        :height="tableHeight"
        :columns="columns"
        :data="tableData"
        :loading="loading"
        @on-sort-change="handleSortChange"
        ref="table"
        @on-selection-change="handleSelectionChange"
      >
        <template slot-scope="{row}"
          slot="action">
          <div class="s-table-btn-group">
            <sn-button type="default"
              size="stretch"
              ghost
              @click.native="del(row)">修改</sn-button>

            <sn-button type="default"
                       size="stretch"
                       ghost
                       @click.native="update(row)">删除</sn-button>
            <sn-button type="default"
                       size="stretch"
                       ghost
                       @click.native="update(row)">效果报告</sn-button>
          </div>
        </template>

        <template slot-scope="{row}"
                  slot="enable">
          <Switch class="s-table-switch"
                  :beforeChange="beforeSwitchChange"
                  @on-change="handleSwitch(row,'enable')"
                  :true-value="1"
                  :false-value="0"
                  v-model="row.enable"></Switch>
        </template>
      </sn-table>

<!--      <sn-table v-if="isMobile"
        class="table-xs"
        :columns="columnsMobile"
        :data="tableData"
        :loading="loading"
        @on-sort-change="handleSortChange">

        <template slot-scope="{row}"
          slot="enable">
          <Switch class="s-table-switch"
            :beforeChange="beforeSwitchChange"
            @on-change="handleSwitch(row,'enable')"
            :true-value="1"
            :false-value="0"
            v-model="row.enable"></Switch>
        </template>

        <template slot-scope="{row}"
                  slot="distributor_ratio">
          {{row.distributor_ratio}}%
        </template>

        <template slot-scope="{row}"
                  slot="type">
          {{mediaType[row.type]}}
        </template>

      </sn-table>-->

      <sn-page :total="totalCount"
        :current="tableReq.pageInfo.page"
        :page-size="tableReq.pageInfo.count"
        show-sizer
        show-elevator
        show-total
        placement="bottom"
        @on-change="handleChangePage"
        class="page"
        @on-page-size-change="handleChangeSizePage">
      </sn-page>
    </sn-content>
    <sn-modal v-model="editForm"
      :footer-hide="true"
      fullscreen
      :mask="false"
      :transition-names="['slide-down','slide-down']"
      :transfer="false"
      :title="id?'修改广告组':'新建广告组'">
      <div>
        <edit-agent @submitSuccess="submitSuccess" :id="id" :editReq="editReq"></edit-agent>
      </div>
    </sn-modal>
  </sn-layout>
</template>
<script>
import { Button, Icon, Switch, Select, Option, SnPage, TableExpand,DatePicker,LevelCheckbox,LevelCheckboxItem } from "_c"
import EditAgent from "./edit"
import { mapState } from 'vuex'
import { Layout, Content, Header, Modal, Table } from 'iview'
import { tableMixin,selectMixin } from '@/mixins'
import mock from '../api'
import moment from 'moment'


const components={
    'sn-table':Table,
    'edit-agent':EditAgent,
    'sn-icon':Icon,
    'sn-button':Button,
    'sn-layout':Layout,
    'sn-content':Content,
    'sn-header':Header,
    'sn-select':Select,
    'sn-option':Option,
    'sn-modal':Modal,
    'i-switch': Switch,
    'sn-page':SnPage,
    'date-picker':DatePicker,
    'level-checkbox':LevelCheckbox,
    'level-checkbox-item':LevelCheckboxItem,
    TableExpand
}


const columns = [
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
  title: '广告组',
  key: 'username',
}, {
  title: '广告计划',
   key: 'type',
}, {
  title: '出价',
   key : 'distributor_ratio',
}, {
  title: '展现量',
   key : 'distributor_ratio',
}, {
  title: '点击量',
  key: 'access'
}, {
  title: '点击率',
  key: 'distributor_id'
}, {
  title: 'eCPM',
  key: 'distributor_id'
}, {
  title: '费用',
  key: 'distributor_id'
},{
  title: '状态',
  key: 'distributor_id',
  slot: 'enable'
},{
  title: '购买方式',
  key: 'distributor_id'
},{
  title: '操作',
  slot: 'action'
}];

const columnsMobile = [
    {
  type: 'expand',
  width: 50,
  render: (h, params) => h(TableExpand, {
    props: {
      row: params.row,
      fields: [{
        key: 'access',
        label: '具有的权限',
        render: renderAccess
      }, {
        key: 'distributor_id',
        label: '可以创建的媒体'
      }]
    }
  })
}, {
  title: '媒体商名称',
  key: 'username'
}, {
  title: '媒体商类型',
  slot: 'type'
}, {
  title: '渠道分成比例',
  slot: 'distributor_ratio',
}, {
  title: '状态',
  key: 'enable',
  slot: 'enable'
}]

let tableReq = {
  tableName: 'AgentUser',
  column: ['username', 'type', 'distributor_id', 'distributor_ratio', 'access', 'enable'],
}

let editReq = {
  tableName: 'AgentUser',
  column: ['username', 'password', 'distributor_ratio', 'type', 'access', 'mobile', 'qq', 'email', 'memo'],
}

let filterObj = {
  username$: '',        // 媒体商筛选
  enable: null,        // 状态筛选
  "@order":"",
}

export default {
  name:'agent',
  mixins: [tableMixin,selectMixin],
  data() {
    return {
      editReq,
      tableReq,
      filterObj,
      columns,
      columnsMobile,
      tableData: mock.agentList,
      statusType: '',
      page: 1,
      count: 10,
      tableHeight:645,
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
      listSelected:[],
      listSelectedItem:'',
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile'
    ]),
    ...mapState('app/agent', [
      'status',
       'mediaType'
    ]),
  },
  methods: {
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
    columnsData(){
        let val=this.listSelected;
        let arr=[];
        columns.forEach(item=>{
            val.includes(item.title)&&arr.push(item)
        });
        return arr;
    },
    handleSelectionChange(data){

    }
  },
  created(){
      columns.forEach((item)=>{
          this.listSelected.push(item.title)
      })
  },
  components,
}
</script>
<style lang="less" scoped>
.s-content-header {
  height: 96px;
  padding: 30px;
  line-height: 36px;
  background: #ebedf2;
  display: flex;
  .header-left {
    position: relative;
    top: -1px;
    flex: 1;
    display: flex;
  }
  .header-right {
    width: 300px;
    display: flex;
    justify-content: flex-end;
  }
}
.ivu-layout{
  background: #ebedf2;
}
.ivu-layout-content {
  background: @white-color;
  padding-bottom: 120px;
  box-sizing: border-box;
  position: relative;
  border:1px solid #dfe2e6;
}
.ivu-table-wrapper{
  border: none;
}
.page{
  position: absolute;
  bottom: 30px;
  right: 30px;
}
.ivu-modal-wrap {
  top: 30px;
}
.open-icon {
  position: relative;
  top: -1px;
}

.mr10 {
  margin-right: 10px;
}

@v: 100vw/750;
.s-home-xs {
  padding: 0;
  .header-right {
    flex-direction: row;
  }
  .s-content-header {
    padding: 30 * @v 20 * @v;
    height: auto;
  }
  /deep/ .s-table-table td {
    text-align: center;
  }
  /deep/ .s-table-mobile-hide-name {
    text-align: left;
  }
  /deep/ .s-table-th {
    font-size: 12px;
  }
}
/deep/ .s-table-btn-group .s-btn {
  margin: 0 10px 0 0;
}
/deep/ .ivu-modal-header-inner {
  text-align: center;
}
/deep/ .ivu-modal-body {
  top: 68px;
  background-color: #f9fafb;
}
/deep/ .ivu-modal-header {
  padding: 22px 16px;
}
/deep/ .ivu-modal-close {
  border-radius: 50%;
  background-color: #354052;
  right: 30px;
  top: 20px;
  .ivu-icon-ios-close {
    color: #fff;
    font-size: 26px;
  }
}

/deep/ .ivu-modal-header-inner {
  text-align: center;
  font-size: 16px;
  color: #354052;
}
/deep/ .ivu-modal-wrap {
  border-top: 1px solid #f1f2f4;
  box-shadow: 0px -6px 20px 0px rgba(154, 167, 179, 0.3);
}


.date-picker{
  margin-left: 10px;
  width: 274px;
  /deep/ .ivu-input{
    height: 36px;
    line-height: 36px;
  }
  /deep/ .ivu-input-icon{
    height: 36px;
    line-height: 36px;
  }
}
.refresh-box{
  width: 36px;
  height: 36px;
  line-height: 36px;
  box-sizing: border-box;
  border: 1px solid #dfe2e6;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
}
</style>
