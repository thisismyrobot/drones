chrome.app.runtime.onLaunched.addListener(function () {
	chrome.app.window.create('main_window.html', {
		'outerBounds': {
			'width': 1280,
			'height': 815
		}
	},
        function (createdWindow) {
            createdWindow.onClosed.addListener(
                function () {
                    var connectionId = createdWindow.contentWindow.mainApp.protocol._serialConnector._connectionId;
                    if (connectionId) {
                        chrome.serial.disconnect(connectionId, function (result) {
                            console.log('Serial disconected - ' + result);
                        });
                    }
                }
            )
        }
	);
});