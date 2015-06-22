(function() {
  'use strict';

  var waitForIt = {
    setup: function(func, wait, thisArg) {
      this.data = [];
      this.func = func;
      this.wait = wait;
      this.thisArg = thisArg || Object.create(null);
    },

    push: function(data) {
      this.data.push(data);
      this.startTimer();
    },

    startTimer: function() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(
        this.done.bind(this),
        this.wait
      );
    },

    done: function() {
      this.func.call(this.thisArg, this.getData());
    },

    getData: function() {
      var latestData = [];
      var length = this.data.length;
      for (var i = 0; i < length; i++) {
        latestData.push(this.data.shift());
      }

      return latestData;
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = waitForIt;
  } else {
    window.waitForIt = waitForIt;
  }
})();
