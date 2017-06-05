/// <reference path="_references.ts" />
namespace TS_Exception_test
{

  QUnit.module("TS.Exception",
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


  QUnit.test("TS.AmbiguousResultException constructor", (assert) =>
  {
    var ExceptionMessage = "Ambiguous result exception message";

    assert.throws(function ()
    {
      throw new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage);
    }, new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage, getInnerException());
    }, new TS.AmbiguousResultException("ArgName", 5, ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentException constructor", (assert) =>
  {
    var ExceptionMessage = "Argument exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentException("ArgName", 5, ExceptionMessage);
    }, new TS.ArgumentException("ArgName", 5, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentException("ArgName", 5, ExceptionMessage, getInnerException());
    }, new TS.ArgumentException("ArgName", 5, ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentNullException("ArgName", ExceptionMessage);
    }, TS.ArgumentNullException, "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullException("ArgName", ExceptionMessage, getInnerException());
    }, new TS.ArgumentNullException("ArgName", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullOrUndefinedException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null or undefined exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerException());
    },
      new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullUndefOrEmptyException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null undef or empty exception message";

    assert.throws(function () 
    {
      throw new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage, getInnerException());
    }, new TS.ArgumentNullUndefOrEmptyException("ArgName", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentNullUndefOrWhiteSpaceException constructor", function (assert)
  {
    var ExceptionMessage = "Argument null undef or whiteSpace exception message";

    assert.throws(function () 
    {
      throw new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage);
    }, new TS.ArgumentNullUndefOrWhiteSpaceException("ArgName", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerException());
    }, new TS.ArgumentNullOrUndefinedException("ArgName", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentOutOfRangeException constructor", function (assert)
  {
    var ExceptionMessage = "Argument out of range exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage);
    }, new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage, getInnerException());
    }, new TS.ArgumentOutOfRangeException("ArgName", 12, ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArgumentUndefinedException constructor", function (assert)
  {
    var ExceptionMessage = "Argument undefined exception message";

    assert.throws(function ()
    {
      throw new TS.ArgumentUndefinedException("ArgName", ExceptionMessage);
    }, new TS.ArgumentUndefinedException("ArgName",  ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArgumentUndefinedException("ArgName", ExceptionMessage, getInnerException());
    }, new TS.ArgumentUndefinedException("ArgName", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.ArithmeticException constructor", (assert) => 
  {
    var ExceptionMessage = "Arithmetic exception message";

    assert.throws(function ()
    {
      throw new TS.ArithmeticException(ExceptionMessage);
    }, new TS.ArithmeticException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.ArithmeticException(ExceptionMessage, getInnerException());
    }, new TS.ArithmeticException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.DeprecatedException constructor", (assert) => 
  {
    var ExceptionMessage = "Deprecated exception message";

    assert.throws(function ()
    {
      throw new TS.DeprecatedException(ExceptionMessage);
    }, new TS.DeprecatedException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.DeprecatedException(ExceptionMessage, getInnerException());
    }, new TS.DeprecatedException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.DirectoryNotFoundException constructor", (assert) => 
  {
    var ExceptionMessage = "Directory not found exception message";

    assert.throws(function ()
    {
      throw new TS.DirectoryNotFoundException("Dir", "C:/" ,ExceptionMessage);
    }, new TS.DirectoryNotFoundException("Dir", "C:/", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.DirectoryNotFoundException("Dir", "C:/", ExceptionMessage, getInnerException());
    }, new TS.DirectoryNotFoundException("Dir", "C:/", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.DividedByZeroException constructor", (assert) => 
  {
    var ExceptionMessage = "Divided by zero exception message";

    assert.throws(function ()
    {
      throw new TS.DividedByZeroException(ExceptionMessage);
    }, new TS.DividedByZeroException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.DividedByZeroException(ExceptionMessage, getInnerException());
    }, new TS.DividedByZeroException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.EnvironmentNotSupportedException constructor", function (assert)
  {
    var ExceptionMessage = "EnvironmentNotSupportedException message";

    assert.throws(function ()
    {
      throw new TS.EnvironmentNotSupportedException(ExceptionMessage);
    }, new TS.EnvironmentNotSupportedException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.EnvironmentNotSupportedException(ExceptionMessage, getInnerException());
    }, new TS.EnvironmentNotSupportedException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.Exception constructor", function (assert)
  {
    var ExceptionMessage = "Exception message";

    assert.throws(function ()
    {
      throw new TS.Exception(ExceptionMessage);
    }, new TS.Exception(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.Exception(ExceptionMessage, getInnerException());
    }, new TS.Exception(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.IndexOutOfRangeException constructor", function (assert)
  {
    var ExceptionMessage = "Index out of range exception message";

    assert.throws(function ()
    {
      throw new TS.IndexOutOfRangeException(ExceptionMessage);
    }, new TS.IndexOutOfRangeException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.IndexOutOfRangeException(ExceptionMessage, getInnerException());
    }, new TS.IndexOutOfRangeException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidCastException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid cast exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidCastException(ExceptionMessage);
    }, new TS.InvalidCastException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidCastException(ExceptionMessage, getInnerException());
    }, new TS.InvalidCastException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidFormatException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid format exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage);
    }, new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage, getInnerException());
    }, new TS.InvalidFormatException("ArgName", "NOP", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidInvokationException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid invocation exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidInvokationException(ExceptionMessage);
    }, new TS.InvalidInvokationException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidInvokationException(ExceptionMessage, getInnerException());
    }, new TS.InvalidInvokationException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidOperationException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid operation exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidOperationException(ExceptionMessage);
    }, new TS.InvalidOperationException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidOperationException(ExceptionMessage, getInnerException());
    }, new TS.InvalidOperationException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.InvalidTypeException constructor", function (assert)
  {
    var ExceptionMessage = "Invalid type exception message";

    assert.throws(function ()
    {
      throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage);
    }, new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage, getInnerException());
    }, new TS.InvalidTypeException("ArgName", "NOP", ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.NotFiniteNumberException constructor", (assert) => 
  {
    var ExceptionMessage = "Not finite number exception message";

    assert.throws(function ()
    {
      throw new TS.NotFiniteNumberException(ExceptionMessage);
    }, new TS.NotFiniteNumberException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.NotFiniteNumberException(ExceptionMessage, getInnerException());
    }, new TS.NotFiniteNumberException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.NotImplementedException constructor", (assert) => 
  {
    var ExceptionMessage = "Not implemented exception message";

    assert.throws(function ()
    {
      throw new TS.NotImplementedException(ExceptionMessage);
    }, new TS.NotImplementedException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.NotImplementedException(ExceptionMessage, getInnerException());
    }, new TS.NotImplementedException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("TS.OverflowException constructor", (assert) => 
  {
    var ExceptionMessage = "Overflow exception message";

    assert.throws(function ()
    {
      throw new TS.OverflowException(ExceptionMessage);
    }, new TS.OverflowException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.OverflowException(ExceptionMessage, getInnerException());
    }, new TS.OverflowException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });

  
  QUnit.test("TS.TimeoutException constructor", (assert) => 
  {
    var ExceptionMessage = "Timeout exception message";

    assert.throws(function ()
    {
      throw new TS.TimeoutException(ExceptionMessage);
    }, new TS.TimeoutException(ExceptionMessage), "Should raise an exception instance that matched with the expected instance.");

    assert.throws(function ()
    {
      throw new TS.TimeoutException(ExceptionMessage, getInnerException());
    }, new TS.TimeoutException(ExceptionMessage, getInnerException()), "Should raise an exception instance of the expected type with an inner exception.");
  });


  QUnit.test("Hierarchy test", (assert) => 
  {
    let DivByZero: TS.DividedByZeroException;

    DivByZero = new TS.DividedByZeroException("Test message", getInnerException());

    assert.ok(DivByZero instanceof TS.DividedByZeroException, "Should be recognized as a 'TS.DividedByZeroException' exception.")
    assert.ok(DivByZero instanceof TS.ArithmeticException, "Should be recognized as a 'TS.ArithmeticException' exception.")
    assert.ok(DivByZero instanceof TS.Exception, "Should be recognized as a 'TS.Exception' exception.")

  });

  /**
  *  @description Creates and returns a new exception of type TS.Exception with the message text: "Inner exception message".
  */
  function getInnerException(): TS.Exception
  {
    return new TS.Exception("Inner exception message");
  }

}//END namespace