'use strict';

var test = require('tape');
var wait = require('./wait-for-it');

test('wait is an object', function(t) {
  t.plan(1);

  t.equal('object', typeof wait);
});

test('basic push', function(t) {
  t.plan(1);

  wait.setup(function(data) {
    t.equal(data[0], 'something');
  }, 1000);

  wait.push('something');
});

test('callback only called once', function(t) {
  t.plan(1);

  wait.setup(function() {
    t.pass();
  }, 1000);

  wait.push('1');
  wait.push('2');
  wait.push('3');
});

test('data matches what is queued', function(t) {
  t.plan(1);

  wait.setup(function(data) {
    t.equal(data.length, 3);
  }, 1000);

  wait.push('1');
  wait.push('2');
  wait.push('3');
});

test('callback is fired multiple times', function(t) {
  t.plan(2);

  wait.setup(function() {
    t.pass();
  }, 1000);
  wait.push('1');

  setTimeout(function() {
    wait.push('2');
  }, 3000);
});

test('multiple queues', function(t) {
  t.plan(2);

  var q1 = Object.create(wait);
  q1.setup(function(data) {
    t.equal(data[0], 'q1');
  }, 1000);

  var q2 = Object.create(wait);
  q2.setup(function(data) {
    t.equal(data[0], 'q2');
  }, 1000);

  q1.push('q1');
  q2.push('q2');
});

test('this context set via callback', function(t) {
  t.plan(1);

  var fixture = {
    fn: function() {
      this.success();
    },
    success: function() {
      t.pass();
    }
  };

  wait.setup(fixture.fn, 1000, fixture);
  wait.push('1');
});
