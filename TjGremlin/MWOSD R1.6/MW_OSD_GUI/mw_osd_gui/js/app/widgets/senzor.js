Senzor = function (targetNode) {

	this.table = $('<table>').hide();

	for (var i = 0; i < this.elementLabels.length; i++) {
		var row = $('<tr>');

		var label = $('<th>').attr('style', "width:35px").html(this.elementLabels[i]);
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
Senzor.prototype.setValues = function (values) {
	if (values.length != 5) {
		console.log('bad data count');
		return false;
	}

	for (var i = 0; i < this.elementLabels.length; i++) {
		this.table.find('tr:nth-child(' + (i + 1) + ')').find('td').html(values[i]);
	}
	this.table.fadeIn();
};

/**
 *
 * @param values
 */
Senzor.prototype.hide = function () {
	this.table.fadeOut();
};

/**
 *
 * @type {string[]}
 */
Senzor.prototype.elementLabels = [
	'Volt1:',
	'Volt2:',
	'Amps:',
	'Temp:',
	'RSSI:'
];
