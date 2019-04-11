<template>
  <div class="s-report-main"
    :class="{'s-report-main-mobile': isMobile }">
    <div class="h33"></div>
    <sm-report-row class="s-report-main-header">
      <sm-report-col :xs="24"
        :sm="91">
        <div>
          <p>预估收入</p>
          <p><span class="RMB">￥</span>{{`${toRegularNum(items.price_sum)}`}}</p>
        </div>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <div>
          <p>请求量</p>
          <p>{{`${toRegularNum(items.pv_sum,0)}`}}</p>
        </div>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <div>
          <p>总展现量</p>
          <p>{{toRegularNum(items.show_sum,0)}}</p>
        </div>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <p>曝光率</p>
        <p>{{items.fillper_sum}}%</p>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <p>总点击量</p>
        <p>{{toRegularNum(items.clks_sum,0)}}</p>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <p>总点击率</p>
        <p>{{items.clks_per}}%</p>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <p>每千次展现收入</p>
        <p><span class="RMB">￥</span>{{toRegularNum(items.cpm_sum)}}</p>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <p>独立IP</p>
        <p>{{toRegularNum(items.ip_sum,0)}}</p>
      </sm-report-col>
      <sm-report-col :xs="91"
        :sm="91">
        <p>独立访客</p>
        <p>{{toRegularNum(items.uv_sum,0)}}</p>
      </sm-report-col>
    </sm-report-row>
    <div class="s-report-main-legend">
      <div class="s-report-main-legend-checked"
        v-if="isMobile"
        v-on:click="toggleLegent">
        {{ legends }}
        <sm-icon type="arrow-down"
          color="#bbbbbb"
          :size="10"
          class="icon"
          :class="{'up':!collapsed}" />
      </div>
      <div class="s-report-main-legend-list"
        v-show="showLegend">
        <sm-checkbox-group v-model="checked"
          size="large"
          @on-change="CheckboxGroupChange">
          <sm-checkbox v-for="(item,field,i) in fields"
            :label="field"
            :color="item.color"
            @on-click="CheckboxClick({field,i})">{{item.text}}</sm-checkbox>
        </sm-checkbox-group>
      </div>
    </div>
    <div class="s-report-main-chart">
      <sm-echarts-line :option="lineData"></sm-echarts-line>
    </div>
  </div>
