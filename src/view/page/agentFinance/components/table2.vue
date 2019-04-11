<template>
  <div>
    <sn-table v-if="!isMobile"
              :height="tableHeight"
              :columns="columns"
              :data="tableData"
              :loading="loading"
              @on-sort-change="handleSortChange"
    >
      <template slot-scope="{row}"
                slot="action">
        <div class="s-table-btn-group">
          <sn-button type="success"
                     size="stretch"
                     ghost
                     class="mr10"
          >重新充值</sn-button>
          <sn-button type="default"
                     size="stretch"
                     ghost
          >删除</sn-button>
        </div>
      </template>
    </sn-table>
<!--    <Table v-if="isMobile"
      class="table-xs"
      :columns="columnsMobile"
      :data="tableData"
      :loading="loading"
      @on-sort-change="handleSortChange">
      <template slot-scope="{row}"
        slot="agent_username">
        {{type[row.type]}}
      </template>
      <template slot-scope="{row}"
                slot="pretax_income">
        &lt;!&ndash;￥{{row.pretax_income | toRegularNum}}&ndash;&gt;
        <tablePoptip  :data="row.agents" :columns="row | popColumns" :income="row.pretax_income | toRegularNum"></tablePoptip>
      </template>
    </Table>-->
  </div>
</template>

<script>
import { Button, TableExpand,TablePoptip } from '_c'
import { Table } from 'iview'
import { mapState } from 'vuex'
import { formatTime, toRegularNum } from '@/mixins/globalMixin'
let filterObj = {
    "@order":"",
}
const columns = [
    {
        title: '充值金额',
        key: 'date',
    }, {
        title: '充值单号',
        key: 'agent_username',
    }, {
        title: '充值方式',
        key: 'resource',
    }, {
        title: '充值状态',
        key: 'resource',
    },{
        title: '充值时间',
        slot: 'action'
}];

const columnsMobile = [{
  type: 'expand',
  width: 50,
  render: (h, params) => h(TableExpand, {
    props: {
      row: params.row,
      fields: [{
        key: 'pretax_pay',
        label: '实际税前支付',
        render({ value }) {
          return formatTime(value, 'YYYY-MM')
        }
      }, {
        key: 'tax',
        label: '代扣税',
        render({ value }) {
          return toRegularNum(value)
        }
      },
      {
        key: 'suffix_tax',
        label: '实际税后支付',
        render({ row }) {
          return toRegularNum(row.pretax_pay + row.tax)
        }
      },
      {
        key: 'memo_agent',
        label: '备注'
      }]
    }
  })
}, {
  key: 'agent_username',
  title: '财务对象',
  slot: 'agent_username'
}, {
  key: 'pretax_income',
  title: '我的税前收入',
  slot: 'pretax_income'
}]

let tableReq = {
  funcName: 'user_account',
  funcResName: 'data()',
  tableName: 'FinancialAccount',
  column: ['date', 'type', 'pretax_income', 'pretax_pay', 'tax', 'pay', 'memo_agent', 'agent_id','distributor_id'],
  tableInfo: {
    'agent': {
      "AgentUser": {
        "_id": "$agent_id",
        "@column": "username,distributor_ratio"
      }
    }
  }
}



export default {
  props:{
      tableHeight:{
          type:Number,
          default:400
      },
      tableData:{type:Array},
      loading:{type:Boolean},
  },
  data() {
    return {
      tableReq,
      columns,
      columnsMobile,
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile'
    ]),
    ...mapState('app/financial', [
        'type',
    ]),
  },
  methods: {
    getQuery() {
        let order=this.tableReq.tableInfo['@order'];
        return { "@order":order }
    },
    handleSortChange(){
        this.$emit('handleSortChange');
    }
  },
  components: {
    'sn-table':Table,
    'sn-button':Button,
    TableExpand,
    TablePoptip,
  },
  filters:{
      popColumns(val){
          return [
              {
                  title: '媒体商',
                  key: 'username',
              },
              {
                  title: '渠道分成比例',
                  key:'distributor_ratio',
                  render:(val)=>`${val}%`
              },
              {
                  title: '媒体商收益',
                  key:'pretax_income',
                  render:(val)=>`￥${val}`
              },
          ]
      }
  }
}
</script>
<style scoped>
  /deep/ .flex-right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .mr10{
    margin-right: 10px;
  }
</style>
