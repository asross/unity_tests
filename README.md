# Basic Usage

Attach `TestRunner` to a game object, then create a file:

```javascript
// Assets/Scripts/Test/foo_test.js

function RunTests() {
  TestRunner.Assert(true);
  TestRunner.AssertEqual(5, 5, "Five should equal five");
  TestRunner.AssertUnequal(5, "Pasta sauce", "Pasta sauce isn't a quantity!");

  testObject = new GameObject();
  testObject.transform.position = Vector3(5, 5, 5);
  TestRunner.Assert(testObject.transform.position.z == 5);
  Destroy(testObject);
}
```

# Step by Step

1. Write code in your Unity project that can be tested with simple Assert statements.
2. Create a `something_test.js` file in `Assets/Scripts/Test` that defines a function `RunTests`.
3. Make that `RunTests` function call `TestRunner.Assert` or its related helper methods.
4. Attach the TestRunner script to a game object somewhere in your scene.

This isn't meant to be a comprehensive test framework, just a simple tool to make testing (ideally pure-functional) Unity code a little easier. It's probably best to avoid making assertions about objects that are actually part of the scene, and if you create any objects or add any components inside these tests, you should remove them manually afterwards.

You can configure TestRunner.js to look in a different directory or find files matching a different naming convention by editing the first few lines of `TestRunner#Start()`.
