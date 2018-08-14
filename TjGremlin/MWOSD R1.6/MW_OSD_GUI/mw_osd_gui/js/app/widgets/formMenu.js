FormMenu = function (targetNode) {
	this.targetNode = targetNode;

	this.handleReadFromOsd = function () {
	};
	this.handleWriteToOsd = function () {
	};
	this.handleOpenFontEditor = function () {
	};
	this.handleWriteFont = function () {
	};
	this.handleDefault = function () {
	};
	this.handleRestart = function () {
	};
    this.handleLoadFont = function () {
    };

	var _this = this;

	this.readFromOsd = $('<button>').html('Read').button().click(function () {
		_this.handleReadFromOsd()
	});
	this.writeToOsd = $('<button>').html('Write').button().click(function () {
		_this.handleWriteToOsd()
	});

	this.fontEditor = $('<button>').html('Edit').button().click(function () {
		_this.handleOpenFontEditor()
	});
	this.fontWrite = $('<button>').html('Upload').button().click(function () {
		_this.handleWriteFont()
	});

    this.fontLoad = $('<button>').html('Load Font').button().click(function () {
        _this.handleLoadFont()
    });
	
	this.default = $('<button>').html('Default').button().click(function () {
		_this.handleDefault()
	});
	this.restart = $('<button>').html('Restart').button().click(function () {
		_this.handleRestart()
	});

	this.targetNode.append($('<span>').html('OSD: ')).append($('<br>')).append(this.readFromOsd).append(this.writeToOsd).append(this.default).append(this.restart);
	this.targetNode.append($('<br>')).append($('<br>'));
	this.targetNode.append($('<span>').html('FONT: ')).append($('<br>')).append(this.fontEditor).append(this.fontWrite).append(this.fontLoad);
};


