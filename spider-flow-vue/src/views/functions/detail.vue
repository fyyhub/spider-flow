<template>
  <a-card>
    <a-form :form="form" layout="horizontal">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="函数名称"
      >
        <a-input
          placeholder="请输入函数名称"
          v-decorator="[
          'name',
          { initialValue: detail.name, rules: [{ required: true, message: '请输入函数名称' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="函数入参"
      >
        <a-input
          placeholder="请输入函数入参,多个用逗号隔开"
          v-decorator="[
          'parameter',
          { initialValue: detail.parameter },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="脚本"
      >
        <a-select style="width: 120px" v-model="option.language">
          <a-select-option value="javascript">javascript</a-select-option>
          <a-select-option value="python">python</a-select-option>
          <a-select-option value="java">java</a-select-option>
        </a-select>
        <code-editor :option="option" ref="editor" v-model="detail.script"></code-editor>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button :loading="confirmLoading" @click="handleOk" type="primary">保存</a-button>
        <a-button @click="closeDetail" style="margin-left: 5px;">返回</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { detailRequest, saveRequest } from '@/api/functions.js'
import CodeEditor from '@/components/code-editor'

export default {
  components: {
    CodeEditor
  },
  data() {
    return {
      confirmLoading: false,
      detail: {
        id: null,
        name: '',
        parameter: '',
        script: ''
      },
      form: this.$form.createForm(this, { name: 'detailFrom' }),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      },
      option: {
        language: 'javascript'
      }
    }
  },
  methods: {
    showDetail(id) {
      if (id) {
        this.detail.id = id
        this.detailAction()
      }
    },
    closeDetail() {
      this.confirmLoading = false
      this.$router.push('/functions_list/')
    },
    handleOk(e) {
      this.form.validateFields((err, detail) => {
        if (!err) {
          this.confirmLoading = true
          Object.assign(this.detail, detail)
          saveRequest(
            this.detail,
            data => {
              this.$message.success('成功')
              this.closeDetail()
            },
            this.closeDetail
          )
        }
      })
    },
    detailAction() {
      detailRequest(this.detail.id, data => {
        this.detail = data
        this.$refs.editor.setValue(data.script)
      })
    }
  },
  mounted() {
    if (this.$route.params.id && this.$route.params.id !== '0') {
      this.showDetail(this.$route.params.id)
    }
  }
}
</script>
