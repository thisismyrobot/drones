/**
 *
 * @param targetNode
 * @constructor
 */
FontMap = function (targetNode) {

	this.address = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	this.size = [16, 16];

	this.editPosition = null;
	this.fontsData = null;
	this.targetNode = targetNode;
	this.screen = null;
	this.canvaseElements = [];
	this.onChangeOnPosition = function (x, y, color) {
	};
	this.onChangeFontData = function (fontData) {
	};
};

/**
 *
 */
FontMap.prototype.render = function () {
	var table = $('<table>');
	var row = $('<tr>');
	row.append($('<th>').html('&nbsp;'));
	for (var i = 0; i < this.address.length; i++) {
		var td = $('<th>').html(this.address[i]);
		row.append(td);
	}
	table.append(row);


	var counter = 0;
	for (var i = 0; i < this.size[0]; i++) {
		var row = $('<tr>');
		for (var ii = -1; ii < this.size[1]; ii++) {

			if (ii == -1) {
				var td = $('<th>');
				row.append(td);
				td.html(this.address[i]);
			} else {
				var td = $('<td>');
				row.append(td);
				var canvas = $('<canvas>').attr('id', 'pos_' + counter);
				canvas.attr('width', 0 + 'px');
				canvas.attr('height', 0 + 'px');
				td.html(canvas);
				td.attr('title', counter++);
			}
			row.append(td);
		}

		table.append(row);
	}

	var _this = this;
	$(table).find('td').click(function (event) {
		_this.editPosition = $(this).find('canvas').attr('id').replace('pos_', '');
		_this.onChangeFontData(_this.canvaseElements[_this.editPosition].fontData);
	});

	this.targetNode.html(table);
	this.screen = table.hide();
};

/**
 *
 * @param fontsData
 */
FontMap.prototype.setFontsData = function (fontsData) {
	var limit = 512;
	this.fontsData = fontsData;
	fontsData = fontsData.replace("MAX7456", '').replace(new RegExp('\r?\n', 'g'), '');
	this.canvaseElements = [];
	var counter2 = 0;
	for (var i = 0; i < limit * 16 * 16; i += limit) {
		this.canvaseElements[this.canvaseElements.length] = new FontWrite(fontsData.substr(i, limit).split(''), this.screen != null ? $('#pos_' + counter2++) : $('<canvas>'), 2);
	}

	if (this.screen != null) {
		this.screen.show();
	}

};

/**
 *
 * @returns {null}
 */
FontMap.prototype.getFontData = function () {
	return this.fontsData;
};

/**
 *
 * @param x
 * @param y
 * @param color
 */
FontMap.prototype.drawToPosition = function (x, y, color) {
	if (this.editPosition != null) {
		this.canvaseElements[this.editPosition].drawToPosition(x, y, color);
	}
};

/**
 *
 * @param fontData
 */
FontMap.prototype.setNewImageData = function (fontData) {
	if (this.editPosition != null) {
		this.fontsData = fontData;
		this.canvaseElements[this.editPosition].setNewImageData(fontData);
	}
};

/**
 *
 * @param fontData
 * @param index
 */
FontMap.prototype.setNewImageDataToIndex = function (fontData, index) {
	this.canvaseElements[index].setNewImageData(fontData);
	if (index == this.editPosition) {
		this.onChangeFontData(fontData);
	}
};
