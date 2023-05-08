'use strict';

import {TableFrame} from './table_frame.js';


function main() {
    const tableFrame = new TableFrame();
    tableFrame.setYearMonthForm();
    tableFrame.createInitialFrame();
}

window.addEventListener('load', main);