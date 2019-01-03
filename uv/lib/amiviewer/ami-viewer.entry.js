/*! Built with http://stenciljs.com */
const { h } = window.amiviewer;

class AMIViewer {
    watchHandler() {
        this._reset();
    }
    componentWillLoad() {
        this._reset();
    }
    _reset() {
        const loader = new AMI.VolumeLoader(this._container);
        const files = this.series.split(',').map(v => {
            return `https://cdn.rawgit.com/FNNDSC/data/master/dicom/adi_brain/${v}`;
        });
        // once all files have been loaded (fetch + parse + add to array)
        // merge them into series / stacks / frames
        loader
            .load(files)
            .then(() => {
            // merge files into clean series/stack/frame structure
            const series = loader.data[0].mergeSeries(loader.data);
            loader.free();
            // Display some content on the DOM
            series.forEach((mySeries, seriesIndex) => {
                const seriesDiv = document.createElement('div');
                seriesDiv.className += 'indent';
                seriesDiv.insertAdjacentHTML('beforeend', `<div> SERIES (${seriesIndex + 1}/${series.length})</div>`);
                seriesDiv.insertAdjacentHTML('beforeend', `<div class="series"> numberOfChannels: ${mySeries.numberOfChannels}</div>`);
                this._container.appendChild(seriesDiv);
                // loop through stacks
                mySeries.stack.forEach((myStack, stackIndex) => {
                    var stackDiv = document.createElement('div');
                    stackDiv.className += 'indent';
                    stackDiv.insertAdjacentHTML('beforeend', `<div> STACK (${stackIndex + 1}/${mySeries.stack.length})</div>`);
                    stackDiv.insertAdjacentHTML('beforeend', `<div class="stack"> bitsAllocated: ${myStack.bitsAllocated}</div>`);
                    seriesDiv.appendChild(stackDiv);
                    // loop through frames
                    myStack.frame.forEach((myFrame, frameIndex) => {
                        var frameDiv = document.createElement('div');
                        frameDiv.className += 'indent';
                        frameDiv.insertAdjacentHTML('beforeend', `<div> FRAME (${frameIndex + 1}/${myStack.frame.length})</div>`);
                        frameDiv.insertAdjacentHTML('beforeend', `<div class="frame"> instanceNumber: ${myFrame.instanceNumber}</div>`);
                        stackDiv.appendChild(frameDiv);
                    });
                });
            });
        })
            .catch(function (error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
    }
    render() {
        return h("div", { ref: (el) => this._container = el });
    }
    static get is() { return "ami-viewer"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "series": {
            "type": String,
            "attr": "series",
            "watchCallbacks": ["watchHandler"]
        }
    }; }
    static get style() { return ""; }
}

export { AMIViewer as AmiViewer };
