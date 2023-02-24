<template>
  <div>
    <a-tabs size="small">
      <a-tab-pane key="globalConfig" tab="全局配置">
        <a-form :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
          <a-row>
            <a-col :span="formItemLayout.colSpan">
              <a-form-item label="爬虫名称">
                <a-input placeholder="请输入爬虫名称" :size="size" :defaultValue="getCellValue('spiderName', '未定义名称')" @change="e => setCellValue('spiderName', e)" />
              </a-form-item>
            </a-col>
            <a-col :span="formItemLayout.colSpan">
              <a-form-item label="提交策略">
                <a-select :size="size" :defaultValue="getCellValue('submit-strategy', 'random')" @change="val => setCellValue('submit-strategy', val)">
                  <a-select-option value="random">随机</a-select-option>
                  <a-select-option value="linked">顺序</a-select-option>
                  <a-select-option value="child">子优先</a-select-option>
                  <a-select-option value="parent">父优先</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="formItemLayout.colSpan">
              <a-form-item label="最大线程数">
                <a-input-number placeholder="请输入最大线程数" :defaultValue="getCellValue('threadCount')" @change="e => setCellValue('threadCount', e)" :size="size" :min="1" style="width: 100%;" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="globalParamsConfig" tab="全局参数">
        <table-and-modal :editor="editor" :cell="cell" :config="globalParamsConfig"></table-and-modal>
      </a-tab-pane>
      <a-tab-pane key="globalCookieConfig" tab="全局Cookie">
        <table-and-modal :editor="editor" :cell="cell" :config="globalCookieConfig"></table-and-modal>
      </a-tab-pane>
      <a-tab-pane key="globalHeaderConfig" tab="全局Header">
        <table-and-modal :editor="editor" :cell="cell" :config="globalHeaderConfig"></table-and-modal>
      </a-tab-pane>
    </a-tabs>
    <a-modal v-model="visibleModel" title="请输入参数" ok-text="设置" cancel-text="关闭" @ok="hideModal(false)">
      <a-textarea v-model="modelValue" placeholder="一行一个，冒号(:)、等号（=）、空格或tab分割name和value" :auto-size="{ minRows: 8, maxRows: 20 }" />
    </a-modal>
  </div>
</template>

<script>
import data from './root-data.json'
import mixins from '../mixins/spider-mixins.js'
import TableAndModal from '../components/tableAndModal.vue'

export default {
  name: 'SRoot',
  mixins: [mixins],
  components: {
    TableAndModal
  },
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return data
  }
}
</script>
