/**
 * screen editor is class for main editable grid
 * @param targetNode
 * @constructor
 */
var ScreenStripsEditor = function (targetNode) {

	this.address = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'];

	this.isClicked = false;

	this.targetNode = targetNode;
	this.disabled = false;
	this.X = 12;
	this.Y = 18;

	this.screen = null;
	this.fillType = this.C_fillType.black;
	this.fontData = [];
	this.onChangeOnPosition = function (x, y, color) {
	};
	this.onChangeFontData = function (fontData) {
	};

};

/**
 * type of color
 *
 * @type {{none: string, white: string, black: string}}
 */
ScreenStripsEditor.prototype.C_fillType = {
	none: 'none',
	white: 'white',
	black: 'black'
};

/**
 * render screen table and add handler for mouse action
 *
 */
ScreenStripsEditor.prototype.render = function () {

	var table = $('<table>');

	var row = $('<tr>');
	row.append($('<th>').html('&nbsp;'));
	for (var i = 0; i < this.X; i++) {
		var td = $('<th>').html(this.address[i]);
		row.append(td);
	}
	table.append(row);

	for (var i = 0; i < this.Y; i++) {
		var row = $('<tr>');
		for (var ii = -1; ii < this.X; ii++) {
			if (ii == -1) {
				var td = $('<th>').html(this.address[i]);
			} else {
				var td = $('<td>').html('&nbsp;');
				td.attr('id', 'pos_screen_editor' + ii + '_' + i);
				td.attr('data-position_y', i);
				td.attr('data-position_x', ii);
			}
			row.append(td);
		}

		table.append(row);
	}

	this.targetNode.html(table);

	var _this = this;
	$(table).find('td').mouseenter(function (event) {
		if (!_this.disabled) {
			$(this).addClass(_this.fillType);

			if (_this.isClicked) {
				_this.onChangeOnPosition($(this).data('position_x'), $(this).data('position_y'), _this.fillType);
				_this.drawToPosition($(this).data('position_x'), $(this).data('position_y'), _this.fillType);
			}
		}
	});

	$(table).find('td').mousedown(function (event) {
		if (!_this.disabled) {
			_this.isClicked = true;
			_this.onChangeOnPosition($(this).data('position_x'), $(this).data('position_y'), _this.fillType);
			_this.drawToPosition($(this).data('position_x'), $(this).data('position_y'), _this.fillType);

			event.preventDefault();
		}
	});

	$(document).mouseup(function (event) {
		if (!_this.disabled) {
			_this.isClicked = false;
			event.preventDefault();
		}
	});

	$(table).find('td').mouseleave(function (event) {
		if (!_this.disabled) {
			$(this).removeClass(_this.fillType);
		}
	});

	this.screen = table;
};

/**
 * set new Image data if screen already render
 *
 * @param fontData
 */
ScreenStripsEditor.prototype.setNewImageData = function (fontData) {
	this.clearScreen();
	this.fontData = fontData;
	this.reDraw();
};

/**
 * only clear screen, this function is internal, not call to listeners
 *
 * @param fontData
 */
ScreenStripsEditor.prototype.clearScreen = function (fontData) {
	$(this.targetNode).find('td').removeClass('black_default');
	$(this.targetNode).find('td').removeClass('white_default');
};

/**
 * clear screen and call listeners that we clear screen
 *
 * @param fontData
 */
ScreenStripsEditor.prototype.deepClearScreen = function (fontData) {
	$(this.targetNode).find('td').removeClass('black_default');
	$(this.targetNode).find('td').removeClass('white_default');

	for (var i = 0; i < this.fontData.length; i += 2) {
		this.fontData[i] = 0;
		this.fontData[i + 1] = 1;
	}

	this.onChangeFontData(this.fontData);
};


/**
 * this method must be call before draw method
 *
 */
ScreenStripsEditor.prototype.reDraw = function () {
	var x = 0;
	var y = 0;

	this.clearScreen();

	for (var i = 0; i < this.fontData.length; i += 2) {
		if (this.fontData[i + 1] == 0) { // black or white
			$('#pos_screen_editor' + x + '_' + y).addClass(this.fontData[i] == 0 ? 'black_default' : 'white_default');
		}

		if (x > this.X - 2) { // seek text line
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
ScreenStripsEditor.prototype.drawToPosition = function (x, y, color) {
	var colorCode = [0, 1]; // transparent
	switch (color) {
		case 'white':
			colorCode = [1, 0];
			break;
		case 'black':
			colorCode = ['0', '0'];
			break;
		default:
			colorCode = [0, 1];
	}
	var pos = ((y * this.X) + x) * 2;


	this.fontData[pos] = colorCode[0];
	this.fontData[pos + 1] = colorCode[1];

	this._drawToPosition(x, y, color);
};

/**
 *
 * @param x
 * @param y
 * @param color
 */
ScreenStripsEditor.prototype._drawToPosition = function (x, y, color) {
	$('#pos_screen_editor' + x + '_' + y).removeClass('black_default');
	$('#pos_screen_editor' + x + '_' + y).removeClass('white_default');

	if (color != 'none') {
		$('#pos_screen_editor' + x + '_' + y).addClass(color == 'black' ? 'black_default' : 'white_default');
	}
};
