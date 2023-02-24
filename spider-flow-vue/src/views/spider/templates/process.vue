<template>
  <a-tabs size="small">
    <a-tab-pane key="config" tab="配置">
      <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
        <a-row>
          <a-col :span="24">
            <a-form-item label="节点名称">
              <a-input placeholder="请输入节点名称" :size="size" :defaultValue="cell.value" @change="e => (cell.value = e.target.value)" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="子流程">
              <a-select :size="size" :defaultValue="getCellValue('flowId')" @change="val => setCellValue('flowId', val)">
                <a-select-option v-for="item in listData" :key="item.id" :value="item.id">{{ item.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import mixins from '../mixins/spider-mixins.js'
import { otherRequest } from '@/api/spider.js'
export default {
  mixins: [mixins],
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      listData: []
    }
  },
  methods: {
    otherAction() {
      otherRequest(this.$route.params.flowId, data => {
        this.listData = data
      })
    }
  },
  mounted() {
    this.otherAction()
  }
}
</script>
