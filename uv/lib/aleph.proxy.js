// https://github.com/ionic-team/stencil/issues/365
// *.proxy.js files are ignored when cleaning lib folders

(function(doc){
    var scriptElm = doc.scripts[doc.scripts.length - 1];
    var warn = ['[aleph] Deprecated script, please remove: ' + scriptElm.outerHTML];
  
    warn.push('To improve performance it is recommended to set the differential scripts in the head as follows:')
  
    var parts = scriptElm.src.split('/');
    parts.pop();
    if (window.self !== window.top) {
        // not in an iframe
        parts.push('uv');
    }
    parts.push('lib');
    parts.push('aleph');
    var url = parts.join('/');
  
    var scriptElm = doc.createElement('script');
    scriptElm.setAttribute('type', 'module');
    scriptElm.src = url + '/aleph.esm.js';
    doc.head.appendChild(scriptElm);
    warn.push(scriptElm.outerHTML);
  
    scriptElm = doc.createElement('script');
    scriptElm.setAttribute('nomodule', '');
    scriptElm.src = url + '/aleph.js';
    doc.head.appendChild(scriptElm);
    warn.push(scriptElm.outerHTML);
  
    console.warn(warn.join('\n'));
  
  })(document);