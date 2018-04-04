var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.clear = exports.showTopographic = exports.showBoundingBox = undefined;

var _Common = __webpack_require__(1);

var _Common2 = _interopRequireDefault(_Common);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function showBoundingBox() {
	new _Common2['default']({
		showType: 1
	});
}

function showTopographic() {
	new _Common2['default']({
		showType: 2
	});
}

function clear() {
	new _Common2['default']({
		showType: 0
	});
}

exports.showBoundingBox = showBoundingBox;
exports.showTopographic = showTopographic;
exports.clear = clear;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils2 = __webpack_require__(2);

var _utils3 = _interopRequireDefault(_utils2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _api = context;
var _doc = _api.document;

function App(opt) {
	// 0 代表地貌
	// 1 代表线框
	this.showType = opt.showType || 0;
	this.init();
};

App.prototype.init = function () {
	var _it = this;
	_utils3['default'].msg('TADA!!!!! 😊');

	// 获取当前选中第一个元素所在的画板
	var selections = _api.selection;
	if (!selections.count()) {
		_utils3['default'].msg('Please select something 😊');
		return;
	}
	var artBoard = selections[0].parentArtboard();
	if (!artBoard) {
		_utils3['default'].msg('Please select something 😊');
		return;
	}

	// 一个子元素都没有就什么都不做
	var layersNum = artBoard.layers().count();
	if (!(layersNum > 0)) {
		_utils3['default'].msg('This is an empty artboard 😊');
		return;
	}

	// 如果能找到'_fe'文件夹就直接删掉，然后理解为是第二次操作
	if (_it.showType == 0) {
		var lastLayer = _utils3['default'].getLastLayer(artBoard);
		var lastLayerName = lastLayer.name();
		if (lastLayerName == '_fe') {
			lastLayer.removeFromParent();
			return;
		}
	}

	var group = _utils3['default'].getGroupWithAllSon(artBoard);

	// 依次遍历每一个元素
	group.children().forEach(function (layer, index) {
		// 忽略自己
		if (index === 0) {
			return;
		}
		var info = _it.getLayerInfo(layer);
		_it.showShapeByInfo(layer, info);
	});
	group.setName('_fe');
	group.setIsLocked(true);
	artBoard.addLayers([group]);
	// group.setIsSelected(true);
};

App.prototype.showShapeByInfo = function (layer, info) {
	var _it = this;
	// 删除默认要删除的
	if (info.del) {
		layer.removeFromParent();
		return;
	}

	var frame = layer.frame();
	var shape = _utils3['default'].getShapeByData({
		showType: _it.showType,
		error: info.error,
		name: info.name,
		x: info.type == 'MSLayerGroup' ? 0 : frame.x(),
		y: info.type == 'MSLayerGroup' ? 0 : frame.y(),
		w: frame.width(),
		h: frame.height()
	});

	if (info.append2Myself) {
		_utils3['default'].appendLayers(layer, [shape]);
		return;
	}

	if (info.replaceWithShape) {
		_utils3['default'].replaceLayerByShapes(layer, [shape]);
		return;
	}
};

/**
 * [getLayerInfo 输出layer信息]
 * @param  {[type]} layer [description]
 * @return {[type]}       [description]
 */
App.prototype.getLayerInfo = function (layer) {
	var _it = this;
	var name = layer.name();
	var type = layer.className();

	var info = {
		type: type
		// del:false //是否删除
		// append2Myself:false // 直接在内部添加形状
		// replaceWithShape:false // 将自身替换成形状
	};

	// 如果以下划线开头则删除这个元素
	if (name.charAt(0) == '_') {
		info.del = true;
		return info;
	}
	// 如果是图片也删除这个元素
	if (type == 'MSBitmapLayer') {
		info.del = true;
		return info;
	}

	// 如果是文件夹则判断自身
	if (type == 'MSLayerGroup') {
		info.name = 'g:' + name;
		info.append2Myself = true;
		return info;
	}

	// 如果是形状或者是symbol
	if (type == 'MSShapeGroup' || type == 'MSSymbolInstance') {
		info.name = 's:' + name;
		info.replaceWithShape = true;
		return info;
	}

	// 处理文字
	if (type == 'MSTextLayer') {
		info.replaceWithShape = true;
		_utils3['default'].setTextInfo(info, layer);
		return info;
	}

	return info;
};

exports['default'] = App;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
var _api = context;

var app = {};

/**
 * [msg 显示错误消息]
 * @param  {[type]} msg [description]
 * @return {[type]}     [description]
 */
app.msg = function (msg) {
	!!msg && context.document.showMessage(msg);
};

/**
 * [getLastLayer 获取最后一个字元素]
 * @param  {[type]} parentGroup [description]
 * @return {[type]}             [description]
 */
app.getLastLayer = function (parentGroup) {
	var layers = parentGroup.layers();
	return layers[layers.count() - 1];
};

/**
 * [getGroupWithAllSon 获取改层所有元素的拷贝]
 * @param  {[type]} parentGroup [description]
 * @return {[type]}             [description]
 */
app.getGroupWithAllSon = function (parentGroup) {
	// 创建一个空的Group
	var group = MSLayerGroup['new']();

	// 遍历这个画板里面的所有子元素
	parentGroup.layers().forEach(function (layer) {
		var name = layer.name();

		// 如果子元素的名字是'_fe'那么删除
		// 如果自元素是以下划线开头则什么都不做
		if (name.substr(0, 3) == '_fe') {
			layer.removeFromParent();
		} else if (name.charAt(0) != '_') {
			var duplicate = layer.copy();
			group.insertLayers_beforeLayer_([duplicate], layer);
		}
	});

	return group;
};

/**
 * [getColorByString 根据颜色字符串转换成sketck 需要的颜色对象]
 * @param  {[type]} colorString [description]
 * @return {[type]}             [description]
 * Hex
 * MSColorFromString("#33AE15")
 * MSColorFromString("#333")
 * MSColorFromString("FF0000")
 * MSColorFromString("#145515FF")
 *
 * rgb/rgba
 * MSColorFromString("rgb(255,0,0)")
 * MSColorFromString("rgba(255,0,0,0.5)")
 *
 * Color keywords
 * MSColorFromString("red")
 * MSColorFromString("blue")
 * MSColorFromString("magenta")
 * MSColorFromString("darkviolet")
 *
 * hls
 * MSColorFromString("hsl(270, 60%, 50%, .15)")
 * MSColorFromString("hsl(270deg, 60%, 70%)")
 * MSColorFromString("hsl(4.71239rad, 60%, 70%)")
 * MSColorFromString("hsla(240, 100%, 50%, .4)")
 * 
 */
app.getColorByString = function (colorString) {
	return MSImmutableColor.colorWithSVGString(colorString).newMutableCounterpart();
};

/**
 * [setFillColor 设置fill的颜色]
 * @param {[type]} it    [description]
 * @param {[type]} color [description]
 * var fill = it.style().addStylePartOfType(0);
 * fill.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 0.5});
 */
app.setFillColor = function (shape, color) {
	// 设置背景颜色
	var fill = shape.style().addStylePartOfType(0);
	fill.color = this.getColorByString(color);
};

/**
 * [setFillColor 设置边框的颜色]
 * @param {[type]} it    [description]
 * @param {[type]} color [description]
 * var fill = it.style().addStylePartOfType(0);
 * fill.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 0.5});
 */
app.setBorderColor = function (shape, color, thickness) {
	var border = shape.style().addStylePartOfType(1);
	border.color = this.getColorByString(color);
	border.thickness = thickness || 1;
};

/**
 * [setTextInfo 获取文本的信息]
 * @param {[type]} info  [description]
 * @param {[type]} layer [description]
 */
app.setTextInfo = function (info, layer) {
	var preName = 't:';

	// 如果文字没有使用共享样式报错
	if (!layer.style().sharedObjectID()) {
		info.error = true;
		info.name = preName + 'No share textStyle';
		return;
	}

	// 如果行高不存在报错
	var lineHeight = layer.lineHeight();
	if (!lineHeight) {
		info.error = true;
		info.name = preName + 'No lh';
		return;
	}

	// 高度不是行高的固定倍数报错
	var height = layer.frame().height();
	if (height % lineHeight != 0) {
		info.error = true;
		info.name = preName + 'h % lh != 0';
		return;
	}

	info.name = preName + layer.name();
};
/**
 * [appendLayers 添加元素]
 * @param  {[type]} parent [要添加的父级容器]
 * @param  {[type]} items  [要添加的元素]
 * @return {[type]}        [description]
 */
app.appendLayers = function (parent, items) {
	var bros = parent.layers();
	var brosNum = bros.count();
	if (brosNum > 0) {
		var lastBro = bros[0];
		parent.insertLayers_beforeLayer(items, lastBro);
	} else {
		parent.addLayers(items);
	}
};

/**
 * [replaceLayerByShape]
 * @param  {[type]} shape [description]
 * @param  {[type]} layer [description]
 * @return {[type]}       [description]
 */
app.replaceLayerByShapes = function (layer, items) {
	layer.parentGroup().insertLayers_beforeLayer(items, layer);
	layer.removeFromParent();
};

/**
 * [getEmptyShapeByLayer 获取一个层的形状]
 * @param  {[type]} layer [description]
 * @return {[type]}       [description]
 */
app.getShapeByData = function (data) {
	var _it = this;

	// 获取形状大小
	var cgRect = CGRectMake(data.x, data.y, data.w, data.h);
	// 创建形状
	var newShape = MSShapeGroup.shapeWithRect_(cgRect);

	// 设置名字
	data.name && newShape.setName_(data.name);

	if (data.showType == 2) {
		// 显示地貌
		var color = data.error ? 'rgba(255,0,0,0.2)' : 'rgba(0,0,0,0.1)';
		_it.setFillColor(newShape, color);
	} else if (data.showType == 1) {
		// 显示线框
		var color = data.error ? 'rgba(255,0,0,1)' : 'rgba(0,255,255,0.8)';
		_it.setBorderColor(newShape, color, 0.5);
	}

	return newShape;
};
exports['default'] = app;

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['showBoundingBox'] = __skpm_run.bind(this, 'showBoundingBox');
that['onRun'] = __skpm_run.bind(this, 'default');
that['showTopographic'] = __skpm_run.bind(this, 'showTopographic');
that['clear'] = __skpm_run.bind(this, 'clear')
