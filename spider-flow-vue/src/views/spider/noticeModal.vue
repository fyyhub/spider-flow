<template>
  <a-modal
    :confirm-loading="confirmLoading"
    :visible="visible"
    :width="800"
    @cancel="closeDetail"
    @ok="handleOk"
    title="流程通知设置"
  >
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        help="收件人,多个收件人用','隔开，每个收件人可添加单独通知标记,如不添加通知标记则使用默认配置通知方式，例：sms:13012345678,email:12345678@qq.com,13012345670"
        label="收件人"
      >
        <a-textarea
          :auto-size="{ minRows: 4, maxRows: 6 }"
          placeholder="请输入收件人"
          v-decorator="[
          'recipients',
          { initialValue: detail.recipients, rules: [{ required: true, message: '请输入收件人' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="通知方式"
      >
        <a-select
          placeholder="请选择通知方式"
          v-decorator="[
          'noticeWay',
          { initialValue: detail.noticeWay, rules: [{ required: true, message: '请选择通知方式' }] },
        ]"
        >
          <a-select-option :key="key" :value="key" v-for="(val,key) in noticeSelectList">{{val}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="通知类型"
      >
        <a-checkbox-group
          :options="checkboxOptions"
          :value="checkboxValue"
          @change="onCheckboxChange"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { getNoticeWayRequest, findRequest, saveRequest } from '@/api/notice.js'

export default {
  name: 'NoticeModel',
  data() {
    return {
      confirmLoading: false,
      visible: false,
      detail: {
        id: null,
        recipients: '',
        noticeWay: '',
        startNotice: 0,
        exceptionNotice: 0,
        endNotice: 0
      },
      form: this.$form.createForm(this, { name: 'detailFrom' }),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      noticeSelectList: {},
      checkboxOptions: [
        { label: '流程开始', value: 'startNotice' },
        { label: '流程异常', value: 'exceptionNotice' },
        { label: '流程结束', value: 'endNotice' }
      ],
      checkboxValue: []
    }
  },
  methods: {
    showDetail(id) {
      this.visible = true
      this.checkboxValue = []
      this.detail = {
        id: null,
        recipients: '',
        noticeWay: '',
        startNotice: 0,
        exceptionNotice: 0,
        endNotice: 0
      }
      if (id) {
        this.detail.id = id
        this.detailAction()
      }
    },
    closeDetail() {
      this.visible = false
      this.confirmLoading = false
      this.form = this.$form.createForm(this, { name: 'detailFrom' })
    },
    handleOk(e) {
      this.form.validateFields((err, detail) => {
        if (!err) {
          this.confirmLoading = true
          Object.assign(this.detail, detail)
          saveRequest(
            this.detail,
            data => {
              this.$message.success(data.message)
              this.closeDetail()
            },
            this.closeDetail
          )
        }
      })
    },
    // 获取通知方式列表
    getNoticeWayAction() {
      getNoticeWayRequest(
        data => {
          this.noticeSelectList = data.data
        },
        data => {
          this.$message.error('获取通知方式类型失败')
        }
      )
    },
    // 获取详情
    detailAction() {
      findRequest(this.detail.id, data => {
        this.detail = data.data
        this.checkboxOptions.forEach(item => {
          if (this.detail[item.value] === '1') {
            this.checkboxValue.push(item.value)
          }
        })
      })
    },
    onCheckboxChange(checkedList) {
      this.checkboxValue = checkedList
      this.checkboxOptions.forEach(item => {
        this.detail[item.value] =
          checkedList.indexOf(item.value) > -1 ? '1' : '0'
      })
    }
  },
  mounted() {
    this.getNoticeWayAction()
  }
}
</script>
