SreenResolutionControl = function (targetNode) {
    this.targetNode = targetNode;
    this._mode = this.modeList.usingRCOff;

    this.table = $('<table>');

    var _this = this;

    this.up = $('<button>').attr('class', 'arrow-icon').html("<img src='icons/editor_arrow_up.svg' />");


    this.down = $('<button>').attr('class', 'arrow-icon').html("<img src='icons/editor_arrow_down.svg' />");


    this.left = $('<button>').attr('class', 'arrow-icon').html("<img src='icons/editor_arrow_left.svg' />");


    this.right = $('<button>').attr('class', 'arrow-icon').html("<img src='icons/editor_arrow_right.svg' />");


    this.show = $('<button>').attr('class', 'arrow-icon').html("<img src='icons/editor_toggle.svg' />");


    this.layoutLow = $('<select>');

    this.layoutMid = $('<select>');

    this.layoutHight = $('<select>');

    this.layoutActiveLow = $('<input>').attr('type', 'radio').attr('name', 'activeLayout').attr('value', '1').prop('checked', 'checked');

    this.layoutActiveMid = $('<input>').attr('type', 'radio').attr('name', 'activeLayout').attr('value', '2');

    this.layoutActiveHight = $('<input>').attr('type', 'radio').attr('name', 'activeLayout').attr('value', '3');

    this.listElements = $('<select>');

    this.switch = $('<button>').html('Enable Switches');


    this.saveLayout = $('<button>').html('Save Layout');

	  this.editLayout = $('<button>').html('Layouts edit');


    this.writeLayout = $('<button>').html('Write to Osd');

    this.elementsPosition = [[null, this.up, null], [this.left, this.show, this.right], [null, this.down, null]];

    this.isEnabled = $('<span>').attr('id', 'isEnabled');;

    this.handleMove = function (elementId, direction) {
    };

    this.handleChangeLayout = function (layoutSetting, type) {
    };

    this.handleShow = function (elementId) {
    };

    this.handleChangeElement = function (elementId) {
    };

    this.handleSwitch = function () {
    };

    this.handleSave = function () {
    };

    this.handleWrite = function () {
    };

    this.middleRow = {hide: function(){}};

    this.lowTitle = {hide: function(){}};
    this.highTitle = {hide: function(){}};
    this.normalTitle = {hide: function(){}};
    this.rcswitchTitle = {hide: function(){}};

    this.SettingsManager = {};
    this.OsdSwONDiv = $('<div>');
};

/**
 *
 * @type {{}}
 */
SreenResolutionControl.prototype.setting = {};

/**
 *
 * @param mode
 */
SreenResolutionControl.prototype.changeMode = function (mode) {
    switch (mode) {
        case this.modeList.usingRCOff:
            if (mode != this.mode) {
                this.mode = mode;
                this.middleRow.hide();

                this.lowTitle.hide();
                this.highTitle.hide();

                this.normalTitle.show();
                this.rcswitchTitle.show();

                if (this.layoutActiveLow.prop('checked')) {
                    this.handleChangeLayout(this.layoutLow.val(), false);
                } else if (this.layoutActiveHight.prop('checked')) {
                    this.handleChangeLayout(this.layoutHight.val(), false);
                }
                this.fillStatus();

            }

            break;

        case this.modeList.usingRCOn:
            if (mode != this.mode) {
                this.mode = mode;
                this.middleRow.show();

                this.normalTitle.hide();
                this.rcswitchTitle.hide();

                this.lowTitle.show();
                this.highTitle.show();

                if (this.layoutActiveLow.prop('checked')) {
                    this.handleChangeLayout(this.layoutLow.val(), false);
                } else if (this.layoutActiveMid.prop('checked')) {
                    this.handleChangeLayout(this.layoutMid.val(), false);
                } else if (this.layoutActiveHight.prop('checked')) {
                    this.handleChangeLayout(this.layoutHight.val(), false);
                }
                this.fillStatus();


            }
            break;
    }

};

/**
 *
 * @param mode
 */
