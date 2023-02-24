<template>
  <a-modal :visible="visible" :width="700" @cancel="closeDetail" title="数据源">
    <a-form :form="form">
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="数据源名称"
      >
        <a-input
          placeholder="请输入数据源名称"
          v-decorator="[
          'name',
          { initialValue: detail.name, rules: [{ required: true, message: '请输入数据源名称' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="驱动"
      >
        <a-select
          placeholder="请选择驱动"
          v-decorator="[
          'driverClassName',
          { initialValue: detail.driverClassName, rules: [{ required: true, message: '请选择驱动' }] },
        ]"
        >
          <a-select-option value="com.mysql.jdbc.Driver">com.mysql.jdbc.Driver</a-select-option>
          <a-select-option value="org.hsqldb.jdbcDriver">org.hsqldb.jdbcDriver</a-select-option>
          <a-select-option value="org.postgresql.Driver">org.postgresql.Driver</a-select-option>
          <a-select-option value="oracle.jdbc.driver.OracleDriver">oracle.jdbc.driver.OracleDriver</a-select-option>
          <a-select-option value="com.ibm.db2.jcc.DB2Driver">com.ibm.db2.jcc.DB2Driver</a-select-option>
          <a-select-option
            value="com.microsoft.sqlserver.jdbc.SQLServerDriver"
          >com.microsoft.sqlserver.jdbc.SQLServerDriver</a-select-option>
          <a-select-option value="com.sybase.jdbc3.jdbc.SybDriver">com.sybase.jdbc3.jdbc.SybDriver</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="数据库连接"
      >
        <a-input
          placeholder="请输入数据库连接"
          v-decorator="[
          'jdbcUrl',
          { initialValue: detail.jdbcUrl, rules: [{ required: true, message: '请输入数据库连接' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="用户名"
      >
        <a-input
          placeholder="请输入用户名"
          v-decorator="[
          'username',
          { initialValue: detail.username, rules: [{ required: true, message: '请输入用户名' }] },
        ]"
        />
      </a-form-item>
      <a-form-item
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        label="密码"
      >
        <a-input
          placeholder="请输入密码"
          v-decorator="[
          'password',
          { initialValue: detail.password, rules: [{ required: true, message: '请输入密码' }] },
        ]"
        />
      </a-form-item>
    </a-form>
    <template slot="footer">
      <a-button @click="closeDetail">取消</a-button>
      <a-button :loading="testLoading" @click="handleTest" type="primary">测试连接</a-button>
      <a-button :loading="confirmLoading" @click="handleOk" type="primary">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
import { detailRequest, saveRequest, testRequest } from '@/api/datasources.js'
export default {
  name: 'detailModel',
  data() {
    return {
      confirmLoading: false,
      testLoading: false,
      visible: false,
      detail: {
        id: null,
        name: '',
        value: '',
        description: ''
      },
      form: this.$form.createForm(this, { name: 'detailFrom' }),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    }
  },
  methods: {
    showDetail(id) {
      this.visible = true
      this.detail = {
        id: null,
        name: '',
        driverClassName: '',
        jdbcUrl: '',
        username: '',
        password: ''
      }
      if (id) {
        this.detail.id = id
        this.detailAction()
      }
    },
    closeDetail() {
      this.visible = false
      this.confirmLoading = false
      this.testLoading = false
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
      })
    },
    handleTest() {
      this.form.validateFields((err, detail) => {
        if (!err) {
          this.testLoading = true
          Object.assign(this.detail, detail)
          testRequest(
            this.detail,
            data => {
              this.$notification.info({
                message: '测试结果',
                description: data.message,
                duration: 5
              })
              this.testLoading = false
            },
            data => {
              this.testLoading = false
            }
          )
        }
      })
    }
  }
}
</script>
