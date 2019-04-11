<template>
  <div class="s-home-content"
    :class="[isMobile?'s-home-xs':'s-home-web']">
    <div class="formValidate">
      <Form ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="115"
            @submit.native.prevent
            v-show="!loading"
      >
        <FormItem label="用户名"
                  prop="username" key="username">
          <Input size="large" placeholder="用户名"></Input>
        </FormItem>
        <FormItem label="密码"
                  prop="psw" key="psw" >
          <Button  @click.native="changePsw=!changePsw">修改</Button>
        </FormItem>
        <template   v-if='changePsw'>
          <FormItem label="原始密码"
                    prop="username" key="old">
            <Input size="large" placeholder="原始密码"></Input>
          </FormItem>
          <FormItem label="新密码"
                    prop="username" key="new">
            <Input size="large" placeholder="新密码"></Input>
          </FormItem>
          <FormItem label="重复密码"
                    prop="username" key="repeat">
            <Input size="large" placeholder="重复密码"></Input>
          </FormItem>
        </template>


        <FormItem label="手机号码"
                  prop="username" key="phone">
            <Input size="large" placeholder="手机号码"></Input>
        </FormItem>
        <FormItem label="QQ"
                  prop="username" key="qq">
            <Input size="large" placeholder="QQ"></Input>
        </FormItem>



        <FormItem label="邮箱"
                  prop="username" key="e-mail">
            <Input size="large" placeholder="邮箱"></Input>
        </FormItem>



        <FormItem label="对象类别" key="mange">
          <RadioGroup v-model="mange" class="RadioGroup">
            <Radio  label="1">个人</Radio>
            <Radio  label="2" >企业</Radio>
          </RadioGroup>
        </FormItem>


        <FormItem label="企业名称"
                  prop="username" key="form1">
          <Input size="large" placeholder="企业名称"></Input>
        </FormItem>
        <FormItem key="soft3" label="企业发票类型"
                  prop="type">
          <Select v-model="type"
                  :width="360"
                  :border="true"
                  placeholder="选择企业发票类型"
          >
            <Option :value='item._id'  v-for="item in typeData" :label="item.title"></Option>
          </Select>
        </FormItem>

        <FormItem label="税号"
                  prop="username" key="form2">
          <Input size="large" placeholder="税号"></Input>
        </FormItem>

        <FormItem key="form3" label="收款银行"
                  prop="type" >
          <div class="flex">
            <Select v-model="type"
                    :width="180"
                    :border="true"
                    placeholder="收款银行"
            >
              <Option :value='item._id'  v-for="item in typeData" :label="item.title"></Option>
            </Select>
            <Input size="large" placeholder="收款银行"></Input>
          </div>
        </FormItem>

        <FormItem key="form4" label="银行卡号"
                  prop="type" >
          <Input size="large" placeholder="银行卡号"></Input>
        </FormItem>


        <FormItem key="form5" label="收款银行"
                  prop="type" >
          <div class="flex">
            <Select v-model="type"
                    :width="180"
                    :border="true"
                    placeholder="开户地"
            >
              <Option :value='item._id'  v-for="item in typeData" :label="item.title"></Option>
            </Select>
            <Select v-model="type"
                    :width="180"
                    :border="true"
                    placeholder="开户地"
            >
              <Option :value='item._id'  v-for="item in typeData" :label="item.title"></Option>
            </Select>
          </div>
        </FormItem>

        <FormItem key="form6" label="原收款信息"
                  prop="type" >
           <p> 个人需要提交身份证正反面照片，企业需要提交营业执照（副本）原件照片，如果无法提供原财务信息收款资质，需提供网站备案信息截图、主办单位资质照片、 网站负责人资质照片，照片必须是彩色原件电子版，可以是扫描件或者数码拍摄照片，仅支持jpg，jpeg，bmp的图片格式。图片大小不超过1M。</p>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
        </FormItem>

        <FormItem key="form7" label="新收款信息"
                  prop="type" >
           <p>个人需要提交身份证正反面照片，企业需要提交营业执照（副本）和税务登记证原件照片，照片必须是彩色原件电子版，可以是扫描件或者数码拍摄照片，仅支 持jpg，jpeg，bmp的图片格式。图片大小不超过1M。</p>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
        </FormItem>

        <FormItem key="form8" label="三方协议"
                  prop="type" >
           <p>请提供《三方变更协议》照片，照片必须是彩色原件电子版，可以是扫描件或者数码拍摄照片，仅支持jpg，jpeg，bmp的图片格式。图片大小不超过1M。</p>
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
        </FormItem>






        <FormItem class="submit-box">
          <Button @click.native="handleReset('formValidate')">取消</Button>
          <Button type="primary" class="primary"
                  @click.native="handleSubmit('formValidate')" :disabled="disabled">确定</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import {FormItem,Form,Radio,RadioGroup,Button,Textarea,Input,Checkbox,CheckboxGroup,Select,Option} from "_c"
import {Upload} from 'iview'
const components={
    Upload,
    Textarea,
    Form,
    FormItem,
    Input,
    Radio,
    Button,
    RadioGroup,
    Checkbox,
    CheckboxGroup,
    Select,
    Option
};
import { mapState } from 'vuex'
export default {
  name:'home',
  components,
  data() {
    return {
        formValidate: {},
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
            type:[
                {
                    required: true,
                    message: '请选择媒体商类型',
                    trigger: 'blur',
                    pattern: /^[A-Za-z0-9]+$/
                }
            ],
        },
        loading:false,
        disabled:false,
        changePsw:false,
        mange:'',
        type:'',
        typeData:[],
    }
  },
  created() {

  },
  methods: {
      handleSubmit(name) {
          this.$refs[name].validate(valid => {
              if(this.formValidateChange&&(typeof this.formValidateChange==='function')){
                  this.formValidateChange();
              }


              if (valid&&this.type=='add') {
                  this.submitData();
                  this.disabled=true;
              }
              if (valid&&this.type=='edit') {
                  this.updateData();
                  this.disabled=true;
              }
          });
      },
      handleReset(name) {
          this.$refs[name].resetFields();
          this.reset();
      },
  },
  computed: {
      ...mapState('basic', [
          'isMobile'
      ]),
  },
}
</script>
<style scoped lang="less">
.s-home-content{
  width: 100%;
  height: 100%;
  padding: 30px;
}
.formValidate{
  border: 1px solid #dfe2e5;
  border-radius: 4px;
  background: #fff;
  padding: 16px;
}
.primary{
  margin-left: 40px;
}
.RadioGroup{
  height: 32px;
}
.flex{
  display: flex;
}
/deep/ .ivu-form-item-error-tip{
  right: -20px;
  left: auto;
  transform: translate(100%,-50%);
  top: 50%;
  padding-top: 0;
}
</style>
