<template>
  <div class="s-home-content"
    :class="[isMobile?'s-home-xs':'s-home-web']">
    <div class="s-home-left">
      <div class="s-home-left-card1">
             <div class="flex">
               <div class="flex-1">
                 <p class="title">账户余额</p>
                 <p class="money text-overflow max-318">￥45,876.45</p>
               </div>
                <div class="btn-box">
                  <sn-button
                          size="small"
                          shape="circle"
                          class="card-btn"
                          type="primary"
                          @click.native="handleClick"
                  >充值</sn-button>
                </div>
             </div>
             <div class="flex">
                  <div class="box">
                      <p class="sub">每日限额</p>
                      <p class="text-overflow max-318">3,594 <span class="small">元</span></p>
                  </div>
                  <div class="box">
                      <p class="sub">预计可投放天数</p>
                      <p class="text-overflow max-318">594 <span class="small">天</span></p>
                  </div>
             </div>
      </div>
      <div class="h30"></div>
      <div class="s-home-left-card2">
        <s-card>
          <p slot="title">消费情况</p>
          <p slot="subTitle">(最近7天)</p>
          <eCharts-bar :option="barData"></eCharts-bar>
        </s-card>
      </div>
      <div v-if="isMobile"
        class="s-home-left-card4">
        <s-card>
          <p slot="title">受众地域分布</p>
          <p slot="subTitle">(最近7天)</p>
          <report-main :items="lineData" :lineSeries="lineSeries" ></report-main>
        </s-card>
      </div>
      <div class="h30"></div>
      <div class="s-home-left-card3">
        <s-card>
          <p slot="title">受众地域分布</p>
          <p slot="subTitle">(最近7天)</p>
          <eCharts-map :option="mapData"></eCharts-map>
        </s-card>
      </div>
    </div>
    <div class="s-home-right"
      v-if="!isMobile">
      <s-card>
        <p slot="title">广告效果</p>
        <p slot="subTitle">(最近7天)</p>
        <report-main :items="lineData" :lineSeries="lineSeries" ></report-main>
      </s-card>
    </div>
  </div>
</template>
<script>
import { SCard, EChartsMap, EChartsBar, Report,Button } from "_c"
import { mapState } from 'vuex'
import {api_home,api_common} from  '@/api'
import moment from 'moment'
import { deepCopy } from '@/utils/assist'


const  components={
    's-card':SCard,
    'eCharts-map':EChartsMap,
    'eCharts-bar':EChartsBar,
    'report-main': Report,
    'sn-button':Button,
};

const lineData={
    "pv_sum": 0,
    "show_sum": 0,
    "clks_sum": 0,
    "uv_sum": 0,
    "ip_sum": 0,
    "price_sum": 0,
    "fillper_sum": 0,
    "cpm_sum": 0,
    "clks_per": 0
}

