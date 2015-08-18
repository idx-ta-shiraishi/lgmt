(function($){

    var $imgUrl     = $('#imgUrl'),
        $copyBtn    = $('#copy'),
        // url         = 'hoge',
        alertNull   = 'ファイルURLが空です',
        alertNotImg = '画像URLではありません',
        alertCopy   = 'コピーしました';

    // chrome.browserAction.onClicked.addListener(function() {
    //     alert('Hello, World!');
    // });

    // chrome.browserAction.onClicked.addListener(function(tab) {
    // // chrome.tabs.getSelected(null, function(tab) {
    //     console.log('hoge');
    //     url = tab.url;
    // });

    // $imgUrl.val(url);


    $copyBtn.on('click', function(){
        imgChecker($imgUrl.val());
    });

    imgChecker = function(fileName){
        if (!fileName) {
            alert(alertNull);
        } else {
            var reg      = /(.*)(?:\.([^.]+$))/,
                fileType = fileName.match(reg)[2];

            if(fileType.match(/jpg|gif|png/)) {
                copyToClipBoard(fileName);
            } else {
                alert(alertNotImg);
            }
        }
    }

    copyToClipBoard = function(fileName){
        var copyDiv = document.createElement('div');
        copyDiv.contentEditable = true;
        document.body.appendChild(copyDiv);

        copyDiv.innerHTML = "![LGTM](http://gentle-reaches-5789.herokuapp.com:/" + fileName + ")";
        copyDiv.unselectable = "off";
        copyDiv.focus();

        document.execCommand('SelectAll');
        document.execCommand("Copy", false, null);
        document.body.removeChild(copyDiv);

        alert(alertCopy);
    }
})(jQuery);