# Unit(y) Tests

### Basic Usage

1. Create a `_test.js` file in `Assets/Scripts/Test`
2. Define functions with `Test` in their names
3. Make those functions call `UnitTest.Assert`
4. Attach the `UnitTest` script to an object in your scene

When the object with the `UnitTest` behavior initializes, it will look for all scripts matching the `_test.js` naming convention in the `Scripts/Tests` directory, create an object with the test script attached, and call all methods matching `Test`. It will count the assertions you make and print out stack traces if there are failures or errors.

### E.G.
```javascript
// Assets/Scripts/Test/foo_test.js

function PassingTest() {
  UnitTest.Assert(true);
}

function AnotherPassingTest() {
  UnitTest.AssertEqual(5, 5, "Five should equal five");
}

function FailingTest() {
  UnitTest.AssertUnequal(5, "Pasta sauce", "Pasta sauce isn't a quantity!");
}

function TestThatCreatesObjects() {
  testObject = new GameObject();
  testObject.transform.position = Vector3(5, 5, 5);
  UnitTest.That(testObject.transform.position.z == 5);
  Destroy(testObject);
}
```

### N.B.
This isn't meant to be a comprehensive test framework, just a simple tool to make testing (ideally functional) Unity code a little easier. It's probably best to avoid making assertions about objects that are actually part of the scene, and if you create any objects or add any components inside these tests, you should remove them manually afterwards.

You can configure UnitTest.js to look in a different directory or find files matching a different naming convention by editing the first few lines of `UnitTest#Start()`.
