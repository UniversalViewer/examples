
var metadata = require('./package');

var GulpConfig = (function () {
    function GulpConfig() {
        this.name = metadata.name;
        this.header = '// ' + metadata.name + ' v' + metadata.version + ' ' + metadata.homepage + '\n';
        this.fileNames = {
            jsOut: this.name + '.js',
            jsMinOut: this.name + '.min.js',
            dtsOut: this.name + '.d.ts',
            test: 'test/tests.js'
        };
        this.directories = {
            dist: './dist',
            typings: './typings'
        };
        this.typescript = {
            src: ['src/*.ts', 'typings/*.ts', '!test'],
            config: {
                declarationFiles: false,
                noExternalResolve: true,
                noLib: false,
                module: 'commonjs',
                out: this.fileNames.jsOut
            }
        };
    }
    return GulpConfig;
})();

module.exports = GulpConfig;