<template>
  <sn-layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <sn-header class="s-content-header">
      <div class="header-left"
        v-if="!isMobile">
        <sn-search :width="270"
                   showName="label"
                   pretext="请输入搜索关键字"
                   :Level="true"
                   :disabled="true"
                   class="mr10"
                   v-model="filterObj.operator"
        />
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
        <!--optype before after-->
        <template slot-scope="{row}"
                  slot="optype">
          <div class="plr5">
            <p  v-for="(item,key) in row.optype" :key="key">{{item}}</p>
          </div>
        </template>
        <template slot-scope="{row}"
                  slot="before">
          <div class="plr5">
            <p  v-for="(item,key) in row.before" :key="key">{{item.name}} : {{item.value}}</p>
          </div>
        </template>
        <template slot-scope="{row}"
                  slot="after">
          <div class="plr5">
            <p  v-for="(item,key) in row.after" :key="key">{{item.name}} : {{item.value}}</p>
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
  </sn-layout>
</template>
<script>
import { Button, Icon, Switch, Select, Option, SnPage, TableExpand,Search } from "_c"
import { mapState } from 'vuex'
import { Layout, Content, Header, Modal, Table } from 'iview'
import {tableMixin} from '@/mixins'
import {deepCopy} from '@/utils/assist'
const components={
    'sn-table':Table,
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
    'sn-search':Search,
    TableExpand
};


const columns = [
    {
  title: '操作时间',
  key: 'puttime',
}, {
  title: '操作人',
   key: 'operator',
}, {
  title: '操作对象',
   key : 'beeditor',
}, {
  title: '操作类型',
  slot: 'optype',
}, {
  title: '内容变更前',
  slot: 'before'
},{
  title: '内容变更后',
   slot: 'after'
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
  key: 'type'
}, {
  title: '渠道分成比例',
  slot: 'distributor_ratio',
}, {
  title: '状态',
  key: 'enable',
}]


let filterObj={
    operator:'',
    beeditor:'',
    row:10,
    page:1
};

export default {
  name:'agent',
  mixins: [tableMixin],
  data() {
    return {
      filterObj:deepCopy(filterObj),
      columns:deepCopy(columns),
      columnsMobile,
      tableData: [],
      tableHeight:645,
      getUrl:'/user/logs.json',
      isFuzzy:true,
      fuzzyDel:['page','row']
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile'
    ]),
  },
  watch:{
    'filterObj.operator'(val){
        this.$set(this.filterObj,'beeditor',val);
    }
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
  .plr5{
    padding: 11px 0;
    line-height:18px;
    p{
      padding: 4px 0;
    }
  }
</style>
