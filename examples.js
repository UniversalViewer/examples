
$.fn.updateAttr = function (attrName, oldVal, newVal) {

    return this.each(function () {

        var $this = $(this);

        var attr = $this.attr(attrName);
        if (attr.indexOf(oldVal) === 0){
            attr = attr.replace(oldVal, newVal);
            $this.attr(attrName, attr);
        }
    });
};

var testBuild = 0;
var uri = document.location.href;

if (testBuild){
    document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
} else {
    if (uri.indexOf('localhost') != -1){
        document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/src/js/embed.js"><\/script>');
    } else {
        // built version
        $('.wellcomePlayer').updateAttr('data-config', '/examples/', '/');
        $('.wellcomePlayer').updateAttr('data-uri', '/examples/', '/');

        document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
    }
}

$(function(){
    $('#options').on('change', function(){
        var bnumber = $('#books option:selected').val();
        $('.wellcomePlayer').attr('data-uri', 'http://wellcomelibrary.org/package/' + bnumber);
        initPlayers($('.wellcomePlayer'));
    });

    // test overrideFullScreen option
    $(document).bind("onToggleFullScreen", function (event, isFullScreen) {
        console.log('full screen: ' + isFullScreen);
    });

    // test currentViewUri event
    $(document).bind("onCurrentViewUri", function (event, uri) {
        console.log(uri);
    });
});