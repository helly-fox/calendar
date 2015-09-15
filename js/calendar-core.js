var DEMO = DEMO || {};

(function () {
  DEMO.CalendarCore = function () {
    this.calendarData = this.initMonth();
  };

  DEMO.CalendarCore.prototype = {
    constructor: DEMO.CalendarCore,

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

    getNextMonth: function () {
      var dateObj = new Date(this.calendarData.firstDayOfTheMonth);

      dateObj.setMonth(dateObj.getMonth() + 1);
      this.calendarData = this.initMonth(dateObj);
    },

    getPreviousMonth: function () {
      var dateObj = new Date(this.calendarData.firstDayOfTheMonth);

      dateObj.setMonth(dateObj.getMonth() - 1);
      this.calendarData = this.initMonth(dateObj);
    }
  };

})();