var AdaptiveDelay = function(){

	this.plans = {};


};

AdaptiveDelay.prototype.addPlan = function(name, minDelay, maxDelay, step){
	this.plans[name] = {
		minDelay: minDelay,
		maxDelay: maxDelay,
		actualDelay: minDelay,
		step: step,
		errorCount: 0,
	}
};

AdaptiveDelay.prototype.setError = function(name, error){
	if(error){
		this.plans[name].errorCount++;
	}else{
		this.plans[name].errorCount = 0;
	}

	if(this.plans[name].errorCount > 10){
		this.plans[name].actualDelay = Math.min(this.plans[name].actualDelay + this.plans[name].step, this.plans[name].maxDelay);
		this.plans[name].errorCount = 0;
	}
};

AdaptiveDelay.prototype.getDelay = function(name){
	return this.plans[name].actualDelay;
};

AdaptiveDelay.prototype.resetAllError = function(){
	for(var name in this.plans){
		this.plans[name].errorCount = 0;
	}
};





