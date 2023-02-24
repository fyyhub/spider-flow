<template>
  <a-modal v-model="visible" title="测试窗口" :mask="false" :maskClosable="false">
    <template slot="footer">
      <a-button>
        Return
      </a-button>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script>
import mixins from './mixins/spider-mixins.js'

export default {
  name: 'TestModal',
  mixins: [mixins],
  props: {
    editor: Object,
    cell: Object
  },
  data() {
    return {
      visible: true
    }
  }
}
</script>
