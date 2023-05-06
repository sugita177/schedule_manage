'use strict';

class TableFrame {
    #year;
    #month;
    #member_num;

    constructor(year, month, member_num) {
        this.#year = year;
        this.#month = month;
        this.#member_num = member_num;
    }

    createFrame() {
        const scheduleTableBody = document.querySelector('#scheduleTableBody');
        const topTableRowElement = document.createElement('tr');
        const topTableRow = scheduleTableBody.appendChild(topTableRowElement);
        topTableRow.className = 'top-row';
        const tableHeadElement = document.createElement('th');
        const leftTopIndex = topTableRow.appendChild(tableHeadElement);
        leftTopIndex.textContent = '日付';
        for(let j=0; j<3; j++) {
            const tableHeadElement = document.createElement('th');
            const memberIndex = topTableRow.appendChild(tableHeadElement);
            memberIndex.textContent = `メンバー${j}`;
        }

        for(let i=0; i<30; i++) {
            const tableRowElement = document.createElement('tr');
            const tableHeadElement = document.createElement('th');
            const tableRow = scheduleTableBody.appendChild(tableRowElement);
            tableRow.appendChild(tableHeadElement).textContent = `${i}`;
            for(let j=0; j<3; j++) {
                const tableDataElement = document.createElement('td');
                const tableData = tableRow.appendChild(tableDataElement);
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                tableData.appendChild(inputElement);
            }
        } 

    }

}


class Member {

}

const tableFrame = new TableFrame('2023', '05', 5);
tableFrame.createFrame();