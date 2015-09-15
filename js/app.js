(function () {
  var app = new DEMO.Controller();
      calendar = new DEMO.CalendarCore(),
      calendarTemplate = new DEMO.CalendarTemplate({
        element: '#calendar'
      }),
      login = new DEMO.Login({
        element: '#login' //required
      });

  app.subscribe(calendarTemplate, 'load', 'render');
  app.subscribe(calendarTemplate, 'update', 'updateUI');
  app.subscribe(calendar, 'next-month', 'getNextMonth');
  app.subscribe(calendar, 'prev-month', 'getPreviousMonth');

  app.triggerEvent('load', calendar.calendarData, calendarTemplate);
  calendarTemplate.next.addEventListener('click', (function(){
    app.triggerEvent('next-month', undefined, calendar);
    app.triggerEvent('update', calendar.calendarData, calendarTemplate);
  }).bind(calendarTemplate));
  calendarTemplate.prev.addEventListener('click', (function(){
    app.triggerEvent('prev-month', undefined, calendar);
    app.triggerEvent('update', calendar.calendarData, calendarTemplate);
  }).bind(calendarTemplate));
})();
