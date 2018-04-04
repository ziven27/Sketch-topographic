import Common from './_/Common.js';

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
};