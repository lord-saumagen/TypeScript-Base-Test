/// <reference path="_references.ts" />

module TS_Utils_IO_Stream
{
  QUnit.module("TS.IO.Stream",
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


  function writeNumberDataAsync(stream: TS.IO.Stream<number>, amount: number)
  {
    let counter: number;
    let timer: number;
    let prms: Promise<any>;
    let next: boolean;

    counter = 0;
    next = true;

    while (counter < amount)
    {
      prms = stream.writeAsync(counter, 1).catch((ex) => 
      {
        console.log("Exception in writeNumberDataAsync: " + ex.message);
      });
      counter++;
    }
    stream.close();
  }


  QUnit.test("TS.IO.Stream constructor", (assert) =>
  {
    let numberStream: TS.IO.Stream<number>;
    let eventHandler: () => void;

    numberStream = new TS.IO.Stream<number>();
    assert.ok(TS.Utils.Assert.isInstanceOf(numberStream, TS.IO.Stream), "Should return an object which is an instance of TS.IO.Stream.");
    numberStream.close();

    numberStream = new TS.IO.Stream<number>(50000);
    assert.ok(TS.Utils.Assert.isInstanceOf(numberStream, TS.IO.Stream), "Should return an object which is an instance of TS.IO.Stream.");
    numberStream.close();

    eventHandler = () => { };
    numberStream = new TS.IO.Stream<number>(50000, eventHandler, eventHandler, eventHandler);
    assert.ok(TS.Utils.Assert.isInstanceOf(numberStream, TS.IO.Stream), "Should return an object which is an instance of TS.IO.Stream.");
    numberStream.close();

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(0);
    }, TS.ArgumentOutOfRangeException, "The constructor should fail with a \"TS.ArgumentOutOfRangeException\" exception when called with a 0 value for argument 'maxBufferSize'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(Number.MAX_SAFE_INTEGER + 1);
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a value greater Number.MAX_SAFE_INTEGER for argument 'maxBufferSize'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(-1);
    }, TS.InvalidTypeException, "The constructor should fail with a \"TS.InvalidTypeException\" exception when called with a value < 0 for argument 'maxBufferSize'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(5000, null, eventHandler, eventHandler);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null value for argument 'onCloseCallback'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(5000, eventHandler, null, eventHandler);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null value for argument 'onDataCallback'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(5000, eventHandler, eventHandler, null);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a null value for argument 'onErrorCallback'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(5000, undefined, eventHandler, eventHandler);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a undefined value for argument 'onCloseCallback'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(5000, eventHandler, undefined, eventHandler);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a undefined value for argument 'onDataCallback'.");

