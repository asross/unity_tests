# Unit(y) Tests

### Basic Usage

1. Define classes that inherit from `UnitTest`
2. Within these classes, define functions with `Test` in their names
3. Within these functions, call `Assert`, `AssertEqual`, etc.
4. Attach the `TestRunner` script to an object in your scene

When the object with the `TestRunner` behavior initializes, it will look for all subclasses of `UnitTest`, create an object with that behavior attached, and call all methods containing the string `Test`. It will count the assertions you make and print out friendly messages with stack traces if there are failures or errors.

### E.G.
```javascript
class FooTest extends UnitTest {

  function PassingTest() {
    Assert(true);
  }

  function AnotherPassingTest() {
    AssertEqual(5, 5, "Five should equal five");
  }

  function FailingTest() {
    AssertUnequal(5, "Pasta sauce", "Pasta sauce isn't a quantity!");
  }

  function YetAnotherPassingTest() {
    AssertContains(5, [1,2,3,4,5], "5 should be contained in the list");
  }

  function TestThatCreatesObjects() {
    testObject = new GameObject();
    testObject.transform.position = Vector3(5, 5, 5);
    Assert(testObject.transform.position.z == 5);
    Destroy(testObject);
  }

  function MethodThatIsNotCalled() {
    // this method doesn't have 'Test' in its name, so who cares what happens here?
  }
}
```

or, in C#,

```c#
using UnityEngine;

public class FooTest : UnitTest {

  public void TestA() {
    Assert(true, "this test succeeds");
  }

  public void TestB() {
    Assert(false, "this test fails");
  }
}
```

Note that you'll need to place `UnitTest.js` and `TestRunner.js` in your `Plugins` folder or some other folder that gets compiled first, if you want to use this library with C# tests.

### N.B.
This isn't meant to be a comprehensive test framework, just a simple tool to make testing Unity code a little easier. It's probably best to avoid making assertions about objects that are actually part of the scene, and if you create any objects or add any components inside these tests, you should remove them manually afterwards.
