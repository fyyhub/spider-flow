<template>
  <a-card>
    <div class="table-operator">
      <a-button @click="openDetail()" icon="plus" type="primary">添加数据源</a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="data.records"
      :pagination="pagination"
      @change="handleChange"
      rowKey="id"
    >
      <template slot="operation" slot-scope="value">
        <a @click="openDetail(value)">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          @confirm="deleteAction(value)"
          cancel-text="取消"
          ok-text="确定"
          placement="topRight"
          title="您确定要删除此数据源吗？"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
    <detail-model @ok="listAction" ref="detailModel"></detail-model>
  </a-card>
</template>

<script>
import { listRequest, deleteRequest } from '@/api/datasources.js'
import detailModel from './detail'

export default {
  components: {
    detailModel
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          width: 60,
          customRender: (text, record, index) => `${index + 1}`
        },
        {
          title: '数据源名称',
          dataIndex: 'name'
        },
        {
          title: '驱动',
          dataIndex: 'driverClassName'
        },
        {
          title: '创建时间',
          dataIndex: 'createDate'
        },
        {
          title: '操作',
          dataIndex: 'id',
          width: 120,
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
        limit: 10
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
      },
      detailVisible: false
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
    deleteAction(id) {
      deleteRequest(
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
    openDetail(id) {
      this.$refs.detailModel.showDetail(id)
    }
  },
  mounted() {
    this.listAction()
  }
}
</script>
