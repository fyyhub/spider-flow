<template>
  <a-card class="scripts-content">
    <a-layout>
      <a-layout-sider width="300">
        <a-layout-header>
          <a-select :default-value="scrpitSelect" @change="scrpitHandleChange" style="width: 100%">
            <a-select-option value>请选择</a-select-option>
            <a-select-option :key="scrpitSelect + item" :value="item" v-for="item in scrpitFolder">{{ item }}</a-select-option>
          </a-select>
        </a-layout-header>
        <a-layout-content>
          <a-dropdown :trigger="['contextmenu']">
            <a-tree :expandedKeys="expandedKeys" :selectedKeys="selectedKeys" :treeData="treeData" @expand="onTreeExpand" @select="onTreeSelect" autoExpandParent show-icon>
              <a-icon slot="folder" type="folder" />
              <a-icon slot="file" type="file" />
            </a-tree>
          </a-dropdown>
        </a-layout-content>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="btns-group">
          <a-form layout="inline">
            <a-form-item>
              <a-button @click="openModal('请输入脚本名称', '', 'createAction')" type="primary" v-show="isSelectFile() === false">新建脚本</a-button>
              <a-dropdown :trigger="['click']" v-show="isSelectFile()">
                <a-menu @click="handleMenuClick" slot="overlay">
                  <a-menu-item key="newFile" v-show="currentFile.directory">新建文件</a-menu-item>
                  <a-menu-item key="newFolder" v-show="currentFile.directory">新建文件夹</a-menu-item>
                  <a-menu-item key="rename" v-show="treeData.length > 0 && treeData[0].key !== selectedKeys[0]">重命名</a-menu-item>
                  <a-menu-item key="delete">删除</a-menu-item>
                </a-menu>
                <a-button type="primary">
                  操作
                  <a-icon type="down" />
                </a-button>
              </a-dropdown>
              <a-button @click="readAction" type="primary" v-show="currentFile.name">重载文件</a-button>
              <a-button @click="saveAction" type="primary" v-show="currentFile.name">保存当前文件</a-button>
            </a-form-item>
            <a-form-item label="选中文件名">{{ currentFile.name }}</a-form-item>
            <a-form-item label="运行参数" v-show="currentFile.name">
              <a-input placeholder="请输入运行参数" v-model="currentFile.parameter"></a-input>
            </a-form-item>
            <a-form-item v-show="currentFile.name">
              <a-button @click="testAction" type="primary">测试运行</a-button>
            </a-form-item>
          </a-form>
        </a-layout-header>
        <a-layout-content>
          <code-editor :option="editorOptions" height="600px" ref="editor" v-model="currentFile.content"></code-editor>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <a-modal :title="modal.title" @ok="handleModal" cancel-text="取消" ok-text="确认" v-model="modal.show">
      <a-input v-model="modal.value" />
    </a-modal>
  </a-card>
</template>

<script>
import { listRequest, filesRequest, removeFileRequest, createRequest, renameFileRequest, createFileRequest, readRequest, saveRequest, testRequest } from '@/api/scripts.js'
import CodeEditor from '@/components/code-editor'

