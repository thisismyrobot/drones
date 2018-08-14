/*********************************************/
//SELECT
/*********************************************/
SelectElement = function (targetNode, id, label, properties) {

	this.targetNode = targetNode;
	this.id = id;
	this.properties = properties;
	this.box = $('<div>').attr('id', 'box_' + id).addClass('col-md-3');
	this.element = $('<select>').attr('id', id);
	this.elementLabel = $('<label>').attr('for', id);
	this.label = label;
	this.box.append(this.elementLabel).append(this.element);
	this.targetNode.append(this.box);

	this.handleChangeValue = function (id, value) {
	};

	this.setOptions(properties.values);

	var _this = this;
	this.element.change(function () {
		_this.handleChangeValue(_this.id, _this.element.val());
	});

	this.setLabel(0);
};

/**
 *
 * @param index
 */
SelectElement.prototype.setLabelIndex = function (index) {
	this.setLabel(index);
};

/**
 *
 * @param index
 */
SelectElement.prototype.setLabel = function (index) {
    this.elementLabel.html(this.label instanceof Array ? this.label[index] : this.label);
};

/**
 *
 * @param index
 */
SelectElement.prototype.setEnabled = function (enabled) {
	if(enabled){
        this.element.removeAttr('disabled');
	}else{
        this.element.attr('disabled', 'disabled');
	}
};

/**
 *
 * @param value
 */
SelectElement.prototype.setValue = function (value) {
	this.element.val(value);
};

/**
 *
 * @returns {*}
 */
SelectElement.prototype.getValue = function () {
	return this.element.val();
};

/**
 *
 * @param options
 */
SelectElement.prototype.setOptions = function (options) {
	this.element.html('');
	for (var key in options) {
		this.element.append($('<option>').attr('value', key).html(options[key]));
	}
};

/*********************************************/
//CHECKBOX
/*********************************************/
CheckBoxElement = function (targetNode, id, label, properties) {

	this.targetNode = targetNode;
	this.id = id;
	this.box = $('<div>').attr('id', 'box_' + id).addClass('col-md-3');
	this.element = $('<input>').attr('id', id).attr('type', 'checkbox');

	this.elementLabel = $('<label>').attr('for', id);
	this.label = label;
	this.box.append(this.elementLabel).append(this.element);
	this.targetNode.append(this.box);

	this.handleChangeValue = function (id, value) {
	};

	var _this = this;
	this.element.change(function () {
		_this.handleChangeValue(_this.id, _this.getValue());
	});

	this.setLabel(0);

};

/**
 *
 * @param index
 */
CheckBoxElement.prototype.setLabelIndex = function (index) {
	this.setLabel(index);
};

/**
 *
 * @param index
 */
CheckBoxElement.prototype.setLabel = function (index) {
	this.elementLabel.html(this.label instanceof Array ? this.label[index] : this.label);
};

/**
 *
 * @param value
 */
CheckBoxElement.prototype.setValue = function (value) {
	this.element[0].checked = !!value;
};

/**
 *
 * @param index
 */
CheckBoxElement.prototype.setEnabled = function (enabled) {
    if(enabled){
        this.element.removeAttr('disabled');
    }else{
        this.element.attr('disabled', 'disabled');
    }
};

/**
 *
 * @returns {*}
 */
CheckBoxElement.prototype.getValue = function () {
	return this.element[0].checked;
};


/*********************************************/
//RANGE
/*********************************************/
RangeElement = function (targetNode, id, label, properties) {

	this.targetNode = targetNode;
	this.id = id;
	this.box = $('<div>').attr('id', 'box_' + id).addClass('col-md-3');
	this.element = $('<input>').attr('type', 'number').attr('id', id).val(properties.default || 0);
	this.elementLabel = $('<label>').attr('for', id);

	this.box.append(this.elementLabel).append(this.element);
	this.targetNode.append(this.parent);
	this.label = label;
	this._min = properties.min || 0;
	this._max = properties.max || 255;
    this._translate = properties.translate || new TranslateNull();
	this._divider = properties.divider || 1;
	this._value = null;

	this.handleChangeValue = function (id, value) {
	};

	var _this = this;
	this.element.change(function () {
			_this.handleChangeValue(_this.id, _this.getValue());
	}).keyup(function () {
		$(this).removeClass('error');
		if (!_this.isValid(_this.getValue())){
			$(this).addClass('error');
		}
	}).click(function () {
        $(this).removeClass('error');
        if (!_this.isValid(_this.getValue())){
            $(this).addClass('error');
        }
    });

	this.setLabel(0);

};

/**
 *
 * @param index
 */
RangeElement.prototype.setLabelIndex = function (index) {
	this.setLabel(index);
};

/**
 *
 * @param index
 */
RangeElement.prototype.setLabel = function (index) {
	this.elementLabel.html(this.label instanceof Array ? this.label[index] : this.label);
};

/**
 *
 * @param value
 * @returns {boolean}
 */
RangeElement.prototype.isValid = function (value) {
	if (Number.parseInt(value) !== value) {
		return false;
	}

	if (value < this._min || value > this._max) {
		return false;
	}

	return true;
};

/**
 *
 * @param index
 */
RangeElement.prototype.setEnabled = function (enabled) {
    if(enabled){
        this.element.removeAttr('disabled');
    }else{
        this.element.attr('disabled', 'disabled');
    }
};

/**
 *
 * @param value
 * @returns {boolean}
 */
RangeElement.prototype.setValue = function (value) {
	this.element.val(this._translate.frameValueToForm(value / this._divider)).trigger('keyup');
};

/**
 *
 * @returns {*}
 */
RangeElement.prototype.getValue = function () {
	return this._translate.formValueToFrame(this.element.val() * this._divider);
};

/*********************************************/
//HIDDEN
/*********************************************/
HiddenElement = function (targetNode, id, label, properties) {

	this.targetNode = targetNode;
	this.id = id;
	this.box = $('<div>').attr('id', 'box_' + id).addClass('col-md-3');
	this.element = $('<input>').attr('type', 'hidden').attr('id', id);
	this.elementLabel = $('<label>').attr('for', id);

	this.box.append(this.elementLabel).append(this.element);
	this.targetNode.append(this.parent);

	this.handleChangeValue = function (id, value) {
	};

	var _this = this;
	this.element.change(function () {
		_this.handleChangeValue(_this.id, _this.element.val());
	});

};

/**
 *
 * @param value
 */
HiddenElement.prototype.setValue = function (value) {
	this.element.val(value);
};

/**
 *
 * @returns {*}
 */
HiddenElement.prototype.getValue = function () {
	return this.element.val();
};

/**
 *
 * @param index
 */
HiddenElement.prototype.setEnabled = function (enabled) {
};

