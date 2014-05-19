
$.fn.updateAttr = function (attrName, oldVal, newVal) {

    return this.each(function () {

        var $this = $(this);

        var attr = $this.attr(attrName);
        if (attr.indexOf('/examples/')){
            attr = attr.replace('/examples/', '/');
            $this.attr(attrName, attr);
        }
    });
};

/*
function setAttr(elements, attr, oldVal, newVal){
    $.each($('.wellcomePlayer'), function(index, el) {
        //$(value).attr('data-config', '/examples-config.js');
        var config = $(el).attr('data-config');
        if (config.indexOf('/examples/')){
            config = config.replace('/examples/', '/');
            $(el).attr('data-config', config);
        }
    });
}
*/

var uri = document.location.href;

if (uri.indexOf('localhost') != -1){
    // todo: check if user isn't running repo as submodule (uri doesn't contain '/examples/')

    document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/src/js/embed.js"><\/script>');
} else {
    // built version
    $('.wellcomePlayer').updateAttr('data-config', '/examples/', '/');

    document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
}
