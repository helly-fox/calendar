var DEMO = DEMO || {};

(function () {
  DEMO.Login = function () {
    this.render();
  };

  DEMO.Login.prototype = {
    constructor: DEMO.Login,
    user: [],
    isAuthenticated: false,
    loginFormTemplate: '\
    <div class="login"> \
    <div class="login__form"> \
    <dl class="login__row"> \
    <dd class="login__item"> \
    <input type="text" class="login__input login__input_username" id="username" placeholder="Username"/> \
    </dd> \
    </dl> \
    <dl class="login__row"> \
    <dd class="login__item"> \
    <input type="password" class="login__input login__input_password" id="password" placeholder="Password"/> \
    </dd> \
    </dl> \
    <dl class="login__row"> \
    <dd class="login__item"> \
    <button class="login__button">Submit</button> \
    </dd> \
    </dl> \
    </div> \
    <div class="login__label"> \
    <span class="login__link">Login</span> \
    </div> \
    </div>',
    loginTemplate: ' \
    <div class="login"> \
    <div class="login__content">You are logged in as <span class="login__user"></span></div> \
    <div class="login__label"> \
    <span class="login__link">Log out</span> \
    </div> \
    </div>',

    render: function () {
      this.loginElement = document.createElement('div');
      this.__checkUserStatus();
      if (this.isAuthenticated) {
        this.loginElement.innerHTML = this.loginTemplate;
        this.loginAction = this.loginElement.querySelector('.login__link');
      } else {
        this.loginElement.innerHTML = this.loginFormTemplate;
        this.loginAction = this.loginElement.querySelector('.login__button');
      }
    },

    submitLoginForm: function () {
      var data = this.__getDataFromForm(),
        users = this.__getUsers('./users/' + data.username + '.json');

      this.__checkUserInBase(data, users);
    },

    submitLogout: function () {
      localStorage.setItem('isAuthenticated', 0);
      this.isAuthenticated = false;
    },

    __getDataFromForm: function () {
      var data = {};

      data.username = document.getElementById('username').value;
      data.password = document.getElementById('password').value;

      return data;
    },

    __getUsers: function (url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function() {
        if (req.status == 200) {
          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      };

      req.onerror = function() {
        reject(Error("There is no such user"));
      };

      req.send();
    });
  },

    __checkUserInBase: function (data, users) {
      var that = this;
      users.then(function(response) {
        var i;
        response = JSON.parse(response);
          if (data.username === response.username && data.password === response.password) {
            that.user.push(response);
            localStorage.setItem('isAuthenticated', 1);
            this.isAuthenticated = true;
          }
      }, function(error) {
        console.error("Failed!", error);
      });
    },

    __checkUserStatus: function () {
      if (Number(localStorage.getItem('isAuthenticated'))) {
        this.isAuthenticated = true;
      }
    }
  }
})();
