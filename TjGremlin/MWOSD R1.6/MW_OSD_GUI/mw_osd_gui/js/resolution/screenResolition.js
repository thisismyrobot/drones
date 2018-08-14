/* ##################################################### */
/* SCREEN SETTING
 /* ##################################################### */

var scrennSetting = {
	pal: [30, 14],
	ntsc: [30, 11]
};

/* ##################################################### */



/* ##################################################### */
/* SCREEN CLASS
 /* ##################################################### */
/**
 * manin app class for edit screen for mw_osd
 * @param element
 * @constructor
 */
ScreenResolutionEditor = function (element, screenMode) {

	screenMode = screenMode || 'pal';

	this.scale = 1; // only int
	this.fontWidth = 12 * this.scale;
	this.fontHeight = 18 * this.scale;

	this.screenSize = screenMode == 'pal' ? scrennSetting.pal : scrennSetting.ntsc;

	this.canvas = element;
	this.ctx = this.canvas[0].getContext("2d");
	this.parentNode = element;
	this.imageObj = new Image(); // backgroundimage
	this.onLoadImage = function () {
	};
	this.osdGrid = $('<table>').attr('id', 'resolutionEditor');
	this.canvasGrid = [];
	this.elements = [];
	this.markedTimeout = null;
};

/**
 *
 * @param unit
 */
ScreenResolutionEditor.prototype.setProfile = function (profile) {
	BaseSettings.profile = profile;
	this._reDrawScreen();
};

/**
 * render background image and table with canvases
 *
 */
ScreenResolutionEditor.prototype.render = function () {
	this.canvas[0].height = this.fontHeight * this.screenSize[1];
	this.canvas[0].width = this.fontWidth * this.screenSize[0];
	this.canvas.attr('width', this.fontWidth * this.screenSize[0] + 'px');
	this.canvas.attr('height', this.fontHeight * this.screenSize[1] + 'px');
	this.ctx.scale(this.scale / 2, this.scale / 2);
	this.ctx.drawImage(this.imageObj, 0, 0);
	this.markedElement = null;

	this.osdGrid.attr('style', 'position: absolute; top: 0px; width:' + this.canvas[0].width + 'px; height:' + this.canvas[0].height + 'px');

	for (var y = 0; y < this.screenSize[1]; y++) {
		var row = $('<tr>');

		this.osdGrid.append(row);
		this.canvasGrid[y] = [];
		for (var x = 0; x < this.screenSize[0]; x++) {
			var canvas = $('<canvas>');
			canvas[0].height = this.fontHeight;
			canvas[0].width = this.fontWidth;
			this.canvasGrid[y][x] = canvas[0].getContext('2d');

			var cell = $('<td>').append(canvas);
			row.append(cell);
			if (x == this.screenSize[0] - 1) {
				cell.attr('style', 'border-left: 1px solid black');
			}
		}
	}

	this.parentNode.after(this.osdGrid);
};

/**
 * add element to register, it must be setting class from element.js file, name is ID, must be unique
 *
 * @param name
 * @param settings
 */
ScreenResolutionEditor.prototype.addElement = function (name, settings) {


	this.elements[name] = {
		isDisplayed: false,
		isDisplayedMaster: true,
		settings: settings,
		position: [0, 0],
		value: null

	};
	this._reDrawScreen();
};

/**
 *
 * @param name
 */
ScreenResolutionEditor.prototype.toogleElement = function (name) {
	if (this.elements[name]) {
		this.elements[name].isDisplayed = !this.elements[name].isDisplayed;

		for(var elementName in this.elements[name].settings.dependElements){
			if(this.elements[this.elements[name].settings.dependElements[elementName]]){
				this.elements[this.elements[name].settings.dependElements[elementName]].isDisplayedMaster = this.elements[name].isDisplayed;
			}
		}

		this._reDrawScreen();
	}
};

/**
 *
 * @param name
 */
ScreenResolutionEditor.prototype.isDisplayedElement = function (name) {
	if (this.elements[name]) {
		return this.elements[name].isDisplayed && this.elements[name].isDisplayedMaster && this.elements[name].settings.get(this.elements[name].value).length > 0;
	}

	return false;
};

/**
 *
 * @param name
 */
ScreenResolutionEditor.prototype.markElement = function (name) {
	if (this.elements[name]) {
		this.markedElement = name;
		this._rebuildMarkElements();
	}

	return false;
};

/**
 *
 * @param name
 */
ScreenResolutionEditor.prototype._rebuildMarkElements = function () {

	this.osdGrid.find('td').removeClass('marked');
	var _this = this;

	clearTimeout(_this.markedTimeout);

	if (this.elements[this.markedElement]) {
		var element = this.elements[this.markedElement];
		var list = element.settings.get(element.value);
		for (var i = 0; i < list.length; i++) {
			this.osdGrid.find('tr:nth-child(' + (list[i].position[1] + 1 + element.position[1]) + ')').find('td:nth-child(' + (list[i].position[0] + 1 + element.position[0]) + ')').addClass('marked');
		}

		if (!(this.elements[this.markedElement].isDisplayed == false || this.elements[this.markedElement].isDisplayedMaster)) {

			_this.markedTimeout = setTimeout(function () {
				$('.marked').removeClass('marked');
			}, 3000)
		}

	}

	return false;
};


/**
 *
 * @param name
 * @returns {*}
 */
