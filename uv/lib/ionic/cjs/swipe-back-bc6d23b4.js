'use strict';

require('./chunk-80b0281e.js');
require('./chunk-d8847c1c.js');
const index = require('./index-e5a21441.js');

const createSwipeBackGesture = (el, canStartHandler, onStartHandler, onMoveHandler, onEndHandler) => {
    const win = el.ownerDocument.defaultView;
    const canStart = (detail) => {
        return detail.startX <= 50 && canStartHandler();
    };
    const onMove = (detail) => {
        // set the transition animation's progress
        const delta = detail.deltaX;
        const stepValue = delta / win.innerWidth;
        onMoveHandler(stepValue);
    };
    const onEnd = (detail) => {
        // the swipe back gesture has ended
        const delta = detail.deltaX;
        const width = win.innerWidth;
        const stepValue = delta / width;
        const velocity = detail.velocityX;
        const z = width / 2.0;
        const shouldComplete = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        const missing = shouldComplete ? 1 - stepValue : stepValue;
        const missingDistance = missing * width;
        let realDur = 0;
        if (missingDistance > 5) {
            const dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        onEndHandler(shouldComplete, stepValue, realDur);
    };
    return index.createGesture({
        el,
        gestureName: 'goback-swipe',
        gesturePriority: 40,
        threshold: 10,
        canStart,
        onStart: onStartHandler,
        onMove,
        onEnd
    });
};

exports.createSwipeBackGesture = createSwipeBackGesture;
