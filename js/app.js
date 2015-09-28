(function () {
  var app = new DEMO.Controller();
      calendar = new DEMO.CalendarCore(),
      calendarTemplate = new DEMO.CalendarTemplate(),
      login = new DEMO.Login({
        element: '#login' //required
      });

  // Calendar

  calendarTemplate.render(calendar.calendarData);
  app.renderOnPage('#calendar', calendarTemplate.calendarElement);

  app.subscribe(calendarTemplate, 'update', 'updateUI');
  app.subscribe(calendar, 'next-month', 'getNextMonth');
  app.subscribe(calendar, 'prev-month', 'getPreviousMonth');

  calendarTemplate.next.addEventListener('click', (function(){
    app.triggerEvent('next-month', undefined, calendar);
    app.triggerEvent('update', calendar.calendarData, calendarTemplate);
    app.renderOnPage('#calendar', calendarTemplate.calendarElement);
  }).bind(calendarTemplate));
  calendarTemplate.prev.addEventListener('click', (function(){
    app.triggerEvent('prev-month', undefined, calendar);
    app.triggerEvent('update', calendar.calendarData, calendarTemplate);
    app.renderOnPage('#calendar', calendarTemplate.calendarElement);
  }).bind(calendarTemplate));

  // Login


})();