ScreenResolutionEditor.prototype.getElementPosition = function (name) {
	if (this.elements[name]) {
		return [this.elements[name].position[0] - this.elements[name].settings.offsetX, this.elements[name].position[1] - this.elements[name].settings.offsetY];
	}

	return [0, 0]
};

/**
 *
 * @param name
 * @returns {*}
 */
ScreenResolutionEditor.prototype.removeAllElements = function () {
	this.elements = [];
	this.clearScreen();
};

/**
 *
 */
ScreenResolutionEditor.prototype.clearScreen = function () {
	for (var y = 0; y < this.canvasGrid.length; y++) {
		for (var x = 0; x < this.canvasGrid[y].length; x++) {
			var ctx = this.canvasGrid[y][x];
			ctx.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);
		}
	}
};

/**
 * move element to relative position, and check whether is posible move element to position
 *
 * @param x
 * @param y
 * @param name
 */
ScreenResolutionEditor.prototype.moveElementToPositionX = function (name, x) {
	if (this.elements[name]) {
		var element = this.elements[name];

		if(!element.settings.canMove){
			return false;
		}

		element.position = [element.position[0] + x, element.position[1]];
		this._reDrawScreen();
		return x;
	} else {
		return false;
	}
};

/**
 * move element to relative position, and check whether is posible move element to position
 *
 * @param x
 * @param y
 * @param name
 */
ScreenResolutionEditor.prototype.moveElementToPositionY = function (name, y) {
	if (this.elements[name]) {
		var element = this.elements[name];

		if(!element.settings.canMove){
			return false;
		}

		element.position = [element.position[0], element.position[1] + y];
		this._reDrawScreen();
		return y;
	} else {
		console.log('element ' + name + ' doesnt exist');
		return false;

	}
};

/**
 *
 * if add element, so it is hiden, we have to set display to on, if we want to display element
 *
 * @param name
 * @param displayedState
 */
ScreenResolutionEditor.prototype.setDisplayedElement = function (name, displayedState, x, y) {
	var displayedState = Boolean(displayedState);
	if (this.elements[name]) {
		x = this.elements[name].settings.offsetX + x;
		y = this.elements[name].settings.offsetY + y;

		this.elements[name].position = [x, y];

		if (this.elements[name].isDisplayed && !displayedState) {
			this.elements[name].isDisplayed = false;

			this._reDrawScreen();
			return true;
		}

		if (!this.elements[name].isDisplayed && displayedState) {
			//check is in area
			this.elements[name].isDisplayed = true;

			this.elements[name].isDisplayed = true;
			this._reDrawScreen();
			return true;
		}
	} else {
		console.log('element ' + name + ' doesnt exist');
	}
};

/**
 * internal function
 *
 * @param name
 */
ScreenResolutionEditor.prototype._reDrawScreen = function () {
	this.clearScreen();
	this._rebuildMarkElements();
	for (var elementKey in this.elements) {
		var element = this.elements[elementKey];

		if (!element.isDisplayed || !element.isDisplayedMaster) {
			continue;
		}


		var list = element.settings.get(element.value);

		for (var i = 0; i < list.length; i++) {
			var fontWrite = list[i].element;

			if (this.scale != fontWrite.scale) {
				fontWrite.setScale(this.scale);
			}


			if (
				this.canvasGrid[element.position[1] + list[i].position[1]]
				&&
				this.canvasGrid[element.position[1] + list[i].position[1]][element.position[0] + list[i].position[0]]
			) {
				var imageData = this.canvasGrid[element.position[1] + list[i].position[1]][element.position[0] + list[i].position[0]].getImageData(0, 0, fontWrite.imgData.width, fontWrite.imgData.height);

				this.canvasGrid[element.position[1] + list[i].position[1]][element.position[0] + list[i].position[0]].putImageData(this._combineImageData(imageData, fontWrite.imgData), 0, 0);
			}
		}
	}
};

/**
 *
 * @param data1
 * @param data2
 * @private
 */
ScreenResolutionEditor.prototype._combineImageData = function (ImageData1, ImageData2) {
	for (var i = 0; i < ImageData1.data.length; i = i + 4) { // iterate through the imageDataArray
		if (ImageData1.data[i] == 0 && ImageData1.data[i + 1] == 0 && ImageData1.data[i + 2] == 0 && ImageData1.data[i + 3] == 0) {
			ImageData1.data[i] = ImageData2.data[i];
			ImageData1.data[i + 1] = ImageData2.data[i + 1];
			ImageData1.data[i + 2] = ImageData2.data[i + 2];
			ImageData1.data[i + 3] = ImageData2.data[i + 3];
		}

	}

	return ImageData1;

};

/**
 * set value to setting class, be careful for type of variable
 *
 * @param name
 */
ScreenResolutionEditor.prototype.setValue = function (name, value) {
	if (this.elements[name]) {
		this.elements[name].value = value;
		this._reDrawScreen();
	}
}
;

/**
 *
 * @param url
 */
ScreenResolutionEditor.prototype.loadImageByUrl = function (url) {
	this.imageObj.src = url;

	var _this = this;
	this.imageObj.onload = function () {
		_this.render();
		_this.onLoadImage();
	};
};

/**
 *
 * @param fonMap
 */
ScreenResolutionEditor.prototype.setNewFontMap = function (fontMap) {
	this._reDrawScreen();
};

/* ##################################################### */
