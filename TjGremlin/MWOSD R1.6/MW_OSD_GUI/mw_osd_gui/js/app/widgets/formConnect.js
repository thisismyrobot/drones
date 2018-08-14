FormConnect = function () {

	this.state = this.stateList.DISCONECTED;
	this.node = null;

	this.cover = $('<div>').hide();
	this.ports = $('<select>');
	this.baudRate = $('<select>');
	this.connectionButon = $('<button>');
	this.handleSubmit = function (values) {
	};

	for (var baudRateKey in this.baudRateList) {
		this.baudRate.append($('<option>').attr('name', baudRateKey).html(this.baudRateList[baudRateKey]));
	}

	this.cover.append(this.ports).append(this.baudRate).append($('<br>')).append(this.connectionButon);

	this._changeState();

	var _this = this;
	this.connectionButon.click(function (event) {
		chrome.storage.local.set({'ports': _this.ports.val()}, function () {
		});
		chrome.storage.local.set({'baudRate': _this.baudRate.val()}, function () {
		});

		_this.handleSubmit({port: _this.ports.val(), baudRate: _this.baudRate.val()}, function () {
		});
	});
};

/**
 *
 * @param node
 */
FormConnect.prototype.connectToNode = function (node) {
	this.node = node;
	this.node.html(this.cover);
};

/**
 *
 * @param state
 */
FormConnect.prototype.changeState = function (state) {
	this.state = state;
	this._changeState();
};

/**
 *
 * @type {{9600: number}}
 */
FormConnect.prototype.baudRateList = {
	9600:   9600,
  38400:  38400,
  19200:  19200,
  57600:  57600,
 	115200: 115200
};

/**
 *
 * @type {{DISCONECTED: number, CONNECTING: number, CONNECTED: number, DISCONECTING: number}}
 */
FormConnect.prototype.stateList = {
	DISCONECTED: 0,
	CONNECTING: 1,
	CONNECTED: 2,
	DISCONECTING: 3
};

/**
 *
 */
FormConnect.prototype.show = function () {
	this.cover.show();
	this.connectionButon.button();


	var _this = this;
	chrome.storage.local.get('ports', function (value) {
		_this.ports.val(value.ports);
		_this.ports.selectmenu();
	});
	chrome.storage.local.get('baudRate', function (value) {
		_this.baudRate.val(value.baudRate);
		_this.baudRate.selectmenu();
	});
};

/**
 *
 */
FormConnect.prototype.hide = function () {
	this.cover.hide();
};

/**
 *
 * @param ports
 */
FormConnect.prototype.setPorts = function (ports) {
	this.ports.html('');
	for (var portKey in ports) {
		var option = $('<option>').attr('name', ports[portKey].path).html(ports[portKey].path);
		this.ports.append(option);
	}

};

/**
 *
 * @private
 */
FormConnect.prototype._changeState = function () {
	switch (this.state) {
		case this.stateList.DISCONECTED:
			this.connectionButon.button({label: "<img src='icons/usb_icon_connect.svg' /><br />Connect"}).removeAttr('disabled');
			break;

		case this.stateList.CONNECTED:
			this.connectionButon.button({label: "<img src='icons/usb_icon_disconnect.svg' /><br />Disconect"}).removeAttr('disabled');
			break;

		case this.stateList.CONNECTING:
            this.connectionButon.button({label: "<img src='icons/usb_icon_connect.svg' /><br />Connecting"}).attr('disabled', 'disabled');
			break;

		case this.stateList.DISCONECTING:
            this.connectionButon.button({label: "<img src='icons/usb_icon_disconnect.svg' /><br />Disconect"}).attr('disabled', 'disabled');
			break;
	}
};
