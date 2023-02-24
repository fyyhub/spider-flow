<template>
  <a-tabs size="small">
    <a-tab-pane key="config" tab="配置">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="6">
            <a-form-item label="节点名称">
              <a-input placeholder="请输入节点名称" :size="size" :defaultValue="cell.value" @change="e => (cell.value = e.target.value)" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="循环变量">
              <a-input :size="size" :defaultValue="getCellValue('loopVariableName')" @change="e => setCellValue('loopVariableName', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="循环次数">
              <a-input :size="size" :defaultValue="getCellValue('loopCount')" @change="e => setCellValue('loopCount', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="输出设置">
              <spider-select :editor="editor" :cell="cell" :options="[{ label: '输出全部参数', value: 'output-all', defaultVal: '0' }]" />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="数据输出">
              <spider-select :editor="editor" :cell="cell" :options="outputSelectConfig" @change="val => (outputSelectValue = val)" />
            </a-form-item>
          </a-col>
          <a-col :span="18" v-if="outputSelectValue.length > 0">
            <a-form-item label="数据源" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
              <a-row>
                <a-col :span="6" v-if="outputSelectValue.indexOf('output-database') !== -1">
                  <a-select :size="size" :defaultValue="getCellValue('datasourceId')" @change="val => setCellValue('datasourceId', val)">
                    <a-select-option v-for="item in listDatabase" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
                  </a-select>
                </a-col>
                <a-col :span="5" :offset="1" v-if="outputSelectValue.indexOf('output-database') !== -1">
                  <a-input :size="size" placeholder="请输入表名" :defaultValue="getCellValue('tableName')" @change="e => setCellValue('tableName', e)" />
                </a-col>
                <a-col :span="5" :offset="1" v-if="outputSelectValue.indexOf('output-csv') !== -1">
                  <a-input :size="size" placeholder="请输入文件名" :defaultValue="getCellValue('csvName')" @change="e => setCellValue('csvName', e)" />
                </a-col>
                <a-col :span="5" :offset="1" v-if="outputSelectValue.indexOf('output-csv') !== -1">
                  <a-select :size="size" :defaultValue="getCellValue('csvEncoding', 'GBK')" @change="val => setCellValue('csvEncoding', val)">
                    <a-select-option value="GBK">GBK</a-select-option>
                    <a-select-option value="UTF-8">UTF-8</a-select-option>
                    <a-select-option value="UTF-8BOM">UTF-8&nbsp;BOM</a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-form-item>
          </a-col>
        </a-row>
        <table-and-modal :batchAddBtn="false" :editor="editor" :cell="cell" :config="tableConfig"></table-and-modal>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
import TableAndModal from '../components/tableAndModal.vue'
import SpiderSelect from '../components/spiderSelect.vue'
import { allRequest } from '@/api/datasources.js'

export default {
  mixins: [mixins],
  components: {
    TableAndModal,
    SpiderSelect
  },
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      tableConfig: {
        title: '输出项',
        keyPrefix: 'parameter-form',
        keys: ['output-name', 'output-value'],
        columns: [
          {
            title: '输出项',
            dataIndex: 'output-name',
            width: 150,
            scopedSlots: {
              customRender: 'output-name'
            }
          },
          {
            title: '输出值',
            dataIndex: 'output-value',
            scopedSlots: {
              customRender: 'output-value'
            }
          },
          {
            title: '操作',
            dataIndex: 'operation',
            width: 150,
            scopedSlots: {
              customRender: 'operation'
            }
          }
        ]
      },
      outputSelectConfig: [
        {
          label: '输出到数据库',
          value: 'output-database',
          defaultVal: '0'
        },
        {
          label: '输出到CSV文件',
          value: 'output-csv',
          defaultVal: '0'
        }
      ],
      outputSelectValue: [],
      listDatabase: []
    }
  },
  methods: {
    getAllDatabase() {
      allRequest(data => {
        this.listDatabase = data
      })
    }
  },
  mounted() {
    this.getAllDatabase()
  }
}
</script>
