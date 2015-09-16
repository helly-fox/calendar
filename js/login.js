var DEMO = DEMO || {};

(function () {
  DEMO.Login = function (config) {
    this.element = config.element;
    if (this.element) {
      this.render();
    }
  };

  DEMO.Login.prototype = {
    constructor: DEMO.Login,
    loginFormTemplate:
    '<div class="login">' +
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
        users = this.__getUsers('https://dl.dropboxusercontent.com/s/w1xcsl8s3qp38yi/users.json?dl=0');

      this.__checkUserInBase(data, users);
    },

    __getDataFromForm: function () {
      var data = {};

      data.username = document.getElementById('username').value;
      data.password = document.getElementById('password').value;

      return data;
    },

    __getUsers: function (url) {
    // Return a new promise.
    return new Promise(function(resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(req.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };

      // Handle network errors
      req.onerror = function() {
        reject(Error("Network Error"));
      };

      // Make the request
      req.send();
    });
  },

    __checkUserInBase: function (data, users) {
      users.then(function(response) {
        var i;
        response = JSON.parse(response);
        for (i = 0; i < response.users.length; i++) {
          if (data.username === response.users[i].username && data.password === response.users[i].password) {
            console.log("you are authorized as" + data.username);
            break;
          } else {
            console.log("the authorization failed :(");
          }
        }
      }, function(error) {
        console.error("Failed!", error);
      });
    }
  }
})();
