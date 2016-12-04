﻿/// <reference path="_references.ts" />

module TS_Utils_Test
{

  class TestConstructorCallClass
  {
    private _ID: string;
    constructor(ID: string = "1")
    {

      TS.Utils.checkConstructorCall(this, TestConstructorCallClass);
      this._ID = ID;
    }
  }

  enum testEnum { ZERO, ONE, TWO, THREE };

  QUnit.module("TS.Utils",
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


  QUnit.test("allIndexOf", (assert) =>
  {
    let result: Array<number>;
    let sourceString: string = "abcabcdabcdeabcdefabcdefgabcdefgh";
    let searchString: string = "abc";

    let expectedResult = [0, 3, 7, 12, 18, 25];
    result = TS.Utils.allIndexOf(sourceString, searchString);
    assert.deepEqual(result, expectedResult, "Should return the expected array of indexes.");

    result = TS.Utils.allIndexOf(searchString, "xyz");
    assert.ok(result.length == 0, "Should return an empty result array for a search string which has no match.");

    result = TS.Utils.allIndexOf(null, searchString);
    assert.ok(result.length == 0, "Should return an empty result array for a call with an null source string.");

    result = TS.Utils.allIndexOf(undefined, searchString)
    assert.ok(result.length == 0, "Should return an empty result array for a call with an undefined source string.");

    result = TS.Utils.allIndexOf(sourceString, null)
    assert.ok(result.length == 0, "Should return an empty result array for a call with a null search string.");

    result = TS.Utils.allIndexOf(sourceString, undefined)
    assert.ok(result.length == 0, "Should return an empty result array for a call with an undefined search string.");
  });


  QUnit.test("bitStringToByteArray", (assert) =>
  {
    let testVectors: Array<{ str: string, val: number }>;
    let index: number;
    let resultArray: Array<number>;

    testVectors = [{ str: "10101010", val: 170 }, { str: "00001111", val: 15 }, { str: "01010101", val: 85 }, { str: "00000000", val: 0 }, { str: "00000001", val: 1 }];

    for (index = 0; index < testVectors.length; index++)
    {
      let innerIndex: number;
      let testString: string;
      let testArray: Array<number>;

      testString = "";
      testArray = new Array<number>();

      for (innerIndex = 0; innerIndex <= index; innerIndex++)
      {
        testString += testVectors[innerIndex].str;
        testArray.push(testVectors[innerIndex].val);
      }//END for

      resultArray = TS.Utils.bitStringToByteArray(testString);
      assert.deepEqual(resultArray, testArray, "The result array should match with the test values.");
    }//END for

    assert.throws(() => 
    {
      resultArray = TS.Utils.bitStringToByteArray(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.")

    assert.throws(() => 
    {
      resultArray = TS.Utils.bitStringToByteArray(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.")

    assert.throws(() => 
    {
      resultArray = TS.Utils.bitStringToByteArray("");
    }, TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for an empty parameter value.")

    assert.throws(() => 
    {
      resultArray = TS.Utils.bitStringToByteArray("  \r\n");
    }, TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a whitespace parameter value.")

    assert.throws(() => 
    {
      resultArray = TS.Utils.bitStringToByteArray("test");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter which is not a valid bit string.");

  });


  QUnit.test("byteArrayToBitString", (assert) =>
  {
    let testVectors: Array<{ str: string, val: number }>;
    let index: number;
    let byteArray: Array<number>;
    let controlStr: string;

    testVectors = [{ str: "10101010", val: 170 }, { str: "00001111", val: 15 }, { str: "01010101", val: 85 }, { str: "00000000", val: 0 }, { str: "00000001", val: 1 }];
    byteArray = new Array<number>();
    controlStr = "";

    for (index = 0; index < testVectors.length; index++)
    {
      byteArray.push(testVectors[index].val);
      controlStr += testVectors[index].str;
    }

    let resultStr = TS.Utils.byteArrayToBitString(byteArray);
    assert.equal(resultStr, controlStr, "Should return the expected bit string.");

    assert.throws(() => 
    {
      TS.Utils.byteArrayToBitString([0, 1, null, 3]);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid byteArray argument value.")

    assert.throws(() => 
    {
      TS.Utils.byteArrayToBitString([]);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an empty byteArray argument value.")

    assert.throws(() =>
    {
      TS.Utils.byteArrayToBitString(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null byteArray argument value.")

    assert.throws(() => 
    {
      TS.Utils.byteArrayToBitString(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined byteArray argument value.")

  });


  QUnit.test("byteArrayToUInt", (assert) => 
  {
    let byteArray: Array<number> = [0X49, 0X96, 0X02, 0XD2];
    let controlResult: number = 1234567890;

    let result = TS.Utils.byteArrayToUInt(byteArray);
    assert.equal(result, controlResult, "Should return the expected integer result.");

    assert.throws(() => 
    {
      TS.Utils.byteArrayToBitString([0, 1, null, 3]);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a invalid byteArray argument value.")

    assert.throws(() => 
    {
      TS.Utils.byteArrayToUInt([0XFF, 0XFF, 0XFF, 0XFF, 0XFF, 0XFF, 0XFF, 0XFF]);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for an byteArray argument value which exceedes the range of alloewd values.");

    assert.throws(() => 
    {
      TS.Utils.byteArrayToUInt([]);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an empty byteArray argument value.")

    assert.throws(() =>
    {
      TS.Utils.byteArrayToUInt(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null byteArray argument value.")

    assert.throws(() => 
    {
      TS.Utils.byteArrayToUInt(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined byteArray argument value.")
  });


  QUnit.test("byteToBitString", (assert) =>
  {
    let testVectors: Array<{ str: string, val: number }>;
    let resultString: string;
    let index: number;

    testVectors = [{ str: "10101010", val: 170 }, { str: "00001111", val: 15 }, { str: "01010101", val: 85 }, { str: "00000000", val: 0 }, { str: "00000001", val: 1 }];

    for (index = 0; index < testVectors.length; index++)
    {
      resultString = TS.Utils.byteToBitString(testVectors[index].val);
      assert.equal(resultString, testVectors[index].str, "The result string should match with the test string.");
    }//END for


    assert.throws(() => 
    {
      TS.Utils.byteToBitString(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'value' argument.");

    assert.throws(() => 
    {
      TS.Utils.byteToBitString(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'value' argument.");
    assert.throws(() => 
    {
      TS.Utils.byteToBitString(-1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a negative integer 'value' argument.");

    assert.throws(() => 
    {
      TS.Utils.byteToBitString(256);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an integer which is out of byte range 'value' argument.");

    assert.throws(() => 
    {
      TS.Utils.byteToBitString(2.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a floating point 'value' argument.");

  });


  QUnit.test("checkArrayLikeParameter", (assert) => 
  {
    TS.Utils.checkArrayLikeParameter("doucment_all", document.all, "checkArrayLikeParameter");
    assert.ok(true, "Should pass with a node collection as parameter.");

    TS.Utils.checkArrayLikeParameter("string", "ABCdefGHIjkl", "checkArrayLikeParameter");
    assert.ok(true, "Should pass with a string as parameter.");

    assert.throws(() => 
    {
      TS.Utils.checkArrayLikeParameter("number", 5.4, "checkArrayLikeParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a number 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkArrayLikeParameter("null", null, "checkArrayLikeParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkArrayLikeParameter("undefined", undefined, "checkArrayLikeParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.");
  });


  QUnit.test("checkArrayParameter", (assert) => 
  {

    TS.Utils.checkArrayParameter("array", [1, 2], "checkArrayParameter");
    assert.ok(true, "Should pass with an array as parameter.");

    assert.throws(() => 
    {
      TS.Utils.checkArrayParameter("object", {}, "checkArrayParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkArrayParameter("object", null, "checkArrayParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an object 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkArrayParameter("object", undefined, "checkArrayParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an object 'parameter' argument.");
  });


  QUnit.test("checkBitStringParameter", (assert) => 
  {
    TS.Utils.checkBitStringParameter("bitString", "10010111010", "checkBitStringParameter");
    assert.ok(true, "Should pass with a valid bit string as parameter.");

    assert.throws(() => 
    {
      TS.Utils.checkBitStringParameter("invalidBitString", "10010 11010", "checkBitStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid bit string 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkBitStringParameter("whitespace", " ", "checkBitStringParameter");
    }, TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a  whitespace string 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkBitStringParameter("empty", "", "checkBitStringParameter");
    }, TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for an empty string 'parameter' argument.");

    //assert.throws(() => 
    //{
    //  TS.Utils.checkBitStringParameter("object", {}, "checkBitStringParameter");
    //}, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an objct 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkBitStringParameter("null", null, "checkBitStringParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for a null 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkBitStringParameter("undefined", undefined, "checkBitStringParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.InvalidTypeException\" for an undefined 'parameter' argument.");
  });


  QUnit.test("checkBooleanParameter", (assert) =>
  {

    TS.Utils.checkBooleanParameter("true", true, "checkBooleanParameter")
    assert.ok(true, "Should pass for a parameter value which is the boolean true.");

    TS.Utils.checkBooleanParameter("false", false, "checkBooleanParameter")
    assert.ok(true, "Should pass for a parameter value which is the boolean false.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter("object", {}, "checkBooleanParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter("string", "", "checkBooleanParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a string 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter("null", null, "checkBooleanParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkBooleanParameter("undefined", undefined, "checkBooleanParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.");

  });


  QUnit.test("checkConstructorCall", (assert) =>
  {
    let constructResult: any;

    constructResult = new TestConstructorCallClass();
    assert.ok(true, "Should pass for a valid constructor call with the new operator.");
  });


  QUnit.test("checkConstructorParameter", (assert) =>
  {
    let testFunc: (...rest: Array<any>) => any;
    let testFactoryFunc: (...rest: Array<any>) => any;


    TS.Utils.checkConstructorParameter("constructor", TestConstructorCallClass, "checkConstructorParameter");
    assert.ok(true, "Should pass for a parameter value which is a constructor function.");

    testFunc = function (first: number, second: number): number
    {
      return first + second;
    }

    testFactoryFunc = function ()
    {
      return new TestConstructorCallClass();
    }

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter("object", testFunc, "checkConstructorParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't meant to be a constructor function.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter("object", testFactoryFunc, "checkConstructorParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a factory function instead of a constructor function.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter("object", {}, "checkConstructorParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a object.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter("string", "", "checkConstructorParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter("null", null, "checkConstructorParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkConstructorParameter("undefined", undefined, "checkConstructorParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
  });


  QUnit.test("checkDateParameter", (assert) => 
  {
    TS.Utils.checkDateParameter("Date", new Date(), "checkDateParameter");
    assert.ok(true, "Should pass for a parameter value which is a valid date object.");

    assert.throws(() => 
    {
      TS.Utils.checkDateParameter("Empty object", {}, "checkDateParameter")
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an empty object.");

    assert.throws(() => 
    {
      TS.Utils.checkDateParameter("null", null, "checkDateParameter")
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkDateParameter("undefined", undefined, "checkDateParameter")
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
  });


  QUnit.test("checkDateStringParameter", (assert) => 
  {
    TS.Utils.checkDateStringParameter("2016-01-01T00:00:00", "2016-01-01T00:00:00", "checkDateParameter");
    assert.ok(true, "Should pass for a parameter value which is a valid date string.");

    TS.Utils.checkDateStringParameter("Mon Nov 28 2016", "Mon Nov 28 2016", "checkDateParameter");
    assert.ok(true, "Should pass for a parameter value which is a valid date string.");

    TS.Utils.checkDateStringParameter("Mon, 28 Nov 2016 17:02:37 GMT", "Mon, 28 Nov 2016 17:02:37 GMT", "checkDateParameter");
    assert.ok(true, "Should pass for a parameter value which is a valid date string.");

    TS.Utils.checkDateStringParameter("11/28/2016", "11/28/2016", "checkDateParameter");
    assert.ok(true, "Should pass for a parameter value which is a valid date string.");

    assert.throws(() =>
    {
      TS.Utils.checkDateStringParameter("13/13/2016", "13/13/2016", "checkDateStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid date string parameter value.");

    assert.throws(() =>
    {
      TS.Utils.checkDateStringParameter("Mon, 28 Nov 2016 25:02:37 GMT", "Mon, 28 Nov 2016 25:02:37 GMT", "checkDateStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid date string parameter value.");

    assert.throws(() =>
    {
      TS.Utils.checkDateStringParameter("2016-00-01T00:00:00", "2016-00-01T00:00:00", "checkDateStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid date string parameter value.");

    assert.throws(() =>
    {
      TS.Utils.checkDateStringParameter("no date", "no date", "checkDateStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an invalid date string parameter value.");

    assert.throws(() =>
    {
      TS.Utils.checkDateStringParameter("{}", {}, "checkDateStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an empty object parameter value.");

    assert.throws(() =>
    {
      TS.Utils.checkDateStringParameter("null", null, "checkDateStringParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() =>
    {
      TS.Utils.checkDateStringParameter("undefined", undefined, "checkDateStringParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");

  });


  QUnit.test("checkFunctionParameter", (assert) => 
  {

    TS.Utils.checkFunctionParameter("func", () => { }, "checkFunctionParameter");
    assert.ok(true, "Should pass for a call with a valid function parameter.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("null", null, "checkFunctionParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("undefined", undefined, "checkFunctionParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
  });


  QUnit.test("checkIntNumberParameter", (assert) => 
  {

    TS.Utils.checkIntNumberParameter("one", 1, "checkIntegerNumberParameter");
    assert.ok(true, "Should pass for a parameter value which is a postitive integer number.");

    TS.Utils.checkIntNumberParameter("minusOne", -1, "checkIntegerNumberParameter");
    assert.ok(true, "Should pass for a parameter value which is a negative integer number.");

    TS.Utils.checkIntNumberParameter("zero", 0, "checkIntegerNumberParameter");
    assert.ok(true, "Should pass for a parameter value which is a number with the value '0'.");

    TS.Utils.checkIntNumberParameter("MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, "checkIntegerNumberParameter");
    assert.ok(true, "Should pass for a parameter value which is MAX_SAFE_INTEGER.");

    assert.throws(() =>
    {
      TS.Utils.checkIntNumberParameter("MAX_VALUE", Number.MAX_VALUE, "checkIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.MAX_VALUE number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("POSITIVE_INFINITY", Number.POSITIVE_INFINITY, "checkIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.POSITIVE_INFINITY number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("NEGATIVE_INFINITY", Number.NEGATIVE_INFINITY, "checkIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  Number.NEGATIVE_INFINITY number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("zeroPointFive", 0.5, "checkIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  floating point number.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("NaN", Number.NaN, "checkIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.NaN.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("null", null, "checkIntegerNumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkIntNumberParameter("undefined", undefined, "checkIntegerNumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
  });


  QUnit.test("checkInstanceOfParameter", (assert) =>
  {
    let testObj0: any;
    let testLiteralObj: any;

    testLiteralObj =
      {
        Address: "Main Street 20",
        City: "Vienna",
        CompanyName: "Making Money",
        ContactName: "Call me",
        ContactTitle: "",
        Country: "Austria",
        CustomerID: "42",
        Fax: "1234",
        Phone: "555-555",
        PostalCode: "12345",
        Region: "NW"
      };


    testObj0 = new DATA.Customer("Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
    TS.Utils.checkInstanceOfParameter("testObj0", testObj0, DATA.Customer, "checkInstanceOf");
    assert.ok(true, "Should pass for a parameter value wich is an instance of the specified type.");

    assert.throws(() => 
    {
      TS.Utils.checkInstanceOfParameter("testLiteralObj", testLiteralObj, DATA.Customer, "checkInstanceOf");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a literal boject.");

    assert.throws(() => 
    {
      TS.Utils.checkInstanceOfParameter("testObj0", testObj0, testLiteralObj, "checkInstanceOf");
    }, TS.InvalidInvocationException, "The call should fail with a \"TS.InvalidInvocationException\" for a type parameter value which is a literal boject.");

    assert.throws(() => 
    {
      TS.Utils.checkInstanceOfParameter("null", null, DATA.Customer, "checkInstanceOf");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkInstanceOfParameter("undefined", undefined, DATA.Customer, "checkInstanceOf");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");

  });


  QUnit.test("checkIterableParameter", (assert) => 
  {
    TS.Utils.checkIterableParameter("array", [1, 2, 3, 4, 5], "checkIterableParameter");
    assert.ok(true, "Should pass for a parameter value which is an array.");

    TS.Utils.checkIterableParameter("string", "AbCdEf", "checkIterableParameter");
    assert.ok(true, "Should pass for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkIterableParameter("object", {}, "checkIterableParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for an object 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkIterableParameter("null", null, "checkIterableParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null 'parameter' argument.");

    assert.throws(() => 
    {
      TS.Utils.checkIterableParameter("undefined", undefined, "checkIterableParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined 'parameter' argument.");

  });


  QUnit.test("checkKeyByteArray", (assert) => 
  {
    let testArray16 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let testArray24 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    let testArray32 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

    TS.Utils.checkKeyByteArray("testArray16", testArray16, "checkKeyByteArray");
    assert.ok(true, "Should pass for a parameter value which is a valid 16 byte array.");

    TS.Utils.checkKeyByteArray("testArray24", testArray24, "checkKeyByteArray");
    assert.ok(true, "Should pass for a parameter value which is a valid 24 byte array.");

    TS.Utils.checkKeyByteArray("testArray32", testArray32, "checkKeyByteArray");
    assert.ok(true, "Should pass for a parameter value which is a valid 32 byte array.");

    assert.throws(() => 
    {
      TS.Utils.checkKeyByteArray("shortArray", [1, 2, 3], "checkKeyByteArray");
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a call with an array which deceeds the minimum array length.");

    assert.throws(() => 
    {
      testArray32.push(33);
      TS.Utils.checkKeyByteArray("longArray", testArray32, "checkKeyByteArray");
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a call with an array which exceeds the maximum array length.");

    assert.throws(() => 
    {
      testArray24[15] = null;
      TS.Utils.checkKeyByteArray("invallidArray", testArray24, "checkKeyByteArray");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a call with an array which is not a valid unsigned byte array.");

    assert.throws(() => 
    {
      testArray24[15] = null;
      TS.Utils.checkKeyByteArray("longArray", null, "checkKeyByteArray");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with a null 'parameter' value.");

    assert.throws(() => 
    {
      testArray24[15] = null;
      TS.Utils.checkKeyByteArray("longArray", undefined, "checkKeyByteArray");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a call with an undefined 'parameter' value.");
  });


  QUnit.test("checkNotEmptyParameter", (assert) => 
  {
    TS.Utils.checkNotEmptyParameter("array", [1, 2], "checkNotEmptyParameter");
    TS.Utils.checkNotEmptyParameter("string", "Test", "checkNotEmptyParameter");
    TS.Utils.checkNotEmptyParameter("number", 0, "checkNotEmptyParameter");
    TS.Utils.checkNotEmptyParameter("object", {}, "checkNotEmptyParameter");

    assert.throws(() => 
    {
      TS.Utils.checkNotEmptyParameter("emptyString", "", "checkNotEmptyParameter");
    }, TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty string parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkNotEmptyParameter("emptyArra", [], "checkNotEmptyParameter");
    }, TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for an empty array parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkNotEmptyParameter("null", null, "checkNotEmptyParameter");
    }, TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkNotEmptyParameter("undefined", undefined, "checkNotEmptyParameter");
    }, TS.ArgumentNullUndefOrEmptyException, "The call should fail with a \"TS.ArgumentNullUndefOrEmptyException\" for a undefined parameter value.");
  });


  QUnit.test("checkNotUndefinedParameter", (assert) =>
  {

    TS.Utils.checkNotUndefinedParameter("object", {}, "checkNotUndefinedParameter");
    assert.ok(true, "Should pass for a parameter value which is an object.");

    TS.Utils.checkNotUndefinedParameter("string", "", "checkNotUndefinedParameter");
    assert.ok(true, "Should pass for a parameter value which is a string.");

    TS.Utils.checkNotUndefinedParameter("null", null, "checkNotUndefinedParameter");
    assert.ok(true, "Should pass for a parameter value which is null.");

    assert.throws(() =>
    {
      TS.Utils.checkNotUndefinedParameter("undefined", undefined, "checkNotUndefinedParameter");
    }, TS.ArgumentUndefinedException, "The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is undefined.");
  });


  QUnit.test("checkNumberParameter", (assert) => 
  {
    TS.Utils.checkNumberParameter("intNumber", 10, "checkNumberParameter");
    TS.Utils.checkNumberParameter("intNumber", -10, "checkNumberParameter");
    TS.Utils.checkNumberParameter("zero", 0, "checkNumberParameter");
    TS.Utils.checkNumberParameter("float", 2.5, "checkNumberParameter");
    TS.Utils.checkNumberParameter("float", -2.5, "checkNumberParameter");
    TS.Utils.checkNumberParameter("float", 314e-2, "checkNumberParameter");
    TS.Utils.checkNumberParameter("float", 0.0314E+2, "checkNumberParameter");
    TS.Utils.checkNumberParameter("MIN_SAFE_INTEGER", Number.MIN_SAFE_INTEGER, "checkNumberParameter");
    TS.Utils.checkNumberParameter("MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, "checkNumberParameter");
    TS.Utils.checkNumberParameter("MIN_SAFE_INTEGER", Number.MIN_VALUE, "checkNumberParameter");
    TS.Utils.checkNumberParameter("MAX_SAFE_INTEGER", Number.MAX_VALUE, "checkNumberParameter");
    TS.Utils.checkNumberParameter("NEGATIVE_INFINITY", Number.NEGATIVE_INFINITY, "checkNumberParameter");
    TS.Utils.checkNumberParameter("POSITIVE_INFINITY", Number.POSITIVE_INFINITY, "checkNumberParameter");
    TS.Utils.checkNumberParameter("numberObject", new Number(5), "checkNumberParameter");

    assert.ok(true, "Should pass for a parametes values which are number.");

    assert.throws(() => 
    {
      TS.Utils.checkNumberParameter("numberString", "5", "checkNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkNumberParameter("object", {}, "checkNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentUndefinedException\" for a parameter value which is an object.");

    assert.throws(() => 
    {
      TS.Utils.checkNumberParameter("null", null, "checkNumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parmeter value.");

    assert.throws(() => 
    {
      TS.Utils.checkNumberParameter("undefined", undefined, "checkNumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");

  });


  QUnit.test("checkObjectParameter", (assert) => 
  {
    TS.Utils.checkObjectParameter("Literal Object", {}, "checkObjectParameter");
    TS.Utils.checkObjectParameter("Constructed Object", new Object(null), "checkObjectParameter");
    TS.Utils.checkObjectParameter("String Object", new String(""), "checkObjectParameter");
    TS.Utils.checkObjectParameter("Number Object", new Number(0), "checkObjectParameter");
    TS.Utils.checkObjectParameter("Boolean Object", new Boolean(true), "checkObjectParameter");
    TS.Utils.checkObjectParameter("Literal RegEx", /[a-z]*/, "checkObjectParameter");
    TS.Utils.checkObjectParameter("Constructe RegEx", new RegExp("[a-z]"), "checkObjectParameter");

    assert.ok(true, "Should pass for all paramters which are objects");

    assert.throws(() => 
    {
      TS.Utils.checkObjectParameter("string", "string", "checkObjectParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkObjectParameter("number", 42, "checkObjectParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a number.");

    assert.throws(() => 
    {
      TS.Utils.checkObjectParameter("boolean", true, "checkObjectParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a boolean.");

    assert.throws(() => 
    {
      TS.Utils.checkObjectParameter("symbol", Symbol("symbol"), "checkObjectParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a symbol.");

    assert.throws(() => 
    {
      TS.Utils.checkObjectParameter("null", null, "checkObjectParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkObjectParameter("undefined", undefined, "checkObjectParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is an undefined value.");

  });


  QUnit.test("checkParameter", (assert) =>
  {

    TS.Utils.checkParameter("object", {}, "checkParameter");
    assert.ok(true, "Should pass for a parameter value which is an object.");

    TS.Utils.checkParameter("string", "", "checkParameter");
    assert.ok(true, "Should pass for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkParameter("null", null, "checkParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkParameter("undefined", undefined, "checkParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
  });


  QUnit.test("checkStringParameter", (assert) => 
  {

    TS.Utils.checkStringParameter("string", "String", "checkStringParameter");
    assert.ok(true, "Should pass for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter("noString", {}, "checkStringParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is not a string.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter("emptyString", "", "checkStringParameter");
    }, TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a parameter value which is an empty string.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter("whitespaceString", "     \r\n", "checkStringParameter");
    }, TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for a  parameter value which is a whitespace string.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter("null", null, "checkStringParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkStringParameter("undefined", undefined, "checkStringParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");
  });


  QUnit.test("checkUByteArrayParameter", (assert) =>
  {
    TS.Utils.checkUByteArrayParameter("byteArray", [1, 2, 3, 4, 5], "checkUByteArrayParameter");
    assert.ok(true, "Should pass for a parameter value which is a valid uByte array.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteArrayParameter("emptyArray", [], "checkUByteArrayParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an empty array.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteArrayParameter("invalidArray", [1, 2, null, 4, 5], "checkUByteArrayParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an empty array with an invalid element.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteArrayParameter("stringArray", ["one", "two"], "checkUByteArrayParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string array.");

    assert.throws(() =>
    {
      TS.Utils.checkUByteArrayParameter("noArray", {}, "checkUByteArrayParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't an array.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteArrayParameter("null", null, "checkUByteArrayParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteArrayParameter("undefined", undefined, "checkUByteArrayParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
  });


  QUnit.test("checkUByteParameter", (assert) => 
  {
    TS.Utils.checkUByteParameter("uByte", 12, "checkUByteParameter");
    assert.ok(true, "Should pass for a parameter value which is a valid uByte.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteParameter("string", "0", "checkUByteParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a string.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteParameter("negative", -12, "checkUByteParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a signed byte.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteParameter("bigNumber", 500, "checkUByteParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which exceeds the byte value range.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteParameter("floatNumber", 2.5, "checkUByteParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't a byte value.");

    assert.throws(() =>
    {
      TS.Utils.checkUByteParameter("NaN", {}, "checkUByteParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is an object.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteParameter("null", null, "checkUByteParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkUByteParameter("undefined", undefined, "checkUByteParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
  });


  QUnit.test("checkUIntNumberParameter", (assert) => 
  {
    TS.Utils.checkUIntNumberParameter("one", 1, "checkUnsignedIntegerNumberParameter");
    assert.ok(true, "Should pass for a parameter value which is a postitive integer number.");

    TS.Utils.checkUIntNumberParameter("MAX_SAFE_INTEGER", Number.MAX_SAFE_INTEGER, "checkUnsignedIntegerNumberParameter");
    assert.ok(true, "Should pass for a parameter value which is MAX_VALUE of number.");

    TS.Utils.checkUIntNumberParameter("zero", 0, "checkUnsignedIntegerNumberParameter");
    assert.ok(true, "Should pass for a parameter value which is a number with the value '0'.");


    assert.throws(() => 
    {
      TS.Utils.checkUIntNumberParameter(".MAX_VALUE", Number.MAX_VALUE, "checkUnsignedIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.MAX_VALUE.");

    assert.throws(() => 
    {
      TS.Utils.checkUIntNumberParameter("POSITIVE_INFINITY", Number.POSITIVE_INFINITY, "checkUnsignedIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is Number.POSITIVE_INFINITY.");

    assert.throws(() => 
    {
      TS.Utils.checkUIntNumberParameter("zeroPointFive", 0.5, "checkUnsignedIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a  floating point number.");

    assert.throws(() => 
    {
      TS.Utils.checkUIntNumberParameter("minusOne", -1, "checkUnsignedIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a negative integer number.");

    assert.throws(() => 
    {
      TS.Utils.checkUIntNumberParameter("NaN", Number.NaN, "checkUnsignedIntegerNumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is NaN.");

    assert.throws(() => 
    {
      TS.Utils.checkUIntNumberParameter("null", null, "checkUnsignedIntegerNumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for parameter value which is a null value.");

    assert.throws(() => 
    {
      TS.Utils.checkUIntNumberParameter("undefined", undefined, "checkUnsignedIntegerNumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");

  });


  QUnit.test("checkUInt64NumberParameter", (assert) => 
  {
    let uintNumber: TS.TypeCode.UInt64;

    uintNumber = new TS.TypeCode.UInt64(0xFFFFFFFF, 0xFFFFFFFF);

    TS.Utils.checkUInt64NumberParameter("UInt64", uintNumber, "checkUInt64NumberParameter");
    assert.ok(true, "Should pass for a call with a valid UInt64 number.");

    assert.throws(() => 
    {
      TS.Utils.checkUInt64NumberParameter("UInt64", 0, "checkUInt64NumberParameter");
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is not a UInt64 number.");

    assert.throws(() => 
    {
      TS.Utils.checkUInt64NumberParameter("UInt64", null, "checkUInt64NumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.checkUInt64NumberParameter("UInt64", undefined, "checkUInt64NumberParameter");
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
  });


  QUnit.test("compactArray", (assert) =>
  {
    let testArray: Array<any>;
    let resultArray: Array<any>;
    let lengthBefore: number;


    testArray = [1, 2, 3, , 5, 6, , 7, 8, , 9, , 11];
    resultArray = TS.Utils.compactArray(testArray);
    assert.equal(resultArray.length, 9, "Should return an array which has as much elements as the source array had assigned elements.");

    resultArray[resultArray.length - 1] = undefined;
    lengthBefore = resultArray.length;
    resultArray = TS.Utils.compactArray(resultArray);
    assert.notEqual(resultArray.length, lengthBefore, "Should return an array which has a different lenght.");
  });


  QUnit.test("createGUID", (assert) =>
  {
    let GUIDArray: Array<string>;
    let index: number;
    let found: number;

    GUIDArray = new Array<string>();

    for (index = 0; index < 1000; index++)
    {
      GUIDArray.push(TS.Utils.createGUID());
    }//END for

    assert.equal(GUIDArray.length, 1000, "Should create an array with 1000 GUIDs.");
    found = 0;

    for (index = 0; index < 1000; index++)
    {
      found += GUIDArray.filter((value) => { return value == GUIDArray[index]; }).length;
    }//END for

    assert.equal(found, 1000, "All elements in the array should be unique.");
  });


  QUnit.test("findAllCurrencies", (assert) =>
  {
    let resultArray: Array<TS.Utils.ICurrency>

    let ambiguousSymbols = new Array<string>("¥", "£", "$", "₩", "лв");
    let unambiguousSymbols = new Array<string>("₮", "₪", "Q", "Kč", "¢");
    let ambiguousCurrencyNames = new Array<string>("Dollar", "Pound", "Franc", "Rupee", "Dinar");
    let codes = new Array<string>("AED", "AOA", "BHD", "DJF", "EUR", "MNT");

    for (let currency of unambiguousSymbols)
    {
      resultArray = TS.Utils.findAllCurrencies(currency);
      assert.equal(resultArray.length, 1, "Should return a single currency for the current symbol search pattern.");
    }

    for (let currency of codes)
    {
      resultArray = TS.Utils.findAllCurrencies(currency);
      assert.equal(resultArray.length, 1, "Should return a single currency for the current code search pattern.");
    }

    for (let currency of ambiguousSymbols)
    {
      resultArray = TS.Utils.findAllCurrencies(currency);
      assert.ok(resultArray.length > 1, "Should return a multiple currency elements for the current code search pattern.");
    }

    for (let currency of ambiguousCurrencyNames)
    {
      resultArray = TS.Utils.findAllCurrencies(currency);
      assert.ok(resultArray.length > 1, "Should return a multiple currency elements for the current code search pattern.");
    }

    for (let currency of ["NOP", "abcdefg", "QWERTY", "%", "§", "--__--"])
    {
      resultArray = TS.Utils.findAllCurrencies(currency);
      assert.ok(resultArray.length == 0, "Should return an empty result array for the current code search pattern.");
    }

  });


  QUnit.test("findSingleCurrency", (assert) =>
  {
    let result: TS.Utils.ICurrency;

    let ambiguousSymbols = new Array<string>("¥", "£", "$", "₩", "лв");
    let unambiguousSymbols = new Array<string>("₮", "₪", "Q", "Kč", "¢");
    let codes = new Array<string>("AED", "AOA", "BHD", "DJF", "EUR", "MNT");

    for (let currency of unambiguousSymbols)
    {
      result = TS.Utils.findSingleCurrency(currency);
      assert.notEqual(result, null, "Should return a single currency for the current symbol search pattern.");
    }

    for (let currency of codes)
    {
      result = TS.Utils.findSingleCurrency(currency);
      assert.notEqual(result, null, "Should return a single currency for the current code search pattern.");
    }

    for (let currency of ambiguousSymbols)
    {
      assert.throws(() =>
      {
        result = TS.Utils.findSingleCurrency(currency);
      }, TS.AmbiguousResultException, "The call should fail with a \"TS.AmbiguousResultException\" for an ambiguous 'currency' argument.");
    }

  });


  QUnit.test("getValueFromEnum", (assert) => 
  {
    assert.equal(TS.Utils.getValueFromEnum("ONE", testEnum), 1, "Should return the expected enumeration value.");
    assert.equal(TS.Utils.getValueFromEnum(3, testEnum), "THREE", "Should return the expected enumeration value.");
    assert.equal(TS.Utils.getValueFromEnum("2", testEnum), undefined, "Should return undefined for an unknown 'key'.");
    assert.equal(TS.Utils.getValueFromEnum("FOUR", testEnum), undefined, "Should return undefined for an unknown 'key'.");
    assert.equal(TS.Utils.getValueFromEnum(5, testEnum), undefined, "Should return undefined for an unknown 'key'.");
    assert.equal(TS.Utils.getValueFromEnum(null, testEnum), undefined, "Should return undefined for a null 'key' value.");
    assert.equal(TS.Utils.getValueFromEnum(undefined, testEnum), undefined, "Should return undefined for an andefined 'key' value.");
    assert.equal(TS.Utils.getValueFromEnum("ONE", null), undefined, "Should return undefined for a null 'enumObj' value.");
    assert.equal(TS.Utils.getValueFromEnum(1, undefined), undefined, "Should return undefined for an undefined 'enumObj' value.");
  });


  QUnit.test("HexStringToUByteArray", (assert) =>
  {
    assert.deepEqual(TS.Utils.HexStringToUByteArray("00"), [0], "Should return a one element array with the value 0 for a '00' hex string.");
    assert.deepEqual(TS.Utils.HexStringToUByteArray("FF"), [255], "Should return a one element array with the value 255 for a 'FF' hex string.");
    assert.deepEqual(TS.Utils.HexStringToUByteArray("00FF00FF"), [0, 255, 0, 255], "Should return a 4 element array with the values 0,255,0,255 for a '00FF00FF' hex string.");

    assert.throws(() => 
    {
      TS.Utils.HexStringToUByteArray("00FF00FF0");
    }, TS.InvalidFormatException, "The call should fail with a \"TS.InvalidFormatException\" for a hex string with an odd number of chracters.");

    assert.throws(() => 
    {
      TS.Utils.HexStringToUByteArray(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null hex string argument value.");

    assert.throws(() => 
    {
      TS.Utils.HexStringToUByteArray(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined hex string argument value.");

    assert.throws(() => 
    {
      TS.Utils.HexStringToUByteArray("");
    }, TS.ArgumentNullUndefOrWhiteSpaceException, "The call should fail with a \"TS.ArgumentNullUndefOrWhiteSpaceException\" for an empty hex string argument value.");
  });


  QUnit.test("nextIndexOfReverse", (assert) =>
  {
    let result: number;
    let sourceString: string = "abcabcdabcdeabcdefabcdefgabcdefgh";
    let searchString: string = "abc";

    result = TS.Utils.nextIndexOfReverse(sourceString, searchString, 33);
    assert.ok(result == 25, "Should return the expected position as search result.");

    result = TS.Utils.nextIndexOfReverse(sourceString, searchString, 24);
    assert.ok(result == 18, "Should return the expected position as search result.");

    result = TS.Utils.nextIndexOfReverse(sourceString, searchString, 17);
    assert.ok(result == 12, "Should return the expected position as search result.");

    result = TS.Utils.nextIndexOfReverse(sourceString, searchString, 11);
    assert.ok(result == 7, "Should return the expected position as search result.");

    result = TS.Utils.nextIndexOfReverse(null, searchString, 1);
    assert.ok(result == -1, "Should return -1 for a call with a null source string.");

    result = TS.Utils.nextIndexOfReverse(undefined, searchString, 1)
    assert.ok(result == -1, "Should return -1 for a call with an undefined source string.");

    result = TS.Utils.nextIndexOfReverse(sourceString, searchString, -1)
    assert.ok(result == -1, "Should return -1 for a call with an negative start index.");

    result = TS.Utils.nextIndexOfReverse(sourceString, null, 1)
    assert.ok(result == -1, "Should return -1 for a call with a null search string.");

    result = TS.Utils.nextIndexOfReverse(sourceString, undefined, 1)
    assert.ok(result == -1, "Should return -1 for a call with an undefined search string.");

  });


  QUnit.test("nodeTypeToString", (assert) => 
  {
    assert.equal("ELEMENT_NODE", TS.Utils.nodeTypeToString(1), "Should return the expected string result.");
    assert.equal("undefined", TS.Utils.nodeTypeToString(0), "Should return the expected string result.");
    assert.equal("undefined", TS.Utils.nodeTypeToString(13), "Should return the expected string result.");
  });


  QUnit.test("normalizePath", (assert) =>
  {
    let testPath: string;
    let resultPath: string;
    let controlPath: string;

    testPath = "C:\\\\Windows\\Programs\\.\\Test Programs\\Data\\..\\Search\\No more\\.\\Result\\..\\to Show";
    controlPath = "C:/Windows/Programs/Test Programs/Search/No more/to Show";
    resultPath = TS.Utils.normalizePath(testPath);
    assert.equal(resultPath.indexOf("\\"), -1, "Should return a path with no more backslashes.");
    assert.equal(resultPath.indexOf("//"), -1, "Should return a path with no more double slashes.");
    assert.equal(resultPath.indexOf("/./"), -1, "Should return a path with no more '/./'.");
    assert.equal(resultPath.indexOf("/../"), -1, "Should return a path with no more '/../'.");
    assert.ok(!resultPath.endsWith("/"), "Should return a path with no trailing slash.");
    assert.deepEqual(resultPath, controlPath, "Should return a path which matches with the control path.");
    assert.deepEqual(TS.Utils.normalizePath("A:\\\\..\\Dir1\\Dir2"), "A:/Dir1/Dir2", "An 'up navigation' following a drive letter should be ignored.");
    assert.deepEqual(TS.Utils.normalizePath("/../Dir1/Dir2"), "/Dir1/Dir2", "An 'up navigation' following the root should be ignored.");

    resultPath = TS.Utils.normalizePath(null);
    assert.equal(resultPath.length, 0, "Should return an empty path when called with a null value.");

    resultPath = TS.Utils.normalizePath(undefined);
    assert.equal(resultPath.length, 0, "Should return an empty path when called with an undefined value.");
  });


  QUnit.test("padLeft", (assert) =>
  {
    let sourceString: string;
    let destinyString: string;

    sourceString = "OneTwo";
    destinyString = TS.Utils.padLeft(sourceString, "12", 40);
    assert.equal(destinyString.length, 40, "Should return a string with the expected length");

    destinyString = TS.Utils.padLeft(sourceString, null, 40);
    assert.equal(destinyString, sourceString, "Should return a copy of the source string if argument fillChar is invalid.");

    destinyString = TS.Utils.padLeft(sourceString, "&", -10);
    assert.equal(destinyString, sourceString, "Should return a copy of the source string if argument length is invalid.");

    destinyString = TS.Utils.padLeft(null, "12345", 10);
    assert.equal(destinyString, "1234512345", "Should return a string consisting only of concatenated fillChar values if calle with a null value for the source parameter.");

    destinyString = TS.Utils.padLeft(undefined, "12345", 10);
    assert.equal(destinyString, "1234512345", "Should return a string consisting only of concatenated fillChar values if calle with an undefined value for the source parameter.");
  });


  QUnit.test("removeUTF8BOM", (assert) => 
  {
    let testString = "ï»¿ Here is normal text";
    assert.equal(TS.Utils.removeUTF8BOM(testString), " Here is normal text", "Should returns a string without the UTF-8 BOM.");

  });


  QUnit.test("UByteToHexString", (assert) => 
  {
    let testVectors: Array<{ str: string, val: number }>;
    let index: number;

    testVectors = [{ str: "aa", val: 170 }, { str: "0f", val: 15 }, { str: "55", val: 85 }, { str: "00", val: 0 }, { str: "01", val: 1 }];

    for (index = 0; index < testVectors.length; index++)
    {
      assert.equal(TS.Utils.UByteToHexString(testVectors[index].val), testVectors[index].str, "Should return the expected hex string.");
    }

    assert.throws(() => 
    {
      TS.Utils.UByteToHexString(-1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");

    assert.throws(() => 
    {
      TS.Utils.UByteToHexString(2.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which isn't an integer number.");

    assert.throws(() =>
    {
      TS.Utils.UByteToHexString(300);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value outside the byte number range.");

    assert.throws(() => 
    {
      TS.Utils.UByteToHexString(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.UByteToHexString(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.");

  });


  QUnit.test("UInt32SwapSignificantByteOrder", (assert) => 
  {
    assert.equal(TS.Utils.UInt32SwapSignificantByteOrder(0x00000001), 0x1000000, "Should return the expected value.");
    assert.equal(TS.Utils.UInt32SwapSignificantByteOrder(0xFFFF0000), 0x0000FFFF, "Should return the expected value.");
    assert.equal(TS.Utils.UInt32SwapSignificantByteOrder(0x11FF22EE), 0xEE22FF11, "Should return the expected value.");

    assert.throws(() => 
    {
      TS.Utils.UInt32SwapSignificantByteOrder(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is null.");

    assert.throws(() => 
    {
      TS.Utils.UInt32SwapSignificantByteOrder(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a parameter value which is undefined.");

    assert.throws(() => 
    {
      TS.Utils.UInt32SwapSignificantByteOrder(0xFFFFFFFF + 1);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a parameter value which is not a valid UInt32.");

    assert.throws(() => 
    {
      TS.Utils.UInt32SwapSignificantByteOrder(-1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is not a valid UInt32.");

  });


  QUnit.test("UInt32To4ByteArray", (assert) => 
  {
    let testVectors: Array<{ ByteArray: Array<number>, val: number }>;
    let index: number;

    testVectors = [{ ByteArray: [0, 0, 0, 1], val: 1 }, { ByteArray: [0, 0, 1, 1], val: 257 }, { ByteArray: [0, 1, 1, 1], val: 65793 }, { ByteArray: [1, 1, 1, 1], val: 16843009 }];

    for (index = 0; index < testVectors.length; index++)
    {
      assert.deepEqual(TS.Utils.UInt32To4ByteArray(testVectors[index].val), testVectors[index].ByteArray, "Should resturn the expected byte array.");
    }

    assert.throws(() => 
    {
      TS.Utils.UInt32To4ByteArray(-1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which is a negative number.");

    assert.throws(() => 
    {
      TS.Utils.UInt32To4ByteArray(2.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.InvalidTypeException\" for a parameter value which isn't an integer number.");

    assert.throws(() =>
    {
      TS.Utils.UInt32To4ByteArray(4294967296);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentOutOfRangeException\" for a parameter value which exceeds the number range of a UInt32.");

    assert.throws(() => 
    {
      TS.Utils.UInt32To4ByteArray(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.UInt32To4ByteArray(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentNullOrUndefinedException\" for an undefined parameter value.");
  });


  QUnit.test("UInt32ToHexString", (assert) => 
  {
    let testVectors: Array<{ str: string, val: number }>;
    let index: number;

    testVectors = [{ str: "ffffffff", val: 4294967295 }, { str: "00ffffff", val: 16777215 }, { str: "0000ffff", val: 65535 }, { str: "000000ff", val: 255 }];

    for (index = 0; index < testVectors.length; index++)
    {
      assert.equal(TS.Utils.UInt32ToHexString(testVectors[index].val), testVectors[index].str, "Should return the expected hex string.");
    }

    assert.throws(() => 
    {
      TS.Utils.UInt32ToHexString(-1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");

    assert.throws(() => 
    {
      TS.Utils.UInt32ToHexString(2.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");

    assert.throws(() => 
    {
      TS.Utils.UInt32ToHexString(4294967296);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value outside the byte number range.");

    assert.throws(() => 
    {
      TS.Utils.UInt32ToHexString(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.UByteToHexString(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.");
  });


  QUnit.test("UIntToByteArray", (assert) => 
  {
    let testVectors: Array<{ ByteArray: Array<number>, val: number }>;
    let index: number;

    testVectors = [{ ByteArray: [1], val: 1 }, { ByteArray: [1, 1], val: 257 }, { ByteArray: [1, 1, 1], val: 65793 }, { ByteArray: [1, 1, 1, 1], val: 16843009 }, { ByteArray: [1, 1, 1, 1, 1], val: 4311810305 }, { ByteArray: [1, 1, 1, 1, 1, 1], val: 1103823438081 }, { ByteArray: [0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff], val: 9007199254740991 }];

    for (index = 0; index < testVectors.length; index++)
    {
      assert.deepEqual(TS.Utils.UIntToByteArray(testVectors[index].val), testVectors[index].ByteArray, "Should resturn the expected byte array.");
    }

    assert.throws(() => 
    {
      TS.Utils.UIntToByteArray(-1);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");

    assert.throws(() => 
    {
      TS.Utils.UIntToByteArray(2.5);
    }, TS.InvalidTypeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value which is a negative number.");

    assert.throws(() => 
    {
      TS.Utils.UInt32ToHexString(4294967296);
    }, TS.ArgumentOutOfRangeException, "The call should fail with a \"TS.ArgumentException\" for a parameter value outside the byte number range.");

    assert.throws(() => 
    {
      TS.Utils.UIntToByteArray(null);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for a null parameter value.");

    assert.throws(() => 
    {
      TS.Utils.UIntToByteArray(undefined);
    }, TS.ArgumentNullOrUndefinedException, "The call should fail with a \"TS.ArgumentException\" for an undefined parameter value.");
  });

}//END module