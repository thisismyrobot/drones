/**
 *
 * @type {{select: string, checkbox: string, range: string}}
 */
SettingsElementsType = {
	select: 'SelectElement',
	checkbox: 'CheckBoxElement',
	range: 'RangeElement',
};

/**
 *
 * @type {{main: string}}
 */
SettingsElementsGroup = {
	G_Voltage: {
		id: 'main_voltage',
		description: 'Main Voltage'
	},
	G_VVoltage: {
		id: 'video_voltage',
		description: 'Video Voltage'
	},
	G_Amperage: {
		id: 'amperage',
		description: 'Amperage'
	},
	G_RSSI: {
		id: 'rssi',
		description: 'RSSI'
	},
	G_VREF: {
		id: 'reference_voltage',
		description: 'Reference Voltage'
	},
	G_Other: {
		id: 'other',
		description: 'Other'
	},
	G_DISPLAY: {
		id: 'display',
		description: 'Display'
	},
	G_HUD: {
		id: 'hud',
		description: 'HUD'
	},
	G_GPS: {
		id: 'gps_settings',
		description: 'GPS Settings'
	},
	G_COMPASS: {
		id: 'compass',
		description: 'Compass'
	}/*,
	G_TIME: {
		id: 'time_settings',
		description: 'Time Settings'
	}*/,
	G_Alarms: {
		id: 'alarms',
		description: 'Alarms'
	},
	G_CallSign: {
		id: 'callsign',
	//	description: 'TXTCallSign',
		classGroup: 'WidgetCallSign'
	},
	G_RCSWITCH: {
		id: 'rcswitch',
	//	description: 'LAYOUT',
		classGroup: 'WidgetLayout'
	},
	G_VTX: {
		id: 'vtx',
		description: 'VTX',
	}
};

/**
 *
 * @type {*[]}
 */
