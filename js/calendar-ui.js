var DEMO = DEMO || {};

(function () {
  DEMO.CalendarTemplate = function (config) {
    this.weekDaysName = config.daysOfWeekNames || this.weekDaysName;
    this.monthNames = config.monthNames || this.monthNames;
    this.placeHolder = config.element;

  };

  DEMO.CalendarTemplate.prototype = {
    constuctor: DEMO.CalendarTemplate,
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    weekDaysName: ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'],

    render: function (calendarData) {
      this.calendarData = calendarData;
      var calendarElement = '<div class="calendar">';
      calendarElement += this.__renderHeader();
      calendarElement += this.__renderTable();
      calendarElement += '</div>';
      //this.__markCurrentDay(calendarElement);
      var a = document.querySelector(this.placeHolder);
      a.innerHTML = calendarElement;
      this.next = document.querySelector(this.placeHolder + ' [data-id="next"]');
      this.prev = document.querySelector(this.placeHolder + ' [data-id = "prev"]');
    },

    updateUI: function (calendarData) {
      this.calendarData = calendarData;
      var table = document.querySelector(this.placeHolder + ' .calendar-table'),
          title = document.querySelector(this.placeHolder + ' .calendar-title');
      table.outerHTML = this.__renderTable();
      title.innerHTML = this.__renderMonthName() + ', ' +
                        this.__renderYear();
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
    }
  };
})();
