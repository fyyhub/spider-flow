<template>
  <a-checkbox-group :options="options" :default-value="valueHandle()" @change="valueHandle" />
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
/**
 * options:[{
 *        label: '跟随重定向',
 *        value: 'follow-redirect',
 *        defaultVal: '1'
 * }]
 */
export default {
  name: 'tableAndModal',
  mixins: [mixins],
  props: {
    editor: Object,
    cell: Object,
    options: Array
  },
  methods: {
    // 处理请求设置选中的值和初始化值
    valueHandle(selectValues) {
      let arrs = []
      if (selectValues === undefined) {
        this.options.forEach(element => {
          if (this.getCellValue(element.value, element.defaultVal) === '1') {
            arrs.push(element.value)
            this.setCellValue(element.value, '1')
          } else {
            this.setCellValue(element.value, '0')
          }
        })
      } else {
        this.options.forEach(element => {
          if (selectValues.indexOf(element.value) === -1) {
            this.setCellValue(element.value, '0')
          } else {
            this.setCellValue(element.value, '1')
          }
        })
        this.$emit('change', selectValues)
        this.$emit('input', selectValues)
      }
      return arrs
    }
  },
  mounted() {
    this.bodyTypeValue = this.getCellValue('body-type', 'none')
  }
}
</script>
