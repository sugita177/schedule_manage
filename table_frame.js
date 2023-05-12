'use strict';

const MemberNum = 5;

export class TableFrame {
    #memberNum;
    #year;
    #month;

    #date = new Date();
    #nowYear = this.#date.getFullYear();
    #nowMonth = this.#date.getMonth();

    constructor(year = this.#nowYear, month = this.#nowMonth, memberNum = MemberNum) {
        this.#memberNum = memberNum;
        this.#year = year;
        this.#month = month;
        
    }

    setYearMonthForm() {
        const selectYear = document.querySelector('#selectYear');
        for (let i=2023; i<=2028; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.text = i;
            if(i === this.#nowYear) {
                option.selected = true;
            }
            selectYear.appendChild(option);
        }
        
        const selectMonth = document.querySelector('#selectMonth');
        for (let i=0; i<12; i++) {
            const option = document.createElement('option');
            option.value = i + 1;
            option.text = i + 1;
            if(i === this.#nowMonth) {
                option.selected = true;
            }
            selectMonth.appendChild(option);
        }

        const submitButton = document.querySelector('.input-year-month-div input');
        submitButton.addEventListener('click', submitYearMonth);
    }

    createInitialFrame() {
        createFrame(this.#year, this.#month, this.#memberNum);
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

function createFrame(year, month, memberNum) {
    const dateCalc = new DateCalculator();
    const maxDate = dateCalc.maxDateFunc(year, month);

    const scheduleTableBody = document.querySelector('#scheduleTableBody');
    while(scheduleTableBody.lastChild){
        scheduleTableBody.removeChild(scheduleTableBody.lastChild);
    }
    const topTableRowElement = document.createElement('tr');
    const topTableRow = scheduleTableBody.appendChild(topTableRowElement);
    topTableRow.className = 'top-row';
    const tableHeadElement = document.createElement('th');
    const leftTopIndex = topTableRow.appendChild(tableHeadElement);
    leftTopIndex.textContent = `${year}年${month+1}月`;
    for(let j=0; j<memberNum; j++) {
        const tableHeadElement = document.createElement('th');
        const memberIndex = topTableRow.appendChild(tableHeadElement);
        memberIndex.textContent = `メンバー${j+1}`;
    }

    for(let i=0; i<maxDate; i++) {
        const tableRowElement = document.createElement('tr');
        const tableHeadElement = document.createElement('th');
        const tableRow = scheduleTableBody.appendChild(tableRowElement);
        const day = i + 1;
        const dayOfWeek = dateCalc.dayOfWeekFunc(year, month, day)
        tableRow.appendChild(tableHeadElement).textContent = `${i+1}(${dayOfWeek})`;
        for(let j=0; j<memberNum; j++) {
            const tableDataElement = document.createElement('td');
            const tableData = tableRow.appendChild(tableDataElement);
            tableData.textContent = `${i+1}-${j+1}`;
            tableData.id = `datumMember${j}Date${year}${month+1}${i+1}`;
            const editButton = document.createElement('button');
            editButton.textContent = '編集';
            tableData.appendChild(editButton);
        }
    }

    for(let i=0; i<maxDate; i++) {
        for(let j=0; j<memberNum; j++) {
            const textEditButton = document.querySelector(`#datumMember${j}Date${year}${month+1}${i+1} button`);
            textEditButton.addEventListener('click', openTextEdit);
        }
    }

}

function submitYearMonth() {
    const selectedYearValue = parseInt(document.querySelector('#selectYear').value); 
    const selectedMonthValue = parseInt(document.querySelector('#selectMonth').value) - 1;
    createFrame(selectedYearValue, selectedMonthValue, MemberNum);
}

function openTextEdit() {
    window.open('./text_edit.html', 'text_edit_window', 'width = 500 height = 500 top =100  left = 200');
}
