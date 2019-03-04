// demonstrates how to load a stencil component via a proxy script
// https://github.com/ionic-team/stencil/issues/365
// *.proxy.js files are ignored when cleaning lib folders
(function() {
    var t = document.createElement('script');
    t.type = 'text/javascript';
    //uv/lib/amiviewer.js
    t.src = (true)? 'lib/amiviewer.js' : '';
    document.body.appendChild(t);
})();