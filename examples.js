
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
            
            if ($('.wellcomePlayer').attr('data-uri')){
                $('.wellcomePlayer').updateAttr('data-uri', '/examples/', '/');
            }

            $("body").append('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
        }
    }

    setTimeout(function(){
        if ($('#options option').length || $('#options optgroup').length){
            setSelectedOption();
        }
    }, 1000);

    $('#options').on('change', function(){
        var url = document.URL;
        url = url.substr(0, Math.min(url.indexOf('?'), url.indexOf('#')));
        var item = $('#options option:selected').val();

        if ($('#options').hasClass('manifest')){
            window.location.href = url + "?manifest=" + item;
        } else {
            window.location.href = url + "?packageId=" + item;
        }

    });

    function setSelectedOption(){

        var item;

        if ($('#options').hasClass('manifest')){

            item = getQuerystringParameter("manifest");

            if (item){
                $("#options").val(item);
            } else {
                item = $('#options option')[0].value;
            }

            $('.wellcomePlayer').attr('data-uri', item);

        } else {
            // if a packageId has been passed as a hash parameter, use that.
            // otherwise pick the first item in the drop down.

            item = getQuerystringParameter("packageId");

            if (item){
                $("#options").val(item);
            } else {
                item = $('#options option')[0].value;
            }

            $('.wellcomePlayer').attr('data-uri', 'http://wellcomelibrary.org/package/' + item);
        }

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