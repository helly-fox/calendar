var DEMO = DEMO || {};

(function () {
  DEMO.Calendar = function (config) {
    this.weekDaysName = config.daysOfWeekNames || ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
    this.monthNames = config.monthNames || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.placeHolder = config.element;
    this.calendarData = this.initMonth();
    if (this.placeHolder) {
      this.render();
    }
  };

  DEMO.Calendar.prototype = {
    constructor: DEMO.Calendar,

    initMonth: function (currentMoment) {
      var calendarData = {};
      calendarData.firstDayOfTheMonth = this.__getFirstDate(currentMoment);
      calendarData.monthTable = this.__getMonthTable(calendarData.firstDayOfTheMonth);
      return calendarData;
    },

    __getFirstDate: function (dateObj) {
      var firstDate = (dateObj) ? dateObj : new Date();

      return firstDate.setDate(1);
    },

    __getMonthTable: function (dateObj) {
      var countWeek,
          dateObj = new Date(dateObj),
          countDays = 1,
          count,
          emptyCells = this.__getEmptyCells(dateObj),
          monthLength = this.__getMonthLength(dateObj),
          weekNumber = this.__getWeekNumber(emptyCells, monthLength),
          monthArray = [];

      for (countWeek = 0; countWeek < weekNumber; countWeek++) {
        monthArray[countWeek] = [];
        for (count = 0; count < 7; count++, countDays++) {
          if (countDays <= emptyCells || countDays > (emptyCells + monthLength)) {
            monthArray[countWeek][count] = ''
          } else {
            monthArray[countWeek][count] = countDays - emptyCells;
          }
        }
      }

      return monthArray;
    },

    __getEmptyCells: function (dateObj) {
      return dateObj.getDay() - 1;
    },

    __getWeekNumber: function (startDay, monthLength) {
      return Math.ceil((startDay + monthLength) / 7);
    },

    __getMonthLength: function (dateObj) {
      var date = 1,
          currentMonth = dateObj.getMonth();

      if (dateObj.getDate() !== 1) dateObj.setDate(1); // check if we get the first day od the month. May be this should be removed.

      while (currentMonth == dateObj.getMonth()) {
        date++;
        dateObj.setDate(date);
      }

      return date - 1;
    },

    render: function () {
      var calendarElement = '<div class="calendar">';
      calendarElement += this.__renderHeader();
      calendarElement += this.__renderTable();
      calendarElement += '</div>';
        //this.__markCurrentDay(calendarElement);
      var a = document.querySelector(this.placeHolder);
      a.innerHTML = calendarElement;
      document.querySelector(this.placeHolder + ' [data-id="next"]').addEventListener('click', this.getNextMonth.bind(this));
      document.querySelector(this.placeHolder + ' [data-id = "prev"]').addEventListener('click', this.getPreviousMonth.bind(this));
    },

    __renderHeader: function () {
      var element = '<header class="calendar-header">' +
                    '<span data-id="prev" class="calendar-arrow calendar-arrow__left"><</span>' +
                    '<span data-id="next" class="calendar-arrow calendar-arrow__right">></span>' +
                    '<div data-id="title" class="calendar-title">'+
                    this.__renderMonthName() + ', ' +
                    this.__renderYear() +
                    '</div>' +
                    '</header>';

      return element;
    },

    __renderTable: function () {
      var count,
          element = '<table class="calendar-table">';

      element += this.__buildTitleRow();

      for (count = 0; count < this.calendarData.monthTable.length; count++) {
        element += this.__buildRow(count);
      }

      element += '<table>';

      return element;
     },

    __buildRow: function (rowNumber) {
      var count,
          row = '<tr class="calendar-row">';

      for (count = 0; count < this.calendarData.monthTable[rowNumber].length; count++) {
        row += '<td class="calendar-cell">' + this.calendarData.monthTable[rowNumber][count] + '</td>';
      }

      row += '</td>';

      return row;
    },

    __buildTitleRow: function () {
      var count,
          titleRow = '<tr class="calendar-tow">';

      for (count = 0; count < this.weekDaysName.length; count++) {
        titleRow += '<th>' + this.weekDaysName[count] + '</th>';
      }

      titleRow += '</tr>';

      return titleRow;
    },

    __renderMonthName: function () {
      var dateObj = new Date(this.calendarData.firstDayOfTheMonth);

      return this.monthNames[dateObj.getMonth()];
    },

    __renderYear: function () {
      var dateObj = new Date(this.calendarData.firstDayOfTheMonth);

      return dateObj.getFullYear();
    },

    getNextMonth: function () {
      var dateObj = new Date(this.calendarData.firstDayOfTheMonth);

      dateObj.setMonth(dateObj.getMonth() + 1);
      this.calendarData = this.initMonth(dateObj);
      this.render();
    },

    getPreviousMonth: function () {
      var dateObj = new Date(this.calendarData.firstDayOfTheMonth);

      dateObj.setMonth(dateObj.getMonth() - 1);
      this.calendarData = this.initMonth(dateObj);
      this.render();
    }
  };

})();

(function () {
  var a = new DEMO.Calendar({
    daysOfWeekNames: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    element: '#calendar' //required
  }),
    b = new DEMO.Calendar({
      element: '#calendar1' //required
    });
})();
