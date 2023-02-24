<template>
  <div class="editor-container" ref="container" :style="{ width: width, height: height }"></div>
</template>

<script>
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'

export default {
  name: 'CodeEditor',
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    },
    width: {
      type: String,
      default() {
        return '100%'
      }
    },
    height: {
      type: String,
      default() {
        return '500px'
      }
    }
  },
  data() {
    return {
      editor: null,
      editorPption: {
        theme: 'vs-dark',
        automaticLayout: true,
        language: 'javascript'
      }
    }
  },
  watch: {
    option: {
      handler: function(val, oldVal) {
        Object(this.editorPption, this.option)
        this.init()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 初始化实例
    init() {
      if (this.$refs.container) {
        if (!this.editor) {
          // 销毁实例
          // this.editor.dispose()
          this.editor = monaco.editor.create(this.$refs.container, {
            value: this.value,
            ...this.editorPption
          })
        }
        this.setEvent()
      }
    },
    // 设置监听
    setEvent() {
      let that = this
      that.editor.onDidChangeModelContent(e => {
        that.$emit('change', that.editor.getValue())
        that.$emit('input', that.editor.getValue())
      })
    },
    // 设置新的值
    setValue(val) {
      this.editor.setValue(val)
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    // 销毁实例
    this.editor.dispose()
  }
}
</script>

<style lang="less">
.editor-container {
  width: 100%;
  height: 500px;
}
</style>
