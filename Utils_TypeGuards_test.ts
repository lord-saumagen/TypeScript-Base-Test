/// <reference path="_references.ts" />

module TS_Utils_TypeGuards_test
{


  QUnit.module("TS.Utils.TypeGuards",
    {
      before: function ()
      {
        // runs once before anything else in the module
      },
      beforeEach: function ()
      {
        // prepare something for all following tests
      },
      afterEach: function ()
      {
        // clean up after each test
      },
      after: function ()
      {
        // runs once after all unit tests finished (including teardown)
        //personEnumerable = null;
      }
    });


  QUnit.test("isArray", (assert) => 
  {
    let numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let emptyArray = new Array<string>();

    assert.ok(TS.Utils.TypeGuards.isArray(numberArray), "Should pass for a none empty number array.");
    assert.ok(TS.Utils.TypeGuards.isArray(emptyArray), "Should pass for an empty array.");

    assert.ok(!TS.Utils.TypeGuards.isArray(new Object(null)), "Should fail for an argument which isn't an array.");
    assert.ok(!TS.Utils.TypeGuards.isArray(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isArray(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isBoolean", (assert) => 
  {
    let boolObj = new Boolean();

    assert.ok(TS.Utils.TypeGuards.isBoolean(true), "Should pass for a 'true' argument value.");
    assert.ok(TS.Utils.TypeGuards.isBoolean(false), "Should pass for a 'false' argument value.");
    assert.ok(TS.Utils.TypeGuards.isBoolean(boolObj), "Should pass for a boolean object argument value.");

    assert.ok(!TS.Utils.TypeGuards.isBoolean(0), "Should fail for a '0' argument value.");
    assert.ok(!TS.Utils.TypeGuards.isBoolean(""), "Should fail for an empty string argument value.");
    assert.ok(!TS.Utils.TypeGuards.isBoolean(NaN), "Should fail for a 'NaN' argument value.");
    assert.ok(!TS.Utils.TypeGuards.isBoolean(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isBoolean(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isDate", (assert) => 
  {
    let dateObj = new Date(2000, 12, 24, 0, 0, 0, 0);

    assert.ok(TS.Utils.TypeGuards.isBoolean(true), "Should pass for a 'date' argument value.");

    assert.ok(!TS.Utils.TypeGuards.isDate(new Object(null)), "Should fail for an argument which isn't a date.");
    assert.ok(!TS.Utils.TypeGuards.isDate(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isDate(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isGUID", (assert) => 
  {
    let baseGUID = new TS.TypeCode.GUID();
    let randomGUID = new TS.TypeCode.RandomGUID();
    let timeBasedGUID = new TS.TypeCode.TimeBasedGUID();

    assert.ok(TS.Utils.TypeGuards.isGUID(baseGUID), "Should pass for a 'GUID' argument value.");
    assert.ok(TS.Utils.TypeGuards.isGUID(randomGUID), "Should pass for a random 'GUID' argument value.");
    assert.ok(TS.Utils.TypeGuards.isGUID(timeBasedGUID), "Should pass for a time based 'GUID' argument value.");

    assert.ok(!TS.Utils.TypeGuards.isGUID(new Object(null)), "Should fail for an argument which isn't a 'GUID'.");
    assert.ok(!TS.Utils.TypeGuards.isGUID(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isGUID(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isRandomGUID", (assert) => 
  {
    let baseGUID = new TS.TypeCode.GUID();
    let randomGUID = new TS.TypeCode.RandomGUID();
    let timeBasedGUID = new TS.TypeCode.TimeBasedGUID();

    assert.ok(TS.Utils.TypeGuards.isRandomGUID(randomGUID), "Should pass for a random 'GUID' argument value.");

    assert.ok(!TS.Utils.TypeGuards.isRandomGUID(baseGUID), "Should fail for a 'GUID' argument value.");
    assert.ok(!TS.Utils.TypeGuards.isRandomGUID(timeBasedGUID), "Should fail for a time based 'GUID' argument value.");
    assert.ok(!TS.Utils.TypeGuards.isRandomGUID(new Object(null)), "Should fail for an argument which isn't a 'GUID'.");
    assert.ok(!TS.Utils.TypeGuards.isRandomGUID(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isRandomGUID(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isTimeBasedGUID", (assert) => 
  {
    let baseGUID = new TS.TypeCode.GUID();
    let randomGUID = new TS.TypeCode.RandomGUID();
    let timeBasedGUID = new TS.TypeCode.TimeBasedGUID();

    assert.ok(TS.Utils.TypeGuards.isTimeBasedGUID(timeBasedGUID), "Should pass for a time based 'GUID' argument value.");

    assert.ok(!TS.Utils.TypeGuards.isTimeBasedGUID(baseGUID), "Should fail for a 'GUID' argument value.");
    assert.ok(!TS.Utils.TypeGuards.isTimeBasedGUID(randomGUID), "Should fail for a random 'GUID' argument value.");
    assert.ok(!TS.Utils.TypeGuards.isTimeBasedGUID(new Object(null)), "Should fail for an argument which isn't a 'GUID'.");
    assert.ok(!TS.Utils.TypeGuards.isTimeBasedGUID(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isTimeBasedGUID(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isNull", (assert) => 
  {
    assert.ok(TS.Utils.TypeGuards.isNull(null), "Should pass for a null argument.");

    assert.ok(!TS.Utils.TypeGuards.isNull(new Object(null)), "Should fail for an empty argument.");
    assert.ok(!TS.Utils.TypeGuards.isNull(""), "Should fail for an empty string.");
    assert.ok(!TS.Utils.TypeGuards.isNull(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isNumber", (assert) => 
  {
    let numberObj = new Number();

    assert.ok(TS.Utils.TypeGuards.isNumber(42), "Should pass for a number argument.");
    assert.ok(TS.Utils.TypeGuards.isNumber(numberObj), "Should pass for a number object argument.");
    assert.ok(TS.Utils.TypeGuards.isNumber(Number.NEGATIVE_INFINITY), "Should pass for a 'NEGATIVE_INFINITY' argument.");
    assert.ok(TS.Utils.TypeGuards.isNumber(Number.POSITIVE_INFINITY), "Should pass for a 'POSITIVE_INFINITY' argument.");

    assert.ok(!TS.Utils.TypeGuards.isNumber(NaN), "Should fail for a 'NaN' argument.");
    assert.ok(!TS.Utils.TypeGuards.isNumber(new Object(null)), "Should fail for an argument which isn't a number.");
    assert.ok(!TS.Utils.TypeGuards.isNumber("42"), "Should fail for a number string argument.");
    assert.ok(!TS.Utils.TypeGuards.isNumber(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isNumber(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isObject", (assert) => 
  {
    let constructedObj = new Object(null);
    let literalObj = {};

    assert.ok(TS.Utils.TypeGuards.isObject(constructedObj), "Should pass for a constructed object argument.");
    assert.ok(TS.Utils.TypeGuards.isObject(literalObj), "Should pass for a literal object argument.");

    assert.ok(!TS.Utils.TypeGuards.isObject("object"), "Should fail for an argument which isn't an object.");
    assert.ok(!TS.Utils.TypeGuards.isObject(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isObject(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isRegEx", (assert) => 
  {
    let constructedRegEx = new RegExp("find", "gi");
    let literalRegEx = /^(\b[A|a]ll)*$/gi;

    assert.ok(TS.Utils.TypeGuards.isRegEx(constructedRegEx), "Should pass for a constructed regular expression argument.");
    assert.ok(TS.Utils.TypeGuards.isRegEx(literalRegEx), "Should pass for a literal regular expression argument.");

    assert.ok(!TS.Utils.TypeGuards.isRegEx(new Object(null)), "Should fail for an argument which isn't a regular expression.");
    assert.ok(!TS.Utils.TypeGuards.isRegEx(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isRegEx(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isString", (assert) => 
  {
    let constructedString = new String();
    let literalString = "A string";

    assert.ok(TS.Utils.TypeGuards.isString(constructedString), "Should pass for a constructed string argument.");
    assert.ok(TS.Utils.TypeGuards.isString(literalString), "Should pass for a literal regular string argument.");

    assert.ok(!TS.Utils.TypeGuards.isString(42), "Should fail for an argument which isn't a string.");
    assert.ok(!TS.Utils.TypeGuards.isString(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isString(undefined), "Should fail for an undefined argument.");
  });



  QUnit.test("isSymbol", (assert) =>
  {
    var testSymbol = Symbol("test");

    assert.ok(TS.Utils.TypeGuards.isSymbol(testSymbol), "Should pass for a 'symbol' argument.");

    assert.ok(!TS.Utils.TypeGuards.isSymbol(new Object(testSymbol)), "Should fail for an argument which isn't a symbol.");
    assert.ok(!TS.Utils.TypeGuards.isSymbol(null), "Should fail for a null argument.");
    assert.ok(!TS.Utils.TypeGuards.isSymbol(undefined), "Should fail for an undefined argument.");
  });


  QUnit.test("isUndefined", (assert) =>
  {
    assert.ok(TS.Utils.TypeGuards.isUndefined(undefined), "Should pass for an undefined argument.");

    assert.ok(!TS.Utils.TypeGuards.isUndefined(new Object(null)), "Should fail for an argument which isn't undefined.");
    assert.ok(!TS.Utils.TypeGuards.isUndefined(null), "Should fail for a null argument.");
  });



}