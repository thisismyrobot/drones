/* ##################################################### */
/* BASE
 /* ##################################################### */

var BaseSettings = function (fontMap) {
	this.fontMap = fontMap;
};

/**
 *
 * @param digit
 * @returns {*}
 */
BaseSettings.prototype.parseDigit = function (digit) {
	return this.fontMap.canvaseElements[BaseSettings.prototype.startDigi + parseInt(digit)];
};

/**
 *
 * @type {number}
 */
BaseSettings.prototype.offsetX = 0;

/**
 *
 * @type {number}
 */
BaseSettings.prototype.offsetY = 0;

/**
 *
 * @type {boolean}
 */
BaseSettings.profile = {};

/**
 *
 * @type {boolean}
 */
BaseSettings.prototype.dependElements = [];


/**
 *
 * @type {boolean}
 */
BaseSettings.prototype.canMove = true;


/**
 *
 * @param digit
 * @returns {*}
 */
BaseSettings.prototype.parseAlpha = function (alpha) {
	return this.fontMap.canvaseElements[BaseSettings.prototype.startAlpha + alpha.toLowerCase().charCodeAt(0) - 97];
};


BaseSettings.prototype.startDigi = 48;
BaseSettings.prototype.startAlpha = 65;
BaseSettings.prototype.point = 44;
/* ##################################################### */


/* ##################################################### */
/* Vbat MODULE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var vBatSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
vBatSettings.prototype = new BaseSettings();
vBatSettings.prototype.constructor = vBatSettings;
/**
 *
 * @type {number}
 */
vBatSettings.prototype.offsetX = -2;

/**
 *
 * @param value
 * @returns {Array}
 */
vBatSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[7] != 1){
		return buffer;
	}

	value = value || this.defaultValue;


	buffer[buffer.length] = {
		position: [0, 0],
		element: this.fontMap.canvaseElements[151]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		//alpha
		if (value[i].match(/[a-zA-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[this.point]
			};

		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[169]
	};

	return buffer;
};

vBatSettings.prototype.defaultValue = '15.3';


/* ##################################################### */
/* Vbat VID MODULE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var vBatVidSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
vBatVidSettings.prototype = new BaseSettings();
vBatVidSettings.prototype.constructor = vBatVidSettings;
/**
 *
 * @type {number}
 */
vBatVidSettings.prototype.offsetX = -2;

/**
 *
 * @param value
 * @returns {Array}
 */
vBatVidSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[17] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, 0],
		element: this.fontMap.canvaseElements[191]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		//alpha
		if (value[i].match(/[a-zA-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[this.point]
			};

		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[169]
	};

	return buffer;
};

vBatVidSettings.prototype.defaultValue = '12.1';


/* ##################################################### */
/* AMP MODULE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var ampSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
ampSettings.prototype = new BaseSettings();
ampSettings.prototype.constructor = ampSettings;

/**
 *
 * @param value
 * @returns {Array}
 */
ampSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[12] != 1){
		return buffer;
	}

	value = value || this.defaultValue;



	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		//alpha
		if (value[i].match(/[a-zA-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[this.point]
			};

		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[65]
	};

	return buffer;
};

ampSettings.prototype.defaultValue = '21.1';


/* ##################################################### */
/* GPS num SAT
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var gpsNumSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
gpsNumSettings.prototype = new BaseSettings();
gpsNumSettings.prototype.constructor = gpsNumSettings;

/**
 *
 * @type {number}
 */
gpsNumSettings.prototype.offsetX = -1;

/**
 *
 * @param value
 * @returns {Array}
 */
gpsNumSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1){
		return buffer;
	}

	value = value || this.defaultValue;



	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[30]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[31]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

gpsNumSettings.prototype.defaultValue = '10';

/* ##################################################### */
/* GPS direction to home
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var gpsDirectionSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
gpsDirectionSettings.prototype = new BaseSettings();
gpsDirectionSettings.prototype.constructor = gpsDirectionSettings;
/**
 *
 * @type {number}
 */
gpsDirectionSettings.prototype.offsetX = -1;