SettingsElements = [
	{
		id: 'S_VIDVOLTAGE',
		position: 17,
		description: 'Display Video Voltage',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_VVoltage
	}, {
		id: 'S_VIDDIVIDERRATIO',
		position: 18,
		description: 'Video Voltage Adjust',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_VVoltage
	}, {
		id: 'S_VIDVOLTAGEMIN',
		position: 2,
		description: 'Video Voltage Alarm',
		type: SettingsElementsType.range,
		properties: {
			max: 255,
			divider: 10
		},
		group: SettingsElementsGroup.G_VVoltage
	}, {
		id: 'S_DISPLAYRSSI',
		position: 4,
		description: 'Display RSSI',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_RSSI
	}, {
		id: 'S_MWRSSI',
		position: 5,
		description: 'Use Flight Controller RSSI',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_RSSI
	}, {
		id: 'S_PWMRSSI',
		position: 6,
		description: 'Use Standard PWM',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_RSSI
	}, {
		id: 'S_RSSI_ALARM',
		position: 3,
		description: 'RSSI Alarm',
		type: SettingsElementsType.range,
		properties: {
			max: 100,
			divider: 10,
		},
		group: SettingsElementsGroup.G_RSSI
	}, {
		id: 'S_DISPLAYVOLTAGE',
		position: 7,
		description: 'Display Main Voltage',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Voltage
	}, {
		id: 'S_DIVIDERRATIO',
		position: 10,
		description: 'Main Voltage Adjust',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_Voltage
	}, {
		id: 'S_VOLTAGEMIN',
		position: 8,
		description: 'Voltage Alarm',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_Voltage
	}, {
		id: 'S_BATCELLS',
		position: 9,
		description: 'Battery Cell Count',
		type: SettingsElementsType.range,
		properties: {max: 6},
		group: SettingsElementsGroup.G_Voltage
	}, {
		id: 'S_MAINVOLTAGE_VBAT',
		position: 11,
		description: 'Use Flight Controller Main Voltage',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Voltage
	}, {
		id: 'S_AMPERAGE',
		position: 12,
		description: 'Display Amps',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Amperage
	}, {
		id: 'S_AMPER_HOUR',
		position: 14,
		description: 'Display mAh Used',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Amperage
	}, {
		id: 'S_MWAMPERAGE',
		position: 13,
		description: 'Use Flight Controller Amperage',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Amperage
	}, {
		id: 'S_AMPERAGE_VIRTUAL',
		position: 15,
		description: 'Use Virtual Sensor',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Amperage
	}, {
		id: 'S_AMPERAGE_ALARM',
		position: 21,
		description: 'Amp Alarm',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_Amperage
	}, {
		id: 'S_AMPER_HOUR_ALARM',
		position: 20,
		description: 'mAh Alarm (*100)',
		type: SettingsElementsType.range,
		properties: {max: 10000},
		group: SettingsElementsGroup.G_Amperage
	}, {
		id: 'S_DISPLAYGPS',
		position: 22,
		description: 'Display GPS Information',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_GPS
	}, {
		id: 'S_COORDINATES',
		position: 23,
		description: 'Show GPS Co-ordinates',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_GPS
	},/* {
		id: 'S_GPSCOORDTOP',
		position: 24,
		description: 'Coords on Top',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_GPS
	},*/ {
		id: 'S_GPSALTITUDE',
		position: 25,
		description: 'Show GPS Altitude',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_GPS
	}, {
		id: 'S_ANGLETOHOME',
		position: 26,
		description: 'Show Angle To Home',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_GPS
	}, {
		id: 'S_COMPASS',
		position: 49,
		description: 'Display Compass',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_COMPASS
	}, {
		id: 'S_SHOWHEADING',
		position: 27,
		description: 'Display Heading',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_COMPASS
	}, {
		id: 'S_HEADING360',
		position: 28,
		description: 'Show Heading in 360 Format',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_COMPASS
	}, {
		id: 'S_UNITSYSTEM',
		position: 29,
		description: 'Units Of Measure',
		type: SettingsElementsType.select,
		properties: {
			values: [
				'Metric',
				'Imperial',
			]
		},
		group: SettingsElementsGroup.G_Other
	}, {
		id: 'S_VIDEOSIGNALTYPE',
		position: 30,
		description: 'Video Signal Type',
		type: SettingsElementsType.select,
		properties: {
			values: [
				'NTSC',
				'PAL',
			]
		},
		group: SettingsElementsGroup.G_Other
	}, {
		id: 'S_THROTTLEPOSITION',
		position: 31,
		description: 'Display Throttle Value',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Other
	}, {
	 id: 'S_THROTTLE_PWM',
	 position: 19,
	 description: 'Throttle display type - PWM or %',
	 type: SettingsElementsType.checkbox,
	 properties: {},
	 group: SettingsElementsGroup.G_Other
	 }, {
		id: 'S_DISPLAY_HORIZON_BR',
		position: 32,
		description: 'Display Horizon Bar',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_HUD
	}, {
		id: 'S_WITHDECORATION',
		position: 33,
		description: 'Display Side Bars',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_HUD
	}, {
		id: 'S_SHOWBATLEVELEVOLUTION',
		position: 34,
		description: 'Show Battery Health Icon',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Other
	}, {
		id: 'S_RESETSTATISTICS',
		position: 35,
		description: 'Reset Statistics After Arming',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_Other
	}, {
		id: 'S_MAPMODE',
		position: 36,
		description: 'Map Display Mode',
		type: SettingsElementsType.range,
		properties: {max: 4},
		group: SettingsElementsGroup.G_GPS
	}, {
		id: 'S_VREFERENCE',
		position: 37,
		description: 'Enable ADC 5v Ref',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_VREF
	}/*, {
	 id: 'S_USE_BOXNAMES',
	 position: 38,
	 description: 'Use BoxNames',
	 type: SettingsElementsType.checkbox,
	 properties: {},
	 group: SettingsElementsGroup.aaaa
	 }*/, {
		id: 'S_MODEICON',
		position: 39,
		description: 'Display Flight Mode',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_DISPLAY
	}, {
		id: 'S_DISPLAY_CS',
		position: 40,
		description: 'Display CallSign',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_CallSign
	}/*, {
		id: 'S_GPSTIME',
		position: 41,
		description: 'Display GPS time',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_TIME
	}, {
		id: 'S_GPSTZAHEAD',
		position: 42,
		description: 'Time Zone +/-',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_TIME
	}, {
		id: 'S_GPSTZ',
		position: 43,
		description: 'Time Zone offset',
		type: SettingsElementsType.range,
		properties: {max: 13},
		group: SettingsElementsGroup.G_TIME
	}*//*, {
	 id: 'S_DEBUG',
	 position: 44,
	 description: 'Debug',
	 type: SettingsElementsType.checkbox,
	 properties: {},
	 group: SettingsElementsGroup.aaaa
	 }*/, {
		id: 'S_SCROLLING',
		position: 45,
		description: 'Show Scrolling Sidebars',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_HUD
	}, {
		id: 'S_GIMBAL',
		position: 46,
		description: 'Display Gimbal',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_DISPLAY
	}, {
		id: 'S_VARIO',
		position: 47,
		description: 'Display Vario',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_DISPLAY
	}, {
		id: 'S_BAROALT',
		position: 48,
		description: 'Display Altitude',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_DISPLAY
	}, {
		id: 'S_HORIZON_ELEVATION',
		position: 50,
		description: 'Show Horizon Elevation',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_HUD
	}, {
		id: 'S_TIMER',
		position: 51,
		description: 'Display Timer',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_DISPLAY
	}, {
		id: 'S_MODESENSOR',
		position: 52,
		description: 'Display Sensors Active',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_DISPLAY
	}, {
		id: 'S_SIDEBARTOPS',
		position: 53,
		description: 'Show Sidebar Direction',
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_HUD
	}, {
	 id: 'S_VTX_POWER',
	 position: 54,
	 description: 'VTX Power',
	 type: SettingsElementsType.range,
	 properties: {max: 3},
	 group: SettingsElementsGroup.G_VTX
	 }, {
	 id: 'S_VTX_BAND',
	 position: 55,
	 description: 'VTX Band',
	 type: SettingsElementsType.range,
	 properties: {max: 4},
	 group: SettingsElementsGroup.G_VTX
	 }, {
	 id: 'S_VTX_CHANNEL',
	 position: 56,
	 description: 'VTX Channel',
   type: SettingsElementsType.range,
	 properties: {max: 7},
	 group: SettingsElementsGroup.G_VTX
	 }, {
		id: 'S_RCWSWITCH',
		position: 57,
		description: ['Using FC OSD_SW', 'Using RC Channel'],
		type: SettingsElementsType.checkbox,
		properties: {},
		group: SettingsElementsGroup.G_RCSWITCH
	}, {
		id: 'S_RCWSWITCH_CH',
		position: 58,
		description: ['Not Used', 'OSD ch (1-8)'],
		type: SettingsElementsType.range,
		properties: {
			max: 15,
            min: 0,
            translate: new TranslateOSD_CH(),
            default: 1
		},
		group: SettingsElementsGroup.G_RCSWITCH
	}, {
		id: 'S_HUDSW0',
		position: 59,
		description: ['HUD - Default', 'HUD - Low'],
		type: SettingsElementsType.range,
		properties: {max: 7},
		group: SettingsElementsGroup.G_RCSWITCH
	}, {
		id: 'S_HUDSW1',
		position: 60,
		description: ['HUD - OSD SW', 'HUD - High'],
		type: SettingsElementsType.range,
		properties: {max: 7},
		group: SettingsElementsGroup.G_RCSWITCH
	}, {
		id: 'S_HUDSW2',
		position: 61,
		description: ['Not Used', 'HUD - Mid'],
		type: SettingsElementsType.range,
		properties: {max: 7},
		group: SettingsElementsGroup.G_RCSWITCH
	}, {
		id: 'S_DISTANCE_ALARM',
		position: 62,
		description: 'Distance Alarm (*100)',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_Alarms
	}, {
		id: 'S_ALTITUDE_ALARM',
		position: 63,
		description: 'Altitude Alarm (*100)',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_Alarms
	}, {
		id: 'S_SPEED_ALARM',
		position: 64,
		description: 'Speed Alarm',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_Alarms
	}, {
		id: 'S_FLYTIME_ALARM',
		position: 65,
		description: 'Timer Alarm',
		type: SettingsElementsType.range,
		properties: {max: 255},
		group: SettingsElementsGroup.G_Alarms
	}, {
		id: 'S_CS0',
		position: 66,
		description: 'S_CS0',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS1',
		position: 67,
		description: 'S_CS1',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS2',
		position: 68,
		description: 'S_CS2',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS3',
		position: 69,
		description: 'S_CS3',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS4',
		position: 70,
		description: 'S_CS4',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS5',
		position: 71,
		description: 'S_CS5',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS6',
		position: 72,
		description: 'S_CS6',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS7',
		position: 73,
		description: 'S_CS7',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS8',
		position: 74,
		description: 'S_CS8',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}, {
		id: 'S_CS9',
		position: 75,
		description: 'S_CS9',
		type: SettingsElementsType.hidden,
		properties: {max: 255},
		group: SettingsElementsGroup.G_CallSign
	}/*, {
	 id: 'S16_AMPMAX',
	 position: 76,
     secondByte: 77,
	 description: 'S16_AMPMAX',
	 type: SettingsElementsType.range,
	 properties: {max: 1023},
	 group: SettingsElementsGroup.aaaa
	 }*/,
    {
		id: 'S16_AMPZERO',
		position: 78,
        secondByte: 79,
		description: 'Amps Zero Adjust',
		type: SettingsElementsType.range,
		properties: {max: 1023},
		group: SettingsElementsGroup.G_Amperage
	},
    {
		id: 'S16_AMPDIVIDERRATIO',
		position: 80,
        secondByte: 81,
		description: 'Amps Adjust',
		type: SettingsElementsType.range,
		properties: {max: 9999},
		group: SettingsElementsGroup.G_Amperage
	}, {
		id: 'S16_RSSIMIN',
		position: 82,
        secondByte: 83,
		description: 'RSSI Minimum',
		type: SettingsElementsType.range,
		properties: {max: 1023},
		group: SettingsElementsGroup.G_RSSI
	}, {
		id: 'S16_RSSIMAX',
		position: 84,
        secondByte: 85,
		description: 'RSSI Maximum',
		type: SettingsElementsType.range,
		properties: {max: 1023},
		group: SettingsElementsGroup.G_RSSI
	}/*, {
	 id: 'S16_SPARE1',
	 position: 86,
     secondByte: 87,
	 description: 'S16_SPARE1',
	 type: SettingsElementsType.range,
	 properties: {max: 1023},
	 group: SettingsElementsGroup.aaaa
	 }, {
	 id: 'S16_SPARE2',
	 position: 88,
     secondByte: 89,
	 description: 'S16_SPARE2',
	 type: SettingsElementsType.range,
	 properties: {max: 1023},
	 group: SettingsElementsGroup.aaaa
	 }*/

    , {
        id: 'S_ALARMS_TEXT',
        position: 16,
        description: 'Display Text Alarms',
        type: SettingsElementsType.checkbox,
        properties: {},
        group: SettingsElementsGroup.G_Other
    }

];

