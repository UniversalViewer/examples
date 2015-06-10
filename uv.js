
var script = document.getElementById("__uv__");
var uri = script.getAttribute("data-uri");
document.write('<div class="uv" data-uri="' + uri + '" style="width:640px; height:480px; background-color: #000"></div>');
document.write('<script type="text/javascript" id="embedUV" src="/build/uv-1.2.2/js/embed.js"><\/script>');
//document.write('<script type="text/javascript" id="embedUV" src="/src/js/embed.js"><\/script>');