/**
 *
 * @param value
 * @returns {Array}
 */
gpsDirectionSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[96 + Number.parseInt(value)]
	};


	return buffer;
};

gpsDirectionSettings.prototype.defaultValue = '0';

/* ##################################################### */
/* GPS distance to home
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var gpsDistanceSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
gpsDistanceSettings.prototype = new BaseSettings();
gpsDistanceSettings.prototype.constructor = gpsDistanceSettings;
/**
 *
 * @type {number}
 */
gpsDistanceSettings.prototype.offsetX = -1;

/**
 *
 * @param value
 * @returns {Array}
 */
gpsDistanceSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	var unit = BaseSettings.profile[29] == 1 ? 185 : 187;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[unit]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

gpsDistanceSettings.prototype.defaultValue = '350';

/* ##################################################### */
/* SPEDD
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var speedSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
speedSettings.prototype = new BaseSettings();
speedSettings.prototype.constructor = speedSettings;
/**
 *
 * @type {number}
 */
speedSettings.prototype.offsetX = -1;

/**
 *
 * @param value
 * @returns {Array}
 */
speedSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	var unit = BaseSettings.profile[29] == 1 ? 166 : 165;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[unit]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

speedSettings.prototype.defaultValue = '0';

/* ##################################################### */
/*  EAGLE TO HOME POSITION
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var eagleToHomePositionSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
eagleToHomePositionSettings.prototype = new BaseSettings();
eagleToHomePositionSettings.prototype.constructor = eagleToHomePositionSettings;

/**
 *
 * @param value
 * @returns {Array}
 */
eagleToHomePositionSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[189]
	};

	return buffer;
};

eagleToHomePositionSettings.prototype.defaultValue = '0';

/**
 *
 * @type {number}
 */
eagleToHomePositionSettings.prototype.offsetX = 1;

/* ##################################################### */
/*  GPS ALTITUDE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var gpsAltitudeSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
gpsAltitudeSettings.prototype = new BaseSettings();
gpsAltitudeSettings.prototype.constructor = gpsAltitudeSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
gpsAltitudeSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1 || BaseSettings.profile[25] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	var unit = BaseSettings.profile[29] == 1 ? 168 : 167;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[unit]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

gpsAltitudeSettings.prototype.defaultValue = '5';

/**
 *
 * @type {number}
 */
gpsAltitudeSettings.prototype.offsetX = -1;


/* ##################################################### */
/*  SENZORS
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var senzorsSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
senzorsSettings.prototype = new BaseSettings();
senzorsSettings.prototype.constructor = senzorsSettings;

/**
 *
 * @param value
 * @returns {Array}
 */
senzorsSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[39] != 1 || BaseSettings.profile[52] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	for (var i = 0; i < 3; i++) {
		buffer[buffer.length] = {
			position: [buffer.length, 0],
			element: this.fontMap.canvaseElements[160 + i]
		};
	}

	for (var i = 0; i < 3; i++) {
		buffer[buffer.length] = {
			position: [buffer.length - 3, 1],
			element: this.fontMap.canvaseElements[0]
		};
	}

	return buffer;
};

senzorsSettings.prototype.defaultValue = '';

/**
 *
 * @type {number}
 */
senzorsSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  HEADING
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var headingSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
headingSettings.prototype = new BaseSettings();
headingSettings.prototype.constructor = headingSettings;
/**
 *
 * @type {number}
 */
headingSettings.prototype.offsetX = 1;
/**
 *
 * @param value
 * @returns {Array}
 */
headingSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[27] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[189]
	};

	return buffer;
};

headingSettings.prototype.defaultValue = '0';

/* ##################################################### */
/*  COMPASS
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var compassSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
compassSettings.prototype = new BaseSettings();
compassSettings.prototype.constructor = compassSettings;

/**
 *
 * @param value
 * @returns {Array}
 */
compassSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[49] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[27]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[29]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[28]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[29]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[24]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[29]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[28]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[29]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[26]
	};


	return buffer;
};

compassSettings.prototype.defaultValue = '';

/**
 *
 * @type {number}
 */
compassSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  ALTITUDE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var altitudeSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
altitudeSettings.prototype = new BaseSettings();
altitudeSettings.prototype.constructor = altitudeSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
altitudeSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[48] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	var unit = BaseSettings.profile[29] == 1 ? 168 : 167;
	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[unit]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

altitudeSettings.prototype.defaultValue = '40';

/**
 *
 * @type {number}
 */
altitudeSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  CLIMB RATE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var climbRateSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
climbRateSettings.prototype = new BaseSettings();
climbRateSettings.prototype.constructor = climbRateSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
climbRateSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[47] != 1){
		return buffer;
	}

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[127]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[140]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[127]
	};


	return buffer;
};

climbRateSettings.prototype.defaultValue = '0';

/**
 *
 * @type {number}
 */
climbRateSettings.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
climbRateSettings.prototype.offsetY = -1;
/* ##################################################### */
/*  TIMER
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var timerSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
timerSettings.prototype = new BaseSettings();
timerSettings.prototype.constructor = timerSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
timerSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[51] != 1){
		return buffer;
	}
	value = value || this.defaultValue;
	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[155]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		if (value[i].match(/:/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[58]
			};

		}
	}


	return buffer;
};

timerSettings.prototype.defaultValue = '4:50';

/**
 *
 * @type {number}
 */
timerSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  ARMED STATUS
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var armedStatusSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
armedStatusSettings.prototype = new BaseSettings();
armedStatusSettings.prototype.constructor = armedStatusSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
armedStatusSettings.prototype.get = function (value) {

	var buffer = [];

	value = value || this.defaultValue;

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[A-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}
	}

	return buffer;
};

armedStatusSettings.prototype.defaultValue = 'DISCONNECTED';

/**
 *
 * @type {number}
 */
armedStatusSettings.prototype.offsetX = -3;


/* ##################################################### */
/*  PITCH ANGLE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var pichAngleSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
pichAngleSettings.prototype = new BaseSettings();
pichAngleSettings.prototype.constructor = pichAngleSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
pichAngleSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[32] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[80]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

pichAngleSettings.prototype.defaultValue = '0';

/**
 *
 * @type {number}
 */
pichAngleSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  ROLL ANGLE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var rollAngleSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
rollAngleSettings.prototype = new BaseSettings();
rollAngleSettings.prototype.constructor = rollAngleSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
rollAngleSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[32] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[82]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

rollAngleSettings.prototype.defaultValue = '0';

/**
 *
 * @type {number}
 */
rollAngleSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  LONGTITUDE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var longtitudeSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
longtitudeSettings.prototype = new BaseSettings();
longtitudeSettings.prototype.constructor = longtitudeSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
longtitudeSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1 || BaseSettings.profile[23] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[203]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[0]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[46]
			};
		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[87]
	};

	return buffer;
};

longtitudeSettings.prototype.defaultValue = '71.88970';

/**
 *
 * @type {number}
 */
longtitudeSettings.prototype.offsetX = -1;


/* ##################################################### */
/*  RSSI
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var rssiSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
rssiSettings.prototype = new BaseSettings();
rssiSettings.prototype.constructor = rssiSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
rssiSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[4] != 1){
		return buffer;
	}


	value = value || this.defaultValue;
	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[186]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[37]
	};


	return buffer;
};

rssiSettings.prototype.defaultValue = '70';

/**
 *
 * @type {number}
 */
rssiSettings.prototype.offsetX = -2;


/* ##################################################### */
/*  TEMPEATURE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var tempeatureSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
tempeatureSettings.prototype = new BaseSettings();
tempeatureSettings.prototype.constructor = tempeatureSettings;

/**
 *
 * @param value
 * @returns {Array}
 */
tempeatureSettings.prototype.get = function (value) {
	var buffer = [];

	value = value || this.defaultValue;
	var unit = BaseSettings.profile[29] == 1 ? 13 : 14;
	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[unit]
	};


	return buffer;
};

tempeatureSettings.prototype.defaultValue = '30';

/**
 *
 * @type {number}
 */
tempeatureSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  LATITUDE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var latitudeSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
latitudeSettings.prototype = new BaseSettings();
latitudeSettings.prototype.constructor = latitudeSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
latitudeSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1 || BaseSettings.profile[23] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[202]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[0]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[46]
			};
		}
	}

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[78]
	};

	return buffer;
};

latitudeSettings.prototype.defaultValue = '43.09846';

/**
 *
 * @type {number}
 */
latitudeSettings.prototype.offsetX = -1;


/* ##################################################### */
/*  MAH
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var mahSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
mahSettings.prototype = new BaseSettings();
mahSettings.prototype.constructor = mahSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
mahSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[14] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[164]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

	}

	return buffer;
};

mahSettings.prototype.defaultValue = '1221';

/**
 *
 * @type {number}
 */
mahSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  throttle
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var throttleSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
throttleSettings.prototype = new BaseSettings();
throttleSettings.prototype.constructor = throttleSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
throttleSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[31] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[200]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[0]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[0]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[95]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[95]
	};

	return buffer;
};

throttleSettings.prototype.defaultValue = '1221';

/**
 *
 * @type {number}
 */
throttleSettings.prototype.offsetX = -1;


/* ##################################################### */
/*  mAh
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var mAhSettings = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
mAhSettings.prototype = new BaseSettings();
mAhSettings.prototype.constructor = mAhSettings;
/**
 *
 * @param value
 * @returns {Array}
 */
mAhSettings.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[14] != 1){
		return buffer;
	}

	value = value || this.defaultValue;
	var buffer = [];

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[164]
	};

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}
	}

	return buffer;
};

mAhSettings.prototype.defaultValue = '1221';

/**
 *
 * @type {number}
 */
mAhSettings.prototype.offsetX = -1;

/* ##################################################### */
/*  Horizon
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var ahiHorizon = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
ahiHorizon.prototype = new BaseSettings();
ahiHorizon.prototype.constructor = ahiHorizon;

/**
 *
 * @type {boolean}
 */
ahiHorizon.prototype.canMove = false;

/**
 *
 * @type {boolean}
 */
ahiHorizon.prototype.dependElements = ['AHI-sidebars', 'AHI-changeicon'];

/**
 *
 * @param value
 * @returns {Array}
 */
ahiHorizon.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[32] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	var buffer = [];

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[126]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [buffer.length, 0],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [3, -1],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [4, -1],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [5, -1],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [3, 1],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [4, 1],
		element: this.fontMap.canvaseElements[132]
	};

	buffer[buffer.length] = {
		position: [5, 1],
		element: this.fontMap.canvaseElements[132]
	}


	return buffer;
};

ahiHorizon.prototype.defaultValue = '0';

/**
 *
 * @type {number}
 */
ahiHorizon.prototype.offsetX = -5;

/* ##################################################### */
/*  SIDEBARS
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var ahiSidebars = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
ahiSidebars.prototype = new BaseSettings();
ahiSidebars.prototype.constructor = ahiSidebars;

/**
 *
 * @type {boolean}
 */
ahiSidebars.prototype.canMove = false;

/**
 *
 * @param value
 * @returns {Array}
 */
ahiSidebars.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[32] != 1 || BaseSettings.profile[33] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[18]
	};

	////
	var nextI = 0;
	var offsetY = 14;

	buffer[buffer.length] = {
		position: [offsetY, nextI++],
		element: this.fontMap.canvaseElements[18]
	};


	buffer[buffer.length] = {
		position: [offsetY, nextI++],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [offsetY, nextI++],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [offsetY, nextI++],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [offsetY, nextI++],
		element: this.fontMap.canvaseElements[18]
	};

	buffer[buffer.length] = {
		position: [1, 2],
		element: this.fontMap.canvaseElements[3]
	};

	buffer[buffer.length] = {
		position: [13, 2],
		element: this.fontMap.canvaseElements[2]
	};

	return buffer;
};

ahiSidebars.prototype.defaultValue = '0';

/**
 *
 * @type {number}
 */
ahiSidebars.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
ahiSidebars.prototype.offsetY = -2;


