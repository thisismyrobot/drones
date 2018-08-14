TranslateNull = function(){

};

TranslateNull.prototype.frameValueToForm = function(value){
    return value;
};

TranslateNull.prototype.formValueToFrame = function(value){
    return value;
};


TranslateOSD_CH = function(){

};

TranslateOSD_CH.prototype.frameValueToForm = function(value){
    return value + 1;
};

TranslateOSD_CH.prototype.formValueToFrame = function(value){
    return value - 1;
};