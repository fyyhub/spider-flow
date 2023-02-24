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
            <a-form-item label="数据源">
              <a-select :size="size" :defaultValue="getCellValue('datasourceId')" @change="val => setCellValue('datasourceId', val)">
                <a-select-option v-for="item in listDatabase" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="语句类型">
              <a-select :size="size" :defaultValue="getCellValue('statementType', 'select')" @change="val => setCellValue('statementType', val)">
                <a-select-option value="select">select</a-select-option>
                <a-select-option value="selectOne">selectOne</a-select-option>
                <a-select-option value="selectInt">selectInt</a-select-option>
                <a-select-option value="insert">insert</a-select-option>
                <a-select-option value="delete">delete</a-select-option>
                <a-select-option value="update">update</a-select-option>
                <a-select-option value="insertofPk">insertofPk</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="其它">
              <spider-select :editor="editor" :cell="cell" :options="selectConfig" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="SQL语句" :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }">
              <a-textarea :size="size" :defaultValue="getCellValue('sql')" @change="val => setCellValue('sql', val)" :auto-size="{ minRows: 5 }" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
import { allRequest } from '@/api/datasources.js'
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
      listDatabase: [],
      selectConfig: [
        {
          label: '输出到sqlRowSet流',
          value: 'isStream',
          defaultVal: '0'
        }
      ]
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
