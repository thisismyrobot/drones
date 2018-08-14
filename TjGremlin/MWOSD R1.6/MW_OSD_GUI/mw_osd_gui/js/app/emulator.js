Emulator = function (targetNode) {
    this.targetNode = targetNode;
    this.elements = {};


    this.setValue = function(name, value){

    };

    /** TEST TEST TEST 12 CHECKBOXES **/

    var container = $('<div>').addClass('checkboxContainer col-md-12');
    this.elements.MODEarmed = new function(){
        this.label  = "Armed";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEstable = new function(){
        this.label  = "Stable";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEhorizon = new function(){
        this.label  = "Horizon";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEbaro = new function(){
        this.label  = "Baro hold";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEmag = new function(){
        this.label  = "Mag hold";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODErth = new function(){
        this.label  = "GPS RTH";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEhold = new function(){
        this.label  = "GPS hold";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEmission = new function(){
        this.label  = "Mission";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEcamstab = new function(){
        this.label  = "Camstab";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEosdswitch = new function(){
        this.label  = "OSD switch";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEair = new function(){
        this.label  = "Air mode";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.MODEother = new function(){
        this.label  = "Other Mode";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    this.elements.GPSfix = new function(){
        this.label  = "GPS fix";

        this.input      = $('<input>').attr('type', 'checkbox').attr('checked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };

    /*this.elements.Ch14 = new function(){
        this.label  = "GPS fix14";

        this.input      = $('<input>').attr('type', 'checkbox').attr('unchecked', 'checked');
        this.htmlInner  = $('<div>').addClass('emulatorSlider').append($('<label>').html(this.label)).append(this.input);
        this.html       = container.append(this.htmlInner);

        this.afterBuild =  function(){
        };

        this.getValue = function(){
            return this.input.is(':checked') ? 1 : 0;
        }
    };*/



    /*************************************/


    
    this.elements.GPSsats = new function(){
        var _this = this;


        this.value  = 9;
        this.label  = "GPS sats";
        this.unit  = "";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);

        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: 0,
                max: 15,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);
                    $(this).find('.ui-slider-handle').append(tooltip);

                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                   _this.value = ui.value;

                   tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.GPSaltitude = new function(){
        var _this = this;

        this.value  = 500;
        this.label  = "GPS altitude - m";
        this.unit  = "";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);

        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: 0,
                max: 10000,
                step: 100,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);
                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                   _this.value = ui.value;

                   tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.GPSdistancetohome = new function(){
        var _this = this;

        this.value  = 350;
        this.label  = "GPS distance home - m";
        this.unit  = "";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: 0,
                max: 20000,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.GPSspeed = new function(){
        var _this = this;

        this.value  = 1000;
        this.label  = "GPS speed - cm/s";
        this.unit  = "";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: 0,
                max: 10000,
                step: 25,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.GPSheadinghome = new function(){
        var _this = this;

        this.value  = 90;
        this.label  = "GPS heading to home - degrees";
        this.unit  = "°";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: -180,
                max: 180,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

//    this.build();

    this.elements.GPSheading = new function(){
        var _this = this;

        this.value  = 45;
        this.label  = "GPS heading cog - degrees";
        this.unit  = "°";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: 0,
                max: 360,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.ACCpitch = new function(){
        var _this = this;

        this.value  = 0;
        this.label  = "ACC roll - degrees";
        this.unit  = "°";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: -180,
                max: 180,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.ACCroll = new function(){
        var _this = this;

        this.value  = 0;
        this.label  = "ACC pitch - degrees";
        this.unit  = "°";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: -180,
                max: 180,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.MAGheading = new function(){
        var _this = this;

        this.value  = 0;
        this.label  = "MAG heading - degrees";
        this.unit  = "°";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: -180,
                max: 180,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.BAROaltitude = new function(){
        var _this = this;

        this.value  = 0;
        this.label  = "BARO altitude - m";
        this.unit  = "";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: -500,
                max: 1000,
                step: 10,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.BAROvario = new function(){
        var _this = this;

        this.value  = 0;
        this.label  = "BARO vario - cm/s";
        this.unit  = "";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: -200,
                max: 200,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.ANALall = new function(){
        var _this = this;

        this.value  = 162;
        this.label  = "Flight Controller analog - all";
        this.unit  = "";

        this.slider     = $('<div>');
        this.html       = $('<div>').addClass('col-md-3 emulatorSlider').append($('<label>').html(this.label)).append(this.slider);
        var tooltipValue = $('<div>').addClass('custom-tooltip-inner');
        var tooltip = $('<div>').addClass('custom-tooltip').append(tooltipValue).append($('<div>').addClass('custom-tooltip-arrow'));

        this.afterBuild =  function(){
            _this.slider.slider({
                value: _this.value,
                min: 0,
                max: 255,
                step: 1,
                create: function(event, ui){
                    tooltipValue.html(_this.value + _this.unit);

                    $(this).find('.ui-slider-handle').append(tooltip);
                    var fadeOutTimer = null;
                    $(this).mouseover(function(){clearTimeout(fadeOutTimer), tooltip.fadeIn()}).mouseout(function(){fadeOutTimer = setTimeout(function(){tooltip.fadeOut()}, 500)});
                    tooltip.hide();
                },
                slide: function (event, ui) {
                    _this.value = ui.value;

                    tooltipValue.html(_this.value + _this.unit);
                }
            });

        };

        this.getValue = function(){
            return this.value;
        }
    };



    /** TEST STICK **/
    this.elements.GimbalLeft = new function(){
        var _this = this;

        this.value  = [500,0];//min = 0; max =50, half is 25 "center"
        this.label  = "Throttle / Yaw";
        this.unit  = "";

        this.stick     = $('<div>');
        this.html       = $('<div>').addClass('col-md-1 emulatorSlider').append($('<label>').html(this.label)).append(this.stick);

        this.afterBuild =  function(){
            var stick = new Stick(_this.stick, 60, 10, 0, 1000); //new Stick(target, size, stickDivider, min, max); //  physical size, stickDivider must get integer  150 / 10 not 150 / 8

            stick.onMove = function(x, y){
                _this.value = [x, y];
            };

            stick.setPosition(_this.value);
        };

        this.getValue = function(){
            return this.value;
        }
    };

    /** TEST STICK **/
    this.elements.GimbalRight = new function(){
        var _this = this;

        this.value  = [500,500]; // x, y // ((60 - 10) / 2 ) + 10 = ((max - min) / 2) + min
        this.label  = "Pitch, Roll";
        this.unit  = "";

        this.stick     = $('<div>');
        this.html       = $('<div>').addClass('col-md-1 emulatorSlider').append($('<label>').html(this.label)).append(this.stick);

        this.afterBuild =  function(){
            var stick = new Stick(_this.stick, 60, 10, 0, 1000)

            stick.onMove = function(x, y){
                _this.value = [x, y];
            };

            stick.setPosition(_this.value);
        };

        this.getValue = function(){
            return this.value;
        }
    };

    this.elements.AUX12 = new function(){
        var _this = this;

        this.value  = [500,500]; // x, y // ((60 - 10) / 2 ) + 10 = ((max - min) / 2) + min
        this.label  = "CH5 ^, CH6 >";
        this.unit  = "";

        this.stick     = $('<div>');
        this.html       = $('<div>').addClass('col-md-1 emulatorSlider').append($('<label>').html(this.label)).append(this.stick);

        this.afterBuild =  function(){
            var stick = new Stick(_this.stick, 60, 10, 0, 1000)

            stick.onMove = function(x, y){
                _this.value = [x, y];
            };

            stick.setPosition(_this.value);
        };

        this.getValue = function(){
            return this.value;
        }
    };
    
    this.elements.AUX34 = new function(){
        var _this = this;

        this.value  = [500,500]; // x, y // ((60 - 10) / 2 ) + 10 = ((max - min) / 2) + min
        this.label  = "CH7 ^,CH8 >";
        this.unit  = "";

        this.stick     = $('<div>');
        this.html       = $('<div>').addClass('col-md-1 emulatorSlider').append($('<label>').html(this.label)).append(this.stick);

        this.afterBuild =  function(){
            var stick = new Stick(_this.stick, 60, 10, 0, 1000)

            stick.onMove = function(x, y){
                _this.value = [x, y];
            };

            stick.setPosition(_this.value);
        };

        this.getValue = function(){
            return this.value;
        }
    };

        this.build();

};



Emulator.prototype.build = function(){
    for(var elementKey in this.elements){
        this.targetNode.append(this.elements[elementKey].html);
        this.elements[elementKey].afterBuild();
    }
};







