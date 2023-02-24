<template>
  <div>
    <a-button type="link" :size="size" @click="moveData()">添加一个{{ config.title }}</a-button>
    <a-button v-if="batchAddBtn" type="link" :size="size" @click="hideModal(true)">批量设置{{ config.title }}</a-button>
    <a-table :columns="config.columns" :data-source="dataSource" bordered :size="size" :pagination="false">
      <template v-for="col in config.columns" :slot="col.dataIndex" slot-scope="text, record">
        <a-select v-if="col.inputType === 'select'" :key="col.dataIndex" :size="size" :defaultValue="getCellValue(col.dataIndex, col.selectDefault)" @change="val => setCellValue(col.dataIndex, val)">
          <template v-for="(key, value) in col.selectMap">
            <a-select-option :key="key" :value="key">{{ value }}</a-select-option>
          </template>
        </a-select>
        <a-input v-else :key="col.dataIndex" style="margin: -5px 0" :value="text" @change="e => handleChange(e.target.value, record, col.dataIndex)" :size="size" />
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">
          <span>
            <a @click="moveData(index, -1)">上移</a>
            <a-divider type="vertical" />
            <a @click="moveData(index, 1)">下移</a>
            <a-divider type="vertical" />
            <a-popconfirm title="您确定要删除吗？" ok-text="确定" cancel-text="取消" @confirm="moveData(index, 0)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>
    <a-modal v-model="visibleModel" :title="'请输入' + config.title" ok-text="设置" cancel-text="关闭" @ok="hideModal(false)">
      <a-textarea v-model="modelValue" placeholder="一行一个，冒号(:)、等号（=）、空格或tab分割name和value" :auto-size="{ minRows: 8, maxRows: 20 }" />
    </a-modal>
  </div>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
export default {
  name: 'tableAndModal',
  mixins: [mixins],
  props: {
    editor: Object,
    cell: Object,
    config: Object,
    batchAddBtn: {
      type: Boolean,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function() {
        return true
      }
    }
  },
  data() {
    return {
      visibleModel: false,
      modelValue: '',
      dataSource: [],
      keyId: Math.random()
    }
  },
  methods: {
    // 列修改框修改值
    handleChange(value, record, col) {
      record[col] = value
      this.setAllDataToCell()
    },
    // 设置所有的参数
    setAllDataToCell() {
      const keys = this.config.keys
      // 初始化数组值
      let params = {}
      keys.forEach(element => {
        params[element] = []
      })
      // 放入值
      this.dataSource.forEach(element => {
        for (let key in element) {
          if (key !== 'key') {
            params[key].push(element[key])
          }
        }
      })
      // 写入值到cell
      for (let key2 in params) {
        if (params[key2].length > 0) {
          this.setCellValue(key2, params[key2])
        }
      }
    },
    // 全局参数修改值
    moveData(index, oper) {
      switch (oper) {
        case -1: // 上移
          if (index > 0) {
            let temp = this.dataSource.splice(index, 1)
            this.dataSource.splice(index - 1, 0, temp[0])
          }
          break
        case 1: // 下移
          if (index < this.dataSource.length) {
            let temp = this.dataSource.splice(index, 1)
            this.dataSource.splice(index + 1, 0, temp[0])
          }
          break
        case 0: // 删除
          this.dataSource.splice(index, 1)
          break
        default:
          // 添加
          const keys = this.config.keys
          let paramsData = {
            key: this.keyId + this.dataSource.length
          }
          keys.forEach(element => {
            paramsData[element] = ''
          })
          this.dataSource.push(paramsData)
          break
      }
    },
    // 弹窗确认按钮
    hideModal(show) {
      this.visibleModel = show
      if (show === false) {
        let inputDatas = this.modelValue.split('\n')
        inputDatas.forEach(element => {
          const splitChar = [':', '=', ' ', '\t']
          for (const index in splitChar) {
            let inputIndex = element.indexOf(splitChar[index])
            if (inputIndex !== -1) {
              let temp = {
                key: this.keyId + this.dataSource.length
              }
              temp[this.config.keyPrefix + '-name'] = element.substring(0, inputIndex)
              temp[this.config.keyPrefix + '-value'] = element.substring(inputIndex + 1)
              temp[this.config.keyPrefix + '-description'] = ''
              // 添加
              this.dataSource.push(temp)
              break
            }
          }
        })
      }
      this.modelValue = ''
      this.setAllDataToCell()
    },
    // 数据转数组
    initDataSource() {
      const keys = this.config.keys
      let paramsData = {}
      let length = 0
      keys.forEach(element => {
        paramsData[element] = this.getCellValue(element)
        length = paramsData[element] ? paramsData[element].length : 0
      })
      for (let index = 0; index < length; index++) {
        let tempData = {
          key: this.keyId + index
        }
        keys.forEach(key => {
          tempData[key] = paramsData[key][index]
        })
        this.dataSource.push(tempData)
      }
    }
  },
  mounted() {
    this.initDataSource()
  }
}
</script>