/* ##################################################### */
/*  SIDEBARS HEIGHT
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var ahiSidebarsHeight = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
ahiSidebarsHeight.prototype = new BaseSettings();
ahiSidebarsHeight.prototype.constructor = ahiSidebarsHeight;
/**
 *
 * @type {boolean}
 */
ahiSidebarsHeight.prototype.canMove = false;
/**
 *
 * @param value
 * @returns {Array}
 */
ahiSidebarsHeight.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[32] != 1 || BaseSettings.profile[33] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [0, buffer.length],
		element: this.fontMap.canvaseElements[198]
	};

	//
	var x = 14;
	var y = 0;
	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	//
	var x = 0;
	var y = 10;
	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	//
	var x = 14;
	var y = 10;
	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};

	buffer[buffer.length] = {
		position: [x, y++],
		element: this.fontMap.canvaseElements[198]
	};


	return buffer;
};

ahiSidebarsHeight.prototype.defaultValue = '0';

/**
 *
 * @type {number}
 */
ahiSidebarsHeight.prototype.offsetX = 3;

/**
 *
 * @type {number}
 */
ahiSidebarsHeight.prototype.offsetY = 0;

/* ##################################################### */
/*  SIDEBARS ICON
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var ahiSidebarsIcon = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
ahiSidebarsIcon.prototype = new BaseSettings();
ahiSidebarsIcon.prototype.constructor = ahiSidebarsIcon;
/**
 *
 * @type {boolean}
 */
ahiSidebarsIcon.prototype.canMove = false;
/**
 *
 * @param value
 * @returns {Array}
 */
ahiSidebarsIcon.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[32] != 1 || BaseSettings.profile[33] != 1  || BaseSettings.profile[53] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, 0],
		element: this.fontMap.canvaseElements[207]
	};

	buffer[buffer.length] = {
		position: [14, 0],
		element: this.fontMap.canvaseElements[207]
	};


	return buffer;
};

ahiSidebarsIcon.prototype.defaultValue = 1;

/**
 *
 * @type {number}
 */
ahiSidebarsIcon.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
ahiSidebarsIcon.prototype.offsetY = 3;

/* ##################################################### */
/*  CALLSIGN
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var callsign = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
callsign.prototype = new BaseSettings();
callsign.prototype.constructor = callsign;

/**
 *
 * @param value
 * @returns {Array}
 */
callsign.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[40] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		//alpha
		if (value[i].match(/[a-zA-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[this.point]
			};

		}
	}

	return buffer;
};

callsign.prototype.defaultValue = "CALL SIGN";

/**
 *
 * @type {number}
 */
callsign.prototype.offsetX = 0;

/**
 *
 * @type {number}
 */
callsign.prototype.offsetY = 0;

/* ##################################################### */
/*  GYMBAL
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var gymbal = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
gymbal.prototype = new BaseSettings();
gymbal.prototype.constructor = gymbal;

/**
 *
 * @param value
 * @returns {Array}
 */
gymbal.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[46] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, 0],
		element: this.fontMap.canvaseElements[22]
	};

	buffer[buffer.length] = {
		position: [1, 0],
		element: this.fontMap.canvaseElements[23]
	};


	return buffer;
};

gymbal.prototype.defaultValue = true;

/**
 *
 * @type {number}
 */
gymbal.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
gymbal.prototype.offsetY = 0;

/* ##################################################### */
/*  MODE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var mode = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
mode.prototype = new BaseSettings();
mode.prototype.constructor = mode;

/**
 *
 * @param value
 * @returns {Array}
 */
mode.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[39] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, 0],
		element: this.fontMap.canvaseElements[174]
	};

	buffer[buffer.length] = {
		position: [1, 0],
		element: this.fontMap.canvaseElements[175]
	};


	return buffer;
};

mode.prototype.defaultValue = true;

/**
 *
 * @type {number}
 */
mode.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
mode.prototype.offsetY = 0;


/* ##################################################### */
/*  GPS TIME
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var gpsTime = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
gpsTime.prototype = new BaseSettings();
gpsTime.prototype.constructor = gpsTime;

/**
 *
 * @param value
 * @returns {Array}
 */
