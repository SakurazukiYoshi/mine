<template>
  <sn-layout :class="[isMobile?'s-home-xs':'s-home-web']">
    <div class="top-box">
        <div class="user">
          <div class="avatar">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="">
          </div>
          <div class="name">
            <p>子夕听雨</p>
            <p>广告商</p>
          </div>
        </div>
        <div class="t-btn-box">
          <sn-button
                  size="small"
                  shape="circle"
                  class="card-btn"
                  type="primary"
                  @click.native="passwordDialog=true"
          >修改密码</sn-button>
        </div>

    </div>
    <sn-header class="s-content-header">
      <div class="header-left"
        v-if="!isMobile">
        <sn-button @click.native="isShow=true"
          type="primary"
          class="open-btn"
          size="stretch-h36"
          v-if="!isMobile">
          <sn-icon type="open"
            color="#fff"
            size="12"
            class="open-icon"/>
          添加资质</sn-button>
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
              @click.native="update(row)">删除</sn-button>
            <sn-button type="default"
              size="stretch"
              ghost
              @click.native="del(row)">查看</sn-button>
          </div>
        </template>

        <template slot-scope="{row}"
          slot="type">
          <sn-poptip placement="bottom-start" trigger="hover">
            资质类型
            <sn-icon type="explain" color="rgba(197,204,212,1)" :size="16" class="icon"/>
            <div slot="content" class="tips-table">
              <p class="main">行业资质</p>
              <p class="sub">补充资质证明或者新增其他行业的资质证明，具体请查看《广告主准入行业及资质表》</p>
              <p class="main mt30">投放资质</p>
              <p class="sub">投放资质指在所投放广告中使用涉及人物、明星肖像、第三方品牌等内容素材的相关授权或合作证明</p>
            </div>

          </sn-poptip>
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
      :title="id?'修改代理商':'新增代理商'">
      <div>
        <edit-agent @submitSuccess="submitSuccess" :id="id" :editReq="editReq"></edit-agent>
      </div>
    </sn-modal>


    <sn-modal
            :footer-hide="true"
            v-model="isShow"
            class-name="vertical-center-modal"
            width="750"
    >
      <div class="dialog-box">
        <div class="dialog-title">添加资质</div>
        <div class="mt44">
          <sn-form ref="formValidate"
                   :model="formValidate"
                   :rules="ruleValidate"
                   :label-width="140"
                   @submit.native.prevent
                   v-show="!loading"
                   class="w540"
          >
                  <template v-if="false">
                    <sn-form-item label="资质名称"
                                  prop="username" key="username">
                      <sn-input size="large"
                                v-model="formValidate.username"
                                placeholder="请输入资质名称"
                                class="w400"
                      />
                    </sn-form-item>
                    <sn-form-item label="广告平台"
                                  prop="username" key="formValidate.username">
                      <sn-select
                              :width="400"
                              placeholder="代理商筛选"
                      >
                        <sn-option :value="1"  >微信</sn-option>
                        <sn-option :value="2"  >广点通</sn-option>
                        <sn-option :value="3"  >其他</sn-option>
                      </sn-select>
                    </sn-form-item>
                    <sn-form-item label="资质类型"
                                  prop="username" key="formValidate.password">
                      <sn-radio-group :vertical="true" class="radio-box">
                        <div>
                          <sn-radio label="one">行业资质</sn-radio>
                          <p class="radio-tip">用于补充资质证明或者新增其他行业的资质证明，资质提交后将在48小时内审核完毕</p>
                        </div>
                        <div class="mt35">
                          <sn-radio label="two">投放资质</sn-radio>
                          <p class="radio-tip">用于补充所投放广告中使用涉及人物、明星肖像、第三方品牌等内容素材的相关授权或合作证明;资质提交后即可生效</p>
                        </div>
                      </sn-radio-group>
                    </sn-form-item>
                    <sn-form-item label="证件扫描"
                                  prop="username" key="formValidate.password1">

                      <!--              <div class="upload-img"><img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt=""></div>-->
                      <sn-upload action="https://jsonplaceholder.typicode.com/posts/" :show-upload-list="false">
                        <sn-button type="primary" size="stretch-h36" ghost class="w100">上传</sn-button>
                      </sn-upload>
                      <p>支持bmp, png, jpeg, jpg, gif格式，文件大小不超过5M</p>
                      <sn-upload-bar :class="false?'visible':''"></sn-upload-bar>
                    </sn-form-item>
                    <sn-form-item class="submit-box mt40">
                      <sn-button @click.native="handleReset('formValidate')">取消</sn-button>
                      <sn-button type="primary" class="primary ml40"
                                 @click.native="handleSubmit('formValidate')" :disabled="disabled">确定</sn-button>
                    </sn-form-item>
                  </template>
               <template v-else>
                 <sn-form-item label="资质名称">
                   V6电竞品牌形象授权1
                 </sn-form-item>
                 <sn-form-item label="广告平台">
                   微信
                 </sn-form-item>
                 <sn-form-item label="资质类型">
                   行业资质
                 </sn-form-item>
                 <sn-form-item label="证件扫描">

                   <div class="upload-img"><img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt=""></div>
                   <sn-upload action="https://jsonplaceholder.typicode.com/posts/" :show-upload-list="false">
                     <sn-button type="primary" size="stretch-h36" ghost class="w100">更换</sn-button>
                   </sn-upload>
                   <p>支持bmp, png, jpeg, jpg, gif格式，文件大小不超过5M</p>
                   <sn-upload-bar :class="false?'visible':''"></sn-upload-bar>
                 </sn-form-item>
                 <sn-form-item class="submit-box mt40">
                   <sn-button @click.native="handleReset('formValidate')">取消</sn-button>
                   <sn-button type="primary" class="primary ml40"
                              @click.native="handleSubmit('formValidate')" :disabled="disabled">确定</sn-button>
                 </sn-form-item>
               </template>
          </sn-form>
        </div>
      </div>
    </sn-modal>

    <sn-modal
            :footer-hide="true"
            v-model="passwordDialog"
            class-name="vertical-center-modal"
            width="650"
    >
      <div class="dialog-box">
        <div class="dialog-title">修改密码</div>
        <div class="mt44">
          <sn-form ref="formValidate"
                   :model="formValidate"
                   :rules="ruleValidate"
                   :label-width="140"
                   @submit.native.prevent
                   v-show="!loading"
                   class="w440"
          >
            <sn-form-item label="原密码"
                          prop="username" key="a">
              <sn-input size="large"
                        v-model="formValidate.username"
                        placeholder="请输入资质名称"
                        class="w300"
                        type="password"
              />
            </sn-form-item>
            <sn-form-item label="新密码"
                          prop="username" key="b">
              <sn-input size="large"
                        v-model="formValidate.username"
                        placeholder="请输入资质名称"
                        class="w300"
                        type="password"
              />
            </sn-form-item>
            <sn-form-item label="确认新密码"
                          prop="username" key="c">
              <sn-input size="large"
                        v-model="formValidate.username"
                        placeholder="请输入资质名称"
                        class="w300"
                        type="password"
              />
            </sn-form-item>
            <sn-form-item class="submit-box mt40">
              <sn-button @click.native="handleReset('formValidate')">取消</sn-button>
              <sn-button type="primary" class="primary ml40"
                         @click.native="handleSubmit('formValidate')" :disabled="disabled">确定</sn-button>
            </sn-form-item>
          </sn-form>
        </div>
      </div>
    </sn-modal>
  </sn-layout>
