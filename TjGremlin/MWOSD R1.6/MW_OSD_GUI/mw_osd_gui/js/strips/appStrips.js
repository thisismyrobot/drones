/**
 * main app class for edit max7456 file, connect module by handler
 * @constructor
 */
var AppStrips = function () {
	this.screen = new ScreenStripsEditor($('#editorTable'));
	this.screen.disabled = true;
	this.preview = new FontMap($('#fontMap'));
	this.bigPreview = new FontWrite([], $('#preview'), 10);
	this.imageLoader = new ImageLoader();

	var _this = this;

	//scale UI
	$("#scale").slider({
		value: _this.bigPreview.scale,
		min: 1,
		max: 19,
		step: 1,
		slide: function (event, ui) {
			_this.bigPreview.setScale(ui.value);
		}
	});

	//change color
	$("#select_color").buttonset();
	$("#select_color > input").change(function () {
		_this.screen.fillType = $(this).attr('id');
	});

	//connect screen to bigpreview and preview
	this.screen.onChangeOnPosition = function (x, y, color) {
		_this.bigPreview.drawToPosition(x, y, color);
		_this.preview.drawToPosition(x, y, color);
	};

	this.screen.onChangeFontData = function (fontData) {
		_this.bigPreview.setNewImageData(fontData);
		_this.preview.setNewImageData(fontData);
	};

	//inicialize clear button
	$("#clear")
		.button()
		.click(function (event) {
			event.preventDefault();
			_this.screen.deepClearScreen();
		});

	//connect preview to screen and bigpreview
	this.preview.onChangeFontData = function (fontData) {
		_this.screen.setNewImageData(fontData);
		_this.bigPreview.setNewImageData(fontData);
		_this.screen.disabled = false;
	};

	this.imageLoader.onChangefontDataOnPosition = function (fontData, position) {
		_this.preview.setNewImageDataToIndex(fontData, position);
	}
};

/**
 * render all component
 */
AppStrips.prototype.run = function () {
	this.screen.render();
	this.preview.render();
};

/**
 *
 * @param data
 */
AppStrips.prototype.loadDataFromString = function (data) {
	this.preview.setFontsData(data);
	this.bigPreview.setNewImageData([]);
	this.screen.setNewImageData([]);
	this.screen.disabled = true;
};

/**
 * this is test function, in future we will use load from file, or something like it
 *
 * @param urlTarget
 */
AppStrips.prototype.loadDataByAjax = function (urlTarget, doneCallBack) {
	var _this = this;
	$.ajax({
		url: urlTarget,
		context: document.body
	}).done(function (data) {
		_this.preview.setFontsData(data);
		_this.bigPreview.setNewImageData([]);
		_this.screen.setNewImageData([]);
		_this.screen.disabled = true;

		if (doneCallBack) {
			doneCallBack();
		}
	});
};

/**
 *
 * @param urlTarget
 */
AppStrips.prototype.loadImageByurl = function (urlTarget) {
	this.imageLoader.loadImageByUrl(urlTarget);
};

/**
 * show raw data for file
 *
 * #MTODO, need wrap after X chars
 */
AppStrips.prototype.fontsData = function () {
	var buffer = "";
	for (var i = 0; i < this.preview.canvaseElements.length; i++) {
		buffer += this.preview.canvaseElements[i].fontData.join('');
	}

	var formatedBuffer = 'MAX7456\n';
	for (var i = 1; i <= buffer.length; i++) {
		formatedBuffer += buffer[i - 1];
		formatedBuffer += i % 8 == 0 ? '\n' : '';
	}
	return formatedBuffer;
};
