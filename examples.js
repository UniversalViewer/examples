
$(function(){

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
        $("body").append('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
    } else {
        if (uri.indexOf('localhost') != -1){
            $("body").append('<script type="text/javascript" id="embedWellcomePlayer" src="/src/js/embed.js"><\/script>');
        } else {
            // built version
            $('.wellcomePlayer').updateAttr('data-config', '/examples/', '/');
            $('.wellcomePlayer').updateAttr('data-uri', '/examples/', '/');

            $("body").append('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
        }
    }

    // when the embed script has loaded - yep, couldn't get it to work any other way...
    setTimeout(function(){
        // if an options dropdown is included on the page, get the first item and set the data-uri to it.
        if (('#options').length > 0){
            setSelectedOption();
        }
    }, 1000);

    $('#options').on('change', function(){
        setSelectedOption();
    });

    function setSelectedOption(){
        var bnumber = $('#options option:selected').val();
        $('.wellcomePlayer').attr('data-uri', 'http://wellcomelibrary.org/package/' + bnumber);
        initPlayers($('.wellcomePlayer'));
    }

    // test overrideFullScreen option
    $(document).bind("onToggleFullScreen", function (event, isFullScreen) {
        console.log('full screen: ' + isFullScreen);
    });

    // test currentViewUri event
    $(document).bind("onCurrentViewUri", function (event, obj) {
        console.log(obj);
    });
});