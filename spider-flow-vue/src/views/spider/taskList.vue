<template>
  <a-card>
    <a-table
      :columns="columns"
      :data-source="data.records"
      :pagination="pagination"
      @change="handleChange"
      rowKey="id"
    >
      <template slot="operation" slot-scope="value">
        <!-- <a>查看日志</a>
        <a-divider type="vertical" />-->
        <a @click="logDownloadAction(value)">下载日志</a>
        <a-divider type="vertical" />
        <a-popconfirm
          @confirm="removeAction(value)"
          cancel-text="取消"
          ok-text="确定"
          placement="topRight"
          title="您确定要删除此记录吗？"
        >
          <a>删除记录</a>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { listRequest, removeRequest } from '@/api/task.js'
import { logDownloadRequest } from '@/api/spider.js'

export default {
  data() {
    return {
      columns: [
        {
          title: '序号',
          width: 60,
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: '任务开始时间',
          dataIndex: 'beginTime'
        },
        {
          title: '任务结束时间',
          dataIndex: 'endTime'
        },
        {
          title: '操作',
          dataIndex: 'id',
          width: 240,
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: {
        current: 1,
        pages: 1,
        records: [],
        searchCount: true,
        size: 10,
        total: 1
      },
      queryParam: {
        page: 1,
        limit: 10,
        flowId: ''
      },
      pagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 共' + total + '条'
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0
      }
    }
  },
  methods: {
    listAction() {
      listRequest(this.queryParam, data => {
        this.data = data
        this.pagination.total = this.data.total
        this.pagination.pageSize = this.data.size
      })
    },
    removeAction(id) {
      removeRequest(
        id,
        data => {
          this.$message.success(data.message)
          this.listAction()
        },
        data => {
          this.$message.error(data.message)
          this.listAction()
        }
      )
    },
    // 分页切换
    handleChange(pagination) {
      this.pagination = pagination
      this.queryParam.page = this.pagination.current
      this.queryParam.limit = this.pagination.pageSize
      this.listAction()
    },
    // 下载日志文件
    logDownloadAction(taskId) {
      logDownloadRequest(this.queryParam.flowId, taskId)
    }
  },
  mounted() {
    this.queryParam.flowId = this.$route.params.flowId
    this.listAction()
  }
}
</script>