SreenResolutionControl.prototype.setLayoutLow = function (layoutId) {
    this.layoutLow.val(layoutId >= 0 ? layoutId : 0);
};

/**
 *
 * @param mode
 */
SreenResolutionControl.prototype.setLayoutMid = function (layoutId) {
    this.layoutMid.val(layoutId >= 0 ? layoutId : 0);
};

/**
 *
 * @param mode
 */
SreenResolutionControl.prototype.setLayoutHight = function (layoutId) {
    this.layoutHight.val(layoutId >= 0 ? layoutId : 0);
};

/**
 *
 */
SreenResolutionControl.prototype.render = function () {

    var _this = this;
	this.up.click(function () {
		_this.handleMove(_this.listElements.val(), _this.moveDirectionList.up);
	});


	this.down.click(function () {
		_this.handleMove(_this.listElements.val(), _this.moveDirectionList.down);
	});


	this.left.click(function () {
		_this.handleMove(_this.listElements.val(), _this.moveDirectionList.left);
	});


	this.right.click(function () {
		_this.handleMove(_this.listElements.val(), _this.moveDirectionList.right);
	});


	this.show.click(function () {
		_this.handleShow(_this.listElements.val());
		_this.fillStatus();
	});


	this.layoutLow.change(function () {
		_this._fillElementSelect();
		_this.handleChangeLayout($(this).val(), 59);
		_this.fillStatus();
		_this.layoutActiveLow.prop('checked', 'checked');
		_this.layoutActiveMid.removeAttr('checked');
		_this.layoutActiveHight.removeAttr('checked');

		_this.layoutLow.val()
	});

	this.layoutMid.change(function () {
		_this._fillElementSelect();
		_this.handleChangeLayout($(this).val(), 61);
		_this.layoutActiveLow.removeAttr('checked');
		_this.layoutActiveMid.prop('checked', 'checked');
		_this.layoutActiveHight.removeAttr('checked');

		_this.fillStatus();
	});

	this.layoutHight.change(function () {
		_this._fillElementSelect();
		_this.handleChangeLayout($(this).val(), 60);
		_this.layoutActiveLow.removeAttr('checked');
		_this.layoutActiveMid.removeAttr('checked');
		_this.layoutActiveHight.prop('checked', 'checked');

		_this.fillStatus();
	});

	this.layoutActiveLow.change(function () {
		_this._fillElementSelect();
		_this.handleChangeLayout(_this.layoutLow.val(), 59);

	});

	this.layoutActiveMid.change(function () {
		_this._fillElementSelect();
		_this.handleChangeLayout(_this.layoutMid.val(), 61);
	});

	this.layoutActiveHight.change(function () {
		_this._fillElementSelect();
		_this.handleChangeLayout(_this.layoutHight.val(), 60);
	});

	this.listElements.change(function () {
		_this.handleChangeElement($(this).val());

		_this.fillStatus();
	}).attr('id', 'listElements');

	this.switch.click(function () {
		_this.handleSwitch();
		_this.fillStatus();
	}).attr('id', 'switch');


	this.saveLayout.click(function () {
		_this.handleSave();
	});


	this.writeLayout.click(function () {
		_this.handleWrite();
	});

    for (var i = 0; i < this.elementsPosition.length; i++) {

        var row = $('<tr>');

        for (var ii = 0; ii < this.elementsPosition[i].length; ii++) {
            var cell = $('<td>').append(this.elementsPosition[i][ii]);

            row.append(cell);
        }

        this.table.append(row);
    }

    //fill layout select
	this.layoutLow.html('');
	this.layoutMid.html('');
	this.layoutHight.html('');
    for (var hud in this.setting.layouts) {
        this.layoutLow.append($('<option>').html(this.setting.layouts[hud].name).val(this.setting.layouts[hud].position))
        this.layoutMid.append($('<option>').html(this.setting.layouts[hud].name).val(this.setting.layouts[hud].position))
        this.layoutHight.append($('<option>').html(this.setting.layouts[hud].name).val(this.setting.layouts[hud].position))
    }

    //fill element select
    this._fillElementSelect();

    //this.layout.selectmenu();
    //this.listElements.selectmenu();

    this.targetNode.append(this.table);
    this.targetNode.append(this.listElements);
    this.targetNode.append(this.isEnabled);


    this.targetNode.append(this.writeLayout);
    this.targetNode.append(this.saveLayout);
    this.targetNode.append(this.switch);



    var table = $('<table>').addClass('table usingRCOn');

    var tr = $('<tr>');
    var td = $('<td>');
    td.append(this.layoutLow);
    tr.append(td);
    var td = $('<td>').attr('style', 'display:none');
    td.append('TX LOW');
    this.lowTitle = td;
    tr.append(td);
    var td = $('<td>')
    td.append('Normal');
    this.normalTitle = td;
    tr.append(td);
    var td = $('<td>');
    td.append(this.layoutActiveLow);
    tr.append(td);
    table.append(tr);

    var tr = $('<tr>').attr('style', 'display:none');
    this.middleRow = tr;
    var td = $('<td>');
    td.append(this.layoutMid);
    tr.append(td);
    var td = $('<td>');
    td.append('TX MID');
    tr.append(td);
    var td = $('<td>');
    td.append(this.layoutActiveMid);
    tr.append(td);
    table.append(tr);



    var tr = $('<tr>');
    var td = $('<td>');
    td.append(this.layoutHight);
    tr.append(td);
    var td = $('<td>');
    td.append('TX HIGH').attr('style', 'display:none');
    this.highTitle = td;
    tr.append(td);
    var td = $('<td>');
    td.append('OSD Switch');
    this.rcswitchTitle = td;
    tr.append(td);
    var td = $('<td>');
    td.append(this.layoutActiveHight);
    tr.append(td);
    table.append(tr);

	var tr = $('<tr>');
	var td = $('<td>');
	td.append(this.editLayout);
	tr.append(td);
	table.append(tr);

	this.switch.button();
	this.saveLayout.button();
	this.writeLayout.button();
	this.show.button();
	this.right.button();
	this.left.button();
	this.down.button();
	this.up.button();
	this.editLayout.button();

	this.OsdSwONDiv.html('');
    this.targetNode.append(this.OsdSwONDiv.append(table));


    this.fillStatus();
};

