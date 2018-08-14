SettingsManager = function (settingsFile) {

    this._settingsFile = settingsFile;
    this._settingsValues = null;

    this.handleSaved = function () {
    };

    this._framePositionStart = 90;
    this._elemenstPerLayout = 38;
};

/**
 *
 */
SettingsManager.prototype.loadSettings = function (handleLoadedFile) {

    var _this = this;

    if (this._settingsValues) {
        console.log('Load layout settings from cache');
        handleLoadedFile(this._settingsValues);
        return;
    }

    $.getJSON(this._settingsFile, function (fromFile) {
        chrome.storage.local.get('layoutSettingsKey', function (fromStorage) {
            fromStorage = fromStorage.layoutSettingsKey;

            if (fromStorage && fromFile.version == fromStorage.version) {
                console.log('Load layout settings from chrome storage');
                _this._settingsValues = fromStorage;
                handleLoadedFile(_this._settingsValues);
            } else {
                console.log('Load layout settings from file');
                _this._settingsValues = fromFile;
                chrome.storage.local.set({layoutSettingsKey: _this._settingsValues});
                handleLoadedFile(_this._settingsValues);
            }
        });
    });
};

SettingsManager.prototype.loadSettingsArray = function (settings) {
	this._settingsValues = settings;
	chrome.storage.local.set({layoutSettingsKey: settings});
};

SettingsManager.prototype.getLayoutSettings = function () {
    if (this._settingsValues) {
        return this._settingsValues;
    }

    return false;
};

/**
 *
 * @returns {boolean}
 */
SettingsManager.prototype.saveToLocalStorage = function () {
    if (this._settingsValues) {
        chrome.storage.local.set({layoutSettingsKey: this._settingsValues});
        return true;
    }

    return false;
};

/**
 *
 * @param elementId
 * @param layoutsId
 * @param x
 * @param y
 * @returns {boolean}
 */
SettingsManager.prototype.setIsShowed = function (elementId, layoutsId, isShowed) {
    if (this._settingsValues) {
        var layout = this.layoutSettingHelper.findLayout(layoutsId, this._settingsValues);
        var element = this.layoutSettingHelper.findLayoutElement(elementId, layout);
        if (element) {
            element.enable = isShowed;
        }

        return true;
    }

    return false;
};

/**
 *
 * @param elementId
 * @param layoutsId
 * @param x
 * @param y
 * @returns {boolean}
 */
SettingsManager.prototype.setValue = function (elementId, layoutsId, x, y) {
    if (this._settingsValues) {
        var layout = this.layoutSettingHelper.findLayout(layoutsId, this._settingsValues);

        this.layoutSettingHelper.findLayoutElement(elementId, layout).value = this.layoutSettingHelper.xYPostionToLinear(x, y, 30);
        return true;
    }

    return false;
};

/**
 *
 * @param layoutIds
 */
SettingsManager.prototype.getFrames = function (layoutIds) {
    var frames = [];

    var counter = 0;
    var framePart = {};
    var address = this._framePositionStart;
    for (var i = 0; i < layoutIds.length; i++) {
        var layout = this.layoutSettingHelper.findLayout(layoutIds[i], this._settingsValues);
        if (layout) {

            for (var layoutKey in layout.elements) {
                var element = layout.elements[layoutKey];
                if (element.position != null) {
                    if (counter % 5 == 0) {
                        framePart = {
                            index: 0,
                            values: {
                                command: 9,
                                values: []
                            }
                        };

                        for(var ii = 0; ii < 10; ii++){
                            framePart.values.values[address + ii] = 0;
                        }

                        frames[frames.length] = framePart;
                    }

                    framePart.values.values[address++] = element.value & 0xFF;
                    framePart.values.values[address++] = (element.enable ? 0xC0 : 0X00) | element.value >> 8;
                    counter++;
                } else {
                    console.log(element);
                }
            }
        }


    }
    return frames;
};


/**
 *
 * @returns {boolean}
 */
SettingsManager.prototype.getLayout = function (layoutsId) {
    return this.layoutSettingHelper.findLayout(layoutsId, this._settingsValues);
};


/**
 *
 * @returns {boolean}
 */
SettingsManager.prototype.getLayoutsJson = function () {
    return JSON.stringify(this._settingsValues.layouts, null, "\t");
};


/**
 *
 * @type {{findLayout: SettingsManager.layoutSettingHelper.findLayout, findLayoutElement: SettingsManager.layoutSettingHelper.findLayoutElement}}
 */
SettingsManager.prototype.layoutSettingHelper = {

    /**
     *
     * @param id
     * @param settigs
     * @returns {*}
     */
    findLayout: function (id, settigs) {
        for (var hud in settigs.layouts) {
            if (settigs.layouts[hud].position == id) {
                return settigs.layouts[hud];
                break;
            }
        }

        return false;
    },

    /**
     *
     * @param elementId
     * @param layout
     * @returns {*}
     */
    findLayoutElement: function (elementId, layout) {
        for (var elementKey in layout.elements) {
            if (layout.elements[elementKey].code == elementId) {
                return layout.elements[elementKey];
                break;
            }
        }
    },

    /**
     *
     * @param x
     * @param y
     * @param lineLength
     * @returns {*}
     */
    xYPostionToLinear: function (x, y, lineLength) {
        return (y * lineLength) + x;
    }
};
