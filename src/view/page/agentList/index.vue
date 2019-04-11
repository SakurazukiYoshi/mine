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
          新增代理商</sn-button>
      </div>
      <div class="header-right">
        <template v-if="!isMobile">
          <sn-search :width="270"
                     showName="label"
                     pretext="代理商筛选"
                     :Level="true"
                     :disabled="true"
                     class="mr10"
                     v-model="filterObj.username"
          />
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
      >
        <template slot-scope="{row}"
          slot="action">
          <div class="s-table-btn-group">
            <sn-button type="primary"
              size="stretch"
              ghost
              @click.native="update(row)">查看</sn-button>
            <sn-button type="success"
              size="stretch"
              ghost
              @click.native="update(row)">修改</sn-button>
          </div>
        </template>

        <template slot-scope="{row}"
                  slot="enable">
          <template v-if="row.enable===2"><span class="red">审核中</span></template>
          <Switch v-else
                  class="s-table-switch"
                  :beforeChange="beforeSwitchChange"
                  @on-change="handleSwitch(row,'enable')"
                  :true-value="1"
                  :false-value="0"
                  :value="row.enable"></Switch>
        </template>
        <template slot-scope="{row}"
                  slot="addtime">
          {{(row.addtime*1000) | formatTime()}}
        </template>
        <template slot-scope="{row}"
                  slot="brokerage_ratio">
          {{row.brokerage_ratio?`${row.brokerage_ratio}%`:'-'}}
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
    <sn-modal v-model="editForm"
      :footer-hide="true"
      fullscreen
      :mask="false"
      :transition-names="['slide-down','slide-down']"
      :transfer="false"
      :title="id?'修改代理商':'新增代理商'">
      <div>
        <edit-agent @submitSuccess="submitSuccess" :id="id" ></edit-agent>
      </div>
    </sn-modal>
  </sn-layout>
</template>
<script>
import { Button, Icon, Switch, Option, SnPage, TableExpand,Search } from "_c"
import EditAgent from "./edit"
import { mapState } from 'vuex'
import { Layout, Content, Header, Modal, Table } from 'iview'
import { tableMixin } from '@/mixins'
import {deepCopy} from '@/utils/assist'


const components={
    'sn-table':Table,
    'edit-agent':EditAgent,
    'sn-icon':Icon,
    'sn-button':Button,
    'sn-layout':Layout,
    'sn-content':Content,
    'sn-header':Header,
    'sn-option':Option,
    'sn-modal':Modal,
    'i-switch': Switch,
    'sn-page':SnPage,
    'sn-search':Search,
    TableExpand
};


//table的列表表头及对应的数据
const columns = [
    {
  title: '代理商名称',
  key: 'username',
}, {
  title: '开通时间',
   slot: 'addtime',
}, {
  title: '返点比例',
  slot : 'brokerage_ratio',
}, {
  title: '状态',
  slot: 'enable'
}, {
  title: '备注',
  key: 'memo'
},{
  title: '操作',
  slot: 'action'
}];

//移动端的table 暂时可以不用处理
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
  slot: 'enable'
}]



//table数据载入时，get代入的参数，以及筛选时候值改变自动重新加载table数据
let filterObj = {
    user_type:2,
    row:10,
    page:1,
    username:''
};

export default {
  name:'agent',
  mixins: [tableMixin],  //table的继承
  data() {
    return {
      columnsMobile,
      tableHeight:645,  //初始的table高度
      tableData: [],    //table数据
      columns:deepCopy(columns),
      filterObj:deepCopy(filterObj),
      getUrl:'/user/list.json',   //table加载时候请求的地址
      isFuzzy:true, //是否开启模糊查询
      fuzzyDel:['page','row','user_type']  //模糊查询需要剔除掉的参数
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile'
    ]),
  },
  methods: {},
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
    width: 119px;
    position: relative;
    top: -1px;
  }
  .header-right {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
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
  .red{
    font-size:14px;
    font-weight:400;
    color:rgba(235,77,68,1);
  }
</style>
