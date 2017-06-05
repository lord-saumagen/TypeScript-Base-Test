/// <reference path="_references.ts" />
namespace TS_TypeCode_GUID_test
{

  QUnit.module("TS.TypeCode.GUID",
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
    }
  });


  QUnit.test("TS.TypeCode.TimeFields constructor", (assert) => 
  {
    let timeFields: TS.TypeCode.TimeFields;
    let date: Date;
    let UTCMilliSecons0: number;
    let UTCMilliSecons1: number;
    let rfc4122ClockOffset: number = Math.abs(new Date("1582-10-25T00:00:00.000Z").valueOf());


    UTCMilliSecons0 = Date.now() + rfc4122ClockOffset;

    timeFields = new TS.TypeCode.TimeFields();
    assert.ok(TS.Utils.Assert.isObject(timeFields), "Should return an object.");

    UTCMilliSecons1 = timeFields.UTCMilliSeconds;
    assert.ok(UTCMilliSecons1 < (UTCMilliSecons0 + 5), "The resulting 'timeFields' should have an UTCMilliSeconds count not far from the control value.");

    timeFields = new TS.TypeCode.TimeFields("bc1c8a20-1ecf-11e7-8000-7d13fe49fa3a");
    UTCMilliSecons0 + timeFields.UTCMilliSeconds + timeFields.GUIDCounter;

    timeFields = new TS.TypeCode.TimeFields(timeFields);
    UTCMilliSecons1 = timeFields.UTCMilliSeconds + timeFields.GUIDCounter;

    assert.ok((UTCMilliSecons1 - UTCMilliSecons0) > 0, "The resulting 'timeFields' should not have the same values.");

  });


  QUnit.test("TS.TypeCode.GUID constructor", (assert) =>
  {
    let GUID: TS.TypeCode.GUID;

    GUID = new TS.TypeCode.GUID();

    assert.ok(TS.Utils.Assert.isObject(GUID), "Should return an object.");
    assert.ok(GUID instanceof TS.TypeCode.GUID, "The returned object should be an instance of TS.TypeCode.GUID.");
    assert.equal(GUID.canonicalString, "00000000-0000-0000-0000-000000000000", "The returned object should have a valid zero canonical string representation when constructed with the default constructor.");
    assert.equal(GUID.version, TS.TypeCode.GUIDVersionEnum.UNKNOWN, "The returned GUID should have the expected version number.");
    assert.equal(GUID.variant, TS.TypeCode.GUIDVariantEnum.RESERVED_NCS, "The returned GUID should have a 'RESERVED_NCS' variant number.");

    GUID = new TS.TypeCode.GUID("8d6457bb-101a-4fcb-a288-6e6335f1a445");
    assert.ok(TS.Utils.Assert.isObject(GUID), "Should return an object.");
    assert.ok(GUID instanceof TS.TypeCode.GUID, "The returned object should be an instance of TS.TypeCode.GUID.");
    assert.equal(GUID.version, TS.TypeCode.GUIDVersionEnum.RANDOM, "The returned GUID should have the expected version number.");
    assert.equal(GUID.variant, TS.TypeCode.GUIDVariantEnum.RFC4122, "The returned GUID should have a 'RFC4122' variant number.");



    assert.throws(() =>
    {
      GUID = new TS.TypeCode.GUID("8d6457bb-101a-4fcb-a288-6e6335f1a4456");
    }, TS.InvalidFormatException, "The constructor should fail with a \"TS.InvalidFormatException\" exception when called with GUID string that is to long.");

    assert.throws(() =>
    {
      GUID = new TS.TypeCode.GUID("8d6457bb-101a-4fc-ba288-6e6335f1a445");
    }, TS.InvalidFormatException, "The constructor should fail with a \"TS.InvalidFormatException\" exception when called with GUID string that has an invalid format.");

    assert.throws(() =>
    {
      GUID = new TS.TypeCode.GUID(null);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null argument.");

  });


  QUnit.test("TS.TypeCode.RandomGUID constructor", (assert) =>
  {
    let randomGUID: TS.TypeCode.RandomGUID;

    randomGUID = new TS.TypeCode.RandomGUID();

    assert.ok(TS.Utils.Assert.isObject(randomGUID), "Should return an object.");
    assert.ok(randomGUID instanceof TS.TypeCode.RandomGUID, "The returned object should be an instance of TS.TypeCode.RandomGUID.");
    assert.equal(randomGUID.version, TS.TypeCode.GUIDVersionEnum.RANDOM, "The returned GUID should have the expected version number.");
    assert.equal(randomGUID.variant, TS.TypeCode.GUIDVariantEnum.RFC4122, "The returned GUID should have the expected variant number.");
  });


  QUnit.test("TS.TypeCode.TimeBasedGUID constructor", (assert) => 
  {
    let timeBasedGUID: TS.TypeCode.TimeBasedGUID;
    let futureTimeBasedGUID: TS.TypeCode.TimeBasedGUID;
    let timeFields: TS.TypeCode.TimeFields;
    let currentMSCount: number;
    let GUIDCount: number;
    let timeBasedGUIDArray: Array<TS.TypeCode.TimeBasedGUID>;

    currentMSCount = Date.now();

    timeBasedGUID = new TS.TypeCode.TimeBasedGUID();


    assert.ok(TS.Utils.Assert.isObject(timeBasedGUID), "Should return an object.");
    assert.ok(timeBasedGUID instanceof TS.TypeCode.TimeBasedGUID, "The returned object should be an instance of TS.TypeCode.timeBasedGUID.");
    assert.equal(timeBasedGUID.version, TS.TypeCode.GUIDVersionEnum.TIME_BASED, "The returned GUID should have the expected version number.");
    assert.equal(timeBasedGUID.variant, TS.TypeCode.GUIDVariantEnum.RFC4122, "The returned GUID should have the expected variant number.");
    assert.equal(timeBasedGUID.MACAddress.length, 17, "The returned MAC address string should have the required length.");
    assert.ok(timeBasedGUID.timeInMillisecond - TS.TypeCode.TimeFields.rfc4122ClockOffset <= currentMSCount + 5, "The returned time stamp should be in an accepted range.");
    assert.equal(timeBasedGUID.clockSequence, 0, "The returned clock sequence should be 0.");
    assert.ok(timeBasedGUID.isRandomMACAddress, "Should return true for a random MAC address.");

    //
    // The canonical GUID string 'bc1c8a20-1ecf-12e7-8000-7d13fe49fa3a' has a time stamp in the future.
    // Calling the TimeBasedGUID constructor with a GUID which has a future time stamp forces the 
    // constructor to reset the clock. That means, the clock sequence counter gets increased.
    //
    futureTimeBasedGUID = TS.TypeCode.TimeBasedGUID.parse("bc1c8a20-1ecf-12e7-8000-7d13fe49fa3a");
    timeBasedGUID = new TS.TypeCode.TimeBasedGUID(futureTimeBasedGUID);
    assert.equal(timeBasedGUID.clockSequence, futureTimeBasedGUID.clockSequence + 1, "The returned clock sequence should be increased.");
    assert.equal(futureTimeBasedGUID.MACAddress, timeBasedGUID.MACAddress, "The time based GUIDs should show a matching MAC address.");
  });


  QUnit.test("TS.TypeCode.TimeBasedGUIDGenerator constructor", (assert) => 
  {
    type result = { GUID: TS.TypeCode.TimeBasedGUID, GUIDCounter: number };
    let timeBasedGUID: TS.TypeCode.TimeBasedGUID;
    let timeBasedGUIDGenerator: TS.TypeCode.TimeBasedGUIDGenerator;
    let timeBasedGUIDArray: Array<result>;

    timeBasedGUID = new TS.TypeCode.TimeBasedGUID();
    timeBasedGUIDArray = new Array<result>();
    timeBasedGUIDGenerator = new TS.TypeCode.TimeBasedGUIDGenerator(timeBasedGUID);

    for (let index = 0; index < 10000; index++)
    {
      timeBasedGUID = timeBasedGUIDGenerator.next().value;
      timeBasedGUIDArray.push({ GUID: timeBasedGUID, GUIDCounter: timeBasedGUID.GUIDCounter } );
    }

    assert.equal(timeBasedGUIDArray.length, 10000, "Should return the expected number of time based GUIDs.");
  });

}