    assert.throws(() => 
    {
      numberStream = new TS.IO.Stream<number>(5000, eventHandler, eventHandler, undefined);
    }, TS.ArgumentNullOrUndefinedException, "The constructor should fail with a \"TS.ArgumentNullOrUndefinedException\" exception when called with a undefined value for argument 'onErrorCallback'.");

  });


  QUnit.test("TS.IO.Stream writeAsync", (assert) =>
  {

    let asyncNumberStream1: TS.IO.Stream<number>;
    let asyncNumberStream2: TS.IO.Stream<number>;
    let numberStream: TS.IO.Stream<number>;
    let write1Done = assert.async();
    let write2Done = assert.async();

    asyncNumberStream1 = new TS.IO.Stream<number>(5000);
    asyncNumberStream1.writeAsync(2).then((value) =>
    {
      assert.ok(true, "The async write operation for a single value should succeed as expected.");
      write1Done();
      asyncNumberStream1.close();
    }).catch((ex) => { debugger; throw ex; });

    asyncNumberStream2 = new TS.IO.Stream<number>(5000);
    asyncNumberStream2.writeAsync([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).then((value) =>
    {
      assert.ok(true, "The async write operation for an array of values should succeed as expected.");
      write2Done();
      asyncNumberStream2.close();
    }).catch((ex) => { debugger; throw ex; });


    numberStream = new TS.IO.Stream<number>(5000);

    assert.throws(() => 
    {
      numberStream.writeAsync([1, 2, 3], -1).then((value) => { }).catch((ex) => { throw ex; });
    }, TS.InvalidTypeException, "Should  fail with a \"TS.InvalidTypeException\" exception when called with a negative value for argument 'timeout'.");

    assert.throws(() => 
    {
      numberStream.writeAsync([1, 2, 3], Number.MAX_SAFE_INTEGER + 1).then((value) => { }).catch((ex) => { throw ex; });
    }, TS.InvalidTypeException, "Should  fail with a \"TS.InvalidTypeException\" exception when called with a value greater Number.MAX_SAFE_INTEGER for argument 'timeout'.");

    assert.throws(() => 
    {
      numberStream.writeAsync([1, 2, 3], -1).then((value) => { }).catch((ex) => { throw ex; });
    }, TS.InvalidTypeException, "Should  fail with a \"TS.InvalidTypeException\" exception when called with a negative value for argument 'timeout'.");

    assert.throws(() => 
    {
      numberStream.writeAsync([1, 2, 3, , 4, 5, , 6, , 8]).then((value) => { }).catch((ex) => { throw ex; });
    }, TS.InvalidTypeException, "Should  fail with a \"TS.InvalidTypeException\" exception when called with a sparse array value for argument 'data'.");

    assert.throws(() => 
    {
      numberStream.writeAsync(undefined);
    }, TS.ArgumentUndefinedException, "Should  fail with a \"TS.ArgumentUndefinedException\" exception when called with an undefined value for argument 'data'.");

    numberStream.close();

    assert.throws(() => 
    {
      numberStream.writeAsync(42);
    }, TS.InvalidOperationException, "Should fail with a \"TS.InvalidOperationException\" exception for an attempt to write on a closed stream.");
  });


  QUnit.test("TS.IO.stream write", (assert) => 
  {
    let numberStream1: TS.IO.Stream<number>;
    let numberStream2: TS.IO.Stream<number>;
    let numberStream3: TS.IO.Stream<number>;
    let asyncDone = assert.async();
    let receiveArray: Array<number>;
    let intervalTimer: number;

    numberStream1 = new TS.IO.Stream<number>(5000);

    receiveArray = new Array<number>();

    intervalTimer = window.setInterval(() => 
    {
      while (numberStream1.hasData)
      {
        receiveArray.push(numberStream1.read());
      }
      if (numberStream1.isClosed)
      {
        window.clearInterval(intervalTimer);
        assert.equal(receiveArray.length, 5000, "Should have received as much data as has been sent.");
        asyncDone();
      }
    }, 1000)

    for (let index = 0; index < 5000; index++)
    {
      numberStream1.write(index);
    }
    numberStream1.close();

    numberStream2 = new TS.IO.Stream<number>();

    assert.throws(() => 
    {
      numberStream2.write([1, 2, 3, , 4, 5, , 6, , 8]);
    }, TS.InvalidTypeException, "Should  fail with a \"TS.InvalidTypeException\" exception when called with a sparse array value for argument 'data'.");

    assert.throws(() => 
    {
      numberStream2.write(undefined);
    }, TS.ArgumentUndefinedException, "Should  fail with a \"TS.ArgumentUndefinedException\" exception when called with an undefined value for argument 'data'.");

    numberStream2.close();

    assert.throws(() => 
    {
      numberStream2.write(42);
    }, TS.InvalidOperationException, "Should  fail with a \"TS.InvalidOperationException\" exception for an attempt to write on a closed stream.");

    numberStream3 = new TS.IO.Stream<number>(10);

    assert.throws(() => 
    {
      //numberStream3.write([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      for (let index = 0; index < 20; index++)
      {
        numberStream3.write(1);
      }
    }, TS.BufferOverrunException, "Should  fail with a \"TS.BufferOverrunException\" exception for an attempt to write more data than the buffer can handle.");
  });


  QUnit.test("TS.IO.Stream read (event controlled)", (assert) =>
  {
    let numberStream: TS.IO.Stream<number>;
    let asyncDone = assert.async();
    let receiveArray: Array<number>;
    let amountOfData: number = 5000;

    receiveArray = new Array<number>();

    numberStream = new TS.IO.Stream<number>(2000, () => 
    {
      /* onClose */
      assert.equal(receiveArray.length, amountOfData, "Should have received as much data as has been sent.");
      asyncDone();
    }, () => 
      {
        /* onData */
        while (numberStream.hasData)
        {
          receiveArray.push(numberStream.read())
        }
      }, () => 
      {
        /* onError */
        throw numberStream.error;
      });

    writeNumberDataAsync(numberStream, amountOfData)

  });


  QUnit.test("TS.IO.Stream read (polling)", (assert) =>
  {
    let numberStream: TS.IO.Stream<number>;
    let asyncDone = assert.async();
    let receiveArray: Array<number>;
    let amountOfData: number = 5000;
    let intervalTimer: number;


    receiveArray = new Array<number>();

    numberStream = new TS.IO.Stream<number>(6000);

    intervalTimer = window.setInterval(() =>
    {
      while (numberStream.hasData)
      {
        receiveArray.push(numberStream.read());
      }
      if (numberStream.isClosed)
      {
        window.clearInterval(intervalTimer);
        assert.equal(receiveArray.length, amountOfData, "Should have received as much data as has been sent.");
        asyncDone();
      }
    }, 1000);

    writeNumberDataAsync(numberStream, amountOfData)

  });


  QUnit.test("TS.IO.Stream read error (event controlled)", (assert) =>
  {
    let numberStream: TS.IO.Stream<number>;
    let asyncDone = assert.async();
    let receiveArray: Array<number>;
    let amountOfData: number = 5000;


    receiveArray = new Array<number>();

    numberStream = new TS.IO.Stream<number>(20, () => 
    {
      /* onClose */
      /* We shouldn't come that far. */
      debugger;
      throw new TS.Exception("Unexpected result.")
    }, () => 
      {
        /* onData */
        /* Do nothing. Let the stream run into the buffer limit. */
      }, () => 
      {
        /* onError */
        assert.throws(() => 
        {
          throw numberStream.error;
        }, TS.TimeoutException, "Should fail with a \"TS.TimeoutException\" exception when the write operations can't complete because of a full buffer.");
        asyncDone();
      });

    writeNumberDataAsync(numberStream, amountOfData)
  });


  QUnit.test("TS.IO.Stream read error (polling)", (assert) =>
  {
    let numberStream: TS.IO.Stream<number>;
    let asyncDone = assert.async();
    let amountOfData: number = 5000;
    let intervalTimer: number;


    numberStream = new TS.IO.Stream<number>(20);

    intervalTimer = window.setInterval(() => 
    {
      if (numberStream.hasError)
      {
        window.clearInterval(intervalTimer);
        assert.throws(() => 
        {
          throw numberStream.error;
        }, TS.TimeoutException, "Should fail with a \"TS.TimeoutException\" exception when the write operations can't complete because of a full buffer.");
        asyncDone();
      }
    }, 2000);

    writeNumberDataAsync(numberStream, amountOfData)

  });


  QUnit.test("TS.IO.Stream write async -> read event controlled", (assert) => 
  {
    let asyncDone = assert.async();
    let writeIndex = 0;
    let MAX_INDEX = 1000000;
    let stream: TS.IO.Stream<string>;
    let resultCharCount: number = 0;


    let generator = function* ()
    {
      let resultArray: Array<string>;
      let charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let index = 0;
      while (true)
      {
        resultArray = new Array<string>();
        let charCount = 0;
        while (charCount < 5000)
        {
          if (index < charArray.length - 1)
          {
            index++;
          }
          else
          {
            index = 0;
          }
          resultArray.push(charArray[index]);
          charCount++;
        }
        yield resultArray;
      }
    }

    function onError()
    {
      throw stream.error;
    }

    function onData()
    {
      while (stream.hasData)
      {
        resultCharCount += stream.readBuffer().length;
      }
    }

    function onClose()
    {
      assert.ok(resultCharCount == MAX_INDEX, "The receiver should receive the same amount of data which has been sent.");
      asyncDone();
    }

    stream = new TS.IO.Stream<string>(3000, onClose, onData, onError);
    let iter = generator();
    writeIndex = 0;

    while ((writeIndex * 5000 < MAX_INDEX) && (stream.canWrite))
    {
      stream.writeAsync(iter.next().value)
      writeIndex++;
    }

    stream.close();
  });


  QUnit.test("TS.IO.Stream write sync -> read event controlled", (assert) => 
  {
    let asyncDone = assert.async();
    let writeIndex = 0;
    let MAX_INDEX = 10000;
    let writeIntervalHandler: number;
    let stream: TS.IO.Stream<string>;
    let resultCharCount: number = 0;


    let generator = function* ()
    {
      let charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let index = 0;
      while (true)
      {
        if (index < charArray.length - 1)
        {
          index++;
        }
        else
        {
          index = 0;
        }
        yield charArray[index];
      }
    }

    function onError()
    {
      throw stream.error;
    }

    function onData()
    {
      while (stream.hasData)
      {
        resultCharCount += stream.readBuffer().length;
      }
    }

    function onClose()
    {
      assert.ok(resultCharCount == MAX_INDEX, "The receiver should receive the same amount of data which has been sent.");
      asyncDone();
    }

    stream = new TS.IO.Stream<string>(3000, onClose, onData, onError);
    let iter = generator();
    writeIndex = 0;


    writeIntervalHandler = window.setInterval(() =>
    {
      if (writeIndex < MAX_INDEX)
      {
        while (stream.canWrite && (writeIndex < MAX_INDEX) && (stream.freeBufferSize > 0))
        {
          stream.write(iter.next().value)
          writeIndex++;
        }
      }
      else
      {
        window.clearInterval(writeIntervalHandler);
        stream.close();
      }
    }, 50);

  });


  QUnit.test("TS.IO.Stream write async -> read polling", (assert) => 
  {
    let asyncDone = assert.async();
    let writeIndex = 0;
    let readIntervalHandler: number;
    let MAX_INDEX = 1000000;
    let stream: TS.IO.Stream<string>;
    let resultCharCount: number = 0;


    let generator = function* ()
    {
      let resultArray: Array<string>;
      let charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let index = 0;
      while (true)
      {
        resultArray = new Array<string>();
        let charCount = 0;
        while (charCount < 5000)
        {
          if (index < charArray.length - 1)
          {
            index++;
          }
          else
          {
            index = 0;
          }
          resultArray.push(charArray[index]);
          charCount++;
        }
        yield resultArray;
      }
    }

    stream = new TS.IO.Stream<string>(5000);

    readIntervalHandler = window.setInterval(() => 
    {
      if (stream.canRead)
      {
        while (stream.hasData)
        {
          resultCharCount += stream.readBuffer().length;
        }
      }

      if (stream.isClosed)
      {
        assert.ok(resultCharCount == MAX_INDEX, "The receiver should receive the same amount of data which has been sent.");
        asyncDone();
      }

    }, 50);


    let iter = generator();
    writeIndex = 0;

    while ((writeIndex * 5000 < MAX_INDEX) && (stream.canWrite))
    {
      stream.writeAsync(iter.next().value)
      writeIndex++;
    }

    stream.close();
  });


  QUnit.test("TS.IO.Stream write sync -> read polling", (assert) => 
  {
    let asyncDone = assert.async();
    let writeIndex = 0;
    let MAX_INDEX = 10000;
    let writeIntervalHandler: number;
    let readIntervalHandler: number;
    let stream: TS.IO.Stream<string>;
    let resultCharCount: number = 0;


    let generator = function* ()
    {
      let charArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let index = 0;
      while (true)
      {
        if (index < charArray.length - 1)
        {
          index++;
        }
        else
        {
          index = 0;
        }
        yield charArray[index];
      }
    }


    stream = new TS.IO.Stream<string>(3000);
    let iter = generator();
    writeIndex = 0;


    readIntervalHandler = window.setInterval(() => 
    {
      if (stream.canRead)
      {
        while (stream.hasData)
        {
          resultCharCount += stream.readBuffer().length;
        }
      }

      if (stream.isClosed)
      {
        assert.ok(resultCharCount == MAX_INDEX, "The receiver should receive the same amount of data which has been sent.");
        asyncDone();
      }

    }, 51);


    writeIntervalHandler = window.setInterval(() =>
    {
      if (writeIndex < MAX_INDEX)
      {
        while (stream.canWrite && (writeIndex < MAX_INDEX) && (stream.freeBufferSize > 0))
        {
          stream.write(iter.next().value)
          writeIndex++;
        }
      }
      else
      {
        window.clearInterval(writeIntervalHandler);
        stream.close();
      }
    }, 50);

  });

}