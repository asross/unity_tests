import System.IO;
import System.Text.RegularExpressions;

class TestRunner extends MonoBehaviour {
  var total;
  var errors;
  var failures;
  static var assertions;

  function Start() {
    if (!Application.isEditor) return;

    Debug.Log('** Running tests...');
    files = new DirectoryInfo("Assets/Scripts/Test").GetFiles("*_test.js");
    regex = new Regex("([a-zA-Z_]+_test)");
    total = assertions = failures = errors = 0;

    for (file in files) {
      behaviour = regex.Match(file.ToString()).Groups[1].Value;
      if (behaviour) {
        test = gameObject.AddComponent(behaviour);
        for (method in test.GetType().GetMethods())
          if (method.Name.Contains('Test'))
            Run(test, method);
        Destroy(test);
      }
    }

    Debug.Log('** ' + total + ' examples, ' + failures + ' failures, ' + errors + ' errors. ' + assertions + ' assertions.' );
  }

  function Run(test, method) {
    total += 1;
    try {
      method.Invoke(test, null);
    } catch(e : System.Reflection.TargetInvocationException) {
      ee = e.InnerException;
      if (ee.GetType() == Boo.Lang.Runtime.AssertionFailedException) {
        failures += 1;
      } else {
        errors += 1;
      }
      Debug.LogException(ee);
    }
  }

  static function Assert(expression, message) {
    assertions += 1;
    if (!expression) {
      throw new Boo.Lang.Runtime.AssertionFailedException(message);
    }
  }

  /* Helpers */
  static function Assert(expression)           { Assert(expression, null);  }
  static function AssertNot(expression)        { Assert(!expression);       }
  static function AssertNot(expression, msg)   { Assert(!expression, msg);  }
  static function AssertEqual(a, b)            { Assert((a == b));          }
  static function AssertEqual(a, b, message)   { Assert((a == b), message); }
  static function AssertUnequal(a, b)          { Assert((a != b));          }
  static function AssertUnequal(a, b, message) { Assert((a != b), message); }
}
