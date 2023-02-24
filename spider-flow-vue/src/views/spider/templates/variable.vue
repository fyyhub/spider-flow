<template>
  <a-tabs size="small">
    <a-tab-pane key="config" tab="配置">
      <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-row>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="节点名称">
              <a-input placeholder="请输入节点名称" :size="size" :defaultValue="cell.value" @change="e => (cell.value = e.target.value)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="循环变量">
              <a-input placeholder="请输入循环变量" :size="size" :defaultValue="getCellValue('loopVariableName')" @change="e => setCellValue('loopVariableName', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="循环次数">
              <a-input placeholder="请输入循环次数" :size="size" :defaultValue="getCellValue('loopCount')" @change="e => setCellValue('loopCount', e)" />
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
export default {
  mixins: [mixins],
  components: {
    TableAndModal
  },
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      tableConfig: {
        title: '变量',
        keyPrefix: 'variable',
        keys: ['variable-name', 'variable-value', 'variable-description'],
        columns: [
          {
            title: '变量名',
            dataIndex: 'variable-name',
            width: 150,
            scopedSlots: {
              customRender: 'variable-name'
            }
          },
          {
            title: '变量值',
            dataIndex: 'variable-value',
            scopedSlots: {
              customRender: 'variable-value'
            }
          },
          {
            title: '描述',
            dataIndex: 'variable-description',
            width: 200,
            scopedSlots: {
              customRender: 'variable-description'
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
      }
    }
  }
}
</script>
