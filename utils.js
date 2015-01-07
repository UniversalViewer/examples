function getQuerystringParameter(key, doc) {
    if (!doc) doc = window.document;
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var match = regex.exec(window.location.search);
    return(match ? decodeURIComponent(match[1].replace(/\+/g, " ")) : null);
}

function setQuerystringParameter(key, value, doc){
    if (!doc) doc = window.document;

    var kvp = updateURIKeyValuePair(doc.location.search.replace('?', ''), key, value);

    // redirects.
    window.location.search = kvp;
}

function updateURIKeyValuePair(uriSegment, key, value){

    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    var kvp = uriSegment.split('&');

    // Array.split() returns an array with a single "" item
    // if the target string is empty. remove if present.
    if (kvp[0] == "") kvp.shift();

    var i = kvp.length;
    var x;

    // replace if already present.
    while (i--) {
        x = kvp[i].split('=');

        if (x[0] == key) {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }

    // not found, so append.
    if (i < 0) {
        kvp[kvp.length] = [key, value].join('=');
    }

    return kvp.join('&');
}