// "this" refers to the current object executing the function.
// For a method (a function in an object), "this" refers to the object itself.
// In a regular function (not a method):
//   - "this" refers to the global object in non-strict mode.
//   - "this" is `undefined` in strict mode.
// Arrow functions do not have their own "this"; they inherit it from the surrounding lexical scope.

// SCENARIO 1
const obj1 = {
    name: "a",
    type: "practice",
    display() {
      console.log(this); // "this" refers to `obj1` (the object itself).
    },
    greet() {
      console.log(`Hello ${this.name}`); // "this.name" references the `name` property of `obj1`.
    },
  };
  
  obj1.display(); // Output: The `obj1` object itself
  obj1.greet();   // Output: Hello a
  
  obj1.wassup = function () {
    console.log(`Wassup ${this.name}`); // "this" refers to `obj1` since it's a method of `obj1`.
  };
  obj1.wassup(); // Output: Wassup a
  


  // SCENARIO 2
  (function () {
    console.log(this); // In an IIFE, "this" refers to the global object in non-strict mode or `undefined` in strict mode.
  })(); // Immediately Invoked Function Expression (IIFE)
  
  // CONSTRUCTOR FUNCTION
  // A constructor is a special function used to create and initialize objects, acting as a blueprint.
  function User1(name,age) {
    this.name = name; // "this" refers to the new object created by `new`.
    this.age = age
    this.hello = function () {
      console.log(`Hello ${this.name} your age: ${this.age}`); // "this.name" refers to the `name` property of the object.
    };
  }
  
  const sid = new User1("Siddhant", 22);
  sid.hello()
  // Output: Hello Siddhant
  
  // How `new` works:
  // 1. Creates an empty object: `this = {}`.
  // 2. Assigns properties to `this`.
  // 3. Implicitly returns `this` unless an object is explicitly returned.
  
  // Equivalent manual implementation:
 /* 
                function User1(name, age) {
                    // this = {};  (implicitly)
                    this.name = name; // Add properties to `this`
                    this.age = age; // Add properties to `this`
                    console.log(`Hello ${this.name} your age: ${this.age}`);
                    // Implicitly: return this;
                }
                
                // Example of an object created without a constructor:
                const sid = {
                    name: "Siddhant"
                    age; 21
                    greet(){
                    console.log(`Hello ${this.name} your age: ${this.age}`) // this referencing to name in the obj.
                    }
                };
 */


// SCENARIO 3
const obj2 = {
    name: "b",
    type: "practice",
    tags: [1,2,3],
    showtags(){
        this.tags.map((tag)=>{
            console.log(this.name, tag)
        }, this)
    }
  };

obj2.showtags()
/*
 Here if we dont pass second arg as this for map func or any func as such that takes callback this will refer to global obj as its in
 an independent func (callback func) ie not a method thereby it cant reference the obj
*/ 


// MODERN WAY TO DESCRIBE CONSTRUCTORS ->CLASS
class User2{
    constructor(name, age, gender){
        this.name = name;
        this.age = age;
        this.gender = gender
    }
    hello() {
        console.log(`Hello ${this.name} your age: ${this.age} & gender: ${this.gender}`);
      };
}
const user1 = new User2('Siddhant',22)
const user2 = new User2('Priyanka',21, 'female')
user1.hello()
user2.hello()