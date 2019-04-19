<template>

     <div
             class="el-switch"
             :class="{ 'is-disabled': switchDisabled, 'is-checked': checked }"
             role="switch"
             :aria-checked="checked"
             :aria-disabled="switchDisabled"
             @click="switchValue"
     >
          <input
                  class="el-switch__input"
                  type="checkbox"
                  @change="handleChange"
                  ref="input"
                  :id="id"
                  :name="name"
                  :true-value="activeValue"
                  :false-value="inactiveValue"
                  :disabled="switchDisabled"
                  @keydown.enter="switchValue"
          >
          <span
                  :class="['el-switch__label', 'el-switch__label--left', !checked ? 'is-active' : '']"
                  v-if="inactiveIconClass || inactiveText">
      <i :class="[inactiveIconClass]" v-if="inactiveIconClass"></i>
      <span v-if="!inactiveIconClass && inactiveText" :aria-hidden="checked">{{ inactiveText }}</span>
    </span>
          <span class="el-switch__core" ref="core" :style="{ 'width': coreWidth + 'px' }">
    </span>
          <span
                  :class="['el-switch__label', 'el-switch__label--right', checked ? 'is-active' : '']"
                  v-if="activeIconClass || activeText">
      <i :class="[activeIconClass]" v-if="activeIconClass"></i>
      <span v-if="!activeIconClass && activeText" :aria-hidden="!checked">{{ activeText }}</span>
    </span>
     </div>
</template>

<script>
    import {Checkbox,Switch} from 'element-ui'
    const components={
        'el-checkbox':Checkbox,
        'el-switch':Switch,
    };
    function WithConsole (WrappedComponent) {

        console.log(WrappedComponent.methods);
        return {
            mounted () {
                console.log('I have already mounted');
            },
            props: WrappedComponent.props,
            render (h) {
                const slots = Object.keys(this.$slots)
                    .reduce((arr, key) => arr.concat(this.$slots[key]), [])
                    .map(vnode => {
                        vnode.context = this._self
                        return vnode
                    })
                return h(WrappedComponent, {
                    on: this.$listeners,
                    props: this.$props,
                    // 透传 scopedSlots
                    scopedSlots: this.$scopedSlots,
                    attrs: this.$attrs,

                }, slots)
            },
            methods:WrappedComponent.methods,
            computed:WrappedComponent.computed,
            data(){
                let json={

                };
                return Object.assign(json,WrappedComponent.data())
            },
            mixins:WrappedComponent.mixins
        }
    }
    export default WithConsole(Switch)
</script>

<style scoped lang="less">

</style>
