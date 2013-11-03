import System.IO;
import System.Text.RegularExpressions;

class UnitTest extends MonoBehaviour {
  static var total;
  static var failures;
  static var errors;
  static var assertions;

  function Start() {
    if (!Application.isEditor) return;

    Debug.Log('** Running tests...');

    files = new DirectoryInfo("Assets/Scripts/Test").GetFiles("*_test.js"); // Edit these lines if your tests
    regex = new Regex("([a-zA-Z_]+_test)");                                 // live elsewhere or are named elsewise
    total = failures = errors = assertions = 0;
    for (file in files) {
      behaviour = regex.Match(file.ToString()).Groups[1].Value;
      if (behaviour) {
        test = gameObject.AddComponent(behaviour);
        for (m in test.GetType().GetMethods())
          if (m.Name.Contains('Test'))
            Run(m, test);
        Destroy(test);
      }
    }

    Debug.Log('** ' + total + ' examples, ' + failures + ' failures, ' + errors + ' errors. ' + assertions + ' assertions.' );
  }

  function Run(method, test) {
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
  static function AssertEqual(a, b)            { Assert((a == b));          }
  static function AssertEqual(a, b, message)   { Assert((a == b), message); }
  static function AssertUnequal(a, b)          { Assert((a != b));          }
  static function AssertUnequal(a, b, message) { Assert((a != b), message); }
  static function AssertNot(expression)        { Assert(!expression);       }
  static function AssertNot(expression, msg)   { Assert(!expression, msg);  }
  static function That(expression)             { Assert(expression);        }
  static function That(expression, msg)        { Assert(expression, msg);   }
}