</template>
<script>
import Icon from "_c/icon";
import { mapState } from 'vuex'
import { ReportRow, ReportCol } from '_c/report/components';
import Checkbox from '_c/report/components/checkbox';
import CheckboxGroup from '_c/report/components/checkbox-group';
import { EChartsLine } from '_c/echarts'
import { formatTime,toRegularNum } from '@/mixins/globalMixin'
import { deepCopy } from '@/utils/assist'
import moment from 'moment'
const fields={
    price: { color: '#44c14a', text: '预估收入'},
    pv: { color: '#2a9ff6', text: '请求量'},
    show: { color: '#ffbb44', text: '总展现量'},
    fillper: { color: '#8a5bf6', text: '曝光率'},
    clks: { color: '#d25ee6', text: '总点击量'},
    clkper: { color: '#d18b4c', text: '总点击率'},
    cpm: { color: '#00c8dc', text: '每千次展现收入'},
    ip: { color: '#4ad8ae', text: '独立IP'},
    uv: { color: '#eb4d44', text: '独立访客'},
};
export default {
  name: "ReportMain",
  components: {
    'sm-icon': Icon,
    'sm-checkbox': Checkbox,
    'sm-checkbox-group': CheckboxGroup,
    'sm-report-row': ReportRow,
    'sm-report-col': ReportCol,
    'sm-echarts-line': EChartsLine,
  },
  props:{
    items:{
        type:Object,
        default(){
            return {}
        }
    },
    lineSeries:{
        type:Object,
        default(){
            return {}
        }
    }
  },
  data() {
    let self=this;
    return {
      fields,
      checked: ['price', 'pv'],//选中的图例
      //checked: [],//选中的图例
      legends: "",//选中的图例名称
      collapsed: true,//是否收缩图例,
      lineData: {
        xAxis: {
          data: [],
        },
        axisPointer: {
          label: {
            formatter: function (data) {
              return data.value;
            },
          }
        },
        series:[],
        tooltip: {
          formatter: function (params) {
              let date,
                  data,
                  obj={};
              if(params.length>0){
                   date=params[0].axisValue;
                   data=self.lineData.series[0].item[date];
                  Object.keys(data).forEach(item=>{
                      data[item].forEach(val=>{
                          if(moment(val[0],'YYYYMMDD').format('MM-DD')===date){
                               obj[item]=val[1];
                          }
                      })
                  });
              }
              let str = `
                                <span style="color: #354052;font-size: 16px;font-weight: bolder;margin-bottom: 10px;display: block">${date}</span>
                                <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 5px;display: block">预估收入</span>
                                <span style="color:#354052;font-weight: bolder;font-size: 16px;margin-bottom: 10px;display: block">￥${obj.price?self.toRegularNum(obj.price):0}</span>
                                <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 1px;display: block">展现量</span>
                                <span style="color:#354052;font-weight: bolder;font-size: 16px;margin-bottom: 10px;display: block">${obj.show?self.toRegularNum(obj.show,0):0}</span>
                               <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 7px;display: block">请求量： ${obj.pv?self.toRegularNum(obj.pv,0):0}</span>
                               <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 7px;display: block">点击量： ${obj.clks?self.toRegularNum(obj.clks,0):0}</span>
                               <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 7px;display: block">点击率： ${obj.clkper?obj.clkper:0}%</span>
                               <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 7px;display: block">填充率： ${obj.fillper?obj.fillper:0}%</span>
                               <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 7px;display: block">千次展现收入： ${obj.cpm?self.toRegularNum(obj.cpm):0}</span>
                               <span style="color: #7f8fa4;font-size: 12px;margin-bottom: 7px;display: block">独立访问： ${obj.uv?self.toRegularNum(obj.uv,0):0}</span>
                               <span style="color: #7f8fa4;font-size: 12px;display: block">独立IP：  ${obj.uv?self.toRegularNum(obj.ip,0):0}</span>
                        `;
            return str;
          },
        }
      },
      selectItem: {},    //点击选中的对象
      limit: 2,      //能选中的多选个数
      showData:{},
    }
  },
  watch: {
    'checked': {
      handler: function (checked) {
        let c = [];
        for (let i in checked) {
          c.push(this.fields[checked[i]].text);
        }
        this.legends = c.join('、');
      },
      immediate: true
    },
    lineSeries(val){
        this.showData=deepCopy(val);
        this.lineDataChange();
    }
  },
  methods: {
    toggleLegent() {
      this.collapsed = !this.collapsed;
    },
    CheckboxGroupChange(val) {
      if (val.length > this.limit) {
        let min,
          max,
          obj = {},
          indexArr = [];
        this.checked.forEach(item => {
          let oldIndex = Object.keys(this.fields).indexOf(item);
          obj[oldIndex] = item;
          indexArr.push(oldIndex);
        });
        min = Math.min(...indexArr);
        max = Math.max(...indexArr);
        /*============点击不同侧删除对应的数据============*/
        if (this.selectItem.i == min) {
          delete obj[max];
          this.checked = Object.values(obj);
        } else {
          delete obj[min];
          this.checked = Object.values(obj);
        }
      }
        this.lineDataChange();
    },
    CheckboxClick(val) {
      this.selectItem = val;
    },
    toRegularNum,
    lineDataChange(){
        let series=[];
        let time;
        let checked=this.checked;
        if(Object.keys(this.showData).length==0){
            this.$set(this.lineData,'series',[]);
            this.$set(this.lineData.xAxis,'data',[]);
             return false;
        }
        checked.forEach(item=>{
            time=[];
            let data={};
            data.lineStyle={color: this.fields[item].color};
            data.itemStyle={color: this.fields[item].color};
            data.emphasis={itemStyle: {color: this.fields[item].color,}};
            data.item={};
            data.data=[];
            this.showData[item].forEach((val,label)=>{
                data.data.push(val[1]);
                time.push(moment(val[0],'YYYYMMDD').format('MM-DD'))
                data.item[moment(val[0],'YYYYMMDD').format('MM-DD')]=this.showData;
            });
            series.push(data);
        });
        this.$set(this.lineData,'series',series);
        this.$set(this.lineData.xAxis,'data',time);
    }
  },
  computed: {
    ...mapState('basic', [
      'isMobile'
    ]),
    showLegend() {
      return !this.isMobile || !this.collapsed;
    }
  },
}
</script>
<style lang="less" scoped>
.displayflex {
  display: flex;
  display: -webkit-flex;
}
.s-report-main {
  .displayflex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  .s-report-main-legend {
    position: relative;
    .s-report-main-legend-checked {
      text-align: right;
    }
    .s-report-main-legend-list {
      .displayflex;
      .ivu-checkbox-wrapper {
        height: 0.7rem;
        line-height: 0.7rem;
        .ivu-checkbox {
          margin-right: 10px;
        }
      }
    }
  }
  .s-report-main-chart {
    flex-grow: 1;
    .displayflex;
    flex-direction: column;
  }
}
.s-report-main-mobile {
  .s-report-main-chart {
    min-height: 6rem;
  }
  .s-report-main-legend-list {
    width: 2.78rem;
    flex-direction: column;
    height: auto;
    position: absolute;
    right: 0;
    top: 1rem;
    z-index: 100;
    border: 1px solid #dfe2e5;
    border-radius: 4px;
    padding: 0.17rem 0.3rem;
    background: #fff;
    .ivu-checkbox-wrapper {
      height: 0.7rem;
      line-height: 0.7rem;
      .ivu-checkbox {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>
<style scoped lang="less">
/deep/ .s-report-col p:first-child {
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #7f8fa4;
  line-height: 1;
  padding: 0 5px 0 0;
}
/deep/ .s-report-col p:last-child {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bolder;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #354052;
  line-height: 1;
  padding: 0 5px 0 0;
}

.icon {
  transform: scale(0.6);
  transition: transform 0.3s;
}
.up {
  transform: scale(0.6) rotate(180deg);
}
.s-report-main
  .s-report-main-legend
  .s-report-main-legend-list
  .ivu-checkbox-wrapper {
  height: 16px;
  line-height: 16px;
  margin-bottom: 10px;
}

@v: 100vw/750;
.s-home-xs {
  .s-report-main-legend {
    margin-top: 57 * @v;
    margin-bottom: 50 * @v;
  }
  .s-report-col {
    margin-bottom: 32 * @v;
    p:last-child {
      margin-top: 20 * @v;
      font-size: 15px;
    }
    p:first-child {
      font-size: 12px;
    }
    p {
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
  .s-report-main-mobile .s-report-main-legend-list {
    top: 50 * @v;
  }
  .RMB {
    font-size: 8px;
  }
  .s-report-main-legend-checked {
    font-size: 12px;
  }
}
.s-home-web {
  .h33 {
    height: 33px;
  }
  .s-report-main-header {
    flex: 0 1 124px;
  }
}
</style>

