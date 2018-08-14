MainApp = function () {
	/* -------  SETTINGS -------- */
	this.versionmin = 12; // Min version supported - e.g. 12 for 1.6 eeprom layout 
	this.versionmax = 12; // Max version supported - e.g. 13 for 1.7 eeprom layout


	this.defaultMCMFile = 'data/mcm/default.mcm';
	this.backgroundPreview = 'image/osd.jpg';
	this.layoutSettings = new SettingsManager('js/app/settings/settingsHud.json');
    this.mcmList = new McmList($('#mcmList'), McmEnum);

	this.layoutActive = 0;

	/* -------  PROPERTIES -------- */
	this.protocol = new Protocol(chrome.serial);
	this.guiModel = new GuiModel();
	this.scenario = this.scenarioList.IDDLE;
	this.livePreview = new ScreenResolutionEditor($('#main_screen'), 'pal');
	this.livePreviewControl = new SreenResolutionControl($('#main_screen_control'));
    this.emulator = new Emulator($('#emulator'));
	this.log = new Log($('#log'));
	this.livePreviewControl.livePreview = this.livePreview;

	this.screenFontsMap = new FontMap(null);
	this.indexFramesToWrite = 0;
	this.countWriteFailed = 0;
	this.protocol = new Protocol(chrome.serial);
	this.framesToWrite = [];
	this.senzorInterval = null;
	var _this = this;

	$('#saveSettingsToDisk').button();
	$('#loadSettingsFromDisk').button();

	$("#tabs").tabs({ activate: function(event ,ui){
        tracker.sendAppView(ui.newTab.attr('li',"innerHTML")[0].getElementsByTagName("a")[0].innerHTML);
    } });

	/* -------  ------- -------- */

	this.protocol.handleChangeState = function (state) {
		_this.connectionWidget.changeState(state);

		if (state == _this.protocol.stateList.CONNECTED) {
            _this.log.addText('Connected');
            _this.guiModel.reset();
			_this.scenario = _this.scenarioList.READ_EE;
			_this.protocol.requestForEE(_this.guiModel.getOneAdressWhatYouNeed());

			/* -------  SENZOR INTERVAL -------- */
			_this.senzorInterval = setInterval(function () {
				if (_this.scenario == _this.scenarioList.IDDLE) {
					_this.protocol.requestForSenzors();  
				  	_this.protocol.sendMSPstatus(_this.emulator.elements.MODEarmed.getValue(),_this.emulator.elements.MODEstable.getValue(),_this.emulator.elements.MODEhorizon.getValue(),_this.emulator.elements.MODEbaro.getValue(),_this.emulator.elements.MODEmag.getValue(),_this.emulator.elements.MODErth.getValue(),_this.emulator.elements.MODEhold.getValue(),_this.emulator.elements.MODEmission.getValue(),_this.emulator.elements.MODEcamstab.getValue(),_this.emulator.elements.MODEosdswitch.getValue(),_this.emulator.elements.MODEair.getValue(),_this.emulator.elements.MODEother.getValue());
					_this.protocol.sendMSPboxid();
					_this.protocol.sendMSPrawgps(_this.emulator.elements.GPSfix.getValue(), _this.emulator.elements.GPSsats.getValue(), _this.emulator.elements.GPSaltitude.getValue(), _this.emulator.elements.GPSspeed.getValue(), _this.emulator.elements.GPSheading.getValue());
					_this.protocol.sendMSPcompgps(_this.emulator.elements.GPSdistancetohome.getValue(), _this.emulator.elements.GPSheadinghome.getValue());
					_this.protocol.sendMSPattitude(_this.emulator.elements.ACCpitch.getValue(), _this.emulator.elements.ACCroll.getValue(), _this.emulator.elements.MAGheading.getValue());
					_this.protocol.sendMSPaltitude(_this.emulator.elements.BAROaltitude.getValue(), _this.emulator.elements.BAROvario.getValue());
					_this.protocol.sendMSPanalog(_this.emulator.elements.ANALall.getValue());
					_this.protocol.sendMSPrc(_this.emulator.elements.GimbalRight.getValue(), _this.emulator.elements.GimbalLeft.getValue(), _this.emulator.elements.AUX12.getValue(), _this.emulator.elements.AUX34.getValue());
				}
			}, 500);


		}

		if (state == _this.protocol.stateList.DISCONECTED) {
            _this.log.addText('Disconnected');
			_this.scenario = _this.scenarioList.IDDLE;
			clearInterval(_this.senzorInterval);
			_this.guiModel.reset();
		}

	};

	/* -------  HANDLES -------- */
	this.protocol.handleListDevices = function (ports) {
		_this.connectionWidget.setPorts(ports);
		_this.connectionWidget.show();
	};

	this.protocol.handleReceiveFrame = function (frame) {
		if (_this.protocol.getState() == _this.protocol.stateList.CONNECTED) {
			//find out non cycle command
			if (frame) {
				switch (frame.command) {
					case  _this.protocol.commandList.OSD_SENSORS:
						_this.guiModel.setSenzorsFrameValue(frame);
						break;
                    case  _this.protocol.commandList.OSD_INFO:
                        _this.guiModel.setInfoFrameValue(frame);
                        break;
				}

			}

			//read write, because read write is cyrcle
			if (_this.scenario == _this.scenarioList.READ_EE) {
				if (frame && frame.command == _this.protocol.commandList.OSD_READ_CMD_EE) {
					_this.checkVersion(frame);
					_this.guiModel.setReadWriteFrameValue(frame);
				}

				var needAddress = _this.guiModel.getOneAdressWhatYouNeed();
				if (needAddress !== false) {
					_this.protocol.requestForEE(_this.guiModel.getOneAdressWhatYouNeed());
				} else {
					_this.scenario = _this.scenarioList.IDDLE;
				}
			} else if (_this.scenario == _this.scenarioList.WRITE_EE) {
				if (frame && frame.command == _this.protocol.commandList.OSD_READ_CMD_EE) { // because frame from write has same code as read this.commandList.OSD_READ_CMD_EE, this is from mw_osd :(
					_this.indexFramesToWrite = frame.specialValues.nextaddress == 0 ? 0 : (frame.specialValues.nextaddress / 10);
					_this.guiModel.setModeWriteToOsd();
					_this.guiModel.setProgress(_this.indexFramesToWrite, _this.framesToWrite.length);
                    _this.countWriteFailed = 0;
				}
				else
				{
                    _this.countWriteFailed++;
				}

				if(_this.countWriteFailed == 16){ // failed count
                    $.toast({
                        text: 'Write failed',
                        position: 'top-right',
                        icon: 'error'
                    });
                    _this.framesToWrite = [];
                    _this.scenario = _this.scenarioList.IDDLE;
                    _this.formMenu.handleReadFromOsd();
                    _this.countWriteFailed = 0;
				}

				if (_this.indexFramesToWrite < _this.framesToWrite.length) {
					console.timeEnd();
                    console.time();
					_this.protocol.requestForWriteEE(_this.framesToWrite[_this.indexFramesToWrite]);
				} else {
					_this.framesToWrite = [];
					_this.scenario = _this.scenarioList.IDDLE;
					_this.formMenu.handleReadFromOsd();
                    _this.countWriteFailed = 0;
				}
			}
		}
	};


	/* -------  FormConnect -------- */
	this.connectionWidget = new FormConnect();
	this.connectionWidget.connectToNode($('#connection-widget'));
	this.connectionWidget.handleSubmit = function (values) {
		if (_this.protocol.getState() == _this.protocol._serialConnector.stateList.DISCONECTED) {
			_this.log.addText('Connecting');
			_this.protocol.connect(values.port, values.baudRate);
		} else if (_this.protocol.getState() == _this.protocol._serialConnector.stateList.CONNECTED) {
			_this.log.addText('Disconnecting');
			_this.protocol.disconect();
		}
	};

	this.protocol.handleConnectionFailed = function (msg) {
		$('#info-dialog-text').text('Cant connect to device');
		$('#info-dialog').dialog(
			{
				title: 'Connection problem',
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

		_this.log.addText('Cant connect to device');

		_this.scenario = _this.scenarioList.IDDLE;
		clearInterval(_this.senzorInterval);
		_this.guiModel.reset();
		_this.connectionWidget.changeState(_this.protocol.stateList.DISCONECTED);
	};

	/* -------  FormMenu -------- */
	this.formMenu = new FormMenu($('#menu-widget'));

	this.formMenu.handleReadFromOsd = function () {
		if (_this.protocol.getState() == _this.protocol.stateList.CONNECTED && _this.scenario == _this.scenarioList.IDDLE) {
			_this.guiModel.reset();
			_this.scenario = _this.scenarioList.READ_EE;
			_this.protocol.requestForEE(_this.guiModel.getOneAdressWhatYouNeed());
		} else {
			if (_this.protocol.getState() != _this.protocol.stateList.CONNECTED) {
				$.toast({
					text: 'You have to connect',
					position: 'top-right',
					icon: 'error'
				});
				_this.log.addText('You have to connect');
			} else {
				$.toast({
					text: 'Another task is in progress',
					position: 'top-right',
					icon: 'error'
				});
				_this.log.addText('Another task is in progress');
			}
		}
	};

	this.formMenu.handleWriteToOsd = function () {
		if (_this.protocol.getState() == _this.protocol.stateList.CONNECTED && _this.scenario == _this.scenarioList.IDDLE) {
			_this.indexFramesToWrite = 0;
            _this.countWriteFailed = 0;
			_this.framesToWrite = _this.guiModel._partOfAdress;
			_this.scenario = _this.scenarioList.WRITE_EE;
			_this.guiModel.setModeWaitingForOsd();
			_this.protocol.requestForWriteEE(_this.framesToWrite[_this.indexFramesToWrite]);
		} else {
			if (_this.protocol.getState() != _this.protocol.stateList.CONNECTED) {
				$.toast({
					text: 'You have to connect',
					position: 'top-right',
					icon: 'error'
				});
			} else {
				$.toast({
					text: 'Another task is in progress',
					position: 'top-right',
					icon: 'error'
				});
			}
		}
	};

	this.formMenu.handleDefault = function () {
		if (_this.protocol.getState() == _this.protocol.stateList.CONNECTED && _this.scenario == _this.scenarioList.IDDLE) {
			_this.scenario = _this.scenarioList.DEFAULT;
			_this.guiModel.setModeWaitingForOsd();

			var counter = 3;
			var defaultInterval = setInterval(function () {
				if (counter > 3) {
					clearInterval(defaultInterval);
					_this.scenario = _this.scenarioList.IDDLE;
					_this.formMenu.handleReadFromOsd();
				} else {
					_this.protocol.sendDefault();
					counter++;
				}

			}, 100);

			_this.protocol.sendDefault();
		} else {
			if (_this.protocol.getState() != _this.protocol.stateList.CONNECTED) {
				$.toast({
					text: 'You have to connect',
					position: 'top-right',
					icon: 'error'
				});
			} else {
				$.toast({
					text: 'Another task is in progress',
					position: 'top-right',
					icon: 'error'
				});
			}
		}
	};

	this.formMenu.handleRestart = function () {
		if (_this.protocol.getState() == _this.protocol.stateList.CONNECTED && _this.scenario == _this.scenarioList.IDDLE) {
			_this.scenario = _this.scenarioList.RESTART;
			_this.guiModel.setModeWaitingForOsd();

			var counter = 3;
			var defaultInterval = setInterval(function () {
				if (counter > 3) {
					clearInterval(defaultInterval);
					_this.scenario = _this.scenarioList.IDDLE;
					_this.formMenu.handleReadFromOsd();
				} else {
					_this.protocol.sendRestart();
					counter++;
				}

			}, 100);

		} else {
			if (_this.protocol.getState() != _this.protocol.stateList.CONNECTED) {
				$.toast({
					text: 'You have to connect',
					position: 'top-right',
					icon: 'error'
				});
			} else {
				$.toast({
					text: 'Another task is in progress',
					position: 'top-right',
					icon: 'error'
				});
			}
		}
	};

    this.formMenu.handleLoadFont = function () {
        _this.loadFont();
    };

	/* -------  File dialog Edit Font -------- */
    this.editFontsButton = $('#fileDialogEditFont').dialog({
        autoOpen: false,
        width: 1160,
        height: 700,
        modal: true,
        resizable: false,
        close: function () {
            _this.screenFontsMap.setFontsData(_this.appStrips.fontsData());
            _this.livePreview.setNewFontMap(_this.screenFontsMap);// after close dialog copy edited fonts data to livePreview preview
        }
    });

	/* -------  File dialog load Font -------- */
    this.loadFontsButton = $('#loadFontDialog').dialog({
        autoOpen: false,
        width: 700,
        height: 400,
        modal: true,
        resizable: true,
        close: function () {
        }
    });

    this.mcmList.loadFont = function (url) {
        _this.appStrips.loadDataByAjax(url, function () {
            _this.screenFontsMap.setFontsData(_this.appStrips.fontsData());
            _this.livePreview.setNewFontMap(_this.screenFontsMap);
            $.toast({
                text: 'MCM was loaded',
                position: 'top-right',
                icon: 'info'
            });
        });
    };


	$('#loadFontFromDisk').click(function(){
        chrome.fileSystem.chooseEntry(
            {
                type: 'openFile', accepts: [{
                extensions: ['mcm']
            }]
            },
            function (fileEntry) {
				if (chrome.runtime.lastError || !fileEntry) {
                    console.log("User did not choose a file");
                    return;
                }

                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        _this.appStrips.loadDataFromString(e.target.result);
                        _this.screenFontsMap.setFontsData(e.target.result);
                        _this.livePreview.setNewFontMap(_this.screenFontsMap);
                    };
                    reader.readAsText(file);

                    $.toast({
                        text: 'MCM file loaded',
                        position: 'top-right',
                        icon: 'info'
                    });
                });

            });
	});

	$('#saveSettingsToDisk').click(function(){

		// JSON.stringify(, null, "\t")

		var blobData = {
			frames:  _this.guiModel._partOfAdress,
			layouts: _this.layoutSettings._settingsValues,
		};

		var blob = new Blob([JSON.stringify(blobData, null, "\t")], {type: "application/text"});

		var downloadLink = $('<a>');
		downloadLink.attr('href', window.URL.createObjectURL(blob));
		downloadLink.attr('download', 'MWOS-settins-' + (new Date().toISOString().slice(0, -5)) + '.json');
		downloadLink[0].click();

		$.toast({
			text: 'Settings file was saved to download folder',
			position: 'top-right',
			icon: 'info'
		});
		_this.log.addText('Settings file was saved to download folder');
	});

	$('#loadSettingsFromDisk').click(function(){
		chrome.fileSystem.chooseEntry(
			{
				type: 'openFile', accepts: [{
				extensions: ['json']
			}]
			},
			function (fileEntry) {
				if (chrome.runtime.lastError || !fileEntry) {
					console.log("User did not choose a file");
					return;
				}

				fileEntry.file(function (file) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var parsed = JSON.parse(e.target.result);
						if(!parsed || !parsed.frames || !parsed.layouts){
							$.toast({
								text: 'Unknow settings file',
								position: 'top-right',
								icon: 'error'
							});
							return false;
						}

						_this.layoutSettings.loadSettingsArray(parsed.layouts),
						_this.livePreviewControl.setting = parsed.layouts;
						_this.livePreviewControl.reload();
						_this.loadLayout(parsed.layouts.layouts[_this.layoutActive]);

						_this.guiModel.reset();
						for(var index in parsed.frames){
							_this.guiModel.setFrameValue(parsed.frames[index]);
						}

					};
					reader.readAsText(file);

					$.toast({
						text: 'Settings was loaded',
						position: 'top-right',
						icon: 'info'
					});

					_this.log.addText('Settings was loaded');
				});

			});
	});

	/* -------  Open Font editor -------- */
	this.formMenu.handleOpenFontEditor = function () {
		_this.editFontsButton.dialog('open');
	};

	/* -------  Font write -------- */
	this.formMenu.handleWriteFont = function () {

		if (_this.protocol.getState() == _this.protocol.stateList.CONNECTED && _this.scenario == _this.scenarioList.IDDLE) {

			_this.scenario = _this.scenarioList.WRITE_FONT;
			var fontData = _this.screenFontsMap.getFontData().substr(7).replace(new RegExp('\r?\n', 'g'), '');
			_this.guiModel.setModeWaitingForOsd();

			_this.protocol.sendFontUploadInit();

			var fontIndexToWrite = 0;
			var fontWriteInterval = setInterval(function () {
				if (fontIndexToWrite > 255) {
					clearInterval(fontWriteInterval);
					_this.scenario = _this.scenarioList.IDDLE;
					return;
				}

				_this.guiModel.setModeWriteToOsd();
				_this.guiModel.setProgress(fontIndexToWrite + 1, 256);

				_this.protocol.sendChar(fontData.substr(fontIndexToWrite * 512, 512), fontIndexToWrite);
				fontIndexToWrite++;

			}, 105);

		} else {
			if (_this.protocol.getState() != _this.protocol.stateList.CONNECTED) {
				$.toast({
					text: 'You have to connect',
					position: 'top-right',
					icon: 'error'
				});
			} else {
				$.toast({
					text: 'Another task is in progress',
					position: 'top-right',
					icon: 'error'
				});
			}
		}
	};

	/* -------  Move element in live preview -------- */
	this.livePreviewControl.handleMove = function (elementId, direction) {
		if (!_this.livePreview.isDisplayedElement(elementId)) {
			$.toast({
				text: 'You cant move hidden element',
				position: 'top-right',
				icon: 'error'
			});
			return;
		}

		switch (direction) {
			case _this.livePreviewControl.moveDirectionList.up:
				if(!_this.livePreview.moveElementToPositionY(elementId, -1)){
					$.toast({
						text: 'Move is not allowed',
						position: 'top-right',
						icon: 'info'
					});
				}
				break;
			case _this.livePreviewControl.moveDirectionList.down:
				if(!_this.livePreview.moveElementToPositionY(elementId, 1)){
					$.toast({
						text: 'Move is not allowed',
						position: 'top-right',
						icon: 'info'
					});
				}
				break;
			case _this.livePreviewControl.moveDirectionList.left:
				if(!_this.livePreview.moveElementToPositionX(elementId, -1)){
					$.toast({
						text: 'Move is not allowed',
						position: 'top-right',
						icon: 'info'
					});
				}
				break;
			case _this.livePreviewControl.moveDirectionList.right:
				if(!_this.livePreview.moveElementToPositionX(elementId, 1)){
					$.toast({
						text: 'Move is not allowed',
						position: 'top-right',
						icon: 'info'
					});
				}
				break;
		}
		var elementPosition = _this.livePreview.getElementPosition(elementId);
		_this.layoutSettings.setValue(elementId, _this.layoutActive, elementPosition[0], elementPosition[1]);
	};

	/* -------  Handle element change layout  -------- */
	this.livePreviewControl.handleChangeLayout = function (layoutPosition, type) {
		_this.layoutActive = layoutPosition;
		_this.loadLayout(_this.layoutSettings.getLayout(layoutPosition));
		_this.livePreview.markElement(_this.livePreviewControl.getElementSelected());
		if(type)
		{
			_this.guiModel.setValueToPosition(type, layoutPosition);
		}
	};

	/* -------  Handle element show element  -------- */
	this.livePreviewControl.handleShow = function (elementId) {
		_this.livePreview.toogleElement(elementId);
		_this.layoutSettings.setIsShowed(elementId, _this.layoutActive, _this.livePreview.isDisplayedElement(elementId));
	};

	/* -------  Handle element show element  -------- */
	this.livePreviewControl.handleChangeElement = function (elementId) {
		_this.livePreview.markElement(elementId);
	};

	/* -------  Handle save layout settings  -------- */
	this.livePreviewControl.handleSave = function () {
		_this.layoutSettings.saveToLocalStorage();
		$.toast({
			text: 'Layout saved',
			position: 'top-right',
			icon: 'success'
		});
	};

	/* -------  Handle switch from layout editor  -------- */
	this.livePreviewControl.handleSwitch = function () {
		var positions = [7, 17, 12, 14, 4, 40, 31, 39, 52, 46, 47, 48, 51, 32, 50, 33, 45, 53, 22, 23, 25, 49, 27, 26, 41];
		for (var positionKey in positions) {
			_this.guiModel.setValueToPosition(positions[positionKey], 1);
		}

		_this.livePreview.setProfile(_this.guiModel.getFlatProfile(_this.guiModel._partOfAdress));
	};

	/* -------  Handle save layout settings  -------- */
	this.livePreviewControl.handleWrite = function () {
		if (_this.protocol.getState() == _this.protocol.stateList.CONNECTED && _this.scenario == _this.scenarioList.IDDLE) {

			_this.framesToWrite = _this.guiModel._partOfAdress.concat(_this.layoutSettings.getFrames(
				[
					_this.guiModel._partOfAdress[5].values.values[59],
					_this.guiModel._partOfAdress[6].values.values[60],
					_this.guiModel._partOfAdress[6].values.values[61]
				]
			));

			_this.indexFramesToWrite = 0;
			_this.scenario = _this.scenarioList.WRITE_EE;
			_this.guiModel.setModeWaitingForOsd();
			_this.protocol.requestForWriteEE(_this.framesToWrite[_this.indexFramesToWrite]);
		} else {
			if (_this.protocol.getState() != _this.protocol.stateList.CONNECTED) {
				$.toast({
					text: 'You have to connect',
					position: 'top-right',
					icon: 'error'
				});

				_this.log.addText('You have to connect');

			} else {
				$.toast({
					text: 'Another task is in progress',
					position: 'top-right',
					icon: 'error'
				});

				_this.log.addText('Another task is in progress');
			}
		}
	};

	/* -------  Handle settigs change  -------- */
	this.guiModel.handleChangeValue = function (profile) {
		_this.livePreview.setProfile(profile);
		_this.livePreviewControl.changeMode(profile[57] ? _this.livePreviewControl.modeList.usingRCOn : _this.livePreviewControl.modeList.usingRCOff);

		_this.livePreviewControl.setLayoutLow(profile[59]);
		_this.livePreviewControl.setLayoutMid(profile[61]);
		_this.livePreviewControl.setLayoutHight(profile[60]);

	};

	this.guiModel.handleChangeGroupValue = function (profile) {
		_this.livePreview.setProfile(profile);
		_this.livePreviewControl.changeMode(profile[57] ? _this.livePreviewControl.modeList.usingRCOn : _this.livePreviewControl.modeList.usingRCOff);

		_this.livePreviewControl.setLayoutLow(profile[59]);
		_this.livePreviewControl.setLayoutMid(profile[61]);
		_this.livePreviewControl.setLayoutHight(profile[60]);
	};

	this.runEditStrips();
};

