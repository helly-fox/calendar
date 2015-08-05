var DEMO = DEMO || {};

(function(){
    DEMO.Calendar = function(config){
        this.weekDaysName = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
        this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    };

    DEMO.Calendar.prototype = {
        constructor: DEMO.Calendar,

        template: '<header class="calendar-header">' +
                  '<span id="prev" class="calendar-arrow calendar-arrow__left"><</span>' +
                  '<span id="next" class="calendar-arrow calendar-arrow__right">></span>' +
                  '<div id="title" class="calendar-title"></div>' +
                  '</header>',

        render: function(currentData){
            var calendarData = this.initMonth(currentData),
                dayMonth = 0,
                count = 1,
                tableCell,
                calendarTable = document.createElement('table'),
                next,
                prev,
                title;

            calendarTable.setAttribute('class', 'calendar-table');
            calendarTable.appendChild(this.__createTitleRow());
            for (; count <= calendarData.weekNumber; count++) {
                calendarTable.appendChild(this.__buildTableRow());
            }
            tableCell = calendarTable.getElementsByTagName('td');

            for ( ; dayMonth < tableCell.length; dayMonth++) {
                tableCell[dayMonth].innerHTML = calendarData.monthArray[dayMonth];
                if(this.__markCurrentDate(calendarData, dayMonth)) {
                  tableCell[dayMonth].className += ' calendar-cell_current';
                }
            }
            this.template += calendarTable.outerHTML;
            if (document.getElementsByTagName('table')[0]) {
              document.getElementsByTagName('table')[0].innerHTML = calendarTable.innerHTML;
            } else {
              // add the event lisners here
              document.getElementsByClassName('calendar')[0].innerHTML = this.template ;
              next = document.getElementById('next');
              prev = document.getElementById('prev');
              next.addEventListener('click', this.getNextMonth.bind(this, [calendarData.firstDayOfTheMonth], false));
              prev.addEventListener('click', this.getPreviousMonth.bind(this, [calendarData.firstDayOfTheMonth], false));
            }

            title = document.getElementById('title');
            title.innerHTML = this.monthNames[(calendarData.firstDayOfTheMonth.getMonth())] + ', ' + calendarData.firstDayOfTheMonth.getFullYear() ;

        },

        initMonth: function(currentMoment) {
            var count = 0,
                monthData = {
                    monthArray: [],
                    emptyCellsFromStart: 0,
                    weekNumber: 0
                };
            monthData.currentDate = currentMoment || this.__getCurrentDate();
            monthData.daysInMonth = this.__getMonthLenth(monthData.currentDate);
            monthData.firstDayOfTheMonth = this.__getFirstMonthDay(monthData.currentDate);
            monthData.monthArrayLength = this.__countTableLength(monthData.firstDayOfTheMonth);
            monthData.weekNumber = monthData.monthArrayLength / 7;
            monthData.emptyCellsFromStart = (monthData.firstDayOfTheMonth.getDay() > 0) ? (monthData.firstDayOfTheMonth.getDay() - 1) : 6 ;


            for( ; count < monthData.monthArrayLength ; count++){
                if (count < monthData.emptyCellsFromStart || count >= (monthData.daysInMonth + monthData.emptyCellsFromStart)){
                    monthData.monthArray[count] = '';
                } else {
                    monthData.monthArray[count] = count - monthData.emptyCellsFromStart + 1;
                }
            }

            return monthData;
        },

        getNextMonth: function(date) {
            var currentMonth = date[0].getMonth();
            date[0].setMonth(currentMonth + 1);
            this.render(date[0]);
        },

        getPreviousMonth: function(date){
          var currentMonth = date[0].getMonth();
          date[0].setMonth(currentMonth - 1);
          this.render(date[0]);
        },

        __getCurrentDate: function(){
            return new Date();
        },

        __getFirstMonthDay: function(data){
            data.setDate(1);
            return data;
        },

        __markCurrentDate: function(calendarData, dayMonth){
          if (this.__getCurrentDate().getMonth() == calendarData.firstDayOfTheMonth.getMonth() && (this.__getCurrentDate().getDate()) === calendarData.monthArray[dayMonth]){
            return true;
          }
        },

        __createTitleRow: function(){
            var titleRow = document.createElement('tr');
            for (var i = 0; i < this.weekDaysName.length; i++) {
                titleRow.innerHTML += '<th>'+ this.weekDaysName[i] +'</th>';
            }
            return titleRow;
        },

        __buildTableRow: function(){
            var tableRow = document.createElement('tr'),
                dayCell = 1;

            for ( ; dayCell < 8; dayCell++){
              tableRow.innerHTML += '<td class="calendar-cell"></td>';
            }

            return tableRow;
        },

        __countTableLength: function(date){
            var emptyCellFromStart = (this.__getFirstMonthDay(date).getDay() > 0) ? (this.__getFirstMonthDay(date).getDay() - 1) : 6 ;
            return Math.ceil((this.__getMonthLenth(date) + emptyCellFromStart)/7) * 7;
        },

        __getMonthLenth: function(date){
            var count = 1,
              currentYear = date.getFullYear(),
              currentMonth = date.getMonth();

            for(;;count++){
                date.setDate(count);
                if (date.getMonth() != currentMonth) {
                    date.setMonth(currentMonth);
                    date.setFullYear(currentYear);
                    return count - 1;
                }
            }
        }
    }

})();

(function(){
    var calendar = new DEMO.Calendar();
    calendar.render();
})();