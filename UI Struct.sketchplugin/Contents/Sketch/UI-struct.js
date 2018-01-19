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
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports['default'] = function (context) {
	new App(context);
};

function App(context) {
	this.api = context;
	this.doc = context.document;
	this.feNamePre = 'fe/';
	this.init();
};

/*初始化*/
App.prototype.init = function () {
	var _it = this;
	var selection = _it.api.selection;
	var selectionLen = selection.count();

	if (selectionLen > 0) {
		// 遍历每一个选中的元素
		for (var i = selectionLen; i--;) {
			var selItem = selection[i];
			if (selItem.className() == 'MSLayerGroup') {
				_it.dealSelection(selItem);
			} else {
				_it.msg('Please select a group 😊');
			}
		}
	} else {
		_it.msg('Please select a group 😊');
	}
};

/**
 * [msg 显示错误信息]
 * @param  {[type]} msg [错误信息]
 * @return {[type]}     [description]
 */
App.prototype.msg = function (msg) {
	this.doc.showMessage(msg);
};

/**
 * [dealSelection description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
App.prototype.dealSelection = function (item) {
	var _it = this;
	var parent = _it.copyThisGroup(item);
	_it.forEachKids(parent, function (kid) {
		_it.maskIt(kid);
	});
};

/**
 * [appendLayers 添加元素]
 * @param  {[type]} parent [要添加的父级容器]
 * @param  {[type]} items  [要添加的元素]
 * @return {[type]}        [description]
 */
