<template>
    <div class="component-container">
        <Loading :visible="loading" class="loading"></Loading>
        <div class="top-box">
            <p><sn-icon type="ad-plan" color="#2198F0" size="24" class="open-icon"/></p>
            <p class="t-box-title">创建DSP平台信息</p>
            <p class="t-box-sub">创建DSP平台账号、基本信息</p>
        </div>
        <sn-form ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="140"
              @submit.native.prevent
              v-show="!loading"
        >
            <sn-form-item label="dsp平台用户名"
                      prop="username" key="username">
                <sn-input size="large"
                       v-model="formValidate.username"
                       placeholder="请输入平台用户名"
                       class="w360"
                 />
            </sn-form-item>
            <sn-form-item label="dsp平台用户密码" key="password" prop="password" v-if="type=='add'">
                <sn-input size="large"
                       type="password"
                       v-model="formValidate.password"
                       class="w360"
                       placeholder="请输入密码" />
            </sn-form-item>
            <sn-form-item label="佣金比例(备注)"
                      prop="distributor_ratio" key="distributor_ratio">
                <sn-input size="large"
                       v-model="formValidate.distributor_ratio"
                       class="w360"
                       placeholder="请输入1-100的数字" />
            </sn-form-item>
            <sn-form-item label="手机号"
                      prop="mobile" key="mobile">
                <sn-input size="large"
                       v-model="formValidate.mobile"
                       class="w360"
                       placeholder="11位手机号码" />
            </sn-form-item>
            <sn-form-item label="QQ号"
                     key="qq">
                <sn-input size="large"
                       v-model="formValidate.qq"
                       class="w360"
                       placeholder="QQ号码" />
            </sn-form-item>
            <sn-form-item label="邮箱" key="email">
                <sn-input size="large"
                       v-model="formValidate.email"
                       class="w360"
                       placeholder="电子邮箱地址" />
            </sn-form-item>
            <sn-form-item label="描述"  key="memo">
                <sn-textarea  max="100" v-model="formValidate.memo" placeholder="最多填写100字" class="w360"/>
            </sn-form-item>
            <sn-form-item class="submit-box mb0">
                <sn-button @click.native="handleReset('formValidate')">取消</sn-button>
                <sn-button type="primary" class="primary"
                        @click.native="handleSubmit('formValidate')" :disabled="disabled">确定</sn-button>
            </sn-form-item>
        </sn-form>
    </div>
</template>
<script>
import {FormItem,Form,Button,Textarea,Input,Checkbox,CheckboxGroup,Icon} from "_c"
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
    width: 100%;
    box-sizing: border-box;
}
/deep/ .ivu-form-item-error-tip{
    right: -20px;
    left: auto;
    transform: translate(100%,-50%);
    top: 50%;
    padding-top: 0;
}
.RadioGroup{
    height: 32px;
}
.submit-box{
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
    padding-top: 30px;
    box-sizing: border-box;
    p{
        width: 100%;
        text-align: center;
        line-height: 1;
    }
    .t-box-title{
        font-size:14px;
        font-weight:400;
        color:rgba(33,152,240,1);
        margin-top: 17px;
    }
    .t-box-sub{
        font-size:14px;
        font-weight:400;
        color:rgba(197,204,212,1);
        margin-top: 10px;
    }
}
/*头部部分*/

.w360{
    width: 360px;
}

</style>
