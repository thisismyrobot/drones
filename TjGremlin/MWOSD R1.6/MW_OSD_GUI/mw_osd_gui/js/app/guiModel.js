/**
 *
 * @constructor
 */
GuiModel = function () {
	this.elementsGroup = [];
	this._partOfAdress = [
		{
			index: 0,
			values: null
		},
		{
			index: 10,
			values: null
		},
		{
			index: 20,
			values: null
		},
		{
			index: 30,
			values: null
		},
		{
			index: 40,
			values: null
		},
		{
			index: 50,
			values: null
		},
		{
			index: 60,
			values: null
		},
		{
			index: 70,
			values: null
		},
		{
			index: 80,
			values: null
		}
	];

	var _this = this;
	this._handleChangeValue = function (id, value, position) {
		if (position) {
			_this.setValueToPosition(position, value & 0xff);
		}
	};

	this.handleChangeValue = function (value, position) {
	};
	this.handleChangeGroupValue = function (values) {
	};

	//build form elements
	for (var key in SettingsElements) {
		if (!this.elementsGroup[SettingsElements[key].group.id]) {
			var targetNode = $('#' + SettingsElements[key].group.id);

			if (SettingsElements[key].group.classGroup) {
				this.elementsGroup[SettingsElements[key].group.id] = new window[SettingsElements[key].group.classGroup](targetNode, SettingsElements[key].group.id, SettingsElements[key].group.description);
			} else {
				this.elementsGroup[SettingsElements[key].group.id] = new FormGroup(targetNode, SettingsElements[key].group.id, SettingsElements[key].group.description);
			}

			this.elementsGroup[SettingsElements[key].group.id].handleChangeValue = this._handleChangeValue;
		}

		switch (SettingsElements[key].type) {
			case SettingsElementsType.select:
				this.elementsGroup[SettingsElements[key].group.id].addElement(new SelectElement(this.elementsGroup[SettingsElements[key].group.id].box, SettingsElements[key].id, SettingsElements[key].description, SettingsElements[key].properties), SettingsElements[key].position, SettingsElements[key].secondByte);
				break;
			case SettingsElementsType.checkbox:
				this.elementsGroup[SettingsElements[key].group.id].addElement(new CheckBoxElement(this.elementsGroup[SettingsElements[key].group.id].box, SettingsElements[key].id, SettingsElements[key].description, SettingsElements[key].properties), SettingsElements[key].position, SettingsElements[key].secondByte);
				break;
			case SettingsElementsType.range:
				this.elementsGroup[SettingsElements[key].group.id].addElement(new RangeElement(this.elementsGroup[SettingsElements[key].group.id].box, SettingsElements[key].id, SettingsElements[key].description, SettingsElements[key].properties), SettingsElements[key].position, SettingsElements[key].secondByte);
				break;
			case SettingsElementsType.hidden:
				this.elementsGroup[SettingsElements[key].group.id].addElement(new HiddenElement(this.elementsGroup[SettingsElements[key].group.id].box, SettingsElements[key].id, SettingsElements[key].description, SettingsElements[key].properties), SettingsElements[key].position, SettingsElements[key].secondByte);
				break;
		}
	}

	this._statusElement = new Status($('#status-widget'));
	this._senzorElement = new Senzor($('#senzor-widget'));
    this._infoElement 	= new Info($('#info-widget'));
    this._tabs 			= $('#tabs');
};

/**
 *
 * @type {{OSD_READ_CMD_EE: number}}
 */
GuiModel.prototype.commandList = {
	OSD_SENSORS: 7,
    OSD_INFO: 10,
	OSD_READ_CMD_EE: 9
};

/**
 *
 * @param position
 * @param value
 * @returns {boolean}
 */
GuiModel.prototype.setValueToPosition = function (position, value) {
	for (var id in this.elementsGroup) {
		this.elementsGroup[id].setValue(position, value);
	}

    for (var key in this._partOfAdress) {
		if (this._partOfAdress[key].values) {
			for (var address in this._partOfAdress[key].values.values) {
				if (address == position) {
					this._partOfAdress[key].values.values[address] = value;
					this.handleChangeValue(this.getFlatProfile(this._partOfAdress));
					return true;
				}
			}
		}
	}

	var positionIndex = Math.floor(position / 10) * 10;
	for (var key in this._partOfAdress) {
		if(this._partOfAdress[key].index == positionIndex){
			if(this._partOfAdress[key].values == null){
				this._partOfAdress[key].values = {};
				this._partOfAdress[key].values.values = {};
			}

			this._partOfAdress[key].values.values[position] = value;
			this.handleChangeValue(this.getFlatProfile(this._partOfAdress));
			return true;
		}
	}

	return false;
};

