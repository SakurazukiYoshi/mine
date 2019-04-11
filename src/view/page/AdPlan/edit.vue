<template>
    <div class="component-container">
        <Loading :visible="loading" class="loading"></Loading>
        <div class="top-box">
            <div class="active">
                <p><sn-icon type="ad-plan" color="#2198F0" size="24" class="open-icon"/></p>
                <p class="t-box-title">广告计划</p>
                <p class="t-box-sub">预算设置、广告排期</p>
            </div>
            <div class="loading-spot">
                <span class="spot"></span>
                <span class="spot"></span>
                <span class="spot"></span>
            </div>
            <div>
                <p><sn-icon type="ad-group" color="#C5CCD4" size="24" class="open-icon"/></p>
                <p class="t-box-title">广告组</p>
                <p class="t-box-sub">广告出价、定向设置</p>
            </div>
            <div class="loading-spot">
                <span class="spot"></span>
                <span class="spot"></span>
                <span class="spot"></span>
            </div>
            <div>
                <p><sn-icon type="ad-creativity" color="#C5CCD4" size="24" class="open-icon"/></p>
                <p class="t-box-title">广告创意</p>
                <p class="t-box-sub">样式设置、尺寸设置</p>
            </div>

        </div>
        <sn-form ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="140"
              @submit.native.prevent
              v-show="!loading"
        >
            <sn-form-item label="操作类型"
                      prop="username" key="a">
                <sn-radio-group v-model="formValidate.type" class="RadioGroup">
                    <sn-radio label="1">新建广告计划</sn-radio>
                    <sn-radio label="2">选择已有的广告计划</sn-radio>
                </sn-radio-group>
            </sn-form-item>
            <template v-if="false">
                <sn-form-item label="广告计划名称"
                              prop="distributor_ratio" key="distributor_ratio">
                    <sn-input size="large"
                              v-model="formValidate.distributor_ratio"
                              class="w360"
                              placeholder="请输入广告计划名称" />
                </sn-form-item>
                <sn-form-item label="手机号"
                              prop="mobile" key="mobile">
                    <sn-input size="large"
                           v-model="formValidate.distributor_ratio"
                          class="w360"
                           placeholder="每日预算1,000~10,000,000元/天">
                        <span slot="prepend" class="rmb">￥</span>
                    </sn-input>
                </sn-form-item>
                <sn-form-item label="投放日期"
                              prop="mobile" key="aaa">
                    <date-picker type="date" placeholder="请选择投放日期" class="w360"></date-picker>
                </sn-form-item>
                <sn-form-item label="结束日期"
                              prop="mobile" key="aab">
                    <sn-radio-group v-model="formValidate.type" class="RadioGroup">
                        <sn-radio label="1">指定日期</sn-radio>
                        <sn-radio label="2">不限</sn-radio>
                    </sn-radio-group>
                    <div v-if="false">
                        <date-picker type="date" placeholder="请选择结束日期" class="w360"></date-picker>
                    </div>
                </sn-form-item>
                <sn-form-item label="匀速投放"
                              prop="username" key="b">
                    <sn-radio-group v-model="formValidate.type" class="RadioGroup">
                        <sn-radio label="1">是</sn-radio>
                        <sn-radio label="2">否</sn-radio>
                        <sn-poptip placement="bottom-start" trigger="hover" class="poptip">
                            <sn-icon type="explain"
                                     color="#2298F0"
                                     :size="16"
                                     class="icon"
                            />
                            <div slot="content" class="tips-table">
                                匀速投放：是指会对广告曝光速度进行实时控制，进而使得广告当天的消耗曲线趋于匀速。
                            </div>
                        </sn-poptip>
                    </sn-radio-group>
                </sn-form-item>
            </template>
            <template v-else>
                <sn-form-item label="广告计划名称"
                              prop="distributor_ratio" key="distributor_ratio">
                    <sn-select :width="360" placeholder="请选择广告计划名称" class="mr10">
                        <sn-option :value="''"  :key="''">全部</sn-option>
                        <sn-option :value="1">投放中</sn-option>
                        <sn-option :value="2">待投放</sn-option>
                        <sn-option :value="3">审核中</sn-option>
                        <sn-option :value="4">未通过审核</sn-option>
                    </sn-select>
                </sn-form-item>
                <sn-form-item label="手机号"
                              prop="mobile" key="mobile">
                    <sn-input size="large"
                              v-model="formValidate.distributor_ratio"
                              class="w360"
                              placeholder="每日预算1,000~10,000,000元/天"
                              :disabled="true"
                    >
                        <span slot="prepend" class="rmb">￥</span>
                    </sn-input>
                </sn-form-item>
                <sn-form-item label="投放日期"
                              prop="mobile" key="aaa">
                    <date-picker type="date" placeholder="请选择投放日期" class="w360" disabled></date-picker>
                </sn-form-item>
                <sn-form-item label="结束日期"
                              prop="mobile" key="aab">
                    <date-picker type="date" placeholder="请选择结束日期" class="w360" disabled></date-picker>
                </sn-form-item>
                <sn-form-item label="匀速投放"
                              prop="username" key="b">
                    <sn-radio-group v-model="formValidate.type" class="RadioGroup">
                        <sn-radio label="1" :disabled="true">是</sn-radio>
                        <sn-radio label="2" :disabled="true">否</sn-radio>
                        <sn-poptip placement="bottom-start" trigger="hover" class="poptip" width="320">
                            <sn-icon type="explain"
                                     color="#2298F0"
                                     :size="16"
                                     class="icon"
                            />
                            <div slot="content" class="tips-table">匀速投放：是指会对广告曝光速度进行实时控制， 进而使得广告当天的消耗曲线趋于匀速。</div>
                        </sn-poptip>
                    </sn-radio-group>
                </sn-form-item>

            </template>
            <sn-form-item class="submit-box mb0">
                <sn-button type="primary" class="primary"
                        @click.native="handleSubmit('formValidate')" :disabled="disabled">保存并下一步</sn-button>
            </sn-form-item>
        </sn-form>
    </div>
