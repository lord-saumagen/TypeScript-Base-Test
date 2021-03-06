﻿var TS_Utils_IO_Stream_test;
(function (TS_Utils_IO_Stream_test) {
  QUnit.module("TS.IO.Stream (plain js)", {
    before: function () {
      // runs once before anything else in the module
    },
    beforeEach: function () {
      // prepare something for all following tests
    },
    afterEach: function () {
      // clean up after each test
    },
    after: function () {
      // runs once after all unit tests finished (including teardown)
      //personEnumerable = null;
    }
  });
  QUnit.test("TS.IO.Stream constructor (plain js)", (assert) => {
    let numberStream;
    let eventHandler = () => { };

    assert.throws(() => {
      numberStream = new TS.IO.Stream(5000, {}, eventHandler, eventHandler);
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an invalid value for argument 'onCloseCallback'.");

    assert.throws(() => {
      numberStream = new TS.IO.Stream(5000, eventHandler, {}, eventHandler);
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an invalid value for argument 'onDataCallback'.");

    assert.throws(() => {
      numberStream = new TS.IO.Stream(5000, eventHandler, eventHandler, {});
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with an invalid value for argument 'onErrorCallback'.");

    assert.throws(() => {
      numberStream = new TS.IO.Stream(5000, eventHandler, eventHandler);
    }, TS.InvalidInvokationException, "The constructor should fail with a \"TS.InvalidInvokationException\" exception when called with an invalid number of arguments.");

  });
})(TS_Utils_IO_Stream_test || (TS_Utils_IO_Stream_test = {}));
