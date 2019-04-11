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
const columns = [
    {
        title: '时间',
        key: 'date',
    }, {
        title: '名称',
        key: 'username',
        render: (h, params) =>{
            let str=(params.row.user_type===1?'广告商':'代理商');
            (params.row.level===2&&params.row.user_type===2)&&(str='二级'+str);
            return h('span', {domProps: {innerHTML: str}})
        },
    }, {
        title: '身份类型',
        key: 'user_type',
    }, {
        title: '总额',
        key: 'total',
    },{
        title: '腾讯社交消费',
        render: (h, params) =>{
            let platform=12;
            let str=(params.row.user_type===1?'广告商':'代理商');
            (params.row.level===2&&params.row.user_type===2)&&(str='二级'+str);
            return h('span', {domProps: {innerHTML: str}})
        },
    },{
        title: '微信消费',
        key: 'resource',
    },{
        title: '其他消费',
        key: 'resource',
    }
  ];

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
}];



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
      columns,
      columnsMobile,
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile'
    ]),
  },
  methods: {
    handleSortChange(){
        this.$emit('handleSortChange');
    }
  },
  components: {
    'sn-table':Table,
    'sn-button':Button,
    TableExpand,
    TablePoptip,
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
