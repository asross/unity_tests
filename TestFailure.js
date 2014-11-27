import System;

class TestFailure extends Exception {
  function TestFailure() {
  }

  function TestFailure(message : String) {
    super(message);
  }

  function TestFailure(message : String, inner : Exception) {
    super(message, inner);
  }
}