App.prototype.appendLayers = function (parent, items) {
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
 * [getShapeByData 根据数据创建矩形]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
App.prototype.getShapeByData = function (data) {
	var _it = this;

	// 创建形状
	var cgRect = CGRectMake(data.x, data.y, data.width, data.height);
	var newShape = MSShapeGroup.shapeWithRect_(cgRect);

	// 设置颜色
	data.color && _it.setFillColor(newShape, data.color);

	// 设置名字
	data.name && newShape.setName_(data.name);
	return newShape;
};

/**
 * [dealGroup 处理形状]
 * @param  {[type]} it [description]
 * @return {[type]}    [description]
 */
App.prototype.dealGroup = function (it) {
	var _it = this;
	var frame = it.frame();
	var shape = _it.getShapeByData({
		x: 0,
		y: 0,
		width: frame.width(),
		height: frame.height(),
		color: 'rgba(0,0,0,0.1)',
		name: 'g: ' + it.name()
	});
	_it.appendLayers(it, [shape]);
};

/**
 * [isIgnore 根据文件名判断是否忽略]
 * @param  {[type]}  it [description]
 * @return {Boolean}    [description]
 */
App.prototype.isIgnore = function (it) {
	var name = it.name();

	// 下滑线开头的则忽略
	return name.charAt(0) == '_';
};

/**
 * [dealText 处理文本]
 * @param  {[type]} it [description]
 * @return {[type]}    [description]
 */
App.prototype.dealText = function (it) {
	var _it = this;
	var frame = it.frame();
	var parent = it.parentGroup();
	var color = 'rgba(0,0,0,0.1)';
	var errorColor = 'rgba(255,0,0,0.1)';
	var height = frame.height();
	var name = it.name();

	// 如果忽略则不处理里面所有的逻辑
	if (!_it.isIgnore(it)) {

		// 如果文字没有使用共享样式则认为此文本无效
		if (!it.style().sharedObjectID()) {
			color = errorColor;
			name = 'No share textStyle';
		}

		// 如果行高不存在或者高度不是行高的固定倍数那么报错
		var lineHeight = it.lineHeight();
		if (!lineHeight) {
			color = errorColor;
			name = 'No lh';
		}
		if (height % lineHeight != 0) {
			color = errorColor;
			name = 'h % lh != 0';
		}
	}

	var shape = _it.getShapeByData({
		x: frame.x(),
		y: frame.y(),
		width: frame.width(),
		height: height,
		color: color,
		name: 't: ' + name
	});

	parent.insertLayers_beforeLayer([shape], it);
	it.removeFromParent();
};

/**
 * [dealShape 处理形状]
 * @param  {[type]} it [description]
 * @return {[type]}    [description]
 */
App.prototype.dealShape = function (it) {
	var _it = this;
	var frame = it.frame();
	var parent = it.parentGroup();
	var shape = _it.getShapeByData({
		x: frame.x(),
		y: frame.y(),
		width: frame.width(),
		height: frame.height(),
		color: 'rgba(0,0,0,0.1)',
		name: 's: ' + it.name()
	});
	parent.insertLayers_beforeLayer([shape], it);
	it.removeFromParent();
};

/**
 * [maskIt 处理遮罩]
 * @param  {[type]} it [description]
 * @return {[type]}    [description]
 */
App.prototype.maskIt = function (it) {
	var _it = this;
	var type = it.className();

	if (type == 'MSLayerGroup') {
		_it.dealGroup(it);
	} else if (type == 'MSTextLayer') {
		_it.dealText(it);
	} else if (type == 'MSShapeGroup') {
		_it.dealShape(it);
	} else if (type == 'MSSymbolInstance') {
		_it.dealShape(it);
	} else if (type == 'MSBitmapLayer') {
		// _it.remove(it);
		it.removeFromParent();
	}
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

App.prototype.getColorByString = function (colorString) {
	return MSImmutableColor.colorWithSVGString(colorString).newMutableCounterpart();
};

/**
 * [setFillColor 设置fill的颜色]
 * @param {[type]} it    [description]
 * @param {[type]} color [description]
 * var fill = it.style().addStylePartOfType(0);
 * fill.color = MSColor.colorWithRGBADictionary({r: 0.8, g: 0.1, b: 0.1, a: 0.5});
 */
App.prototype.setFillColor = function (it, color) {
	var _it = this;
	it.style().addStylePartOfType(0).color = _it.getColorByString(color);
};

/**
 * [setNameByData 根据属性创建数据名]
 * @param {[type]} it   [description]
 * @param {[type]} data [description]
 */
App.prototype.setNameByData = function (it, data) {
	var name = '';
	for (var key in data) {
		var value = data[key];
		if (key == 'id') {
			name += value + ':';
		} else {
			name += ' ' + key + value;
		}
	}
	it.setName_(name);
};

/**
 * [forEachSons 遍历每一个儿子]
 * @param  {[type]}   parent   [父元素]
 * @param  {Function} callback [遍历之后做什么]
 * @return {[type]}            [description]
 */
App.prototype.forEachSons = function (parent, callback) {
	var sons = parent.layers();
	for (var i = sons.count(); i--;) {
		callback(sons[i]);
	}
};

/**
 * [forEachSons 遍历子子孙孙包括自己]
 * @param  {[type]}   parent   [父元素]
 * @param  {Function} callback [遍历之后做什么]
 * @return {[type]}            [description]
 */
App.prototype.forEachKids = function (parent, callback) {
	var kis = parent.children();
	for (var i = kis.count(); i--;) {
		callback(kis[i]);
	}
};

/**
 * [removeSonByName 移除这个名字的儿子]
 * @param  {[type]} parent     [父元素]
 * @param  {[type]} filterName [需要移除的儿子的名字]
 * @return {[type]}            [description]
 */
App.prototype.removeSonByName = function (parent, filterName) {
	var _it = this;
	_it.forEachSons(parent, function (layer) {
		var name = layer.name();
		filterName == name && layer.removeFromParent();
	});
};

/**
 * [duplicate 复制自己]
 * @param  {[type]} it          [自己]
 * @param  {[type]} name        [复制后的名字，如果为空，那么名字为自己名字本身]
 * @param  {[type]} parentGroup [复制到的位置，如果为空，那么就复制到自己当前层级]
 * @return {[type]}             [返回复制后的元素]
 */
App.prototype.duplicate = function (it, name, parentGroup) {
	var parentGroup = parentGroup || it.parentGroup();
	var duplicate = it.copy();
	duplicate.setName_(name || it.name());
	parentGroup.insertLayers_afterLayer_([duplicate], it);
	return duplicate;
};

/**
 * [copyThisGroup 在自己的当前层级创建一个备份，如果之前有就清除之前的备份]
 * @param  {[type]} it   [description]
 * @return {[type]}      [description]
 */
App.prototype.copyThisGroup = function (group) {
	var _it = this;
	var parentGroup = group.parentGroup();
	var copyName = _it.feNamePre + group.name();
	_it.removeSonByName(parentGroup, copyName);
	var groupCopy = _it.duplicate(group, copyName, parentGroup);
	return groupCopy;
};

/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')
