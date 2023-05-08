'use strict';

export class TableFrame {
    #member_num;
    #year;
    #month;
    #maxDate;

    #date = new Date();
    #nowYear = this.#date.getFullYear();
    #nowMonth = this.#date.getMonth();

    constructor(member_num = 5, year = this.#nowYear, month = this.#nowMonth) {
        this.#member_num = member_num;
        this.#year = year;
        this.#month = month;
        const dateCalc = new DateCalculator();
        this.#maxDate = dateCalc.maxDateFunc(this.#year, this.#month);
    }

    createFrame() {
        const dateCalc = new DateCalculator();
        const yearMonthElement = document.querySelector('#yearMonth');
        yearMonthElement.textContent = `${this.#year}年${this.#month+1}月`;

        const scheduleTableBody = document.querySelector('#scheduleTableBody');
        const topTableRowElement = document.createElement('tr');
        const topTableRow = scheduleTableBody.appendChild(topTableRowElement);
        topTableRow.className = 'top-row';
        const tableHeadElement = document.createElement('th');
        const leftTopIndex = topTableRow.appendChild(tableHeadElement);
        leftTopIndex.textContent = '日付';
        for(let j=0; j<this.#member_num; j++) {
            const tableHeadElement = document.createElement('th');
            const memberIndex = topTableRow.appendChild(tableHeadElement);
            memberIndex.textContent = `メンバー${j+1}`;
        }

        for(let i=0; i<this.#maxDate; i++) {
            const tableRowElement = document.createElement('tr');
            const tableHeadElement = document.createElement('th');
            const tableRow = scheduleTableBody.appendChild(tableRowElement);
            const day = i + 1;
            const dayOfWeek = dateCalc.dayOfWeekFunc(this.#year, this.#month, day)
            tableRow.appendChild(tableHeadElement).textContent = `${i+1}(${dayOfWeek})`;
            for(let j=0; j<this.#member_num; j++) {
                const tableDataElement = document.createElement('td');
                const tableData = tableRow.appendChild(tableDataElement);
                const inputElement = document.createElement('input');
                inputElement.type = 'text';
                tableData.appendChild(inputElement);
                //inputElement.disabled = true;
            }
        } 
    }

}

class DateCalculator {
    #maxDates = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    #dayOfWeekJpn = ['日', '月', '火', '水', '木', '金', '土'];

    isLeapYear(year) {
        if(year%4 === 0 && !(year%100 === 0 || year%4 !== 0)) {
            return true;
        } else {
            return false;
        }
    }

    maxDateFunc(year, month) {
        if(month === 1 && this.isLeapYear(year) === true) {
            return 29;
        }
        return this.#maxDates[month];
    }

    dayOfWeekFunc(year, month, day) {
        const date = new Date(year, month, day);
        return this.#dayOfWeekJpn[date.getDay()];
    }
}
