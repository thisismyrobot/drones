Protocol = function (serial) {
    this._serialConnector = new SerialConnector(serial);
    var _this = this;

	this.adaptiveDelay = new AdaptiveDelay();
	this.adaptiveDelay.addPlan('readEE', 20, 500, 100);

    this.handleChangeState = function (state) {
    };
    this.handleListDevices = function (ports) {
    };
    this.handleReceiveFrame = function (frame) {
    };
    this.handleConnectionFailed = function (msg) {
    };

    this.handleErrorOverRun = function () {
    };

    this._frameSize = 0;
    this.frame = {header: [], message: [], isChecksumOk: false};
    this.stateList = this._serialConnector.stateList;

    this._serialConnector.handleChangeState = function (state) {
        if (state == _this._serialConnector.stateList.DISCONECTED) {
            _this._reset();
            _this._clearTimeOut();
        }
        _this.handleChangeState(state);
    };

    this._serialConnector.handleListDevices = function (ports) {
        _this.handleListDevices(ports);
    };
    this._serialConnector.handleConnectionFailed = function (msg) {
        _this.handleConnectionFailed(msg);
    };


    //internal
    this._serialConnector.handleReceiveData = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (_this.frame.header.length == 0 && data[i] == 36) { // $ maybe we find start of header
                _this.frame.header[0] = data[i];
            } else if (_this.frame.header.length == 1 && data[i] == 77) { // M maybe we find sequencion $M
                _this.frame.header[1] = data[i];
            } else if (_this.frame.header.length == 2 && data[i] == 60) { // < maybe we find sequencion $M>
                _this.frame.header[2] = data[i];
            } else if (_this.frame.header.length == 3 && data[i] > 0) { // size
                _this.frame.header[3] = data[i];
                _this._frameSize = data[i];
            } else if (_this._frameSize > 0 && _this.frame.header.length == 4) { // message
                _this.frame.message[_this.frame.message.length] = data[i];
                if (_this.frame.message.length > _this._frameSize + 1) {
                    //check checksum
                    var checkSum = _this._frameSize;
                    for (var ii = 0; ii < _this.frame.message.length; ii++) {
                        checkSum ^= _this.frame.message[ii];
                    }

                    _this.frame.isChecksumOk = checkSum == 0;
                    var parsedFrame = _this.parseFrame(_this.frame);
                    if (parsedFrame) {
                        _this._clearTimeOut();
                        _this.handleReceiveFrame(parsedFrame);
                    }
                    _this._reset();

                }
            } else {
                //ignore incoming, reset all
                _this._reset();
            }
        }
    };

    this._serialConnector.handleDataSent = function () {
    };

    this._serialConnector.handleErrorOverRun = function (error) {
        _this.adaptiveDelay.resetAllError();
        _this._serialConnector.reconect();
    };

    this._serialConnector.handleErrorFrameError = function (error) {
		_this.adaptiveDelay.resetAllError();
        _this._serialConnector.reconect();
    };

    this._clearTimeOut();
    this._securityTmer = null;
};

/**
 *
 * @param frame
 * @returns {*}
 */
Protocol.prototype.parseFrame = function (frame) {

    if (!frame.isChecksumOk) {
        return false;
    }

    switch (frame.message[1]) {
        case this.commandList.OSD_READ_CMD_EE:
			this.adaptiveDelay.setError('readEE', false);
            var parsedMessage = {command: this.commandList.OSD_READ_CMD_EE, values: [], specialValues: {}};
            if (frame.message.length==5){
                parsedMessage.specialValues.nextaddress = frame.message[3] << 8 | frame.message[2];
            }
            else{
              for (var i = 2; i < frame.message.length - 1; i += 3) { // -1 because we remove checksum
                var address = frame.message[i + 1] << 8 | frame.message[i];
                var value = frame.message[i + 2];

                parsedMessage.values[address] = value;
              }
           }
              return parsedMessage;
 
            break;

        case this.commandList.OSD_SENSORS:
            var parsedMessage = {command: this.commandList.OSD_SENSORS, values: []};
            for (var i = 2; i < frame.message.length - 1; i += 2) {  // -1 because we remove checksum
                var value = frame.message[i + 1] << 8 | frame.message[i];
                parsedMessage.values[parsedMessage.values.length] = value;
            }

            return parsedMessage;
            break;
        case this.commandList.OSD_INFO:

            // Disconnect if > 1.6
            MainApp.protocol.disconect();
            $('#info-dialog-text').text('This GUI version does not support this OSD - an upgrade of your OSD firmware is required to operate with this GUI.');
	    		  $('#info-dialog').dialog(
				      {
					      title: 'Version Mismatch Warning',
					      buttons: [
						      {
							      text: "OK",
							      click: function () {
								      $(this).dialog("close");
							      } 
						      }
					      ]
				      }  
			      );        
        
            var parsedMessage = {command: this.commandList.OSD_INFO, values: []};
            for (var i = 2; i < frame.message.length - 1; i += 2) {  // -1 because we remove checksum
                var value = frame.message[i + 1] << 8 | frame.message[i];
                parsedMessage.values[parsedMessage.values.length] = value;
            }

            return parsedMessage;
            break;
    }

    return false;

};

