<template>
  <a-modal v-model="show" :title="'历史版本'" :footer="null">
    <a-table :columns="columns" :data-source="tableDataTime" bordered :size="size" :pagination="false">
      <template slot="operation" slot-scope="text, record">
        <a-button type="link" :size="size" @click="recoverHistory(record.timestamp)">
          恢复到此版本
        </a-button>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { historyRequest, recoverHistoryRequest } from '@/api/spider.js'
import mixins from './mixins/spider-mixins.js'
import moment from 'moment'

export default {
  name: 'HistoryVersionModal',
  props: {
    id: {
      type: String
    },
    editor: {
      type: Object
    }
  },
  mixins: [mixins],
  data() {
    return {
      show: false,
      tableData: [],
      columns: [
        {
          title: '修改时间',
          dataIndex: 'date'
        },
        {
          title: '操作',
          dataIndex: 'timestamp',
          width: 120,
          scopedSlots: {
            customRender: 'operation'
          }
        }
      ]
    }
  },
  computed: {
    tableDataTime() {
      return this.tableData.map((item, index) => {
        return {
          key: index,
          timestamp: item,
          date: moment(item).format('YYYY-MM-DD HH:mm:ss')
        }
      })
    }
  },
  methods: {
    historyAction() {
      historyRequest(this.id, data => {
        this.tableData = data.data
        if (this.tableData.length > 0) {
          this.show = true
        } else {
          this.$message.success('暂无历史版本！')
        }
      })
    },
    // 恢复历史版本
    recoverHistory(timestamp) {
      this.$confirm({
        title: '信息',
        content: '你确定要恢复到该版本吗？',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          recoverHistoryRequest(this.id, timestamp, data => {
            this.editor.setXML(data.data)
            this.show = false
          })
        },
        onCancel: () => {}
      })
    }
  }
}
</script>
