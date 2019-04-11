<template>
    <div class="component-container">
        <Loading :visible="loading" class="loading"></Loading>
        <Form ref="formValidate"
              :model="formValidate"
              :rules="ruleValidate"
              :label-width="115"
              @submit.native.prevent
              v-show="!loading"
        >
            <FormItem label="媒体商名称"
                      prop="username" key="username">
                <Input size="large"
                       v-model="formValidate.username"
                       placeholder="媒体商名称"></Input>
            </FormItem>
            <FormItem label="密码" key="password" prop="password" v-if="type=='add'">
                <Input size="large"
                       type="password"
                       v-model="formValidate.password"
                       placeholder="6-12位字母或数字"></Input>
            </FormItem>
            <FormItem label="渠道分成比例"
                      prop="distributor_ratio" key="distributor_ratio">
                <Input size="large"
                       v-model="formValidate.distributor_ratio"
                       placeholder="0-99.99，最多两位小数"></Input>
            </FormItem>
            <FormItem label="媒体商类型"
                      prop="type" key="type">
                <RadioGroup v-model="formValidate.type" class="RadioGroup">
                    <Radio :label="val" v-for="(label,val) in mediaType" :keg="val">{{label}}</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="电话"
                      prop="mobile" key="mobile">
                <Input size="large"
                       v-model="formValidate.mobile"
                       placeholder="11位手机号码"></Input>
            </FormItem>
            <FormItem label="QQ"
                      prop="qq" key="qq">
                <Input size="large"
                       v-model="formValidate.qq"
                       placeholder="QQ号码"></Input>
            </FormItem>
            <FormItem label="邮箱"
                      prop="email"  key="email">
                <Input size="large"
                       v-model="formValidate.email"
                       placeholder="电子邮箱地址"></Input>
            </FormItem>
            <FormItem label="描述"  key="memo">
                <Textarea  max="100" v-model="formValidate.memo" placeholder="该描述对提高广告匹配和转化很重要请认真填写，最多填写100字"/>
            </FormItem>
            <FormItem label="管理权限" key="mange">
                <CheckboxGroup class="RadioGroup" v-model="mange">
                    <Checkbox  :value="1">管理媒体和广告位</Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="可创建的媒体" v-if="mange.length>0" key="media">
                <CheckboxGroup v-model="media" class="RadioGroup">
                    <Checkbox value="site" v-if="userinfo.access.site">网站</Checkbox>
                    <Checkbox value="app" v-if="userinfo.access.app">APP</Checkbox>
                    <Checkbox value="soft" v-if="userinfo.access.soft">软件</Checkbox>
                </CheckboxGroup>
            </FormItem>



            <FormItem class="submit-box">
                <Button @click.native="handleReset('formValidate')">取消</Button>
                <Button type="primary" class="primary"
                        @click.native="handleSubmit('formValidate')" :disabled="disabled">确定</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import {FormItem,Form,Radio,RadioGroup,Button,Textarea,Input,Checkbox,CheckboxGroup} from "_c"
import { api_common } from '@/api'
import { mapState } from 'vuex'
import { deepCopy } from '@/utils/assist'
import { editComponments } from '@/mixins'
const media=["site","app","soft"];
const components={
    Textarea,
    Form,
    FormItem,
    Input,
    Radio,
    Button,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
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
  width: 475px;
  margin: 0 auto;
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
    margin-top: 60px;
}
    .primary{
        margin-left: 40px;
    }

</style>
