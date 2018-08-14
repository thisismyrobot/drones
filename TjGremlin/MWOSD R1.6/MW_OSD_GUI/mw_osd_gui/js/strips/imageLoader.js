/**
 * image loader load image to strips metric, 1:1, it cant rescale image
 *
 * @constructor
 */
var ImageLoader = function () {
	this.x = 12;
	this.y = 18;

	this.xCount = 16;
	this.yCount = 16;

	this.fontDataLength = 512;

	this.onChangefontDataOnPosition = function (fontData, position) {
	};
	this.imageObj = new Image();
};

/**
 * build fonts data (0101 for max7456 format) from image data, and convert to black/white/aplha
 *
 * @param imageObj
 */
ImageLoader.prototype.buildFontsData = function (imageObj) {

	var canvasPart = $('<canvas>').attr('width', this.x + 'px').attr('height:', this.y + 'px');
	var contextPart = canvasPart[0].getContext('2d');

	var canvasOriginal = $('<canvas>');
	canvasOriginal[0].width = imageObj.width;
	canvasOriginal[0].height = imageObj.height;

	var contextOriginal = canvasOriginal[0].getContext('2d');
	contextOriginal.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);

	var xCountStrip = Math.min(this.xCount, imageObj.width / this.x);
	var yCountStrip = Math.min(this.yCount, imageObj.height / this.y);

	for (var i = 0; i < yCountStrip; i++) {
		for (var ii = 0; ii < xCountStrip; ii++) {
			var partForStrip = contextOriginal.getImageData(ii * this.x, i * this.y, this.x, this.y);

			var fontData = '';
			for (var iii = 0; iii < partForStrip.data.length; iii += 4) {
				fontData += partForStrip.data[iii + 0] < 128 || partForStrip.data[iii + 1] < 128 || partForStrip.data[iii + 2] < 128 ? '0' : '1';
				fontData += partForStrip.data[iii + 3] == 0 ? '1' : '0';
			}

			fontData += '01'.repeat((this.fontDataLength - fontData.length) / 2);

			this.onChangefontDataOnPosition(fontData.split(''), (i * this.yCount) + ii);
		}
	}

	contextPart.putImageData(partForStrip, 0, 0);

};

/**
 *
 *
 * @param url
 */
ImageLoader.prototype.loadImageByUrl = function (url) {
	this.imageObj.src = url;
	var _this = this;
	this.imageObj.onload = function () {
		_this.buildFontsData(_this.imageObj);
	};
};
