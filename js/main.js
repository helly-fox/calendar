'use strict';

var month = [
    {
        month: 'January',
        days: 31
    },
    {
        month: 'February',
        days: 28
    },
    {
        month: 'March',
        days: 31
    },
    {
        month: 'April',
        days: 30
    },
    {
        month: 'May',
        days: 31
    },
    {
        month: 'Juny',
        days: 30
    },
    {
        month: 'July',
        days: 31
    },
    {
        month: 'August',
        days: 31
    },
    {
        month: 'September',
        days: 30
    },
    {
        month: 'October',
        days: 31
    },
    {
        month: 'November',
        days: 30
    },
    {
        month: 'December',
        days: 31
    }
];
var table = document.getElementById('table'),
    row,
    title = document.getElementById('title'),
    next = document.getElementById('next'),
    prev = document.getElementById('prev'),
    d = new Date(),
    currectMonth = d.getMonth(),
    weekDay,
    year;


init(currectMonth);
next.addEventListener('click', getNextMonth);
prev.addEventListener('click', getPrevMonth);

function init(value) {
    year = d.getFullYear();
    d.setDate(1);
    d.setMonth(value);
    weekDay = d.getDay();
    isLeapYear();

    title.innerHTML = month[value].month + ' ' + year;
    var i = 1;
    var j = 1;
    var count;
    var element;
    for (; j <= Math.ceil((month[value].days + weekDay -1)/7); j++) {
        count = 0;
        createRow(j);
        for (; i <= Math.ceil((month[value].days + weekDay -1)/7) * 7; i++, count++) {
            element = document.createElement('td');
            element.setAttribute('class', 'calendar-cell');
            if ( i >= (weekDay ) && i < (month[value].days + weekDay)) {
                element.innerHTML = i + 1 - weekDay;
            } else {
                element.setAttribute('class', 'calendar-cell calendar-cell_empty');
            }
            row.appendChild(element);
            if (count == 6) {
                ++i;
                break;
            }
        }
    }
}

function createRow (id){
    row = document.createElement('tr');
    row.setAttribute('id', 'row-' + id);
    table.appendChild(row);
}

function getNextMonth() {
    table.innerHTML = '<table id="table" class="calendar-table"><tr><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su</td></tr></table>';
    if (currectMonth != 11) {
        ++currectMonth
    }
    else {
        d.setFullYear(year + 1);
        currectMonth = 0;
    }
    init(currectMonth);
}

function getPrevMonth() {
    table.innerHTML = '<table id="table" class="calendar-table"><tr><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td><td>Su</td></tr></table>';
    if (currectMonth != 0) {
        --currectMonth
    }
    else {
        d.setFullYear(year - 1);
        currectMonth = 11;
    }
    init(currectMonth);
}

function isLeapYear() {
    if ((year%4 == 0 && year%100 != 0) || (year%400 == 0)) {
        month[1].days = 29;
    }
    else {
        month[1].days = 28;
    }
}
