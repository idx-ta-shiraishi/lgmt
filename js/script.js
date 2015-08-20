(function($){

    var $imgUrl  = $('#imgUrl'),
        $copyBtn = $('#copy'),
        $alertArea = $('#alertArea');

    $copyBtn.on('click', function(){
        imgChecker($imgUrl.val());
    });

    var imgChecker = function(fileName){
        if (!fileName) {
            alertCreate(3);
        } else {
            var reg      = /(.*)(?:\.([^.]+$))/,
                fileType = fileName.match(reg);

            if(fileType){
                if(fileType[2].match(/jpg|gif|png/)) {
                    copyToClipBoard(fileName);
                } else {
                    alertCreate(2);
                }
            } else {
                alertCreate(2);
            }
        }
    }

    var copyToClipBoard = function(fileName){
        var copyDiv = document.createElement('div');
        copyDiv.contentEditable = true;
        document.body.appendChild(copyDiv);

        copyDiv.innerHTML = "![LGTM](http://gentle-reaches-5789.herokuapp.com:/" + fileName + ")";
        copyDiv.unselectable = "off";
        copyDiv.focus();

        document.execCommand('SelectAll');
        document.execCommand("Copy", false, null);
        document.body.removeChild(copyDiv);

        alertCreate(0) ;
    }

    var alertCreate = function(alert_type){
        var alerts = [
            {'type' : 'success', 'title' : 'success', 'message' : 'クリップボードへコピーしました'},
            {'type' : 'info',    'title' : 'info',    'message' : 'Info alert'},
            {'type' : 'warning', 'title' : 'warning', 'message' : '画像URLではありません'},
            {'type' : 'danger',  'title' : 'error',   'message' : 'ファイルURLが空です'}
        ];

        var thisAlert = alerts[alert_type];

        var alert = document.createElement('div');
        alert.setAttribute('class', 'alert alert-' + thisAlert.type + ' alert-dismissable fade in');

        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('class', 'close');
        button.setAttribute('data-dismiss', 'alert');
        button.setAttribute('aria-hidden', 'true');
        button.setAttribute('aria-label', 'Close');
        button.appendChild(document.createTextNode('x'));

        var title = document.createElement('h4');
        title.appendChild(document.createTextNode(thisAlert.title));

        var message = document.createElement('p');
        message.appendChild(document.createTextNode(thisAlert.message));

        alert.appendChild(button);
        alert.appendChild(title);
        alert.appendChild(message);

        $alertArea.append(alert);
    }

})(jQuery);