</template>
<script>
import {FormItem,Form,Button,Textarea,Input,Checkbox,CheckboxGroup,Icon,Radio,RadioGroup,Poptip,Select,Option} from "_c"
import {DatePicker} from 'iview'
import { api_common } from '@/api'
import { mapState } from 'vuex'
import { deepCopy } from '@/utils/assist'
import { editComponments } from '@/mixins'
const media=["site","app","soft"];
const components={
    'sn-textarea':Textarea,
    'sn-form':Form,
    'sn-form-item':FormItem,
    'sn-input':Input,
    'sn-button':Button,
    'sn-checkbox':Checkbox,
    'sn-checkbox-group':CheckboxGroup,
    'sn-icon':Icon,
    'sn-radio':Radio,
    'sn-radio-group':RadioGroup,
    'sn-poptip':Poptip,
    'sn-select':Select,
    'sn-option':Option,
    'date-picker':DatePicker,
};
export default {
    name:'EditAgent',
    mixins: [editComponments],
    components,
    data() {
        return {
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
            mange:[],
            media: [],
            access:{},
            disabled:false,
            submitType:1
        };
    },
    computed: {
        ...mapState('basic', [
            'userinfo',
        ]),
        ...mapState('app/agent', [
            'mediaType',
        ]),
    },
    watch:{
        mange(val){
            let value=val.length>0?1:0;
            this.$set(this.formValidate.access,'mange',value);
        },
        media(val){
            media.forEach(item=>{
                if(val.includes(item)){
                    this.$set(this.formValidate.access,item,1);
                }else {
                    this.$set(this.formValidate.access,item,0);
                }
            });
        },
    },
    mounted(){
        let access={};
        if(this.userinfo){
            access=deepCopy(this.userinfo.access);
        }
        let json={};
        media.forEach(item=>{
            if(access[item]==1){
                json[item]=0;
            }
        });
        this.$set(this.formValidate,'access',json);
        this.access=json;
    },
    methods:{
        handleData(res){
            delete res.code;
            this.formValidate=res;
            res.access.mange&&(this.mange=[res.access.mange]);
            let arr=[];
            Object.keys(this.access).forEach(item=>{
                  if(res.access[item]==1){
                      arr.push(item);
                      this.$set(this.access,item,1);
                  }
            });
            this.media=arr;
            setTimeout(()=>{
                this.loading=false;
            },500);
        },
        reset(){
            this.$set(this.formValidate,'memo','');
            this.mange=[];
            this.media=[];
        }
    },
};
</script>
<style lang="less" scoped>
.component-container{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
}
.loading{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.ivu-form {
    padding-top: 20px;
    padding-left: 30px;
    width: 578px;
    box-sizing: border-box;
    margin: 0;
}
/deep/ .ivu-form-item-error-tip{
    right: -20px;
    left: auto;
    transform: translate(100%,-50%);
    top: 50%;
    padding-top: 0;
}
.RadioGroup{
    height: 34px;
}
.submit-box{
    width: 100vw;
    position: relative;
    margin-top: 260px;
    height: 80px;
    border-top: 1px solid #dfe2e6;
    display: flex;
    align-items: center;
    margin-left: -30px;
    box-sizing: border-box;
    padding-left: 30px;
}
.mb0{
    margin-bottom: 0;
}
.primary{
    margin-left: 40px;
}




/*头部部分*/
.top-box{
    height: 140px;
    background-color: #F9FAFB;
    border-bottom: 1px solid #dfe2e6;
    box-sizing: border-box;
    display: flex;
    padding: 0 300px;
    color: #354052;
    justify-content: center;
    .active{
        color:rgba(33,152,240,1);
    }
    p{
        width: 100%;
        text-align: center;
        line-height: 1;
    }
    p:first-child{
        padding-top: 30px;
    }
    .t-box-title{
        font-size:14px;
        font-weight:400;
        margin-top: 17px;
    }
    .t-box-sub{
        font-size:14px;
        font-weight:400;
        color:rgba(197,204,212,1);
        margin-top: 10px;
    }
    .loading-spot{
        width: 26px;
        padding: 60px;
        box-sizing: content-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .spot{
            width:5px;
            height:5px;
            background:#C5CCD4;
            border-radius:50%;
        }
    }
    .spot-active{
        .spot{
            &:nth-child(1){
                background:#3BACFF;
            }
            &:nth-child(2){
                background:rgba(59,172,255,.5);
            }
            &:nth-child(3){
                background:rgba(59,172,255,.2);
            }
        }

    }
}
/*头部部分*/

.w360{
    width: 360px;
}
/deep/ .ivu-input-group-prepend{
    width:40px;
    height:36px;
    background:rgba(235,77,68,1);
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
}
/deep/ .tips-table{
    padding: 20px;
    background-color: #fff;
    color: #354052;
    white-space:pre-wrap;
    word-break:break-all;

}
.poptip{
    transform: translate(-244px, -2px);
}

</style>
