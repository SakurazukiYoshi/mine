<template>
  <Layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <Header class="s-content-header">
      <div class="header-left"
        v-if="!isMobile">
        <Button @click.native="editForm = true"
          type="primary"
          class="open-btn"
          size="stretch-h36"
          v-if="!isMobile">
          <Icon type="open"
            color="#fff"
            size="12"
            class="open-icon"
            @click.native="del(item,i)" />
          新建媒体商</Button>
      </div>
      <div class="header-right">
        <template v-if="!isMobile">
          <div>
            <Select :width="110"
              placeholder="全部状态"
              v-model="filterObj.enable">
              <Option v-for="item in status"
                :label="item.label"
                :value="item.value">
              </Option>
            </Select>
          </div>
          <div class="mr10">
            <Select
                    :width="130"
                    :search="true"
                    placeholder="全部媒体商"
                    :scrollLoad="true"
                    @downLoad="downLoad"
                    @search="search"
                    v-model="filterObj.username$"
            >
              <Option :value="''"  :key="''">全部媒体商</Option>
              <Option :value="item.username" v-for="item in titleList" :key="item._id">{{item.username}}</Option>
            </Select>
          </div>
        </template>
        <template v-else>
          <div class="mr10">
            <Select
                    :width="130"
                    :search="true"
                    placeholder="全部媒体商"
                    :scrollLoad="true"
                    @downLoad="downLoad"
                    @search="search"
                    v-model="filterObj.username$"
            >
              <Option :value="''"  :key="''">全部媒体商</Option>
              <Option :value="item.username" v-for="item in titleList" :key="item._id">{{item.username}}</Option>
            </Select>
          </div>
          <div class="mr10">
            <Select :width="110"
                    placeholder="全部状态"
                    v-model="filterObj.enable">
              <Option v-for="item in status"
                      :label="item.label"
                      :value="item.value">
              </Option>
            </Select>
          </div>
        </template>

      </div>
    </Header>
    <Content>
      <Table v-if="!isMobile"
        height="645"
        :columns="columns"
        :data="tableData"
        :loading="loading"
        @on-sort-change="handleSortChange"
      >

        <template slot-scope="{row}"
          slot="access">
          {{showAccess({value: row.access})}}
        </template>

        <template slot-scope="{row}"
          slot="distributor_ratio">
          {{row.distributor_ratio}}%
        </template>

        <template slot-scope="{row}"
          slot="type">
          {{mediaType[row.type]}}
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

        <template slot-scope="{row}"
          slot="action">
          <div class="s-table-btn-group">
            <Button type="primary"
              size="stretch"
              ghost
              @click.native="update(row)">修改</Button>
            <Button type="error"
              size="stretch"
              ghost
              @click.native="del(row)">删除</Button>
          </div>
        </template>
      </Table>

      <Table v-if="isMobile"
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

      </Table>

      <SnPage :total="totalCount"
        :current="tableReq.pageInfo.page"
        :page-size="tableReq.pageInfo.count"
        show-sizer
        show-elevator
        show-total
        placement="bottom"
        @on-change="handleChangePage"
        @on-page-size-change="handleChangeSizePage">
      </SnPage>
    </Content>
    <Modal v-model="editForm"
      :footer-hide="true"
      fullscreen
      :mask="false"
      :transition-names="['slide-down','slide-down']"
      :transfer="false"
      :title="id?'修改媒体商':'新建媒体商'">
      <div>
        <edit-agent @submitSuccess="submitSuccess" :id="id" :editReq="editReq"></edit-agent>
      </div>
    </Modal>
  </Layout>
</template>
<script>
import { Button, Icon, Switch, Select, Search, Option, SnPage, TableExpand } from "_c"
import EditAgent from "./edit-agent"
import { mapState } from 'vuex'
import { Layout, Content, Header, Modal, Table } from 'iview'
import { tableMixin,selectMixin } from '@/mixins'

// 权限中间打逗号
const renderAccess = ({ value }) => Object.entries(value).filter(e => {
  let key = e[0],
    value = e[1]
  return value === 1
}).map(e => e[0]).join(',')

const columns = [
    {
  title: '媒体商名称',
  key: 'username',
}, {
  title: '媒体商类型',
  slot: 'type',
}, {
  title: '渠道分成比例',
  slot: 'distributor_ratio',
  align:'right',
  sortable:'custom',
  sortKey:'distributor_ratio',
}, {
  title: '具有的权限',
  key: 'access',
  slot: 'access'
}, {
  title: '可以创建的媒体',
  key: 'distributor_id'
}, {
  title: '状态',
  key: 'enable',
  slot: 'enable'
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
      tableData: [],
      statusType: '',
      page: 1,
      count: 10,
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
    getQuery() {
      const isNone = field => field == undefined || field === ''
      const { username$, enable } = this.filterObj
      let order=this.tableReq.tableInfo['@order'];
      let query = { username$, enable,"@order":order }
      if (isNone(enable)) delete query.enable
      return query
    },
    showAccess: renderAccess,
  },
  components: {
    Table,
    EditAgent,
    Search,
    Icon,
    Button,
    Layout,
    Content,
    Header,
    Select,
    Option,
    Modal,
    'i-switch': Switch,
    SnPage,
    TableExpand
  },
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
.ivu-layout-content {
  background: @white-color;
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
</style>
