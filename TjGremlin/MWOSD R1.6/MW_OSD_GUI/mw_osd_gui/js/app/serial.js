/**
 *
 * @param serial
 * @constructor
 */
SerialConnector = function (serial) {
	this._serial = serial;
	this._connectionId = null;
	this._connectionString = null;
	this._connectionBitrate = null;
	this._state = this.stateList.DISCONECTED;


	this.handleChangeState = function (state) {
		console.log('change state ' + state);
	};

	this.handleErrorOverRun = function (error) {

    };

    this.handleErrorFrameError = function (error) {

    };

	this.handleListDevices = function (state) {
	};

	this.handleConnectionFailed = function (msg) {

	};

	/**
	 *
	 * @param Uint8Array data
	 */
	this.handleReceiveData = function (data) {
	};

	/**
	 *
	 * @param Uint8Array data
	 */
	this.handleDataSent = function () {
	};

	var _this = this;
	var onReceiveCallback = function (info) {
		if (info.connectionId == _this._connectionId && info.data) {
			_this.handleReceiveData(new Uint8Array(info.data));
		}
	};

	var onReceiveErrorCallback = function (info) {
		if (info.connectionId == _this._connectionId) {
			console.log(info.error);

			switch (info.error) {
				case 'disconnected':
				case 'device_lost':
				case 'break':
				case 'system_error':
					_this._state = _this.stateList.DISCONECTED;
					_this._connectionId = null;
					_this.handleChangeState(_this._state);
					break;
				case 'overrun':
					console.log('handle error: overrun');
					_this.handleErrorOverRun(info.error);
					break;
                case 'frame_error':
                    console.log('handle error: frame_error');
                    _this.handleErrorFrameError(info.error);
                    break;
				default:
					_this._state = _this.stateList.DISCONECTED;
					_this._connectionId = null;
					_this.handleChangeState(_this._state);
					// do nothing;
			}
		}
	};

	this._serial.onReceive.addListener(onReceiveCallback);
	this._serial.onReceiveError.addListener(onReceiveErrorCallback);
};

/**
 *
 * @type {{DISCONECTED: number, CONNECTING: number, CONNECTED: number, DISCONECTING: number}}
 */
SerialConnector.prototype.stateList = {
	DISCONECTED: 0,
	CONNECTING: 1,
	CONNECTED: 2,
	DISCONECTING: 3
};

/**
 *
 */
SerialConnector.prototype.reconect = function(){
	var _this = this;
	jQuery.when(_this.disconect()).then(function() {
		_this.connect(_this._connectionString, _this._connectionBitrate);
	});
};

/**
 *
 * @returns {number|*}
 */
SerialConnector.prototype.getState = function () {
	return this._state;
};

/**
 *
 * @param callBack
 */
SerialConnector.prototype.getDevices = function () {
	this._serial.getDevices(this.handleListDevices);
};

/**
 *
 * @param deviceName
 * @param bitrate
 */
SerialConnector.prototype.connect = function (deviceName, bitrate) {
	try{
		var _this = this;
		var checkPortCallBack = function (ports) {

			for (var i = 0; i < ports.length; i++) {
				if (ports[i].path == deviceName) {
					_this._connect(deviceName, parseInt(bitrate));
					return;
				}
			}
			throw "Device " + deviceName + " not found";
		};

		this._serial.getDevices(checkPortCallBack);
	}catch(ex){
		this._state = this.stateList.DISCONECTED;
		this._connectionId = null;
		this.handleChangeState(this._state);
	}

};


/**
 *
 */
SerialConnector.prototype.disconect = function () {
	var dfd = jQuery.Deferred();
	if (this.getState() == this.stateList.CONNECTED) {
		var _this = this;
		var onDisconectCallback = function () {
			_this._state = _this.stateList.DISCONECTED;
			_this._connectionId = null;
			_this.handleChangeState(_this._state);
			dfd.resolve('disconected');
		};

		this._state = _this.stateList.DISCONECTING;
		this.handleChangeState(this._state);
		this._serial.disconnect(this._connectionId, onDisconectCallback);
	}

	return dfd.promise();


};

/**
 *
 * @param byteArray
 */
SerialConnector.prototype.send = function (byteArray) {
	if (this._connectionId) {
		var buf = new ArrayBuffer(byteArray.length);
		var bufView = new Uint8Array(buf);

		for (var i = 0; i < byteArray.length; i++) {
			bufView[i] = byteArray[i];
		}

		this._serial.send(this._connectionId, buf, this.handleDataSent);
		return;
	}
};

/**
 * internal DONT use
 * @param deviceName
 * @param bitrate
 */
SerialConnector.prototype._connect = function (deviceName, bitrate) {
	if (this.getState() != this.stateList.DISCONECTED) {
		return false;
	}

	var _this = this;

	bitrate = bitrate || 9600;
	this._state = _this.stateList.CONNECTING;
	this.handleChangeState(_this._state);


	var onConnect = function (connectionInfo) {
		if (chrome.runtime.lastError) {
			_this._connectionId = null;
			_this._state = _this.stateList.DISCONECTED;
			_this.handleConnectionFailed(chrome.runtime.lastError.message);
		} else {
			if (connectionInfo != null) {
				_this._connectionId = connectionInfo.connectionId;
				_this._connectionString = deviceName;
				_this._connectionBitrate = bitrate;
				_this._state = _this.stateList.CONNECTED;
				_this.handleChangeState(_this._state);
			} else {
				_this._connectionId = null;
				_this._state = _this.stateList.DISCONECTED;
				_this.handleChangeState(_this._state);
			}
		}
	};

	var options = {
		'bitrate': bitrate,
	};

	chrome.serial.connect(deviceName, options, onConnect);
};