/**
 *
 */
Protocol.prototype._reset = function () {
    this.frame = {header: [], message: [], specialValues: {}, isChecksumOk: false};
    this._frameSize = 0;
};

/**
 *
 * @type {{MSP_OSD: number}}
 */
Protocol.prototype.requestList = {
    MSP_IDENT: 100,
    MSP_STATUS: 101,
    MSP_RC: 105,
    MSP_RAW_GPS: 106,
    MSP_COMP_GPS: 107,
    MSP_ATTITUDE: 108,
    MSP_ALTITUDE: 109,
    MSP_ANALOG: 110,
    MSP_BOXIDS: 119,
    MSP_OSD: 220
};

/**
 *
 * @type {{OSD_GET_FONT: number, OSD_RESET: number, OSD_DEFAULT: number, OSD_SENSORS: number, OSD_WRITE_CMD_EE: number, OSD_READ_CMD_EE: number}}
 */
Protocol.prototype.commandList = {
    OSD_NULL: 0,
    OSD_GET_FONT: 3,
    OSD_RESET: 5,
    OSD_DEFAULT: 6,
    OSD_SENSORS: 7,
    OSD_WRITE_CMD_EE: 8,
    OSD_READ_CMD_EE: 9,
    OSD_INFO: 10
};

/**
 *
 * @type {number[]}
 */
Protocol.prototype.outHeader = [36, 77, 62]; // $ M >

/**
 *
 * @param position1
 * @param position2
 * @returns {Array.<T>}
 */
Protocol.prototype.requestForEE = function (position) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 4; //size
    frame[1] = this.requestList.MSP_OSD;
    frame[2] = this.commandList.OSD_READ_CMD_EE;
    frame[3] = position > 255 ? 255 : position;
    frame[4] = position > 255 ? position - 255 : 0;
    frame[5] = 99; //????
    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[6] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;


    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
		_this.adaptiveDelay.setError('readEE', true);
        _this.handleReceiveFrame(false);
    }, _this.adaptiveDelay.getDelay('readEE'));

    _this._serialConnector.send(_this.outHeader.concat(frame));

};

/**
 *
 * @param position1
 * @param position2
 * @returns {Array.<T>}
 */
Protocol.prototype.requestForWriteEE = function (frame) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var mwFrame = [];

    mwFrame[mwFrame.length] = 1 + (10 * 3);//size

    mwFrame[mwFrame.length] = this.requestList.MSP_OSD;
    mwFrame[mwFrame.length] = this.commandList.OSD_WRITE_CMD_EE;

    for (var adderess in frame.values.values) {
        mwFrame[mwFrame.length] = adderess & 0xff;
        mwFrame[mwFrame.length] = adderess >> 8 & 0xff;
        mwFrame[mwFrame.length] = frame.values.values[adderess] & 0xff;
    }

    //caulcalete  checksum
    var checkSum = 0;//size;
    for (var i = 0; i < mwFrame.length; i++) {
        checkSum ^= mwFrame[i];
    }
    mwFrame[mwFrame.length] = checkSum;

    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        console.log('time out')
        _this.handleReceiveFrame(false);
    }, 200); // posssible 80ms

    this._serialConnector.send(_this.outHeader.concat(mwFrame));
};