gpsTime.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		//alpha
		if (value[i].match(/[a-zA-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[this.point]
			};

		}

		if (value[i].match(/:/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[58]
			};

		}
	}

	return buffer;
};

gpsTime.prototype.defaultValue = "21:27:35";

/**
 *
 * @type {number}
 */
gpsTime.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
gpsTime.prototype.offsetY = 0;

/* ##################################################### */
/*  MAP MODE
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var mapMode = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
mapMode.prototype = new BaseSettings();
mapMode.prototype.constructor = mapMode;

/**
 *
 * @param value
 * @returns {Array}
 */
mapMode.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1 || BaseSettings.profile[36] < 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, 0],
		element: this.fontMap.canvaseElements[34]
	};

	return buffer;
};

mapMode.prototype.defaultValue = true;

/**
 *
 * @type {number}
 */
mapMode.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
mapMode.prototype.offsetY = 0;

/* ##################################################### */
/*  MAP CENTER
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var mapCenter = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
mapCenter.prototype = new BaseSettings();
mapCenter.prototype.constructor = mapCenter;

/**
 *
 * @param value
 * @returns {Array}
 */
mapCenter.prototype.get = function (value) {

	var buffer = [];

	if(BaseSettings.profile[22] != 1){
		return buffer;
	}

	value = value || this.defaultValue;

	buffer[buffer.length] = {
		position: [0, 0],
		element: this.fontMap.canvaseElements[5]
	};

	buffer[buffer.length] = {
		position: [0, -3],
		element: this.fontMap.canvaseElements[215]
	};

	return buffer;
};

mapCenter.prototype.defaultValue = true;

/**
 *
 * @type {number}
 */
mapCenter.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
mapCenter.prototype.offsetY = 0;

/* ##################################################### */
/*  AP STATUS
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var apStAtus = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
apStAtus.prototype = new BaseSettings();
apStAtus.prototype.constructor = apStAtus;

/**
 *
 * @param value
 * @returns {Array}
 */
apStAtus.prototype.get = function (value) {

	var buffer = [];

	/*if(BaseSettings.profile[22] != 1){
		return buffer;
	}*/

	value = value || this.defaultValue;

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		//alpha
		if (value[i].match(/[a-zA-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[this.point]
			};

		}

		if (value[i].match(/ /)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[0]
			};

		}

		if (value[i].match(/:/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[58]
			};

		}
	}

	return buffer;
};

apStAtus.prototype.defaultValue = "AUTO RTH";

/**
 *
 * @type {number}
 */
apStAtus.prototype.offsetX = -1;

/**
 *
 * @type {number}
 */
apStAtus.prototype.offsetY = 0;

/* ##################################################### */
/*  WATS
 /* ##################################################### */
/**
 *
 * @param fontMap
 */
var wats = function (fontMap) {
	this.fontMap = fontMap;
};

//extends class
wats.prototype = new BaseSettings();
wats.prototype.constructor = wats;

/**
 *
 * @param value
 * @returns {Array}
 */
wats.prototype.get = function (value) {

	var buffer = [];

	/*if(BaseSettings.profile[22] != 1){
	 return buffer;
	 }*/

	value = value || this.defaultValue;

	for (var i = 0; i < value.length; i++) {
		//digit
		if (value[i].match(/[0-9]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseDigit(value[i])
			};
		}

		//alpha
		if (value[i].match(/[a-zA-Z]/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.parseAlpha(value[i])
			};
		}

		if (value[i].match(/\./)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[this.point]
			};

		}

		if (value[i].match(/ /)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[0]
			};

		}

		if (value[i].match(/:/)) {
			buffer[buffer.length] = {
				position: [buffer.length, 0],
				element: this.fontMap.canvaseElements[58]
			};

		}
	}

	return buffer;
};

wats.prototype.defaultValue = "125W";

/**
 *
 * @type {number}
 */
wats.prototype.offsetX = -2;

/**
 *
 * @type {number}
 */
wats.prototype.offsetY = 0;


