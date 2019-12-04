// https://github.com/ionic-team/stencil/issues/365
// *.proxy.js files are ignored when cleaning lib folders

(function() {
    var t = document.createElement("script");
    t.type = "module";
    // if in an iframe (embedded) 
    t.src = (window.self !== window.top)? "lib/uv-ebook-components.esm.js" : "uv/lib/uv-ebook-components.esm.js";
    document.body.appendChild(t);

    var t = document.createElement("script");
    // if in an iframe (embedded) 
    t.src = (window.self !== window.top)? "lib/uv-ebook-components.js" : "uv/lib/uv-ebook-components.js";
    document.body.appendChild(t);
})();