/**
 *
 * @param position1
 * @param position2
 * @returns {Array.<T>}
 */
Protocol.prototype.sendFontUploadInit = function () {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var mwFrame = [];

    mwFrame[mwFrame.length] = 5;
    mwFrame[mwFrame.length] = this.requestList.MSP_OSD;
    mwFrame[mwFrame.length] = this.commandList.OSD_GET_FONT;
    mwFrame[mwFrame.length] = 7456 & 0xFF;
    mwFrame[mwFrame.length] = 7456 >> 8 & 0xFF;
    mwFrame[mwFrame.length] = 0;
    mwFrame[mwFrame.length] = 255;


    //caulcalete  checksum
    var checkSum = 0;//size;
    for (var i = 0; i < mwFrame.length; i++) {
        checkSum ^= mwFrame[i];
    }
    mwFrame[mwFrame.length] = checkSum;

    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._serialConnector.send(_this.outHeader.concat(mwFrame));
};

/**
 *
 * @param char
 */
Protocol.prototype.sendChar = function (char, charPosition) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var mwFrame = [];

    mwFrame[mwFrame.length] = 56;
    mwFrame[mwFrame.length] = this.requestList.MSP_OSD;
    mwFrame[mwFrame.length] = this.commandList.OSD_GET_FONT;

    for (var i = 0; i < 54; i++) {
        var byteStr = char.substr(i * 8, 8);

        var byte = 0;
        for (var key in byteStr) {
            byte = byte << 1 | byteStr[key];
        }
        mwFrame[mwFrame.length] = byte & 0xFF;

    }

    mwFrame[mwFrame.length] = charPosition;

    //caulcalete  checksum
    var checkSum = 0;//size;
    for (var i = 0; i < mwFrame.length; i++) {
        checkSum ^= mwFrame[i];
    }

    mwFrame[mwFrame.length] = checkSum;

    this.frame = {header: [], message: [], isChecksumOk: false};


    this._clearTimeOut();
    this._serialConnector.send(this.outHeader.concat(mwFrame));
};

/**
 *
 * @param char
 */
Protocol.prototype.sendDefault = function () {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var mwFrame = [];

    mwFrame[mwFrame.length] = 1;
    mwFrame[mwFrame.length] = this.requestList.MSP_OSD;
    mwFrame[mwFrame.length] = this.commandList.OSD_DEFAULT;

    //caulcalete  checksum
    var checkSum = 0;//size;
    for (var i = 0; i < mwFrame.length; i++) {
        checkSum ^= mwFrame[i];
    }
    mwFrame[mwFrame.length] = checkSum;


    this.frame = {header: [], message: [], isChecksumOk: false};

    this._clearTimeOut();
    this._serialConnector.send(this.outHeader.concat(mwFrame));
};

/**
 *
 * @param char
 */
Protocol.prototype.sendRestart = function () {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var mwFrame = [];

    mwFrame[mwFrame.length] = 1;
    mwFrame[mwFrame.length] = this.requestList.MSP_OSD;
    mwFrame[mwFrame.length] = this.commandList.OSD_RESET;

    //caulcalete  checksum
    var checkSum = 0;//size;
    for (var i = 0; i < mwFrame.length; i++) {
        checkSum ^= mwFrame[i];
    }
    mwFrame[mwFrame.length] = checkSum;


    this.frame = {header: [], message: [], isChecksumOk: false};

    this._clearTimeOut();
    this._serialConnector.send(this.outHeader.concat(mwFrame));
};

/**
 *
 *
 */
Protocol.prototype.requestForSenzors = function () {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }
    var frame = [];
    frame[0] = 1; //size
    frame[1] = this.requestList.MSP_OSD;
    frame[2] = this.commandList.OSD_SENSORS;
    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[3] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};

