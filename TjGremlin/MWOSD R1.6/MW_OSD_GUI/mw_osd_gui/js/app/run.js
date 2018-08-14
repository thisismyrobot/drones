$(document).ready(function () {

    var service = analytics.getService('mwosd_app');
	tracker = service.getTracker('UA-54508077-3');

	mainApp = new MainApp();
	mainApp.run();

});
