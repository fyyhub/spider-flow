<template>
  <a-tabs size="small">
    <a-tab-pane key="config" tab="配置">
      <a-textarea placeholder="请输入注释" :size="size" :defaultValue="cell.value" @change="e => (cell.value = e.target.value)" :auto-size="{ minRows: 5 }" />
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
  }
}
</script>
