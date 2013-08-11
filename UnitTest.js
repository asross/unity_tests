import System.IO;
import System.Text.RegularExpressions;

class UnitTest extends MonoBehaviour {
  static var total;
  static var failures;

  function Start() {
    if (!Application.isEditor) return;
    Debug.Log('** Running tests...');
    files = new DirectoryInfo("Assets/Scripts/Test").GetFiles("*_test.js"); // Edit these lines if your tests
    regex = new Regex("([a-zA-Z_]+_test)");                                 // live elsewhere or are named elsewise
    total = failures = 0;
    for (file in files) {
      behaviour = regex.Match(file.ToString()).Groups[1].Value;
      if (behaviour) {
        test_object = new GameObject();
        test_object.AddComponent(behaviour);
        test_object.SendMessage('RunTests');
        Destroy(test_object);
      }
    }
    Debug.Log('** ' + total + ' assertions, ' + failures + ' failures.');
  }

  static function Assert(expression, message) {
    total += 1;
    if (!expression) {
      failures += 1;
      Debug.Log('  * Assertion Error' + (message ? ': ' + message : ''));
    }
  }

  /* Helpers */
  static function AssertEqual(a, b, message)   { Assert((a == b), message); }
  static function AssertUnequal(a, b, message) { Assert((a != b), message); }
  static function Assert(expression)           { Assert(expression, null);  }
  static function AssertNot(expression, msg)   { Assert(!expression, msg);  }
  static function AssertNot(expression)        { Assert(!expression);       }
  static function AssertEqual(a, b)            { Assert((a == b));          }
  static function AssertUnequal(a, b)          { Assert((a != b));          }
  static function That(expression, message)    { Assert(expression, msg);   }
  static function That(expression)             { Assert(expression);        }
}
