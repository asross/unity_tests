import System.Text.RegularExpressions;

class TestRunner extends MonoBehaviour {
  var total;
  var errors;
  var failures;
  var assertions;

  function Start() {
    if (Application.isEditor) {
      yield RunTests();
    }
  }

  function RunTests() : IEnumerator {
    Debug.Log('** Running tests...');

    total = assertions = failures = errors = 0;

    for (assembly in System.AppDomain.CurrentDomain.GetAssemblies()) {
      for (type in assembly.GetTypes()) {
        if (type.IsSubclassOf(typeof(UnitTest))) {
          test = gameObject.AddComponent(type);
          for (method in type.GetMethods()) {
            if (method.Name.Contains('Test')) {
              Run(test, method);
              yield;
            }
          }
          Destroy(test);
        }
      }
    }

    Debug.Log(String.Format('** {0} examples, {1} failures, {2} errors. {3} assertions.', total, failures, errors, assertions));
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
      LogFailure(ee, test, method);
    }
    assertions += test.assertions;
  }

  function LogFailure(error, test, method) {
    lineNumber = null;
    failurePrefix = test.GetType() + "." + method.Name;

    //Class.Method ... (at Assets/Scripts/Test/Class.js:555)
    for (line in error.StackTrace.Split("\n"[0])) {
      if (line.Contains(failurePrefix)) {
        lineNumber = Regex(":([0-9]+)").Match(line).Groups[1].Value;
      }
    }

    Debug.LogError(String.Format("** Failed at {0}, line {1}", failurePrefix, lineNumber));
    Debug.LogException(error);
  }
}
