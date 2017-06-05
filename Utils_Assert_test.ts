/// <reference path="_references.ts" />

module TS_Utils_Assert_test
{

  class Customer01 extends DATA.Customer
  {
    private internalHairColor: string;

    get hairColor(): string
    {
      return this.internalHairColor;
    }

    constructor(hairColor: string, Address: string, City: string, CompanyName: string, ContactName: string, ContactTitle: string, Country: string, CustomerID: string, Fax: string, Phone: string, PostalCode: string, Region: string);
    constructor(hairColor: string);
    constructor()
    {
      if (arguments.length > 1)
      {
        super(arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
      }
      else
      {
        super();
      }

      if (arguments.length > 0)
      {
        this.internalHairColor = arguments[0];
      }
      else
      {
        this.internalHairColor = "unknown";
      }
    }
  }


  QUnit.module("TS.Utils.Assert",
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


  QUnit.test("isBinaryString", (assert) => 
  {
    assert.ok(TS.Utils.Assert.isBinaryString("0110101111000001"), "Should return true for a valid source value.");
    assert.ok(TS.Utils.Assert.isBinaryString("1110101111000000"), "Should return true for a valid source value.");
    assert.ok(TS.Utils.Assert.isBinaryString("0000000000000000"), "Should return true for a valid source value.");
    assert.ok(TS.Utils.Assert.isBinaryString("1111111111111111"), "Should return true for a valid source value.");
    assert.ok(TS.Utils.Assert.isBinaryString("1"), "Should return true for a valid source value.");
    assert.ok(TS.Utils.Assert.isBinaryString("0"), "Should return true for a valid source value.");

    assert.ok(!TS.Utils.Assert.isBinaryString("asdf"), "Should return false for an invalid source value.");
    assert.ok(!TS.Utils.Assert.isBinaryString("1111 11111111111"), "Should return flase frr an invalid source value.");
    assert.ok(!TS.Utils.Assert.isBinaryString("1111I1111111111"), "Should return false for an invalid source value.");
    assert.ok(!TS.Utils.Assert.isBinaryString("0000O0000000000"), "Should return false for an invalid source value.");
    assert.ok(!TS.Utils.Assert.isBinaryString(""), "Should return false for an empty source value.");
    assert.ok(!TS.Utils.Assert.isBinaryString(null), "Should return false for a null source value.");
    assert.ok(!TS.Utils.Assert.isBinaryString(undefined), "Should return false for an undefined source value.");
  });


  QUnit.test("isByteArray", (assert) => 
  {
    let testArray: Array<number> = [92, 1, -2, 3, 4, -5, 6, -7, 8, 9, -10, 11, 12, -13, 14, 15, -16, 17, 18, 19, -20, 21, 22, 23, 24, -25, 26, 27, 28, 29, -30, -31, 32, 33, 34, 35, -36, 37, 38, 39, 40, 41, -42, 43, 44, 45, 46, 47, -48, 49, 50, 51, -52, 53, 54, 55, -56, 57, 58, 59, -60, 61, 62, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, -111, 44, 46, 12, 75, -56, 43, 54, -90, 118];
    let testUint8Array: Uint8Array = new Uint8Array([92, 1, -2, 3, 4, -5, 6, -7, 8, 9, -10, 11, 12, -13, 14, 15, -16, 17, 18, 19, -20, 21, 22, 23, 24, -25, 26, 27, 28, 29, -30, -31, 32, 33, 34, 35, -36, 37, 38, 39, 40, 41, -42, 43, 44, 45, 46, 47, -48, 49, 50, 51, -52, 53, 54, 55, -56, 57, 58, 59, -60, 61, 62, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 70, -111, 44, 46, 12, 75, -56, 43, 54, -90, 118]);

    assert.ok(TS.Utils.Assert.isByteArray([0]), "Should pass for a one element array with value 0.");
    assert.ok(TS.Utils.Assert.isByteArray([127]), "Should pass for a one element array with value 127.");
    assert.ok(!TS.Utils.Assert.isByteArray([128]), "Should fail for a one element array with a value > 127.");
    assert.ok(TS.Utils.Assert.isByteArray([-127]), "Should pass for a one element array with value -127.");
    assert.ok(!TS.Utils.Assert.isByteArray([-128]), "Should fail for a one element array with a value < -127.");
    assert.ok(TS.Utils.Assert.isByteArray(testArray), "Should pass for a test array with random byte values.");
    assert.ok(TS.Utils.Assert.isByteArray(testArray), "Should pass for a test Uint8Array with random byte values.");
  });


  QUnit.test("isCanonicalGUIDString", (assert) => 
  {
    assert.ok(TS.Utils.Assert.isCanonicalGUIDString("00000000-0000-0000-0000-000000000000"), "Should pass for the zero GUID string.");
    assert.ok(TS.Utils.Assert.isCanonicalGUIDString("fe8fb169-5af7-4ade-881c-19b1914b57be"), "Should pass for a random GUID string.");
    assert.ok(TS.Utils.Assert.isCanonicalGUIDString("634acb60-1ea6-11e7-8000-97994bb29655"), "Should pass for time based GUID string.");
    assert.ok(!TS.Utils.Assert.isCanonicalGUIDString("55c2e59-01ea6-11e7-8000-e74c859675e5"), "Should fail for GUID string with a wrong format.");
    assert.ok(!TS.Utils.Assert.isCanonicalGUIDString("55c2e590-1ea6-11e7-8000-e74c859675e50"), "Should fail for GUID string with a wrong length.");
    assert.ok(!TS.Utils.Assert.isCanonicalGUIDString(""), "Should fail for an empty GUID string.");
    assert.ok(!TS.Utils.Assert.isCanonicalGUIDString(null), "Should fail for a null GUID string.");
    assert.ok(!TS.Utils.Assert.isCanonicalGUIDString(undefined), "Should fail for a undefined GUID string.");

  });


  QUnit.test("isDate", (assert) => 
  {
    assert.ok(TS.Utils.Assert.isDate(new Date()), "Should return true for a test on a new created date.");
    assert.ok(!TS.Utils.Assert.isDate(Date.now), "Should return true for a test on a 'Date.now' argument.");
    assert.ok(!TS.Utils.Assert.isDate("2016-01-01T00:00:00"), "Should return false for a test on a date string.")
    assert.ok(!TS.Utils.Assert.isDate({}), "Should return false for a test on an empty object.")
    assert.ok(!TS.Utils.Assert.isDate(null), "Should return false for a test on a null argument.")
    assert.ok(!TS.Utils.Assert.isDate(undefined), "Should return false for a test on an undefined argument.")
  });


  QUnit.test("isDateString", (assert) => 
  {
    assert.ok(TS.Utils.Assert.isDateString("2016-01-01T00:00:00"), "Should return true for a valid ISO date string.");
    assert.ok(TS.Utils.Assert.isDateString("Mon Nov 28 2016"), "Should return true for a valid date string.");
    assert.ok(TS.Utils.Assert.isDateString("Mon, 28 Nov 2016 17:02:37 GMT"), "Should return true for a valid GMT date string.");
    assert.ok(TS.Utils.Assert.isDateString("11/28/2016"), "Should return true for a valid locale date string.");
    assert.ok(!TS.Utils.Assert.isDateString("13/13/2016"), "Should return false for an invalid locale date string.");
    assert.ok(!TS.Utils.Assert.isDateString("Mon, 28 Nov 2016 25:02:37 GMT"), "Should return false for an invalid GMT date string.");
    assert.ok(!TS.Utils.Assert.isDateString("2016-00-01T00:00:00"), "Should return false for an invalid ISO date string.");
    assert.ok(!TS.Utils.Assert.isDateString("no date"), "Should return false for a normal text string.")
    assert.ok(!TS.Utils.Assert.isDateString({}), "Should return false for an empty object argument.")
    assert.ok(!TS.Utils.Assert.isDateString(null), "Should return false for a null argument.")
    assert.ok(!TS.Utils.Assert.isDateString(undefined), "Should return false for an undefined argument.")
  });


  QUnit.test("isDenseArray", (assert) => 
  {
    assert.ok(TS.Utils.Assert.isDenseArray([1, 2, 3]), "Should return true for a test on a dense array.");
    assert.ok(TS.Utils.Assert.isDenseArray([]), "Should return true for a test on an empty array.");
    assert.ok(!TS.Utils.Assert.isDenseArray([1, 2, 3, , 5, , 7]), "Should return false for a test on a sparse array.");
    assert.ok(!TS.Utils.Assert.isDenseArray(null), "Should return false for a test on a null argument.");
    assert.ok(!TS.Utils.Assert.isDenseArray(undefined), "Should return false for a test on an undefined argument.");
    assert.ok(!TS.Utils.Assert.isDenseArray({}), "Should return false for a test on an argument which isn't an array.");
  });


  QUnit.test("isEmptyArray", (assert) => 
  {
    assert.ok(TS.Utils.Assert.isEmptyArray([]), "Should return true for a test on an empty array.");
    assert.ok(!TS.Utils.Assert.isEmptyArray([0]), "Should return false for a test on an one element array.");
    assert.ok(!TS.Utils.Assert.isEmptyArray(""), "Should return false for a test on an empty string.");
    assert.ok(!TS.Utils.Assert.isEmptyArray(null), "Should return false for a test on null.");
    assert.ok(!TS.Utils.Assert.isEmptyArray(undefined), "Should return false for a test on undefined.");
  });


  QUnit.test("isGUID", (assert) => 
  {
    let zeroGUID: TS.TypeCode.GUID;
    let simpleGUID: TS.TypeCode.GUID;
    let randomGUID: TS.TypeCode.RandomGUID;
    let timeBaseGUID: TS.TypeCode.TimeBasedGUID;

    zeroGUID = new TS.TypeCode.GUID();
    simpleGUID = new TS.TypeCode.GUID("12345678-1234-1234-1234-123456789012");
    randomGUID = new TS.TypeCode.RandomGUID();
    timeBaseGUID = new TS.TypeCode.TimeBasedGUID();

    assert.ok(TS.Utils.Assert.isGUID(zeroGUID), "Should pass for a zero GUID.");
    assert.ok(TS.Utils.Assert.isGUID(simpleGUID), "Should pass for a simple GUID.");
    assert.ok(TS.Utils.Assert.isGUID(randomGUID), "Should pass for a random GUID.");
    assert.ok(TS.Utils.Assert.isGUID(timeBaseGUID), "Should pass for a time base GUID.");
    assert.ok(!TS.Utils.Assert.isGUID({}), "Should fail for a call with an object which isn't a GUID.");
    assert.ok(!TS.Utils.Assert.isGUID(null), "Should fail for a call with a null argument.");
    assert.ok(!TS.Utils.Assert.isGUID(undefined), "Should fail for a call with an undefined argument.");
  });


  QUnit.test("isMACAddressString", (assert) => 
  {
    assert.ok(TS.Utils.Assert.isMACAddressString("01:23:45:67:89:AB"), "Should pass for a valid MAC address string.");
    assert.ok(TS.Utils.Assert.isMACAddressString("01-23-45-67-89-ab"), "Should pass for a valid MAC address string.");
    assert.ok(!TS.Utils.Assert.isMACAddressString("01:23:45:67:89:AB:CD"), "Should fail for a MAC address string which has the wrong length.");
    assert.ok(!TS.Utils.Assert.isMACAddressString("01-23-45-67-89"), "Should fail for a MAC address string which has the wrong length.");
    assert.ok(!TS.Utils.Assert.isMACAddressString("01:23:45:6G:89:AB"), "Should fail for a MAC address string which has invalid characters.");
    assert.ok(!TS.Utils.Assert.isMACAddressString({}),"Should fail for a call with an argument that isn't a string.");
    assert.ok(!TS.Utils.Assert.isMACAddressString(null), "Should fail for a null MAC address string.");
    assert.ok(!TS.Utils.Assert.isMACAddressString(undefined), "Should fail for an undefined MAC address string.");
  });


  QUnit.test("isRandomGUID", (assert) => 
  {
    let zeroGUID: TS.TypeCode.GUID;
    let simpleGUID: TS.TypeCode.GUID;
    let randomGUID: TS.TypeCode.RandomGUID;
    let timeBaseGUID: TS.TypeCode.TimeBasedGUID;

    zeroGUID = new TS.TypeCode.GUID();
    simpleGUID = new TS.TypeCode.GUID("12345678-1234-1234-1234-123456789012");
    randomGUID = new TS.TypeCode.RandomGUID();
    timeBaseGUID = new TS.TypeCode.TimeBasedGUID();

    assert.ok(TS.Utils.Assert.isRandomGUID(randomGUID), "Should pass for a random GUID.");
    assert.ok(!TS.Utils.Assert.isRandomGUID(timeBaseGUID), "Should fail for a time base GUID.");
    assert.ok(!TS.Utils.Assert.isRandomGUID(simpleGUID), "Should fail for a simple GUID.");
    assert.ok(!TS.Utils.Assert.isRandomGUID(zeroGUID), "Should fail for a zero GUID.");
    assert.ok(!TS.Utils.Assert.isRandomGUID({}), "Should fail for a call with an object which isn't a GUID.");
    assert.ok(!TS.Utils.Assert.isRandomGUID(null), "Should fail for a call with a null argument.");
    assert.ok(!TS.Utils.Assert.isRandomGUID(undefined), "Should fail for a call with an undefined argument.");
  });


  QUnit.test("isTimeBasedGUID", (assert) => 
  {
    let zeroGUID: TS.TypeCode.GUID;
    let simpleGUID: TS.TypeCode.GUID;
    let randomGUID: TS.TypeCode.RandomGUID;
    let timeBaseGUID: TS.TypeCode.TimeBasedGUID;

    zeroGUID = new TS.TypeCode.GUID();
    simpleGUID = new TS.TypeCode.GUID("12345678-1234-1234-1234-123456789012");
    randomGUID = new TS.TypeCode.RandomGUID();
    timeBaseGUID = new TS.TypeCode.TimeBasedGUID();

    assert.ok(TS.Utils.Assert.isTimeBasedGUID(timeBaseGUID), "Should pass for a time base GUID.");
    assert.ok(!TS.Utils.Assert.isTimeBasedGUID(randomGUID), "Should fail for a random GUID.");
    assert.ok(!TS.Utils.Assert.isTimeBasedGUID(simpleGUID), "Should fail for a simple GUID.");
    assert.ok(!TS.Utils.Assert.isTimeBasedGUID(zeroGUID), "Should fail for a zero GUID.");
    assert.ok(!TS.Utils.Assert.isTimeBasedGUID({}), "Should fail for a call with an object which isn't a GUID.");
    assert.ok(!TS.Utils.Assert.isTimeBasedGUID(null), "Should fail for a call with a null argument.");
    assert.ok(!TS.Utils.Assert.isTimeBasedGUID(undefined), "Should fail for a call with an undefined argument.");
  });


  QUnit.test("isInstanceOf", (assert) => 
  {
    let testObj0: any;
    let testObj1: any;
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
    assert.ok(TS.Utils.Assert.isInstanceOf(testObj0, DATA.Customer), "Should return true for a valid object / type combination.");

    testObj1 = new Customer01("brown","Main Street 20", "Vienna", "Making Money", "Call me", "", "Austria", "42", "1234", "555-555", "12345", "NW");
    assert.ok(TS.Utils.Assert.isInstanceOf(testObj1, DATA.Customer), "Should return true for an object comparison with its base type.");
    assert.ok(TS.Utils.Assert.isInstanceOf(testObj1, Customer01), "Should return true for an object comparison with its type.");

    assert.ok(!TS.Utils.Assert.isInstanceOf(testObj0, Customer01), "Should return false for an object comparison with a derived class.");
    assert.ok(!TS.Utils.Assert.isInstanceOf(testLiteralObj, DATA.Customer), "Should return false for a literal object compare to a class.");
    assert.ok(!TS.Utils.Assert.isInstanceOf(testObj0, testLiteralObj), "Should return false for an object comparison with a literal object.");
    assert.ok(!TS.Utils.Assert.isInstanceOf(testObj0, testObj0), "Should return false for an object compared to itself.");
  });


  QUnit.test("isPlainObject", (assert) =>
  {
    assert.equal(TS.Utils.Assert.isPlainObject({}), true, "Should return true for an empty literal object");
    assert.equal(TS.Utils.Assert.isPlainObject(new Object(null)), true, "Should return true for a new created Object with argument 'null'.");
    assert.equal(TS.Utils.Assert.isPlainObject({ "one": 1, "two": 2 }), true, "Should return true for a plain none empty object.");
    assert.equal(TS.Utils.Assert.isPlainObject(new DATA.Car("SUBURA", 200, false, 2020, 50000)), false, "Should return false for a complex object.");
    assert.equal(TS.Utils.Assert.isPlainObject([1, 2, 3]), false, "Should return false when called with an array argument.");
    assert.equal(TS.Utils.Assert.isPlainObject(null), false, "Should return false when called with a null argument.");
    assert.equal(TS.Utils.Assert.isPlainObject(undefined), false, "Should return false when called with an undefined argument.");
  });


  QUnit.test("isPrimitiveType", (assert) =>
  {
    assert.equal(TS.Utils.Assert.isPrimitiveType(true), true, "Should return true for a boolean value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(null), true, "Should return true for a null value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(undefined), true, "Should return true for an undefined value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(12), true, "Should return true for an integer number value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(1.2), true, "Should return true for a floating point number value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(Symbol()), true, "Should return true for a symbol value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(new Boolean(false)), false, "Should return false for a boolean object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(new Number(12)), false, "Should return false for a number object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType(new String("two")), false, "Should return false for a string object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType({}), false, "Should return false for a literal object value.");
    assert.equal(TS.Utils.Assert.isPrimitiveType([1, 2, 3]), false, "Should return false for an array value.");
  });


  QUnit.test("isUnsignedByteArray", (assert) => 
  {
    let testUInt8Array: Uint8Array;
    let testNumberArray: Array<number>;

    testUInt8Array = new Uint8Array([0x00, 0x01, 0x0f, 0xff, 0xf0]);
    testNumberArray = new Array<number>(...[0x00, 0x01, 0x0f, 0xff, 0xf0]);

    assert.ok(TS.Utils.Assert.isUnsignedByteArray(testUInt8Array), "Should pass for a valid Uint8Array array.");
    assert.ok(TS.Utils.Assert.isUnsignedByteArray(testNumberArray), "Should pass for a valid Array<number> array.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteArray([0, 0xb0101, 0xFF, , 12, 244]), "Should fail for a sparse array.")
    assert.ok(!TS.Utils.Assert.isUnsignedByteArray([0, 1, 256, 12, 0xff ]), "Should fail for a one element array with an invalid element outside the byte number range.");
    assert.ok(!TS.Utils.Assert.isUnsignedByteArray([ 0xff, 0b1100, -1, 244, 8]), "Should fail for a one element array with an invalid negative element.");

  });


  QUnit.test("isUnsignedByteValue", (assert) => 
  {
    let testArray: Uint8Array;
    testArray = new Uint8Array([0x00, 0x01, 0x0f, 0xff, 0xf0]);

    testArray.forEach((value, index, arr) => 
    {
      assert.ok(TS.Utils.Assert.isUnsignedByteValue(value),"Should pass for all valid unsigned byte values.")
    });

    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(-1), "Should fail for a signed byte value.")
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(600), "Should fail for a value outside the byte number range.")
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(null), "Should fail for a null value.")
    assert.ok(!TS.Utils.Assert.isUnsignedByteValue(undefined), "Should fail for an undefined value.")

  });

}