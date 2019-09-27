'use strict';

const __chunk_1 = require('./chunk-80b0281e.js');
require('./chunk-d8847c1c.js');

const startStatusTap = () => {
    const win = window;
    win.addEventListener('statusTap', () => {
        __chunk_1.readTask(() => {
            const width = win.innerWidth;
            const height = win.innerHeight;
            const el = document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            const contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(() => {
                    __chunk_1.writeTask(() => contentEl.scrollToTop(300));
                });
            }
        });
    });
};

exports.startStatusTap = startStatusTap;
