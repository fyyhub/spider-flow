<template>
  <a-modal
    :confirm-loading="confirmLoading"
    :visible="visible"
    @cancel="closeDetail"
    @ok="handleOk"
    title="全局变量"
  >
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="变量名"
      >
        <a-input
          placeholder="请输入变量名"
          v-decorator="[
          'name',
          { initialValue: detail.name, rules: [{ required: true, message: '请输入变量名' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="变量值"
      >
        <a-input
          placeholder="请输入变量值"
          v-decorator="[
          'value',
          { initialValue: detail.value, rules: [{ required: true, message: '请输入变量值' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="变量说明"
      >
        <a-textarea
          :auto-size="{ minRows: 3, maxRows: 5 }"
          placeholder="请输入变量说明"
          v-decorator="[
          'description',
          { initialValue: detail.description },
        ]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { detailRequest, saveRequest } from '@/api/variables.js'
export default {
  name: 'detailModel',
  data() {
    return {
      confirmLoading: false,
      visible: false,
      detail: {
        id: null,
        name: '',
        value: '',
        description: ''
      },
      form: this.$form.createForm(this, { name: 'detailFrom' }),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
      }
    }
  },
  methods: {
    showDetail(id) {
      this.visible = true
      this.detail = {
        id: null,
        name: '',
        value: '',
        description: ''
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
      this.$emit('ok')
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
    detailAction() {
      detailRequest(this.detail.id, data => {
        this.detail = data.data
      })
    }
  }
}
</script>
