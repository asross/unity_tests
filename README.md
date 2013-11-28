# Unit(y) Tests

### Basic Usage

1. Attach the `TestRunner` script to an object in your scene
2. Create files ending with `Test.js` or `Test.cs` in `Assets/Scripts/Test`
3. Within them, define functions with `Test` in their names
4. Make assertions within these functions using `TestRunner.Assert`

When the object with the `TestRunner` behavior initializes, it will look for all scripts matching the `Test.?s` naming convention in the `Scripts/Tests` directory, create an object with the test script attached, and call all methods containing the string `Test`. It will count the assertions you make and print out stack traces if there are failures or errors.

### E.G.
```javascript
// Assets/Scripts/Test/FooTest.js

function PassingTest() {
  TestRunner.Assert(true);
}

function AnotherPassingTest() {
  TestRunner.AssertEqual(5, 5, "Five should equal five");
}

function FailingTest() {
  TestRunner.AssertUnequal(5, "Pasta sauce", "Pasta sauce isn't a quantity!");
}

function TestThatCreatesObjects() {
  testObject = new GameObject();
  testObject.transform.position = Vector3(5, 5, 5);
  TestRunner.Assert(testObject.transform.position.z == 5);
  Destroy(testObject);
}
```

or, in C#,

```c#
// Assets/Scripts/Test/FooTest.cs

using UnityEngine;

public class FooTest : MonoBehaviour {

  public void TestA() {
    TestRunner.Assert(true, "this test succeeds");
  }

  public void TestB() {
    TestRunner.Assert(false, "this test fails");
  }

}
```

Note that you'll need to make sure `TestRunner.js` is included in your `Plugins` folder or some other folder that gets compiled first, if you want to use it with C# tests.

### N.B.
This isn't meant to be a comprehensive test framework, just a simple tool to make testing Unity code a little easier. It's probably best to avoid making assertions about objects that are actually part of the scene, and if you create any objects or add any components inside these tests, you should remove them manually afterwards.

You can configure TestRunner.js to look in a different directory or find files matching a different naming convention by editing the first few lines of `TestRunner#Start()`.
