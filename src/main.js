import Common from './_/Common.js';
import clear from './_/Clear.js';

function showBoundingBox() {
	new Common({
		showType: 1
	});
}

function showTopographic() {
	new Common({
		showType: 0
	});
}

export {
	showBoundingBox,
	showTopographic,
	clear,
};