export default {
  components: {
    CodeEditor
  },
  data() {
    return {
      scrpitFolder: [],
      scrpitSelect: '',
      currentFileList: [],
      selectedKeys: [],
      expandedKeys: [],
      currentFile: {
        directory: false,
        name: '',
        path: '',
        content: '',
        parameter: ''
      },
      modal: {
        title: '弹窗标题',
        value: '',
        show: false,
        callback: '',
        param: null
      },
      editorOptions: {
        language: 'javascript'
      }
    }
  },
  computed: {
    treeData() {
      let list = getTreeNode(this.currentFileList)

      function getTreeNode(item, parentItem) {
        return item.map(element => {
          let obj = { ...element.node }
          obj.key = (parentItem ? parentItem.key + '/' : '') + obj.name
          obj.title = obj.name
          if (element.children) {
            obj.children = getTreeNode(element.children, obj)
          }
          if (element.node.directory === true) {
            obj.slots = {
              icon: 'folder'
            }
          } else {
            obj.slots = {
              icon: 'file'
            }
          }
          return obj
        })
      }
      return list
    }
  },
  methods: {
    // 切换脚本
    scrpitHandleChange(value) {
      this.scrpitSelect = value
      this.currentFileList = []
      this.selectedKeys = []
      this.expandedKeys = []
      this.currentFile.name = ''
      if (value) {
        filesRequest(this.scrpitSelect, data => {
          this.expandedKeys.push(data.data.node.name)
          this.currentFileList = [data.data]
        })
      }
    },
    // 切换脚本目录
    onTreeSelect(selectedKeys, e) {
      this.selectedKeys = selectedKeys
      this.currentFile.name = selectedKeys[0]
      this.currentFile.path = selectedKeys[0]
      this.currentFile.directory = false
      if (selectedKeys.length > 0) {
        this.currentFile.directory = e.selectedNodes[0].data.props.directory
        if (this.currentFile.directory === true) {
          this.currentFile.name = ''
        } else {
          this.readAction()
        }
      }
    },
    onTreeExpand(expandedKeys, e) {
      this.expandedKeys = expandedKeys
    },
    listAction() {
      listRequest(data => {
        this.scrpitFolder = data.data
        this.scrpitHandleChange('')
      })
    },
    handleMenuClick(e) {
      switch (e.key) {
        case 'newFile':
          this.modal.param = 0
          this.openModal('请输入文件名称', null, 'createFileAction')
          break
        case 'newFolder':
          this.modal.param = 1
          this.openModal('请输入文件夹名称', null, 'createFileAction')
          break
        case 'rename':
          let arrFile = this.currentFile.path.split('/')
          let value = arrFile[arrFile.length - 1]
          this.openModal('重命名', value, 'renameFileAction')
          break
        case 'delete':
          let flag = true
          if (this.currentFile.path === this.scrpitSelect) {
            flag = false
          }
          let filePath = this.currentFile.path.split('/')
          let that = this
          this.$confirm({
            title: '是否删除?',
            content: '确认删除：' + filePath[filePath.length - 1],
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
              let params = {
                scriptName: that.scrpitSelect
              }
              if (flag) {
                params.file = that.currentFile.path.replace(params.scriptName + '/', '')
              }
              removeFileRequest(params, data => {
                that.$message.success(data.message)
                if (flag) {
                  that.scrpitHandleChange(that.scrpitSelect)
                } else {
                  that.listAction()
                }
              })
            }
          })
          break
      }
    },
    // 当前是否选中文件
    isSelectFile() {
      if (this.currentFile.name || this.currentFile.directory) {
        return true
      }
      return false
    },
    openModal(title, value, callback) {
      this.modal.title = title
      this.modal.value = value
      this.modal.callback = callback
      this.modal.show = true
    },
    handleModal() {
      if (!this.modal.value) {
        this.$message.error('输入的值不能为空')
      } else if (this.modal.callback) {
        this[this.modal.callback]()
      }
    },
    // 新建脚本
    createAction() {
      createRequest(this.modal.value, data => {
        this.$message.success(data.message)
        this.modal.show = false
        this.listAction()
      })
    },
    // 重命名请求
    renameFileAction() {
      let params = {
        scriptName: this.scrpitSelect,
        newFile: this.modal.value
      }
      params.file = this.currentFile.path.replace(params.scriptName + '/', '')
      renameFileRequest(params, data => {
        this.$message.success(data.message)
        this.modal.show = false
        this.scrpitHandleChange(this.scrpitSelect)
      })
    },
    // 创建文件或文件夹
    createFileAction() {
      let params = {
        scriptName: this.scrpitSelect,
        dir: this.modal.param
      }
      params.file = this.currentFile.path.replace(params.scriptName + '/', '') + '/' + this.modal.value
      createFileRequest(params, data => {
        this.$message.success(data.message)
        this.modal.show = false
        this.scrpitHandleChange(this.scrpitSelect)
      })
    },
    // 获取文件内容
    readAction() {
      this.$refs.editor.setValue('')
      let params = {
        scriptName: this.scrpitSelect
      }
      params.file = this.currentFile.path.replace(params.scriptName + '/', '') + '/' + this.modal.value
      readRequest(params, data => {
        this.$refs.editor.setValue(data.data)
      })
    },
    // 保存文件内容
    saveAction() {
      let params = {
        scriptName: this.scrpitSelect,
        content: this.currentFile.content
      }
      params.file = this.currentFile.path.replace(params.scriptName + '/', '') + '/' + this.modal.value
      saveRequest(params, data => {
        this.$message.success(data.message)
      })
    },
    // 测试脚本
    testAction() {
      let params = {
        scriptName: this.scrpitSelect,
        parameter: this.currentFile.parameter
      }
      params.file = this.currentFile.path.replace(params.scriptName + '/', '') + '/' + this.modal.value
      testRequest(params, data => {
        data = data.data
        if (data.exitValue === 0) {
          this.$info({
            title: '执行成功',
            content: data.value
          })
        } else if (data.exitValue === -2) {
          this.$message.error('不支持的脚本类型')
        } else {
          var message = (data.value || '') + '\r\n' + (data.error || '') + '\r\n' + (data.stack || '')
          message = message
            .replace(/\n/g, '<br>')
            .replace(/ /g, '&nbsp;')
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
          this.$error({
            title: '执行失败,exitValue=' + data.exitValue,
            content: message
          })
        }
      })
    }
  },
  mounted() {
    this.listAction()
  }
}
</script>

<style lang="less">
.scripts-content {
  height: 100%;

  .ant-card-body {
    padding: 0;
    height: 100%;

    .ant-layout {
      height: 100%;
    }

    .ant-layout-header,
    .ant-layout-sider {
      background-color: #ffffff;
    }

    .ant-layout-sider {
      overflow-y: auto;
    }

    .ant-layout-header {
      padding: 0 10px;
    }

    .btns-group {
      padding: 12px;

      .ant-form-item-children button {
        margin-right: 10px;
      }
    }
  }
}
</style>
