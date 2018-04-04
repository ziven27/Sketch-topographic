import _utils from './utils.js';

const _api = context;
const _doc = _api.document;


function App(opt) {
	// 0 代表地貌
	// 1 代表线框
	this.showType = opt.showType || 0;
	this.init();
};

App.prototype.init = function() {
	var _it = this;
	_utils.msg('TADA!!!!! 😊');

	// 获取当前选中第一个元素所在的画板
	var selections = _api.selection;
	if (!selections.count()) {
		_utils.msg('Please select something 😊');
		return;
	}
	var artBoard = selections[0].parentArtboard();
	if (!artBoard) {
		_utils.msg('Please select something 😊');
		return;
	}

	// 一个子元素都没有就什么都不做
	var layersNum = artBoard.layers().count();
	if (!(layersNum > 0)) {
		_utils.msg('This is an empty artboard 😊');
		return;
	}

	// 如果能找到'_fe'文件夹就直接删掉，然后理解为是第二次操作
	var lastLayer = _utils.getLastLayer(artBoard);
	var lastLayerName = lastLayer.name();
	if (lastLayerName == '_fe' + _it.showType) {
		lastLayer.removeFromParent();
		return;
	}


	var group = _utils.getGroupWithAllSon(artBoard);

	// 依次遍历每一个元素
	group.children().forEach(function(layer, index) {
		// 忽略自己
		if (index === 0) {
			return;
		}
		var info = _it.getLayerInfo(layer);
		_it.showShapeByInfo(layer, info);
	});
	group.setName('_fe' + _it.showType);
	group.setIsLocked(true);
	artBoard.addLayers([group]);
};

App.prototype.showShapeByInfo = function(layer, info) {
	var _it = this;
	// 删除默认要删除的
	if (info.del) {
		layer.removeFromParent();
		return;
	}

	var frame = layer.frame();
	var shape = _utils.getShapeByData({
		showType: _it.showType,
		error: info.error,
		name: info.name,
		x: info.type == 'MSLayerGroup' ? 0 : frame.x(),
		y: info.type == 'MSLayerGroup' ? 0 : frame.y(),
		w: frame.width(),
		h: frame.height()
	});

	if (info.append2Myself) {
		_utils.appendLayers(layer, [shape]);
		return;
	}

	if (info.replaceWithShape) {
		_utils.replaceLayerByShapes(layer, [shape]);
		return;
	}
};

/**
 * [getLayerInfo 输出layer信息]
 * @param  {[type]} layer [description]
 * @return {[type]}       [description]
 */
App.prototype.getLayerInfo = function(layer) {
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
	if ((type == 'MSShapeGroup') || (type == 'MSSymbolInstance')) {
		info.name = 's:' + name;
		info.replaceWithShape = true;
		return info;
	}

	// 处理文字
	if (type == 'MSTextLayer') {
		info.replaceWithShape = true;
		_utils.setTextInfo(info, layer);
		return info;
	}

	return info;
};

export default App;