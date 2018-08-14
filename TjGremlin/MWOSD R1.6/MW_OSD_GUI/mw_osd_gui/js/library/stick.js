var Stick = function(target, size, stickDivider, min, max){
    var _this = this;
    this.wirdffset = [5, -14];

    this.positionClick = [0, 0];
    this.target = target;
    this.realSize = size;
    this.size       = size + (size / stickDivider);
    this.sizeStick  = size / stickDivider;
    this.min  = min;
    this.max  = max;
    this.isMove = false;

    this.horizontal = $('<div>').attr('style', 'width: '+(this.size - 1)+'px; height:1px;border: 1px solid #2b669a');
    this.vertical = $('<div>').attr('style', 'height: '+(this.size - 1)+'px; width:1px;border: 1px solid #2b669a');

    this.stick = $('<div>').attr('style', 'background-color: #2b669a;width: '+this.sizeStick+'px; height: '+this.sizeStick+'px').mousedown(function(event){
        if(event.target == this){
            _this.positionClick[0] = event.offsetX;
            _this.positionClick[1] = event.offsetY;
            _this.isMove = true;
            event.preventDefault();
        }

    });

    this.main = $('<div>').attr('style', 'width: '+this.size+'px; height: '+this.size+'px; border: 1px solid black');

    $(document).mousemove(function(event){
        if(event.buttons == 1 && _this.isMove){
            _this._onMove(_this.stick.position().left + _this.wirdffset[0] - 10, _this.stick.position().top + _this.wirdffset[1] - 10);
            _this.stick.position({
                my: "left-" + _this.positionClick[0] + " top-" + _this.positionClick[1],
                within: _this.main,
                of: event,
                collision: "fit"
            });

            _this.horizontal.position({
                my: "top-" + _this.positionClick[1] - (_this.sizeStick / 2) ,
                within: _this.main,
                of: _this.stick,
                collision: "fit"
            });

            _this.vertical.position({
                my: "left-" + _this.positionClick[0] - (_this.sizeStick / 2) ,
                within: _this.main,
                of: _this.stick,
                collision: "fit"
            });
        }
    });

    this.main.mousedown(function(event){
        if(event.target == this){
            _this.isMove = true;
            _this.positionClick = [_this.sizeStick / 2 , _this.sizeStick / 2];
            _this._onMove(event.offsetX, event.offsetY);
            _this.stick.position({
                at: "left+" + event.offsetX + " top+" + event.offsetY + "",
                of: _this.main,
                within: _this.main,
                collision: "fit"
            });

            _this.horizontal.position({
                my: "top-" + _this.positionClick[1] - (_this.sizeStick / 2) ,
                of: _this.stick,
                within: _this.main,
                collision: "fit"
            });

            _this.vertical.position({
                my: "left-" + _this.positionClick[0] - (_this.sizeStick / 2) ,
                of: _this.stick,
                within: _this.main,
                collision: "fit"
            });

            event.preventDefault();
        }
    });

    $(document).mouseup(function () {
        _this.isMove = false;
    });

    this._onMove = function(x, y){
        var diff = this.max - this.min;
        var scale = diff / this.realSize;

        _this.onMove(this.min + Math.round(x * scale), this.min + Math.round(y * scale));
    };

    this.onMove = function(x, y){
    };

    this.main.append(this.horizontal);
    this.main.append(this.vertical);
    this.main.append(this.stick);
    this.target.append(this.main);
};

Stick.prototype.setPosition = function(position){

    var diff = this.max - this.min;
    var scale = this.realSize / diff;
    var _position = [0, 0];
    _position[0] = Math.round(position[0] * scale) - (this.min * 2);
    _position[1] = Math.round(position[1] * scale) - (this.min * 2);

    var _this = this;
    this.stick.position({
        at: "left+" + (_position[0] + (_this.sizeStick / 2) ) + " top+" + (_this.size - (_position[1] + (_this.sizeStick / 2))) + "",
        of: _this.main,
        within: _this.main,
        collision: "fit"
    });

    this.horizontal.position({
        my: "top-" + _this.positionClick[1] - (_this.sizeStick / 2) ,
        of: _this.stick,
        within: _this.main,
        collision: "fit"
    });

    this.vertical.position({
        my: "left-" + _this.positionClick[0] - (_this.sizeStick / 2) ,
        of: _this.stick,
        within: _this.main,
        collision: "fit"
    });
};

//new Stick($('#stick'), 500, 0, 1000);