let filterObj = {
    "resource":"soft",
    "search":"",
    "date%d":"20180821,20180827",
    "@order":"total.show-",
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

let area=[ '北京','天津','上海','重庆','河北','河南','云南','辽宁','黑龙江','湖南', '安徽','山东',
    '新疆','江苏','浙江','江西','湖北','广西','甘肃','山西', '内蒙古','陕西','吉林','福建','贵州',
    '广东','青海', '西藏','四川','宁夏','海南','台湾','香港','澳门','南海诸岛'];

export default {
  name:'home',
  data() {
    return {
      barData: {
        tooltip: {
          formatter: function (data) {
            return `￥ ${data[0].value}`
          },
        },
        xAxis: [{
          data: [],
        }],
        series: [{
          data: []
        }]
      },
      mapData: {
        tooltip: {
          formatter: function (data) {
            let str = ` <span style="color:#354052;font-weight: bolder;font-size: 12px;">${data.name ? data.name : ''}</span>
                        <br/>
                        <span>展现量：<span style="color: #2a9ff6;font-size: 12px;">${data.value ? data.value : 0}</span>次</span>
                        `;
            return str;
          },
        },
        series: [
          {
            data: [
              { name: '北京', value: Math.round(Math.random() * 1000) },
              { name: '天津', value: Math.round(Math.random() * 1000) },
              { name: '上海', value: Math.round(Math.random() * 1000) },
              { name: '重庆', value: Math.round(Math.random() * 1000) },
              { name: '河北', value: Math.round(Math.random() * 1000) },
              { name: '河南', value: Math.round(Math.random() * 1000) },
              { name: '云南', value: Math.round(Math.random() * 1000) },
              { name: '辽宁', value: Math.round(Math.random() * 1000) },
              { name: '黑龙江', value: Math.round(Math.random() * 1000) },
              { name: '湖南', value: Math.round(Math.random() * 1000) },
              { name: '安徽', value: Math.round(Math.random() * 1000) },
              { name: '山东', value: Math.round(Math.random() * 1000) },
              { name: '新疆', value: Math.round(Math.random() * 1000) },
              { name: '江苏', value: Math.round(Math.random() * 1000) },
              { name: '浙江', value: Math.round(Math.random() * 1000) },
              { name: '江西', value: Math.round(Math.random() * 1000) },
              { name: '湖北', value: Math.round(Math.random() * 1000) },
              { name: '广西', value: Math.round(Math.random() * 1000) },
              { name: '甘肃', value: Math.round(Math.random() * 1000) },
              { name: '山西', value: Math.round(Math.random() * 1000) },
              { name: '内蒙古', value: Math.round(Math.random() * 1000) },
              { name: '陕西', value: Math.round(Math.random() * 1000) },
              { name: '吉林', value: Math.round(Math.random() * 1000) },
              { name: '福建', value: Math.round(Math.random() * 1000) },
              { name: '贵州', value: Math.round(Math.random() * 1000) },
              { name: '广东', value: Math.round(Math.random() * 1000) },
              { name: '青海', value: Math.round(Math.random() * 1000) },
              { name: '西藏', value: Math.round(Math.random() * 1000) },
              { name: '四川', value: Math.round(Math.random() * 1000) },
              { name: '宁夏', value: Math.round(Math.random() * 1000) },
              { name: '海南', value: Math.round(Math.random() * 1000) },
              { name: '台湾', value: Math.round(Math.random() * 1000) },
              { name: '香港', value: Math.round(Math.random() * 1000) },
              { name: '澳门', value: Math.round(Math.random() * 1000) },
              { name: '南海诸岛', value: Math.round(Math.random() * 1000) },
            ]
          },
        ],
      },
      distributor:false,
      lineData,
      filterObj,
      tableReq,
      area,
      lineSeries:{},
    }
  },
  components,
  computed: {
    ...mapState('basic', [
      'isMobile','userinfo'
    ])
  },
  created() {
      this.getIncomeData();
      this.getLineData();
      this.getLineTableData();
      this.flowArea();
  },
  methods: {
    withdraw() {
      console.log('提现');
    },
    getQuery() {
        const start = moment().subtract(7, 'days').format('YYYYMMDD');
        const end = moment().format('YYYYMMDD');
        let data=`${start},${end}`;
        let order=this.filterObj["@order"];
        let search=this.filterObj.search;
        let resource=this.filterObj.resource;
        return { "date%d":data, "@order":order,search,resource}
    },
    gatherOptions() {
        let query = this.getQuery()
        this.tableReq.tableInfo = {
            ...this.tableInfoOrigin,
            ...query
        };
        return this.tableReq
    },
    async  getIncomeData(){
        let type=this.userinfo.distributor?17:16;
        let {data}=await api_home.income7days({type});
        let name=this.userinfo.distributor?'pricec_sum':'pricep_sum';
        let time=[];
        data.date.forEach(item=>{
            time.push(moment(item,'YYYYMMDD').format('MM-DD'))
        });
        if(time.length==0){
            this.$set(this.barData,'series', [{data:[0,0,0,0,0,0,0]}]);
            this.$set(this.barData,'xAxis', [{data:['-','-','-','-','-','-','-']}]);
        }else {
            this.$set(this.barData,'series', [{data:data[name]}]);
            this.$set(this.barData,'xAxis', [{data:time}]);
        }
    },
    async getLineTableData(){
          let type=this.filterObj.resource;
          const start = moment().subtract(7, 'days').format('YYYYMMDD');
          const end = moment().format('YYYYMMDD');
          let date=`${start},${end}`;
          let {data}=await api_common.getLineTableData({type,date});
          this.lineData=toString.call(data)==='[object Array]'?lineData:data;
    },
    async getLineData(){
          let options=deepCopy(this.gatherOptions());
          options.funcParams=["echarts"];
          let {data} = await api_common.getList(options);
          this.lineSeries=toString.call(data)==='[object Array]'?{}:data;
      },
    async flowArea(){
        let {index_area}=await api_home.flowArea();
        let arr=[];
        area.map(item=>{
            let json={name:item,value:0};
            index_area.forEach(val=>{
                if(+val.value>0&&val.key===item){
                    json.value=val.value;
                }
            });
            arr.push(json)
        });
        this.$set(this.mapData,'series',[{data:arr}]);
    }
  }
}
</script>

<style lang="less" scoped>
@pcOffset: 30px;
@mobileOffset: 0.2rem;
.displayflex {
  display: flex;
  display: -webkit-flex;
}
.s-home-content {
  .displayflex;
  width: 100%;
  height: 100%;
  padding: @pcOffset;
}
.s-home-xs {
  padding: @mobileOffset;
  flex-wrap: wrap;
  height: auto;
  .s-home-left {
    width: 100%;
    flex: auto;
    height: auto;
    .s-home-left-card1 {
      margin-top: @mobileOffset;
      margin-bottom: @mobileOffset;
    }
    .s-home-left-card2 {
      min-height: 5.53rem;
    }
    .s-home-left-card3 {
      margin-top: @mobileOffset;
    }
  }
  .s-home-right {
    padding: 0;
    padding-top: @mobileOffset;
    height: auto;
    width: 100%;
  }
  .s-home-left-card4 {
    margin-top: 0.2rem;
  }
}
.s-home-left {
  height: 100%;
  .displayflex;
  flex-direction: column;
}
.s-home-right {
  flex-grow: 1;
  height: 100%;
  padding-left: @pcOffset;
  .rightContent {
    height: 100%;
    .displayflex;
    flex-direction: column;
    .rightCard {
      height: 100%;
    }
  }
}
.scard-finacial .scard-main {
  padding: 0;
}
.s-home-web {
  .s-home-left {
    flex: 0 0 460px;
    .s-home-left-card1 {
      height: 230px;
      background-color: #ffffff;
      border-radius: 4px;
      border: solid 1px #dfe2e5;
      padding: 20px;
      box-sizing: border-box;
      overflow: hidden;
      .flex{
        display: flex;
        .box{
          margin-top: 30px;
          width: 200px;
          height: 100px;
          padding: 25px 20px;
          box-sizing: border-box;
          background-color: #ffffff;
          border-radius: 2px;
          border: solid 1px #f1f2f4;

          font-size: 18px;
          font-weight: bold;
          color: #2b333e;
          .sub{
            font-size: 14px;
            color: #7f8fa4;
          }
          .small{
            font-size: 12px;
            color: #2b333e;
          }
          &:last-child{
            margin-left: 10px;
          }
        }
      }
      .title{
        font-size: 16px;
        color: #354052;
        font-weight: bold;
        line-height: 1;
      }
      .money{
        margin-top: 30px;
        font-size: 16px;
        color: #354052;
        font-weight: bold;
        line-height: 1;
      }
      .max-318{
         max-width: 318px;
      }
      .flex-1{
         flex: 1;
      }
      .btn-box{
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
    }
    .h30 {
      height: 30px;
    }
    .s-home-left-card2 {
      flex: 1;
    }
    .s-home-left-card3 {
      flex: 1;
      /deep/ .scard-main {
        padding: 0;
      }
    }
  }
  /deep/ .s-report-main-legend {
    flex: 0 1 80px;
  }
}

.scard-sub-title p {
  color: #7f8fa4;
}

@v: 100vw/750;
.s-home-xs {
  .s-home-left-card1 {
    height: 236 * @v;
  }
  .s-home-left-card2 {
    height: 556 * @v;
  }
  .s-home-left-card4 {
    height: 1384 * @v;
    /deep/ .s-report-col:first-child {
      margin-bottom: 40 * @v;
    }
  }
  .s-home-left-card3 {
    height: 600 * @v;
  }
}
</style>
