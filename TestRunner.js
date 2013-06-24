import System.IO;
import System.Text.RegularExpressions;

class TestRunner extends MonoBehaviour {

  function Start() {
    Debug.Log('* Running Tests...');

    // These lines should be altered to point to your test directory
    // and follow your naming conventions for test files.
    files = new DirectoryInfo("Assets/Scripts/Test").GetFiles("*_test.js");
    regex = new Regex("([a-zA-Z_]+_test)");
    for (file in test_files) {
      behaviour = test_regex.Match(file.ToString()).Groups[1].Value;
      if (behaviour) {
        test_object = new GameObject();
        test_object.AddComponent(behaviour);
        test_object.SendMessage('RunTests'); // Assume all test files respond to 'RunTests'
        Destroy(test_object);
      }
    }

    Debug.Log('* ...Done!');
  }

  static function Assert(expression, message) {
    if (!expression) {
      Debug.Log("TEST FAILURE: " + message); // Consider also using throw or Debug.Break()
    }
    return expression;
  }

  static function AssertEqual(a, b, message) {
    return Assert((a == b), message);
  }

  static function AssertUnequal(a, b, message) {
    return Assert((a != b), message);
  }
}
