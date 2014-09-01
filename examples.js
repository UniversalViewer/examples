
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
        if ($('#options option').length){
            setSelectedOption();
        }
    }, 1000);

    $('#options').on('change', function(){
        var packageId = $('#options option:selected').val();
        var url = document.URL;
        url = url.substr(0, Math.min(url.indexOf('?'), url.indexOf('#')));
        window.location.href = url + "?packageId=" + packageId;
    });

    function setSelectedOption(){

        var packageId;

        // if a packageId has been passed as a hash parameter, use that.
        // otherwise pick the first item in the drop down.

        packageId = getQuerystringParameter("packageId");

        if (packageId){
            $("#options").val(packageId);
        } else {
            packageId = $('#options option')[0].value;
        }

        $('.wellcomePlayer').attr('data-uri', 'http://wellcomelibrary.org/package/' + packageId);

        initPlayers($('.wellcomePlayer'));
    }

    function getQuerystringParameter(key) {
        var doc = window.document;
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var match = regex.exec(window.location.search);
        return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
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