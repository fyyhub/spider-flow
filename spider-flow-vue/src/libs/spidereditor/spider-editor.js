/* eslint-disable */
// var mxgraph = require('mxgraph')({
//   mxImageBasePath: './src/images',
//   mxBasePath: './src'
// })

// var mxEvent = mxgraph.mxEvent
// var mxClient = mxgraph.mxClient
// var mxGraphHandler = mxgraph.mxGraphHandler
// var mxEditor = mxgraph.mxEditor
// var mxConstants = mxgraph.mxConstants
// var mxUtils = mxgraph.mxUtils
// var mxCodec = mxgraph.mxCodec
// var mxKeyHandler = mxgraph.mxKeyHandler
// var mxPerimeter = mxgraph.mxPerimeter
// var mxObjectCodec = mxgraph.mxObjectCodec
// var mxCodecRegistry = mxgraph.mxCodecRegistry

export function JsonProperty(object) {
  this.object = object || {}
}
JsonProperty.prototype.setDefaultValue = function(key, value) {
  this.object[key] = this.object[key] || value
}
JsonProperty.prototype.reset = function(object) {
  this.object = object
}

JsonProperty.prototype.set = function(key, value) {
  this.object[key] = value
}

JsonProperty.prototype.get = function(key) {
  return this.object[key]
}
window.JsonProperty = JsonProperty

export function SpiderEditor(options) {
  options = options || {}
  var emptyFunction = function() {}
  this.selectedCellListener = options.selectedCellListener || emptyFunction
  if (mxClient.isBrowserSupported()) {
    this.editor = new mxEditor()
    this.editor.setGraphContainer(options.element)
    this.graph = this.editor.graph
    this.graph.setConnectable(true)
    this.graph.setMultigraph(false) // 禁止重复连接
    this.graph.setAllowLoops(true) // 允许自己连自己
    this.graph.isHtmlLabel = function(cell) {
      return !this.isSwimlane(cell)
    }
    mxConstants.MIN_HOTSPOT_SIZE = 16
    mxGraphHandler.prototype.guidesEnabled = true
    // 注册 json 编码器
    this.registerJsonCodec()
    // 配置样式
    this.configureStylesheet()
    var _this = this
    var pasteCount = 0
    mxEvent.addListener(options.element, 'paste', function(e) {
      var pasteText = e.clipboardData.getData('Text')
      var doc = mxUtils.parseXml(pasteText)
      if (doc) {
        var root = doc.documentElement
        var dec = new mxCodec(root.ownerDocument)
        var cells = dec.decode(root)
        if (cells && cells.length > 0) {
          pasteCount++
          _this.graph.setSelectionCells(_this.graph.importCells(cells, pasteCount * 10, pasteCount * 10, _this.graph.getDefaultParent()))
        } else {
          this.execute('paste')
        }
      } else {
        _this.execute('paste')
      }
    })
    this.keyHandler = new mxKeyHandler(this.graph)
    this.keyHandler.getFunction = function(evt) {
      if (evt != null) {
        return mxEvent.isControlDown(evt) || (mxClient.IS_MAC && evt.metaKey) ? this.controlKeys[evt.keyCode] : this.normalKeys[evt.keyCode]
      }
      return null
    }
    this.bindKeyAction()
    // 选择节点事件
    this.graph.getSelectionModel().addListener(mxEvent.CHANGE, function(sender, evt) {
      _this.onSelectedCell(sender, evt)
    })
  }
}

SpiderEditor.prototype.bindKeyAction = function() {
  var _this = this
  this.keyHandler.bindKey(46, function() {
    // 按 Delete
    _this.deleteSelectCells()
  })
  this.keyHandler.bindControlKey(90, function() {
    // Ctrl+Z
    _this.execute('undo')
  })
  this.keyHandler.bindControlKey(89, function() {
    // Ctrl+Y
    _this.execute('redo')
  })
  this.keyHandler.bindControlKey(88, function() {
    // Ctrl+X
    _this.execute('cut')
  })
  this.keyHandler.bindControlKey(67, function() {
    // Ctrl+C
    _this.executeCopy()
  })
  this.keyHandler.bindControlKey(65, function() {
    // Ctrl+A
    // editor.execute('selectAll')
    _this.execute('selectAll')
  })
}

SpiderEditor.prototype.configureStylesheet = function() {
  var style = {}
  style = this.graph.getStylesheet().getDefaultEdgeStyle()
  style[mxConstants.STYLE_EDGE] = mxConstants.EDGESTYLE_ORTHOGONAL
  style[mxConstants.STYLE_STROKECOLOR] = 'black'
  style[mxConstants.STYLE_STROKEWIDTH] = '2'
  style = this.graph.getStylesheet().getDefaultVertexStyle()
  style[mxConstants.STYLE_STROKECOLOR] = 'black'
  style[mxConstants.STYLE_FONTSIZE] = 12
  this.graph.alternateEdgeStyle = 'elbow=vertical'
}