/**
 *
 */
MainApp.prototype.run = function () {
    tracker.sendAppView('MWOSD');
	this.protocol.getDevices();
};

/**
 *
 * @type {{IDDLE: number, READ_EE: number, WRITE_EE: number, WRITE_FONT: number, DEFAULT: number, RESTART: number}}
 */
MainApp.prototype.scenarioList = {
	IDDLE: 0,
	READ_EE: 1,
	WRITE_EE: 2,
	WRITE_FONT: 3,
	DEFAULT: 4,
	RESTART: 5,
};

/**
 * LAYOUT EDITOR
 */
MainApp.prototype.runPreview = function () {
	var _this = this;
	this.livePreview.onLoadImage = function () {
		//load settng
		_this.layoutSettings.loadSettings(function (settings) {
			_this.livePreviewControl.setting = settings;
			_this.livePreviewControl.render();
			_this.screenFontsMap.setFontsData(_this.appStrips.preview.getFontData());
			_this.loadLayout(settings.layouts[_this.layoutActive]);
		});
	};

	this.livePreview.loadImageByUrl(this.backgroundPreview);
};

/**
 * LOAD NEW LAYOUT TO PREVIEW
 * @param laynoutSetting
 */
MainApp.prototype.loadLayout = function (laynoutSetting) {
	this.livePreview.removeAllElements();

	for (var elementKey in laynoutSetting.elements) {
		var element = laynoutSetting.elements[elementKey];
		if (element.class) {
			this.livePreview.addElement(element.code, new window[element.class](this.screenFontsMap));

			var x = parseInt(element.value) % this.livePreview.screenSize[0];
			var y = Math.floor(parseInt(element.value) / this.livePreview.screenSize[0]);

			this.livePreview.setDisplayedElement(element.code, element.enable, x, y);
		}
		this.livePreview.markElement(this.livePreviewControl.getElementSelected());
	}
};

