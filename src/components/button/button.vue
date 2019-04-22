<template>
    <component :is="tagName" :class="classes" :disabled="disabled" @click="handleClickLink" v-bind="tagProps">
        <Icon class="ivu-load-loop" type="ios-loading" v-if="loading"></Icon>
        <Icon :type="icon" :custom="customIcon" v-if="(icon || customIcon) && !loading"></Icon>
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </component>
</template>
<script>
    import Icon from '../icon';
    import { oneOf } from '../../utils/assist';
    import mixinsLink from '../../mixins/link';

    const prefixCls = 'ivu-btn';

    export default {
        name: 'Button',
        mixins: [ mixinsLink ],
        components: { Icon },
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error']);
                },
                default: 'default'
            },
            shape: {
                validator (value) {
                    return oneOf(value, ['circle', 'circle-outline']);
                }
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small', 'large', 'default']);
                },
                default () {
                    return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
                }
            },
            loading: Boolean,
            disabled: Boolean,
            htmlType: {
                default: 'button',
                validator (value) {
                    return oneOf(value, ['button', 'submit', 'reset']);
                }
            },
            icon: {
                type: String,
                default: ''
            },
            customIcon: {
                type: String,
                default: ''
            },
            long: {
                type: Boolean,
                default: false
            },
            ghost: {
                type: Boolean,
                default: false
            },
            fixed: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                showSlot: true
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    `${prefixCls}-${this.type}`,
                    {
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: this.size !== 'default',
                        [`${prefixCls}-loading`]: this.loading != null && this.loading,
                        [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || !!this.customIcon || this.loading),
                        [`${prefixCls}-ghost`]: this.ghost,
                        [`${prefixCls}-fixed`]: this.fixed,
                    }
                ];
            },
            // Point out if it should render as <a> tag
            isHrefPattern() {
                const {to} = this;
                return !!to;
            },
            tagName() {
                const {isHrefPattern} = this;
                return isHrefPattern ? 'a' : 'button';
            },
            tagProps() {
                const {isHrefPattern} = this;
                if(isHrefPattern) {
                    const {linkUrl,target}=this;
                    return {href: linkUrl, target};
                } else {
                    const {htmlType} = this;
                    return {type: htmlType};
                }
            }
        },
        methods: {
            // Ctrl or CMD and click, open in new window when use `to`
            handleClickLink (event) {
                this.$emit('click', event);
                const openInNewWindow = event.ctrlKey || event.metaKey;

                this.handleCheckClick(event, openInNewWindow);
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined;
        }
    };
</script>
<style lang="scss" scoped>
    .ivu-btn{
        background:rgba(255,255,255,1);
        border:1px solid rgba(223, 226, 230, 1);
        border-radius:2px;
        font-size:14px;
        font-weight:400;
        color:rgba(40,40,41,1);
        line-height: 1;
        &:focus{
            box-shadow:none;
        }
        &:hover{
            background:#F5F6F7;
            border:1px solid rgba(223, 226, 230, 1);
            color:rgba(40,40,41,1);
        }
    }
    html{
        .ivu-btn-primary{
            background-color: #2A9FF6;
            color:rgba(255,255,255,1);
            border-color:#2A9FF6;
            &:hover{
                background-color: #2793E6;
                color:rgba(255,255,255,1);
                border-color: #2793E6;
            }
        }
        .ivu-btn-success{
            background-color: #44c14a;
            color:rgba(255,255,255,1);
            border-color:#44c14a;
            &:hover{
                background-color: #47cb89;
                color:rgba(255,255,255,1);
                border-color: #47cb89;
            }
        }
        .ivu-btn-error{
            background-color: #EB4D44;
            color:rgba(255,255,255,1);
            border-color:#EB4D44;
            &:hover{
                background-color: #f16643;
                color:rgba(255,255,255,1);
                border-color: #f16643;
            }
        }
        .ivu-btn-fixed{
            display: inline-block;
            width: 100px;
            height: 36px;
            padding: 0;
            white-space:nowrap;   //不换行     都支持
            text-overflow:ellipsis;
            -o-text-overflow:ellipsis;   //省略号显示   都支持
            overflow: hidden;
        }
        .ivu-btn-ghost{
            display: inline-block;
            padding: 0 16px;
            height: 36px;
            background-color: #fff;
        }
        .ivu-btn-ghost.ivu-btn-primary{
            color:#2A9FF6;
            &:hover{
                background:#E9F5FE;
                border-color:#2A9FF6;
            }
        }
        .ivu-btn-ghost.ivu-btn-success{
            color:#44C14A;
            border-color: #44C14A;
            &:hover{
                background:#ECF9ED;
                border-color:#44C14A;
            }
        }
        .ivu-btn-ghost.ivu-btn-error{
            color:#EB4D44;
            border-color: #EB4D44;
            &:hover{
                background:#FDEDEC;
                border-color:#EB4D44;
            }
        }


        .ivu-btn-circle{
            border-radius:15px;
            height: 30px;
        }
        .ivu-btn-fixed.ivu-btn-circle{
            width: 80px;
        }
    }
</style>
