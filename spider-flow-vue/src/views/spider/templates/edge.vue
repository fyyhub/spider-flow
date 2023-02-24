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
            <a-form-item label="流转特性">
              <a-select :size="size" :defaultValue="getCellValue('exception-flow', '0')" @change="val => setCellValue('exception-flow', val)">
                <a-select-option value="0">直接流转</a-select-option>
                <a-select-option value="1">当出现异常流转</a-select-option>
                <a-select-option value="2">未出现异常流转</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="流转特性">
              <spider-select :editor="editor" :cell="cell" :options="selectConfig" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="流转条件" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
              <a-input placeholder="请输入流转条件" :size="size" :defaultValue="getCellValue('condition')" @change="e => setCellValue('condition', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="线粗细">
              <a-input-number :size="size" :min="1" :max="10" :defaultValue="getCellValue('lineWidth', 2)" @change="e => changeLineWidth('lineWidth', e)" />
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="线样式">
              <a-select :size="size" :defaultValue="getCellValue('line-style', 'sharp')" @change="val => changeLineStyle('line-style', val)">
                <a-select-option value="sharp">Sharp</a-select-option>
                <a-select-option value="rounded">Rounded</a-select-option>
                <a-select-option value="curved">Curved</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="formItemLayout.colSpan">
            <a-form-item label="线颜色">
              <!-- xxxx暂时没找到好的vue颜色选择器来替代 -->
              <a-input placeholder="请输入颜色:#cccccc" :size="size" :defaultValue="getCellValue('lineColor', 'black')" @change="e => changeLineColor('lineColor', e)" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
import SpiderSelect from '../components/spiderSelect.vue'
export default {
  mixins: [mixins],
  components: {
    SpiderSelect
  },
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      selectConfig: [
        {
          label: '传递变量',
          value: 'transmit-variable',
          defaultVal: '1'
        }
      ]
    }
  },
  methods: {
    // 改变线条粗细
    changeLineWidth(key, e) {
      let val = this.setCellValue(key, e)
      this.editor.graph.setCellStyles('strokeWidth', val, [this.cell])
    },
    // 改变线条样式
    changeLineStyle(key, e) {
      let val = this.setCellValue(key, e)
      this.editor.graph.setCellStyles('sharp', undefined, [this.cell])
      this.editor.graph.setCellStyles('rounded', undefined, [this.cell])
      this.editor.graph.setCellStyles('curved', undefined, [this.cell])
      this.editor.graph.setCellStyles(val, 1, [this.cell])
    },
    // 改变线条颜色
    changeLineColor(key, e) {
      let val = this.setCellValue(key, e)
      this.editor.graph.setCellStyles('strokeColor', val, [this.cell])
    }
  }
}
</script>
