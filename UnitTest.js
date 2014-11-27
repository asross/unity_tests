class UnitTest extends MonoBehaviour {
  var assertions : int;

  function Assert(expression, message) {
    assertions += 1;
    if (!expression) {
      throw new Boo.Lang.Runtime.AssertionFailedException(message);
    }
  }

  function Assert(expression) {
    Assert(expression, null);
  }

  function AssertEqual(a, b) { AssertEqual(a, b, ''); }
  function AssertEqual(a, b, m) {
    Assert((a == b), m+String.Format("expected {0} to equal {1}", a, b));
  }

  function AssertEq(a, b) { AssertEqual(a, b); }
  function AssertEq(a, b, m) { AssertEqual(a, b, m); }

  function AssertUnequal(a, b) { AssertUnequal(a, b, ''); }
  function AssertUnequal(a, b, m) {
    Assert((a != b), m+String.Format("expected {0} NOT to equal {1}", a, b));
  }

  function AssertApproximately(a, b) { AssertApproximately(a, b, ''); }
  function AssertApproximately(a, b, m) {
    Assert(Mathf.Approximately(a, b), m+String.Format("expected {0} to approximately equal {1}", a, b));
  }
  function AssertApprox(a, b) { AssertApproximately(a, b, ''); }
  function AssertApprox(a, b, m) { AssertApproximately(a, b, m); }

  function AssertContains(item, list) { AssertContains(item, list, ''); }
  function AssertContains(item, list, m) {
    contained = false;
    for (el in list) {
      if (el == item) {
        contained = true;
        break;
      }
    }
    Assert(contained, m+String.Format("expected {0} to contain {1}", list, item));
  }
}