</template>
<script>
import { Button, Icon, Switch, Select, Option, SnPage, TableExpand,Poptip, FormItem,Form,Input,Radio,RadioGroup,uploadBar} from "_c"
import EditAgent from "./edit"
import { mapState } from 'vuex'
import { Layout, Content, Header, Modal, Table,Upload } from 'iview'
import { tableMixin,selectMixin } from '@/mixins'
import mock from '../api'

const  components={
    'sn-table':Table,
    'edit-agent':EditAgent,
    'sn-icon':Icon,
    'sn-button':Button,
    'sn-layout':Layout,
    'sn-poptip':Poptip,
    'sn-content':Content,
    'sn-header':Header,
    'sn-select':Select,
    'sn-option':Option,
    'sn-modal':Modal,
    'i-switch': Switch,
    'sn-page':SnPage,
    'sn-form':Form,
    'sn-form-item':FormItem,
    'sn-input':Input,
    'sn-radio':Radio,
    'sn-upload':Upload,
    'sn-radio-group':RadioGroup,
    'sn-upload-bar':uploadBar,
    TableExpand
}


const columns = [
    {
  title: '资质名称',
  key: 'username',
}, {
  title: '广告平台',
   key: 'type',
}, {
  title: '资质类型',
   key : 'distributor_ratio',
   slot: 'type'
}, {
  title: '有效期限',
  key: 'distributor_id'
}, {
  title: '状态',
    key: 'access',
    slot: 'enable'
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
      tableHeight:300,
      isShow:false,
      passwordDialog:false,
      disabled:false,

      formValidate: {
            username:'',
            password:'',
            distributor_ratio:'',
            type:'',
            mobile:'',
            qq:'',
            email:'',
            memo: "",
            access:{

            }
        },
      ruleValidate: {
          username: [
              {
                  required: true,
                  message: "请填写信息！",
                  trigger: "blur"
              }
          ],
          password:[
              {
                  required: true,
                  pattern: /^[0-9A-Za-z]{6,12}$/,
                  min: 6,
                  max: 12,
                  message: '请填写6-12位字母或数字',
                  trigger: 'blur'
              }
          ],
          distributor_ratio:[
              {
                  pattern: /^\d{1,2}(\.\d{1,2})?$/,
                  required: true,
                  message: '0-99.99，最多两位小数！',
                  trigger: 'blur'
              }
          ],
          type:[
              {
                  required: true,
                  message: '请选择媒体商类型',
                  trigger: 'blur',
                  pattern: /^[A-Za-z0-9]+$/
              }
          ],
          mobile:[
              {
                  pattern: /^1(3|4|5|7|8)\d{9}$/,
                  required: true,
                  message: '输入位数不正确！',
                  trigger: 'blur'
              }
          ],
          qq:[
              {
                  pattern: /[1-9][0-9]{4,}/,
                  required: true,
                  message: '请填写正确信息！',
                  trigger: 'blur'
              }
          ],
          email:[
              {
                  pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                  required: true,
                  message: '邮箱格式不正确！',
                  trigger: 'blur'
              }
          ],
          memo: [
              {
                  required: true,
                  message: "请写描述",
                  trigger: "blur"
              },
              {
                  type: "string",
                  max: 300,
                  message: "描述最多300字",
                  trigger: "blur"
              }
          ],
      },
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
  padding-bottom: 90px;
  box-sizing: border-box;
  margin: 0 30px;
  margin-bottom: 30px;
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
  .top-box{
    height:150px;
    margin: 30px 30px 0 30px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(223, 226, 230, 1);
    border-radius:4px;
    display: flex;
    box-sizing: border-box;

    .t-btn-box{
      width: 150px;
      height:150px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .user{
      flex: 1;
      display: flex;
      align-items: center;
      padding-left: 40px;
      .avatar{

        width:90px;
        height:90px;
        background:rgba(232,232,232,1);
        border:1px solid rgba(223, 226, 230, 1);
        border-radius:50%;
        overflow: hidden;
        img{
          width:90px;
          height:90px;
        }
      }
      .name{
        padding-left: 30px;
        p:first-child{
          font-size:18px;
          font-weight:bold;
          color:rgba(53,64,82,1);
          line-height: 1;
        }
        p:last-child{
          font-size:14px;
          font-weight:400;
          color:rgba(127,143,164,1);
          line-height: 1;
          margin-top: 10px;
        }
      }
    }
  }
  .tips-table{
      padding: 20px 24px;
    .main{
      font-size:14px;
      font-weight:400;
      color:rgba(53,64,82,1);
      line-height: 1;
    }
    .sub{
      font-size:14px;
      font-weight:400;
      color:rgba(127,143,164,1);
      line-height:1;
      margin-top: 10px;
    }
    .mt30{
      margin-top: 30px;
    }
  }


.dialog-box{
  .dialog-title{
    height:16px;
    font-size:16px;
    font-weight:bold;
    color:rgba(53,64,82,1);
    line-height: 1;
    box-sizing: content-box;
  }
  .mt44{
    margin-top: 44px;
  }
  .w400{
    width: 400px;
  }
}

/*弹窗部分*/
.radio-box{
  padding-top: 5px;
}
.radio-tip{
  font-size:14px;
  font-weight:400;
  color:rgba(127,143,164,1);
  line-height:22px;
}
.mt35{
  margin-top: 35px;
}
.w540{
  width: 540px;
}

/deep/ .vertical-center-modal{
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
   .ivu-modal{
    top: 0;
  }
}
.upload-img{
  width:196px;
  height:130px;
  border-radius:2px;
  img{
    width:196px;
    height:130px;
  }
}
.ml40{
  margin-left: 40px;
}
.mt40{
  margin-top: 74px;
}
.visible{
  visibility: hidden;
}
.w100{
  width: 100px!important;
}
.w300{
  width: 300px;
}
.w440{
  width: 440px;
}
/*弹窗部分*/

</style>
