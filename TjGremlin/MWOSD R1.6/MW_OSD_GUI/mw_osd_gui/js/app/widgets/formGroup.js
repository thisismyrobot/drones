FormGroup = function (targetNode, id, label) {

	this.targetNode = targetNode;
	this.box = $('<fieldset>').attr('id', id);
	//this.box.append($('<legend>').html(label));
	this.targetNode.append(this.box);

	this.elements = [];
    this.secondByteMap = [];
    this.secondByteMapInversed = [];

	var _this = this;
	this.handleChangeValue = function (id, value, position) {

	};

	this._handleChangeValue = function (id, value) {
		var position = _this.getPositionByElementId(id);


		if(_this.secondByteMapInversed[position]){
            _this.handleChangeValue(id, value & 0xFF, position);
            _this.handleChangeValue(id, value >> 8 & 0xFF, _this.secondByteMapInversed[position]);
		}else{
            _this.handleChangeValue(id, value, position);
		}
	};
};

/**
 *
 * @param element
 */
FormGroup.prototype.addElement = function (element, position, secondbyte) {
	this.box.append(element.box);
	this.elements[position] = element;
	element.handleChangeValue = this._handleChangeValue;

	if(secondbyte){
		this.secondByteMap[secondbyte] = position;
        this.secondByteMapInversed[position] = secondbyte;
	}
};

/**
 *
 * @param position
 * @param value
 */
FormGroup.prototype.setValues = function (frameValues) {
	for (var position in frameValues) {
		if (this.elements[position]) {
			this.elements[position].setValue(frameValues[position]);
		}

		if(this.secondByteMap[position]){
            this.elements[this.secondByteMap[position]].setValue(frameValues[position] << 8 | frameValues[this.secondByteMap[position]]);
		}
	}
};

/**
 *
 * @param position
 * @param value
 */
FormGroup.prototype.setValue = function (position, value) {
	if (this.elements[position]) {
		this.elements[position].setValue(value);
	}

    if(this.secondByteMap[position]){
        this.elements[this.secondByteMap[position]].setValue(value << 8 | this.elements[this.secondByteMap[position]].getValue());
    }
};

/**
 *
 * @param id
 * @returns {*}
 */
FormGroup.prototype.getPositionByElementId = function (id) {
	for (var possition in this.elements) {
		if (id == this.elements[possition].id) {
			return possition;
		}
	}

	return false;
};

/**
 *
 * @param targetNode
 * @param id
 * @param label
 * @constructor
 */
WidgetCallSign = function (targetNode, id, label) {

	this.targetNode = targetNode;
	this.box = $('<fieldset>').attr('id', id);
	this.box.append($('<legend>').html(label));
	this.targetNode.append(this.box);

	var _this = this;
	this.elements = [];
	this.callSignElement = $('<input>').attr('type', 'text').keyup(function () {
		_this.rebuildSignValueElement()
	}).mouseout(function () {
		_this.rebuildSignValueElement()
	});
	this.callSignPositionList = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

	var div = $('<div>').addClass('col-md-3');

	div.append($('<label>').html('Callsign'));
	div.append(this.callSignElement);
	this.box.append(div);

	var _this = this;
	this.handleChangeValue = function (id, value, position) {

	};

	this._handleChangeValue = function (id, value) {
		_this.handleChangeValue(id, value, _this.getPositionByElementId(id));
	};

};

/**
 *
 */
WidgetCallSign.prototype.rebuildSignValue = function () {
	var value = '';
	for (var pos in this.callSignPositionList) {
		if (this.elements[this.callSignPositionList[pos]] && this.elements[this.callSignPositionList[pos]].getValue() != 0) {
			value += String.fromCharCode(this.elements[this.callSignPositionList[pos]].getValue());
		}
	}

	this.callSignElement.val(value);
};

/**
 *
 */
WidgetCallSign.prototype.rebuildSignValueElement = function () {

	this.callSignElement.val(this.callSignElement.val().toUpperCase().replace(/[^A-Z0-9]/g, ''));

	for (var position in this.callSignPositionList) {
		if (this.callSignElement.val().length > position) {
			this.elements[this.callSignPositionList[position]].setValue(this.callSignElement.val().charCodeAt(position));
		} else {
			this.elements[this.callSignPositionList[position]].setValue(0);
		}
	}

	for (var i = 0; i < this.callSignPositionList.length; i++) {
		this._handleChangeValue(this.elements[this.callSignPositionList[i]].id, this.elements[this.callSignPositionList[i]].getValue());
	}
};

/**
 *
 * @param element
 */
WidgetCallSign.prototype.addElement = function (element, position) {
	if (!(element instanceof HiddenElement)) {
		this.box.prepend(element.box);
	}

	this.elements[position] = element;
	element.handleChangeValue = this._handleChangeValue;
};

/**
 *
 * @param position
 * @param value
 */
WidgetCallSign.prototype.setValues = function (frameValues) {
	for (var position in frameValues) {
		if (this.elements[position]) {
			this.elements[position].setValue(frameValues[position]);

			this.rebuildSignValue();
		}
	}

};

/**
 *
 * @param position
 * @param value
 */
WidgetCallSign.prototype.setValue = function (position, value) {
	if (this.elements[position]) {
		this.elements[position].setValue(value);
		this.rebuildSignValue();
	}
};
/**
 *
 * @param id
 * @returns {*}
 */
WidgetCallSign.prototype.getPositionByElementId = function (id) {
	for (var possition in this.elements) {
		if (id == this.elements[possition].id) {
			return possition;
		}
	}

	return false;
};


WidgetLayout = function (targetNode, id, label) {

	this.targetNode = targetNode;
	this.box = $('<fieldset>').attr('id', id);
	this.box.append($('<legend>').html(label));
	this.targetNode.append(this.box);

	this.elements = [];

	var _this = this;
	this.handleChangeValue = function (id, value, position) {

	};

	this._handleChangeValue = function (id, value) {
		_this._rebuildLabels();
		_this.handleChangeValue(id, value, _this.getPositionByElementId(id));
	};
};

/**
 *
 * @private
 */
WidgetLayout.prototype._rebuildLabels = function () {
	var switchValue = false;
	for (var key in this.elements) {
		if (this.elements[key].id == "S_RCWSWITCH") {
			switchValue = this.elements[key].getValue();

			if(this.elements[58]){
                this.elements[58].setEnabled(switchValue);
			}

			if(this.elements[61]){
                this.elements[61].setEnabled(switchValue);
			}

			break;
		}
	}

	for (var key in this.elements) {
		this.elements[key].setLabelIndex(switchValue ? 1 : 0);
	}

};

/**
 *
 * @param element
 */
WidgetLayout.prototype.addElement = function (element, position) {
	this.box.append(element.box);
	this.elements[position] = element;
	element.handleChangeValue = this._handleChangeValue;

    this._rebuildLabels();
};

/**
 *
 * @param frameValues
 */
WidgetLayout.prototype.setValues = function (frameValues) {
	for (var position in frameValues) {
		if (this.elements[position]) {
			this.elements[position].setValue(frameValues[position]);
		}
	}
	this._rebuildLabels();
};

/**
 *
 * @param position
 * @param value
 */
WidgetLayout.prototype.setValue = function (position, value) {
	if (this.elements[position]) {
		this.elements[position].setValue(value);
	}
	this._rebuildLabels();
};

/**
 *
 * @param id
 * @returns {*}
 */
WidgetLayout.prototype.getPositionByElementId = function (id) {
	for (var possition in this.elements) {
		if (id == this.elements[possition].id) {
			return possition;
		}
	}

	return false;
};

