var DEMO = DEMO || {};

(function () {
  DEMO.Controller = function () {
    this.listeners = {};
  };

  DEMO.Controller.prototype = {
    constructor: DEMO.Controller,

    subscribe: function (object, evt, callback) {
      if ( !this.listeners.hasOwnProperty(evt) ) {

        this.listeners[evt] = [];
      }

      this.listeners[evt].push(object[callback]);
    },

    unsubscribe: function (object, evt, callback) {
      if ( this.listeners.hasOwnProperty(evt) ) {
        var i,length;

        for (i = 0, length = this.listeners[evt].length; i < length; i += 1) {

          if( this.listeners[evt][i] === object[callback]) {

            this.listeners[evt].splice(i, 1);
          }
        }
      }

      console.log(object + " " + evt + "has been successfully removed from observer list");
    },

    triggerEvent: function (evt, args, context) {
      if ( this.listeners.hasOwnProperty(evt) )    {
        var i,length;

        for (i = 0, length = this.listeners[evt].length; i < length; i += 1) {

          this.listeners[evt][i].call(context, args);
        }
      }
    },

    renderOnPage: function (element, content) {
      document.querySelector(element).appendChild(content);
    }
  }
})();
