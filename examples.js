
$.fn.updateAttr = function (attrName, oldVal, newVal) {

    return this.each(function () {

        var $this = $(this);

        var attr = $this.attr(attrName);
        if (attr.indexOf('/examples/') === 0){
            attr = attr.replace('/examples/', '/');
            $this.attr(attrName, attr);
        }
    });
};

var uri = document.location.href;

if (uri.indexOf('localhost') != -1){
    // todo: check if user isn't running repo as submodule (uri doesn't contain '/examples/')

    document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/src/js/embed.js"><\/script>');
} else {
    // built version
    $('.wellcomePlayer').updateAttr('data-config', '/examples/', '/');
    $('.wellcomePlayer').updateAttr('data-uri', '/examples/', '/');

    document.write('<script type="text/javascript" id="embedWellcomePlayer" src="/build/wellcomeplayer/js/embed.js"><\/script>');
}
