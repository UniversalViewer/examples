
var metadata = require('./package');

var GulpConfig = (function () {
    function GulpConfig() {
        this.lib = 'jmespath.js';
        this.dist = './artifacts';
        this.browserifySrc = [this.lib];
        this.browserifyStandalone = 'jmespath';
        this.header = '// ' + metadata.name + ' v' + metadata.version + ' ' + metadata.homepage + '\n';
        this.minified = 'jmespath.min.js';
        this.test = 'test/jmespath.js';
    }
    return GulpConfig;
})();

module.exports = GulpConfig;