Protocol.prototype.sendMSPstatus = function (MODEarmed,MODEstable,MODEhorizon,MODEbaro,MODEmag,MODErth,MODEhold,MODEmission,MODEcamstab,MODEosdswitch,MODEair,MODEother) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var sensors = 0x0F;
    var modebits = 0x00;
    modebits = modebits | (MODEarmed<<0);
    modebits = modebits | (MODEstable<<1);
    modebits = modebits | (MODEhorizon<<2);
    modebits = modebits | (MODEbaro<<3);
    modebits = modebits | (MODEmag<<5);
    modebits = modebits | (MODEcamstab<<8);
    modebits = modebits | (MODErth<<10);
    modebits = modebits | (MODEhold<<11);
    modebits = modebits | (MODEosdswitch<<19);

    modebits = modebits | (MODEother<<12); // use for testing <<12 = passthrough

    var inav = 0;
    if (inav==1) {
      modebits = modebits | (MODEmission<<28);
      modebits = modebits | (MODEair<<29);
    }
    else {
      modebits = modebits | (MODEmission<<20);
      modebits = modebits | (MODEair<<28);
    }
    
    var frame = [];
    frame[0] = 11; //size
    frame[1] = this.requestList.MSP_STATUS;

    frame[6] = sensors & 0xFF;         // this sends FC sensorsfitted and get the OSD running�
    frame[7] = sensors >> 8;

    frame[8] = modebits & 0xFF;      // this sends FC sensors activated�
    frame[9] = modebits >> 8 & 0xFF;
    frame[10] = modebits >> 16 & 0xFF;
    frame[11] = modebits >> 24 & 0xFF;

    frame[12] = 0;

    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[11 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};


