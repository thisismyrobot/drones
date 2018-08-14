Info = function (targetNode) {

	this.table = $('<table>').hide();

	for (var i = 0; i < this.elementLabels.length; i++) {
		var row = $('<tr>');

		var label = $('<th>').attr('style', "width:55px").html(this.elementLabels[i]);
		var value = $('<td>');

		row.append(label).append(value);
		this.table.append(row);
	}

	targetNode.append(this.table);
};

/**
 *
 * @param values
 */
Info.prototype.setValues = function (values) {
	if (values.length != 6) {
		console.log('bad data count');
		return false;
	}

	for (var i = 0; i < this.elementLabels.length; i++) {
		this.table.find('tr:nth-child(' + (i + 1) + ')').find('td').html(this.translate[i] ? this.translate[i][values[i]] : values[i]);
	}
	this.table.fadeIn();
};

/**
 *
 * @param values
 */
Info.prototype.hide = function () {
	this.table.fadeOut();
};

/**
 *
 * @type {string[]}
 */
Info.prototype.elementLabels = [
	'Controller:&nbsp;',
	'Hardware:&nbsp;',
	'Version:&nbsp;',
	'Aircraft:&nbsp;',
	'Options:&nbsp;'
];

/**
 *
 * @type {string[]}
 */
Info.prototype.translate = {
	0: {
        0: "Unknown",
        1: "Multiwii",
        2: "Baseflight",
        3: "Librepilot",
        4: "Taulabs",
        5: "Dronin",
        6: "Cleanflight",
        7: "Betaflight",
        8: "PatrikE FW",
        9: "PatrikE FW",
        10: "Harakiri",
        11: "Naza",
        12: "iNAV",
        13: "Kiss",
        14: "APM",
        15: "Pixhawk",
        16: "Skytrack",
        17: "OSD (UBLOX)",
        18: "OSD (MTK)",
        19: "OSD (NMEA)",
        20: "OSD (Basic)",
        21: "Raceflight",
    },
    1: {
        0: "Unknown",
        1: "Minim",
        2: "MicroMinim",
        3: "Aeromax",
        4: "RTFQ v1",
        5: "RTFQ micro",
        6: "Rushduino",
        7: "Kylin 250",
        8: "Airbot Micro",
        9: "Andromeda",
    },
	3: {
        0: "Unknown",
        1: "MultiRotor",
        2: "FixedWing",
	}
};
