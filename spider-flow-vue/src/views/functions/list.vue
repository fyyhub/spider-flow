<template>
  <a-card>
    <div class="table-operator">
      <a-form layout="inline">
        <a-form-item label="函数名称">
          <a-input placeholder="请输入函数名称" v-model="queryParam.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button @click="listAction(1)" icon="search" type="primary">查询</a-button>
          <a-button @click="openDetail(0)" icon="plus" type="primary">添加函数</a-button>
        </a-form-item>
      </a-form>
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
          title="您确定要删除此函数吗？"
        >
          <a>删除</a>
        </a-popconfirm>
      </template>
    </a-table>
  </a-card>
</template>

<script>
import { listRequest, deleteRequest } from '@/api/functions.js'

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
          title: '函数名称',
          dataIndex: 'name'
        },
        {
          title: '函数参数',
          dataIndex: 'parameter'
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
        limit: 10,
        name: ''
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
    listAction(page) {
      if (page) {
        this.queryParam.page = page
        this.pagination.current = page
      }
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
          this.$message.success('成功')
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
      this.$router.push('/functions_detail/' + id)
    }
  },
  mounted() {
    this.listAction(this.queryParam.page)
  }
}
</script>
