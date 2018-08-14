Status = function (targetNode) {

	this._element = $('<span>').html('');
	this._mode = this._modeList.IDLE;
	this._percent = 0;

	if (targetNode) {
		targetNode.append(this._element);
	}

	this.hideTimeOut = null;
};

/**
 *
 */
Status.prototype.reset = function () {
	this._element.html('');
	this._mode = this._modeList.IDLE;
	this._percent = 0;
};

/**
 *
 * @type {{IDLE: number, WAITING_FOR_OSD: number, READ_OSD: number}}
 * @private
 */
Status.prototype._modeList = {
	IDLE: 0,
	WAITING_FOR_OSD: 1,
	READ_OSD: 2,
	WRITE_OSD: 3
};

/**
 *
 * @param mode
 */
Status.prototype.setMode = function (mode) {
	if (mode == this._mode) {
		return;
	}

	switch (mode) {
		case this._modeList.IDLE:
			this._mode = mode;
			this._element.hide();
			this._percent = 0;
			this.reset();
			break;
		case this._modeList.WAITING_FOR_OSD:
			this._mode = mode;
			clearTimeout(this.hideTimeOut);
			this._element.show();
			this._runWait();
			break;
		case this._modeList.READ_OSD:
			this._mode = mode;
			clearTimeout(this.hideTimeOut);
			this._element.show();
			this._updatePercent();
		case this._modeList.WRITE_OSD:
			this._mode = mode;
			clearTimeout(this.hideTimeOut);
			this._element.show();
			this._updatePercent();
			break;


	}
};

/**
 *
 * @param partCount
 * @param totalCount
 */
Status.prototype.setProgress = function (partCount, totalCount) {
	this._percent = Math.round((100 / totalCount) * partCount);
	this._updatePercent();
};

/**
 *
 */
Status.prototype._updatePercent = function () {
	var _this = this;
	if (this._percent >= 100) {
		clearTimeout(this.hideTimeOut);
		this.hideTimeOut = setTimeout(function () {
			_this._element.hide();
			_this._percent = 0;
			_this._mode = _this._modeList.IDLE;
			_this.reset();
		}, 2000);
	}
	var label = (this._mode == this._modeList.READ_OSD ? 'Read' : 'Write');
	if (this._percent < 100) {
		this._element.html(label + ' ' + this._percent + '%');
	} else {
		this._element.html(label + ' Done');
	}

};

/**
 *
 */
Status.prototype._runWait = function () {
	this._element.html('Waiting for OSD');
};

