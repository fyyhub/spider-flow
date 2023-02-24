let mixins = {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 16
        },
        colSpan: 8
      },
      size: 'small'
    }
  },
  methods: {
    // 获取cell中的值
    getCellValue(key, defaultVal) {
      let value = this.cell.data.get(key)
      if (value || !defaultVal) {
        return value
      } else {
        this.cell.data.set(key, defaultVal)
        return defaultVal
      }
    },
    // 设置cell中的值
    setCellValue(key, val) {
      if (val) {
        val = val.target ? val.target.value : val
        this.cell.data.set(key, val)
      }
      return this.cell.data.get(key)
    }
  }
}
export default mixins