/**
 *
 * @param profile
 * @returns {*}
 */
GuiModel.prototype.getFlatProfile = function (profile) {

	var flatProfile = {};

	for (var key in profile) {
		if (profile[key].values) {
			for (var address in profile[key].values.values) {
				flatProfile[address] = profile[key].values.values[address];
			}
		}
	}


	return flatProfile;
};

/**
 *
 * @returns {*}
 */
GuiModel.prototype.getOneAdressWhatYouNeed = function () {
	for (var index in this._partOfAdress) {
		if (this._partOfAdress[index].values == null) {
			if (this._partOfAdress[index].index === 0) {
				this._statusElement.setMode(this._statusElement._modeList.WAITING_FOR_OSD);
			}

			return this._partOfAdress[index].index;
		}
	}

	return false;
};

/**
 *
 * @param frame
 */
GuiModel.prototype.setReadWriteFrameValue = function (frame) {

	if (frame.command != this.commandList.OSD_READ_CMD_EE) { // set only read/write frame
		return;
	}

	for (var index in this._partOfAdress) {
		if (this._partOfAdress[index].index == Object.keys(frame.values)[0]) {
			this._statusElement.setMode(this._statusElement._modeList.READ_OSD);
			this._statusElement.setProgress(Object.keys(frame.values)[0], (this._partOfAdress.length * 10) - 10);
			for (var id in this.elementsGroup) {
				this.elementsGroup[id].setValues(frame.values);
			}

			this.handleChangeGroupValue(this.getFlatProfile(this._partOfAdress));
			return this._partOfAdress[index].values = frame;
		}
	}
};

GuiModel.prototype.setFrameValue = function (frame) {

	for (var index in this._partOfAdress) {
		if (frame && this._partOfAdress[index].index == frame.index) {
			if(frame.values){
				for (var id in this.elementsGroup) {
					this.elementsGroup[id].setValues(frame.values.values);
				}
			}

			this.handleChangeGroupValue(this.getFlatProfile(this._partOfAdress));
			return this._partOfAdress[index] = frame;
		}
	}
};

/**
 *
 * @param frame
 */
GuiModel.prototype.setSenzorsFrameValue = function (frame) {

    if (frame.command != this.commandList.OSD_SENSORS) { // set only diag frame
        return;
    }

    this._senzorElement.setValues(frame.values);
};

/**
 *
 * @param frame
 */
GuiModel.prototype.setInfoFrameValue = function (frame) {

    if (frame.command != this.commandList.OSD_INFO) { // set only diag frame
        return;
    }
	
    if(frame.values[4] < 1){
        this._tabs.tabs({
            disabled: [ 15 ]
        });
	}
	else
	{
        this._tabs.tabs({
            disabled: [  ]
        });
	}

    this._infoElement.setValues(frame.values);
};

/**
 *
 * @returns {null}
 */
GuiModel.prototype.reset = function () {
	this._statusElement.setMode(this._statusElement._modeList.IDLE);
	for (var index in this._partOfAdress) {
		this._partOfAdress[index].values = null;
	}

	this._senzorElement.hide();
    this._infoElement.hide();
};

/**
 *
 * @param mode
 */
GuiModel.prototype.setModeWaitingForOsd = function () {
	this._statusElement.setMode(this._statusElement._modeList.WAITING_FOR_OSD);
};

/**
 *
 * @param mode
 */
GuiModel.prototype.setModeWriteToOsd = function () {
	this._statusElement.setMode(this._statusElement._modeList.WRITE_OSD);
};

/**
 *
 * @param partCount
 * @param totalCount
 */
GuiModel.prototype.setProgress = function (partCount, totalCount) {
	this._statusElement.setProgress(partCount, totalCount);
};


