'use strict';

import {TableFrame} from './table_frame.js';


function main() {
    const tableFrame = new TableFrame();
    tableFrame.createFrame();
}

window.addEventListener('load', main);