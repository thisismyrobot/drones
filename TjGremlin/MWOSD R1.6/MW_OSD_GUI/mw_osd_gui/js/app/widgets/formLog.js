Log = function (targetNode) {
	this.targetNode = targetNode;

	var _this = this;

	this.content = this.targetNode.find('.log-content');

	this.open = this.targetNode.find('.log-open');

	this.open.click(function(){
		if(_this.targetNode.hasClass('log-opened'))
		{
			_this.targetNode.removeClass('log-opened');
			_this.targetNode.find('.log-open').find('strong').html('Show log');
		}else{
			_this.targetNode.addClass('log-opened');
			_this.targetNode.find('.log-open').find('strong').html('Hide log');
		}

	});
};

Log.prototype.addText = function(text) {
	var date = new Date();

	var dateString = date.toISOString().substr(0, 19).replace('T', ' @ ');


	this.content.prepend($('<p>').html(dateString + ' -- ' +text));
};




