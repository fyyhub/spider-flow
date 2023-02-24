<template>
  <a-layout class="spider-detail-container" ref="spiderDetail">
    <a-layout-header>
      <template v-for="(item, index) in headerBtns">
        <a-tooltip :key="'header-icon-' + index" :title="item.title" placement="bottom" v-if="item.type === 'ant'">
          <a-icon :type="item.icon" @click="headerBtnItemHandle(item.click)"></a-icon>
        </a-tooltip>
        <a-divider :key="'header-icon-' + index" type="vertical" v-else-if="item.type === 'divider'" />
      </template>
      <!-- 测试窗口 -->
      <test-modal :editor="editor" :cell="selectCell" />
      <!-- 历史版本弹窗 -->
      <history-version-modal :id="queryParam.id" :editor="editor" ref="historyVersionModal" />
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="100px">
        <div class="spider-toolbar-container" ref="spiderToolbarContainer"></div>
      </a-layout-sider>
      <a-layout-content class="spider-content">
        <div class="spider-editor-container" ref="spiderEditorContainer" v-show="showXMLPage !== true"></div>
        <!-- xml编辑器 -->
        <code-editor v-show="showXMLPage === true" height="100%" ref="xmlEditor" :option="{ language: 'xml' }" @change="val => editor.setXML(val)"></code-editor>
      </a-layout-content>
    </a-layout>
    <a-layout-footer class="spider-properties-container">
      <component :is="currentTemplate" :editor="editor" :cell="selectCell" />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import HeaderBtnsJson from './json/header-btns.json'
import { SpiderEditor, JsonProperty } from '@/libs/spidereditor/spider-editor'
import { loadShapes } from '@/libs/spidereditor/editor'
import { xmlRequest, saveRequest } from '@/api/spider.js'
import HistoryVersionModal from './historyVersionModal.vue'
import CodeEditor from '@/components/code-editor'
import TestModal from './testModal.vue'

export default {
  components: {
    HistoryVersionModal,
    CodeEditor,
    TestModal
  },
  data() {
    return {
      queryParam: {
        id: ''
      },
      headerBtns: HeaderBtnsJson,
      editor: null,
      selectCell: {
        id: '',
        data: new JsonProperty()
      },
      showXMLPage: false
    }
  },
  computed: {
    currentTemplate() {
      var template = ''
      if (this.selectCell.edge === true || this.selectCell.edge === 1) {
        template = 'edge'
      } else if (this.selectCell.data && (this.selectCell.data.get === undefined || this.selectCell.data.get('shape') === undefined)) {
        template = 'root'
      } else {
        template = this.selectCell.data.get('shape') || 'root'
      }
      return () => import(`@/views/spider/templates/${template}`)
    }
  },
  watch: {
    'selectCell.value': {
      handler(newValue) {
        if (this.selectCell.valueChanged) {
          this.editor.graph.model.setValue(this.selectCell, newValue)
        }
      }
    }
  },
  methods: {
    // 绑定键盘事件
    bindKeyEvent() {
      window.onkeydown = e => {
        let key = e.key
        this.headerBtns.forEach(element => {
          if (element.exeFunKey && element.exeFunKey.length > 0) {
            if (
              (element.exeFunKey.indexOf('ctrl') !== -1 && e.ctrlKey === true && element.exeFunKey.indexOf(key.toLowerCase()) !== -1) ||
              (element.exeFunKey.indexOf('alt') !== -1 && e.altKey === true && element.exeFunKey.indexOf(key.toLowerCase()) !== -1) ||
              (element.exeFunKey.length === 1 && element.exeFunKey.indexOf(key.toLowerCase()) !== -1)
            ) {
              // 这里需要执行点什么方法
              this.headerBtnItemHandle(element.click)
              // 阻止其它事件
              e.preventDefault()
            }
          }
        })
      }
    },
    // 选择cell触发的方法
    onSelectedCell(cell) {
      this.selectCell = cell
    },
    // 渲染spider editor
    renderSpiderEditor() {
      let _this = this
      let editor = new SpiderEditor({
        element: this.$refs.spiderEditorContainer,
        selectedCellListener: function(sender, evt) {
          _this.onSelectedCell(sender, evt)
        }
      })
      // 加载图形
      loadShapes(editor, this.$refs.spiderToolbarContainer)
      this.editor = editor
    },
    // 头部按钮事件处理
    headerBtnItemHandle(item) {
      this.headerBtnHandle(item.name, item.params)
    },
    // 头部按钮事件处理
    headerBtnHandle(methodName, params) {
      if (methodName && this[methodName] && typeof this[methodName] === 'function') {
        this[methodName](params)
      }
    },
    // 跳转页面
    goPage(url) {
      this.$router.push(url)
    },
    // 获取当前流程的xml
    xmlAction() {
      if (this.queryParam.id) {
        xmlRequest(this.queryParam.id, data => {
          this.editor.setXML(data)
        })
      } else {
        this.editor.onSelectedCell()
      }
    },
    // 保存流程内容
    saveAction() {
      this.validXML(() => {
        let params = this.queryParam
        params.xml = this.editor.getXML()
        params.name = this.editor.graph
          .getModel()
          .getRoot()
          .data.get('spiderName')
        saveRequest(params, data => {
          if (this.queryParam.id !== data) {
            this.queryParam.id = data
            this.$router.push('/spider_detail/' + data)
          }
          this.$message.success('保存成功')
        })
      })
    },
    // 验证流程的正确性
    validXML(callback) {
      var cell = this.editor.valid()
      if (cell) {
        this.$confirm({
          title: '异常处理',
          content: h => <div style="color:red;">检测到有箭头未连接到节点上，是否处理？</div>,
          okText: '处理',
          cancelText: '忽略',
          onOk: () => {
            this.editor.selectCell(cell)
          },
          onCancel: () => {
            callback && callback()
          }
        })
      } else {
        callback && callback()
      }
    },
    // 流程图执行操作
    spiderFlowExecute(exe) {
      this.editor.execute(exe)
    },
    // 删除选中节点
    deleteSelectCells() {
      this.editor.deleteSelectCells()
    },
    // 打印当前的xml到console
    printXmlToConsole() {
      console.log(this.editor.getXML())
    },
    // 获取版本历史记录，并展示弹窗
    getHistoryVersion() {
      this.$refs.historyVersionModal.historyAction()
    },
    // 展示xml页面
    showXMLPageHandle() {
      this.$refs.xmlEditor.setValue(this.editor.getXML())
      this.showXMLPage = !this.showXMLPage
    }
  },
  mounted() {
    this.queryParam.id = this.$route.params.flowId
    // 渲染面板
    this.renderSpiderEditor()
    // 绑定键盘事件
    this.bindKeyEvent()
    // 加载xml
    this.xmlAction()
  },
  destroyed() {
    window.onkeydown = null
  }
}
</script>

<style lang="less">
@import './detail.less';
</style>
