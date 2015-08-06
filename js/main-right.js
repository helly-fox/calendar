var DEMO = DEMO || {};

(function () {
  DEMO.Calendar = function (config) {
    this.weekDaysName = config.daysOfWeekNames || ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.monthNames = config.monthNames || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.tableId = config.element || '#calendar';

    this.render();
  };

  DEMO.Calendar.prototype = {
    constructor: DEMO.Calendar,

    template: '<header class="calendar-header">' +
    '<span data-id="prev" class="calendar-arrow calendar-arrow__left"><</span>' +
    '<span data-id="next" class="calendar-arrow calendar-arrow__right">></span>' +
    '<div data-id="title" class="calendar-title"></div>' +
    '</header>',

    render: function (currentData) {
      var calendarData = this.initMonth(currentData),
        tableCell,
        calendarTable = this.__createTable(calendarData.weekNumber),
        next,
        prev,
        title;

      tableCell = calendarTable.getElementsByTagName('td');
      document.querySelector(this.tableId).setAttribute('class', 'calendar');
      this.__fillTable(tableCell, calendarData);
      this.template += calendarTable.outerHTML;
      if (document.querySelector(this.tableId + ' table')) {
        document.querySelector(this.tableId + ' table').innerHTML = calendarTable.innerHTML;
      } else {
        // add the event lisners here
        document.querySelector(this.tableId).innerHTML = this.template;
        next = document.querySelector(this.tableId + ' [data-id=next]');
        prev = document.querySelector(this.tableId + ' [data-id=prev]');
        next.addEventListener('click', this.getNextMonth.bind(this, [calendarData.firstDayOfTheMonth], false));
        prev.addEventListener('click', this.getPreviousMonth.bind(this, [calendarData.firstDayOfTheMonth], false));
      }

      title = document.querySelector(this.tableId + ' [data-id=title]');
      title.innerHTML = this.monthNames[(calendarData.firstDayOfTheMonth.getMonth())] + ', ' + calendarData.firstDayOfTheMonth.getFullYear();

    },

    initMonth: function (currentMoment) {
      var count = 0,
        monthData = {
          monthArray: [],
          emptyCellsFromStart: 0,
          weekNumber: 0,
          currentDate: currentMoment || this.__getCurrentDate()
        };

      monthData.daysInMonth = this.__getMonthLength(monthData.currentDate);
      monthData.firstDayOfTheMonth = this.__getFirstMonthDay(monthData.currentDate);
      monthData.monthArrayLength = this.__countTableLength(monthData.firstDayOfTheMonth);
      monthData.weekNumber = monthData.monthArrayLength / 7;
      monthData.emptyCellsFromStart = (monthData.firstDayOfTheMonth.getDay() > 0) ? (monthData.firstDayOfTheMonth.getDay() - 1) : 6;

      for (; count < monthData.monthArrayLength; count++) {
        if (count < monthData.emptyCellsFromStart || count >= (monthData.daysInMonth + monthData.emptyCellsFromStart)) {
          monthData.monthArray[count] = '';
        } else {
          monthData.monthArray[count] = count - monthData.emptyCellsFromStart + 1;
        }
      }

      return monthData;
    },

    getNextMonth: function (date) {
      var currentMonth = date[0].getMonth();
      date[0].setMonth(currentMonth + 1);
      this.render(date[0]);
    },

    getPreviousMonth: function (date) {
      var currentMonth = date[0].getMonth();
      date[0].setMonth(currentMonth - 1);
      this.render(date[0]);
    },

    __getCurrentDate: function () {
      return new Date();
    },

    __getFirstMonthDay: function (data) {
      data.setDate(1);
      return data;
    },

    __markCurrentDate: function (calendarData, dayMonth) {
      if (this.__getCurrentDate().getMonth() == calendarData.firstDayOfTheMonth.getMonth() && (this.__getCurrentDate().getDate()) === calendarData.monthArray[dayMonth]) {
        return true;
      }
    },

    __createTitleRow: function () {
      var titleRow = document.createElement('tr');
      for (var i = 0; i < this.weekDaysName.length; i++) {
        titleRow.innerHTML += '<th>' + this.weekDaysName[i] + '</th>';
      }
      return titleRow;
    },

    __createTable: function (weekNumber) {
      var table = document.createElement('table'),
        count = 1;
      table.setAttribute('class', 'calendar-table');
      table.appendChild(this.__createTitleRow());
      for (; count <= weekNumber; count++) {
        table.appendChild(this.__buildTableRow());
      }
      return table;
    },

    __fillTable: function (tableCell, calendarData) {
      var dayMonth = 1;

      for (; dayMonth < tableCell.length; dayMonth++) {
        tableCell[dayMonth].innerHTML = calendarData.monthArray[dayMonth];
        if (this.__markCurrentDate(calendarData, dayMonth)) {
          tableCell[dayMonth].className += ' calendar-cell_current';
        }
      }
    },

    __buildTableRow: function () {
      var tableRow = document.createElement('tr'),
        dayCell = 1;
      for (; dayCell <= 7; dayCell++) {
        tableRow.innerHTML += '<td class="calendar-cell"></td>';
      }
      return tableRow;
    },

    __countTableLength: function (date) {
      var emptyCellFromStart = (this.__getFirstMonthDay(date).getDay() > 0) ? (this.__getFirstMonthDay(date).getDay() - 1) : 6;
      return Math.ceil((this.__getMonthLength(date) + emptyCellFromStart) / 7) * 7;
    },

    __getMonthLength: function (date) {
      var count = 1,
        currentYear = date.getFullYear(),
        currentMonth = date.getMonth();

      while (date.getMonth() == currentMonth) {
        date.setDate(count);
        count++;
      }

      date.setMonth(currentMonth);
      date.setFullYear(currentYear);
      return count - 2;
    }
  };

})();

(function () {
  var calendar = new DEMO.Calendar({
    daysOfWeekNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
  });
})();
