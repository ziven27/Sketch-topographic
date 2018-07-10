import _utils from '../_/utils.js';

const _api = context;

function App() {
	this.removeCount = 0;
	this.init();
};

App.prototype.init = function() {
	var _it = this;
	var artBoard = _utils.getCurrentArtBoard();
	if(!artBoard){
		return false;
	}
	artBoard.children().forEach(function(layer, index) {
		// 忽略自己
		if (index === 0) {
			return;
		}
		if (layer.name().substr(0, 3) == '_fe') {
			layer.removeFromParent();
			_it.removeCount++;
		}
	});
	_utils.msg('Clear Success');
};

export default function() {
	new App();
};