SpiderEditor.prototype.deleteSelectCells = function() {
  this.graph.escape()
  var selectCells = this.graph.getDeletableCells(this.graph.getSelectionCells())
  if (selectCells != null && selectCells.length > 0) {
    var cells = []
    for (var i = 0, len = selectCells.length; i < len; i++) {
      var cell = selectCells[i]
      if (!cell.isVertex() || (cell.data && cell.data.get('shape') != 'start')) {
        cells.push(cell)
      }
    }
    if (cells.length === 0) {
      return
    }
    var parents = this.graph.selectParentAfterDelete ? this.graph.model.getParents(cells) : null
    this.graph.removeCells(cells, true)
    if (parents != null) {
      var select = []
      for (let i = 0; i < parents.length; i++) {
        if (this.graph.model.contains(parents[i]) && (this.graph.model.isVertex(parents[i]) || this.graph.model.isEdge(parents[i]))) {
          select.push(parents[i])
        }
      }
      this.graph.setSelectionCells(select)
    }
  }
}

SpiderEditor.prototype.addShape = function(shape, label, element, defaultAdd) {
  var style = {}
  if (shape === 'comment') {
    style[mxConstants.STYLE_FILLCOLOR] = 'none'
    style[mxConstants.STYLE_STROKECOLOR] = 'none'
  } else {
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE
    style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP
    style[mxConstants.STYLE_IMAGE_WIDTH] = 32
    style[mxConstants.STYLE_IMAGE_HEIGHT] = 32
    style[mxConstants.STYLE_IMAGE] = element.src
    style[mxConstants.STYLE_PERIMETER] = mxPerimeter.RectanglePerimeter
    style[mxConstants.STYLE_SPACING_TOP] = -26
  }
  style[mxConstants.STYLE_FONTCOLOR] = '#000000'
  this.graph.getStylesheet().putCellStyle(shape, style)
  var _this = this
  var funct = function(graph, evt, cell, x, y) {
    var parent = _this.graph.getDefaultParent()
    var model = _this.graph.getModel()
    model.beginUpdate()
    var cell
    try {
      cell = _this.graph.insertVertex(parent, null, label, x, y, 32, 32, shape)
      cell.data = new JsonProperty()
      cell.data.set('shape', shape)
    } finally {
      model.endUpdate()
    }
    _this.graph.setSelectionCell(cell)
  }
  var dragElt = document.createElement('div')
  dragElt.style.border = 'dashed black 1px'
  dragElt.style.width = '32px'
  dragElt.style.height = '32px'
  var ds = mxUtils.makeDraggable(element, this.graph, funct, dragElt, 0, 0, true, true)
  ds.setGuidesEnabled(true)
  if (defaultAdd) {
    var parent = this.graph.getDefaultParent()
    var model = this.graph.getModel()
    model.beginUpdate()
    var cell
    try {
      cell = this.graph.insertVertex(parent, null, label, 80, 80, 32, 32, shape)
      cell.data = new JsonProperty()
      cell.data.set('shape', shape)
    } finally {
      model.endUpdate()
    }
  }
}

SpiderEditor.prototype.registerJsonCodec = function() {
  var codec = new mxObjectCodec(new JsonProperty())
  codec.encode = function(enc, obj) {
    var node = enc.document.createElement('JsonProperty')
    mxUtils.setTextContent(node, JSON.stringify(obj.object))
    return node
  }
  codec.decode = function(dec, node, into) {
    return new JsonProperty(JSON.parse(mxUtils.getTextContent(node)))
  }
  mxCodecRegistry.register(codec)
}

SpiderEditor.prototype.onSelectedCell = function(sender, evt) {
  this.selectedCellListener(this.getSelectedCell())
}

SpiderEditor.prototype.getModel = function() {
  return this.graph.getModel()
}

SpiderEditor.prototype.executeCopy = function() {
  this.editor.execute('copy')
  var cells = this.graph.getSelectionCells()
  if (cells && cells.length > 0) {
    var copyText = document.createElement('textarea')
    copyText.style = 'position:absolute;left:-99999999px'
    document.body.appendChild(copyText)
    copyText.innerHTML = mxUtils.getPrettyXml(new mxCodec().encode(cells))
    copyText.readOnly = false
    copyText.select()
    copyText.setSelectionRange(0, copyText.value.length)
    document.execCommand('copy')
    document.body.removeChild(copyText)
  }
}

SpiderEditor.prototype.execute = function(action) {
  if (action === 'copy') {
    this.executeCopy()
  } else {
    this.editor.execute(action)
  }
}

SpiderEditor.prototype.getSelectedCell = function() {
  var cell = this.graph.getSelectionCell() || this.graph.getModel().getRoot()
  cell.data = cell.data || new JsonProperty()
  return cell
}

SpiderEditor.prototype.getXML = function() {
  return mxUtils.getPrettyXml(new mxCodec(mxUtils.createXmlDocument()).encode(this.graph.getModel()))
}

SpiderEditor.prototype.selectCell = function(cell) {
  this.graph.setSelectionCell(cell)
}

SpiderEditor.prototype.valid = function() {
  var cells = this.editor.graph.getModel().cells
  for (var key in cells) {
    var cell = cells[key]
    if (cell && cell.edge) {
      if (cell.source == null || cell.target == null) {
        return cell
      }
    }
  }
  return null
}

SpiderEditor.prototype.setXML = function(xml) {
  var doc = mxUtils.parseXml(xml)
  var root = doc.documentElement
  var dec = new mxCodec(root.ownerDocument)
  dec.decode(root, this.getModel())
  this.selectedCellListener(this.getSelectedCell())
}

SpiderEditor.prototype.importFromUrl = function(url) {
  var req = mxUtils.load(url)
  var root = req.getDocumentElement()
  var dec = new mxCodec(root.ownerDocument)
  dec.decode(root, this.getModel())
}
