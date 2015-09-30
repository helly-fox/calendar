(function () {
  var app = new DEMO.Controller();
      calendar = new DEMO.CalendarCore(),
      calendarTemplate = new DEMO.CalendarTemplate({calendarData: calendar.calendarData}),
      login = new DEMO.Login();

  // Calendar

  app.renderOnPage('#calendar', calendarTemplate.calendarElement);
  app.renderOnPage('#login', login.loginElement);

  app.subscribe(calendarTemplate, 'update', 'updateUI');
  app.subscribe(calendar, 'next-month', 'getNextMonth');
  app.subscribe(calendar, 'prev-month', 'getPreviousMonth');
  app.subscribe(login, 'login', 'submitLoginForm');
  app.subscribe(login, 'logout', 'submitLogout');

  calendarTemplate.next.addEventListener('click', (function() {
    app.triggerEvent('next-month', undefined, calendar);
    app.triggerEvent('update', calendar.calendarData, calendarTemplate);
  }).bind(calendarTemplate));

  calendarTemplate.prev.addEventListener('click', (function() {
    app.triggerEvent('prev-month', undefined, calendar);
    app.triggerEvent('update', calendar.calendarData, calendarTemplate);
  }).bind(calendarTemplate));

  login.loginAction.addEventListener('click', ( function() {
    if (login.isAuthenticated) {
      app.triggerEvent('logout', undefined, login);
      app.renderOnPage('#login', login.loginElement);
    } else {
      app.triggerEvent('login', undefined, login);
      app.renderOnPage('#login', login.loginElement);
    }
  }));

  // Login


})();
