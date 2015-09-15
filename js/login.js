var DEMO = DEMO || {};

(function(){
  DEMO.Login = function (config) {
    this.element  = config.element;
    if (this.element) {
      this.render();
    }
  };

  DEMO.Login.prototype = {
    constructor: DEMO.Login,
    loginFormTemplate:  '<div class="login">' +
                        '<div class="login__form">' +
                        '<dl class="login__row">' +
                        '<dd class="login__item">' +
                        '<input type="text" class="login__input login__input_username" id="username" placeholder="Username"/>' +
                        '</dd>' +
                        '</dl>' +
                        '<dl class="login__row">' +
                        '<dd class="login__item">' +
                        '<input type="password" class="login__input login__input_password" id="password" placeholder="Password"/>' +
                        '</dd>' +
                        '</dl>' +
                        '<dl class="login__row">' +
                        '<dd class="login__item">' +
                        '<button class="login__button">Submit</button>' +
                        '</dd>' +
                        '</dl>' +
                        '</div>' +
                        '<div class="login__label">' +
                        '<span class="login__link">Login</span>' +
                        '</div>' +
                        '</div>',

    render: function () {
      var a = document.querySelector(this.element);
      a.innerHTML = this.loginFormTemplate;
      document.querySelector(this.element + ' .login__button').addEventListener('click', this.submitForm.bind(this));
    },

    submitForm: function () {
      var data = this.__getDataFromForm(),
          users = this.__getUsers();

      this.__checkUserInBase(data, users);
    },

    __getDataFromForm: function () {
      var data = {};

      data.username = document.getElementById('username').value;
      data.password = document.getElementById('password').value;

      return data;
    },

    __getUsers: function () {
      var promise = $.get()
    },

    __checkUserInBase: function () {

    }
  }
})();