SreenResolutionControl.prototype.reload = function () {
    this.targetNode.html('');
    this.render();
};

/**
 *
 * @private
 */
SreenResolutionControl.prototype._fillElementSelect = function () {
    //fill layout select
    this.listElements.html('');

    var val = null;
    if (this.layoutActiveLow.prop('checked')) {
        val = this.layoutLow.val();
    } else if (this.layoutActiveMid.prop('checked')) {
        val = this.layoutMid.val();
    } else if (this.layoutActiveHight.prop('checked')) {
        val = this.layoutHight.val();
    }

    for (var hud in this.setting.layouts) {
        if (this.setting.layouts[hud].position == val) {
            for (var elementKey in this.setting.layouts[hud].elements) {
                if (this.setting.layouts[hud].elements[elementKey].class && this.setting.layouts[hud].elements[elementKey].position != null) {
                    this.listElements.append($('<option>').html(this.setting.layouts[hud].elements[elementKey].label).val(this.setting.layouts[hud].elements[elementKey].code))
                }
            }
            break;
        }
    }
};

/**
 *
 * @returns {*}
 */
SreenResolutionControl.prototype.getElementSelected = function () {
    return this.listElements.val();
};

/**
 *
 * @type {{up: number, down: number, left: number, right: number}}
 */
SreenResolutionControl.prototype.moveDirectionList = {
    up: 1,
    down: 2,
    left: 3,
    right: 4
};

/**
 *
 * @type {{usingRCOn: number, usingRCOff: number}}
 */
SreenResolutionControl.prototype.modeList = {
    usingRCOn: 0,
    usingRCOff: 1,
};

SreenResolutionControl.prototype.fillStatus = function () {
    if(this.livePreview){
        this.livePreview.isDisplayedElement(this.listElements.val()) ? this.isEnabled.html('Enabled') : this.isEnabled.html('Disabled');
    }

};



