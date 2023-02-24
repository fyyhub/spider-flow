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
            <a-form-item label="结果变量">
              <a-input :size="size" :defaultValue="getCellValue('scriptVariable')" @change="e => setCellValue('scriptVariable', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="超时时间">
              <a-input :size="size" :defaultValue="getCellValue('scriptTimeout')" @change="e => setCellValue('scriptTimeout', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="脚本名">
              <a-input :size="size" :defaultValue="getCellValue('scriptName')" @change="e => setCellValue('scriptName', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="脚本文件">
              <a-input :size="size" :defaultValue="getCellValue('scriptFile')" @change="e => setCellValue('scriptFile', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="结果编码">
              <a-input :size="size" :defaultValue="getCellValue('scriptCharset')" @change="e => setCellValue('scriptCharset', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="执行参数" :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
              <a-input :size="size" :defaultValue="getCellValue('scriptParameter')" @change="e => setCellValue('scriptParameter', e)" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
export default {
  mixins: [mixins],
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      listDatabase: [],
      selectConfig: [
        {
          label: '输出到sqlRowSet流',
          value: 'isStream',
          defaultVal: '0'
        }
      ]
    }
  }
}
</script>