/**
 * edit font
 */
MainApp.prototype.runEditStrips = function () {
	var _this = this;
	this.appStrips = new AppStrips(); //create main app class
	this.appStrips.run(); // and run :)

	this.appStrips.loadDataByAjax(this.defaultMCMFile, function () {
		_this.runPreview();
	}); // load max7456 fata file from url by ajax


	//load font file
	$('#load-mcm').click(
		function () {

			_this.loadFont();
		}
	);

	//save font file
	$('#save-mcm').click(
		function () {
			var data = _this.appStrips.fontsData();
			chrome.fileSystem.chooseEntry({type: 'saveFile'},
				function (writableFileEntry) {
					if (writableFileEntry) {
						writableFileEntry.createWriter(function (writer) {
							writer.onwriteend = function (e) {
								$.toast({
									text: 'File saved',
									position: 'top-right',
									icon: 'success'
								});

								_this.log.addText('File saved');
							};

							writer.write(new Blob([data], {type: 'text/plain'}));
						}, function (e) {
						});
					}

				});
		}
	);

	//load image
	$('#load-image').click(
		function () {
            chrome.fileSystem.chooseEntry(
                {
                    type: 'openFile', accepts: [{
                    extensions: ['jpeg', 'jpg', 'png']
                }]
                },
                function (fileEntry) {

                    if (chrome.runtime.lastError || !fileEntry) {
                        console.log("User did not choose a file");
                        return;
                    }

                    fileEntry.file(function (file) {
                        var url = URL.createObjectURL(file);
                        _this.appStrips.loadImageByurl(url);
                    });

                });
		}
	);
};

/**
 *
 * @param frame
 * @returns {boolean}
 */
MainApp.prototype.checkVersion = function (frame) {
	for (var address in frame.values) {
		if ((address == 0 && frame.values[address] < this.versionmin) || (address == 0 && frame.values[address] > this.versionmax))  {
			this.protocol.disconect();
		if (address == 0 && frame.values[address] < this.versionmin)  {
			$('#info-dialog-text').text('This GUI version does not support this OSD - an upgrade of your OSD firmware is required to operate with this GUI.');
    }
    else if (address == 0 && frame.values[address] > this.versionmax) {
			$('#info-dialog-text').text('This GUI version does not support this OSD - an upgrade of the GUI is required to operate with the firmware on this OSD.');
    }
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
			this.log.addText('Version Mismatch');
			return false;
		}else if(address == 0)
		{
//            this.log.addText('EEPROM version: ' + frame.values[address]);
		}
	}

	return true;
};

MainApp.prototype.loadFont = function () {
    this.loadFontsButton.dialog('open');
};



