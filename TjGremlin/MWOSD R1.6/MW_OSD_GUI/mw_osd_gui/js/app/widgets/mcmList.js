McmList = function (target, fileList) {
    this.fileList = fileList;

    this.table = $('<table>').addClass('table');

    this.loadFont = function(url){
        console.log(url);
    };

    this.target = target;
    this.buildTable();
};

McmList.prototype.buildTable = function () {
    var _this = this;
    for(var fileKey in this.fileList){
        var tr = $('<tr>');
        var name = $('<td>').html(this.fileList[fileKey].name).data('url', this.fileList[fileKey].url).click(function () {
            _this.loadFont($(this).data('url'));
        });

        tr.append(name);
        this.table.append(tr);
    }


    this.target.append(this.table);

};