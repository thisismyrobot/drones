/**
 *
 * @param fontData
 * @param targetNode
 * @param scale
 * @constructor
 */
FontWrite = function (fontData, targetNode, scale) {

	this.baseSize = [12, 18];

	this.fontData = fontData;
	this.scale = scale;
	this.ctx = targetNode[0].getContext("2d");

	this.targetNode = targetNode;
	this.targetNode.attr('width', this.baseSize[0] * this.scale + 'px');
	this.targetNode.attr('height', this.baseSize[1] * this.scale + 'px');
	this.targetNode[0].width = this.baseSize[0] * this.scale;
	this.targetNode[0].height = this.baseSize[1] * this.scale;


	this.imgData = this.ctx.createImageData(this.baseSize[0] * this.scale, this.baseSize[1] * this.scale);

	this.onChangeOnPosition = function (x, y, color) {
	};
	this.onChangeFontData = function (fontData) {
	};

	this.buildFontsData();
};

/**
 *
 */
FontWrite.prototype.buildFontsData = function () {
	var x = 0;
	var y = 0;

	for (var i = 0; i < this.fontData.length; i += 2) {
		if (this.fontData[i + 1] == 0) { // black or white
			this._drawToPosition(x, y, this.fontData[i] == 0 ? 'black' : 'white');
		}

		if (x > this.baseSize[0] - 2) { // seek text line
			x = 0;
			y++;
		} else {
			x++
		}
	}
};

/**
 *
 * @param x
 * @param y
 * @param color
 */
FontWrite.prototype.drawToPosition = function (x, y, color) {
	var colorCode = [0, 1]; // transparent
	switch (color) {
		case 'white':
			colorCode = [1, 0];
			break;
		case 'black':
			colorCode = [0, 0];
			break;
		default:
			colorCode = [0, 1];
	}
	var pos = ((y * this.baseSize[0]) + x) * 2;


	this.fontData[pos] = colorCode[0];
	this.fontData[pos + 1] = colorCode[1];

	this._drawToPosition(x, y, color);
	this.onChangeOnPosition(x, y, color);
};

/**
 * internal, dont use this
 *
 * @param x
 * @param y
 * @param color
 */
FontWrite.prototype._drawToPosition = function (x, y, color) {
	var currentRowPosition = (y * 4 * this.baseSize[0] * this.scale * this.scale) + (x * 4 * this.scale);

	for (var row = 0; row < this.scale; row++) {
		for (var i = currentRowPosition; i < currentRowPosition + (4 * this.scale); i += 4) {
			var intColor = [0, 128];

			switch (color) {
				case 'white':
					intColor = [255, 255];
					break;
				case 'black':
					intColor = [0, 255];
					break;
				default:
					intColor = [0, 0];
			}

			this.imgData.data[i + 0] = intColor[0];
			this.imgData.data[i + 1] = intColor[0];
			this.imgData.data[i + 2] = intColor[0];
			this.imgData.data[i + 3] = intColor[1];
		}
		currentRowPosition = currentRowPosition + (this.baseSize[0] * this.scale * 4);
	}


	this.ctx.putImageData(this.imgData, 0, 0);
};

/**
 *
 * @param fontData
 */
FontWrite.prototype.setNewImageData = function (fontData) {
	this.clearScreen();
	this.fontData = fontData;
	this.onChangeFontData(fontData);
	this.buildFontsData();
};

/**
 * for scale use only int, big int (more than 50) can kill browser
 *
 * @param scale
 */
FontWrite.prototype.setScale = function (scale) {
	this.clearScreen();
	this.scale = scale;

	this.targetNode.attr('width', this.baseSize[0] * this.scale + 'px');
	this.targetNode.attr('height', this.baseSize[1] * this.scale + 'px');

	this.imgData = this.ctx.createImageData(this.baseSize[0] * this.scale, this.baseSize[1] * this.scale);

	this.buildFontsData();
};


/**
 * only clear screen (canvas image)
 *
 */
FontWrite.prototype.clearScreen = function () {
	this.ctx.clearRect(0, 0, this.ctx, this.ctx);
	this.imgData = this.ctx.createImageData(this.baseSize[0] * this.scale, this.baseSize[1] * this.scale);
	this.ctx.putImageData(this.imgData, 0, 0);
};