Protocol.prototype.sendMSPboxid = function () {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 30; //size
    frame[1] = this.requestList.MSP_BOXIDS;

    for (var i = 0; i < 30; i++) {
        frame[i + 2] = i;
    }

    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[30 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};


Protocol.prototype.sendMSPrawgps = function (GPSfix, GPSsats, GPSaltitude, GPSspeed, GPSheading) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 16; //size
    frame[1] = this.requestList.MSP_RAW_GPS;

    for (var i = 0; i < 16; i++) {
        frame[i + 2] = 0;
    }
    frame[2] = GPSfix & 0xFF;       //fix
    frame[3] = GPSsats & 0xFF;      //sats
    frame[12] = GPSaltitude & 0xFF; //altitude
    frame[13] = GPSaltitude >> 8;   //altitude
    frame[14] = GPSspeed & 0xFF;    //speed
    frame[15] = GPSspeed >> 8;      //speed
    frame[16] = GPSheading & 0xFF;  //GPS heading
    frame[17] = GPSheading >> 8;    //GPS heading

    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[16 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};


Protocol.prototype.sendMSPcompgps = function (GPSdistancetohome, GPSheadinghome) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 5; //size
    frame[1] = this.requestList.MSP_COMP_GPS;

    for (var i = 0; i < 5; i++) {
        frame[i + 2] = 0;
    }

    frame[2] = GPSdistancetohome & 0xFF; //GPS distance from home
    frame[3] = GPSdistancetohome >> 8;  //GPS heading
    frame[4] = GPSheadinghome & 0xFF; //GPS distance from home
    frame[5] = GPSheadinghome >> 8;  //GPS heading to home

    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[5 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};


Protocol.prototype.sendMSPanalog = function (ANALall) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 7; //size
    frame[1] = this.requestList.MSP_ANALOG;

    for (var i = 0; i < 5; i++) {
        frame[i + 2] = 0;
    }

    var aBAT = ANALall;
    var aRSSI = ANALall*10;
    var aAMPS = ANALall*10;

    frame[2] = aBAT & 0xFF; //vbat
    frame[5] = aRSSI & 0xFF; //RSSI
    frame[6] = aRSSI >> 8;  //RSSI
    frame[7] = aAMPS & 0xFF; //AMPS
    frame[8] = aAMPS >> 8;  //AMPS

    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[7 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};

 
Protocol.prototype.sendMSPattitude = function (ACCpitch, ACCroll, MAGheading) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 8; //size
    frame[1] = this.requestList.MSP_ATTITUDE;

    for (var i = 0; i < 8; i++) {
        frame[i + 2] = 0;
    }

    ACCpitch = ACCpitch * 10;
    ACCroll  = ACCroll  * 10;
    frame[2] = ACCpitch & 0xFF;         //Pitch / Roll / Mag
    frame[3] = ACCpitch >> 8 & 0xFF;  
    frame[4] = ACCroll & 0xFF;  
    frame[5] = ACCroll >> 8 & 0xFF;  
    frame[6] = MAGheading & 0xFF;     
    frame[7] = MAGheading >> 8 & 0xFF;      

    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[8 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};

Protocol.prototype.sendMSPaltitude = function (BAROaltitude, BAROvario) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 6; //size
    frame[1] = this.requestList.MSP_ALTITUDE;

    for (var i = 0; i < 6; i++) {
        frame[i + 2] = 0;
    }

    BAROaltitude = BAROaltitude * 100;
    
    frame[2] = BAROaltitude & 0xFF;         //Pitch / Roll / Mag
    frame[3] = BAROaltitude >> 8 & 0xFF;  
    frame[4] = BAROaltitude >> 16 & 0xFF;  
    frame[5] = BAROaltitude >> 24 & 0xFF;  
    frame[6] = BAROvario & 0xFF;     
    frame[7] = BAROvario >> 8 & 0xFF;      

    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[6 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};


Protocol.prototype.sendMSPrc = function (RCPR, RCYT,RCA12,RCA34) {
//Protocol.prototype.sendMSPrc = function (RCroll, RCpitch, RCyaw, RCthrottle) {
    if (this.getState() != this.stateList.CONNECTED) {
        return;
    }

    var frame = [];
    frame[0] = 16; //size
    frame[1] = this.requestList.MSP_RC;

    for (var i = 0; i < 8; i++) {
        frame[(i*2) + 2] = 0xDC;
        frame[(i*2) + 3] = 0x05;
    }

    //temp fix for gimbal centering
    var RCroll     =RCPR[0]+1000;
    var RCpitch    =2000-RCPR[1];
    var RCyaw      =RCYT[0]+1000;
    var RCthrottle =2000-RCYT[1];
    var RCaux1     =RCA12[0]+1000;
    var RCaux2     =2000-RCA12[1];
    var RCaux3     =RCA34[0]+1000;
    var RCaux4     =2000-RCA34[1];
    
    frame[2] = RCroll & 0xFF;         //RC Pitch / Roll / YAw / Thr
    frame[3] = RCroll >> 8 & 0xFF;  
    frame[4] = RCpitch & 0xFF;         
    frame[5] = RCpitch >> 8 & 0xFF;  
    frame[6] = RCyaw & 0xFF;        
    frame[7] = RCyaw >> 8 & 0xFF;  
    frame[8] = RCthrottle & 0xFF;        
    frame[9] = RCthrottle >> 8 & 0xFF;  

    frame[10] = RCaux1 & 0xFF;         //RC Pitch / Roll / YAw / Thr
    frame[11] = RCaux1 >> 8 & 0xFF;  
    frame[12] = RCaux2 & 0xFF;         
    frame[13] = RCaux2 >> 8 & 0xFF;  
    frame[14] = RCaux3 & 0xFF;        
    frame[15] = RCaux3 >> 8 & 0xFF;  
    frame[16] = RCaux4 & 0xFF;        
    frame[17] = RCaux4 >> 8 & 0xFF;  


    //calculate checksum
    var checkSum = 0;
    for (var i = 0; i < frame.length; i++) {
        checkSum ^= frame[i];
    }

    frame[16 + 2] = checkSum;
    this.frame = {header: [], message: [], isChecksumOk: false};

    var _this = this;

    this._clearTimeOut();
    this._securityTmer = setTimeout(function () {
        _this.handleReceiveFrame(false);
    }, 500);

    this._serialConnector.send(_this.outHeader.concat(frame));
};

//serial proxy
/**
 *
 */
Protocol.prototype.disconect = function () {
    this._serialConnector.disconect();
};

/**
 *
 * @param deviceName
 * @param baud
 */
Protocol.prototype.connect = function (deviceName, baud) {
    this._serialConnector.connect(deviceName, baud);
};

/**
 *
 */
Protocol.prototype.getDevices = function () {
    this._serialConnector.getDevices();
};

/**
 *
 */
Protocol.prototype.getState = function () {
    return this._serialConnector.getState();
};

/**
 *
 */
Protocol.prototype._clearTimeOut = function () {
    clearTimeout(this._securityTmer);
};

