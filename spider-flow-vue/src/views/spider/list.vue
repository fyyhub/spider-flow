<template>
  <a-card>
    <div class="table-operator">
      <a-form layout="inline">
        <a-form-item label="爬虫名称">
          <a-input placeholder="请输入爬虫名称" v-model="queryParam.name"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button @click="listAction(1)" icon="search" type="primary">查询</a-button>
          <a-button @click="goSpiderDetailPage('')" icon="plus" type="primary">添加爬虫</a-button>
        </a-form-item>
      </a-form>
    </div>
    <a-table :columns="columns" :data-source="data.records" :pagination="pagination" @change="handleChange" rowKey="id">
      <template slot="name" slot-scope="val, row">
        <a @click="goSpiderDetailPage(row.id)">{{ val }}</a>
      </template>
      <template slot="cron" slot-scope="val, row">
        <a @click="openCronModal(val, row)">{{ val ? val : '编辑cron' }}</a>
      </template>
      <template slot="enabled" slot-scope="val, row">
        <span v-show="false">{{ $set(row, 'cronChecked', val === '1') }}</span>
        <a-switch :loading="row.loading" @change="checked => handleSwitch(checked, row)" checked-children="定时" un-checked-children="长任务" v-model="row.cronChecked" />
      </template>
      <template slot="runFinish" slot-scope="val, record">
        <a @click="goTaskListPage(record.id)">{{ record.running }}/{{ record.executeCount ? record.executeCount : 0 }}</a>
      </template>
      <template slot="operation" slot-scope="val">
        <a-tooltip placement="top" title="通知设置">
          <a @click="$refs.noticeModel.showDetail(val)">
            <a-icon type="bell" />
          </a>
        </a-tooltip>
        <a-divider type="vertical" />
        <a-tooltip placement="top" title="手动运行">
          <a-popconfirm @confirm="runAction(val)" cancel-text="取消" ok-text="确定" placement="topRight" title="您确定要手动运行一次该爬虫吗？">
            <a>
              <a-icon type="play-circle" />
            </a>
          </a-popconfirm>
        </a-tooltip>
        <a-divider type="vertical" />
        <a-tooltip placement="top" title="日志">
          <a @click="logDownloadAction(val)">
            <a-icon type="history" />
          </a>
        </a-tooltip>
        <a-divider type="vertical" />
        <a-popconfirm @confirm="removeAction(val)" cancel-text="取消" ok-text="确定" placement="topRight" title="您确定要删除此爬虫吗？">
          <a-tooltip placement="top" title="删除">
            <a>
              <a-icon type="delete" />
            </a>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-table>
    <cron-modal :data="cron.value" @ok="handleCronModal" ref="cronModal" />
    <notice-model ref="noticeModel"></notice-model>
  </a-card>
</template>

<script>
import { listRequest, startStopRequest, cronRequest, removeRequest, runRequest, logDownloadRequest } from '@/api/spider.js'
import CronModal from '@/components/CronModal.vue'
import NoticeModel from './noticeModal.vue'

export default {
  components: {
    CronModal,
    NoticeModel
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
          title: '爬虫名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: 'cron',
          dataIndex: 'cron',
          width: 200,
          scopedSlots: { customRender: 'cron' }
        },
        {
          title: '定时/长任务',
          dataIndex: 'enabled',
          width: 110,
          scopedSlots: { customRender: 'enabled' }
        },
        {
          title: '创建时间',
          dataIndex: 'createDate',
          width: 160
        },
        {
          title: '上次执行时间',
          dataIndex: 'lastExecuteTime',
          width: 160
        },
        {
          title: '运行中/已完成',
          dataIndex: 'runFinish',
          width: 130,
          scopedSlots: { customRender: 'runFinish' }
        },
        {
          title: '下次执行时间',
          dataIndex: 'nextExecuteTime',
          width: 160
        },
        {
          title: '操作',
          dataIndex: 'id',
          width: 140,
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
      cron: {
        value: '',
        row: {}
      }
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
    // 分页切换
    handleChange(pagination) {
      this.pagination = pagination
      this.queryParam.page = this.pagination.current
      this.queryParam.limit = this.pagination.pageSize
      this.listAction()
    },
    // 定时任务切换
    handleSwitch(checked, row) {
      if (!row.cron) {
        this.$message.warn('cron表达式不能为空！')
        this.$set(row, 'cronChecked', false)
      } else {
        this.$set(row, 'loading', true)
        let that = this
        startStopRequest(
          checked,
          row.id,
          data => {
            that.$message.success((checked ? '切换为定时任务' : '切换为长任务') + '成功')
            this.listAction(this.queryParam.page)
          },
          data => {
            that.$message.error((checked ? '切换为定时任务' : '切换为长任务') + '失败')
            that.$set(row, 'loading', false)
            this.listAction(this.queryParam.page)
          }
        )
      }
    },
    // 打开cron弹窗
    openCronModal(val, row) {
      this.cron.value = val
      this.cron.row = row
      this.$refs.cronModal.show()
    },
    // cron弹窗确认按钮
    handleCronModal(val) {
      let params = {
        id: this.cron.row.id,
        cron: val
      }
      cronRequest(
        params,
        data => {
          this.$message.success('修改成功')
          this.listAction(this.queryParam.page)
        },
        data => {
          this.$message.error('修改失败')
        }
      )
    },
    // 删除爬虫
    removeAction(id) {
      removeRequest(
        id,
        data => {
          this.$message.success('删除成功')
          this.listAction(this.queryParam.page)
        },
        data => {
          this.$message.error('删除失败')
        }
      )
    },
    // 手动运行爬虫
    runAction(id) {
      runRequest(
        id,
        data => {
          this.$message.success('手动运行成功,后台运行中...')
          this.listAction(this.queryParam.page)
        },
        data => {
          this.$message.error('手动运行失败')
        }
      )
    },
    // 前往任务详情列表页
    goTaskListPage(flowId) {
      this.$router.push('/task_list/' + flowId)
    },
    // 下载日志文件
    logDownloadAction(flowId) {
      logDownloadRequest(flowId)
    },
    // 前往爬虫详情页
    goSpiderDetailPage(flowId) {
      this.$router.push('/spider_detail/' + flowId)
    }
  },
  mounted() {
    this.listAction(this.queryParam.page)
  }
}
</script>
