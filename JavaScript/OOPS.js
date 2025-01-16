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
        this.gender = gender || null
    }
    hello() {
        console.log(`Hello ${this.name} your age: ${this.age} & gender: ${this.gender}`);
      };
}
const user1 = new User2('Siddhant',22)
console.log(user1)
const user2 = new User2('Priyanka',21, 'female')
user1.hello()
user2.hello()

console.log(`-----------------------------------------------------------`)

// ENCAPSULATION
const salary =30_000
const age = 21
const name = 'sid'

function toString(salary,age,name){
console.log(`Hello ${name}, you are ${age} olds having ${salary} in your account`)
}
toString(salary,age,name)
/*
This was was writng code is procedural ie its decoupled resulting more args for the function but 
we can see its related as func is using these variables. So to solve this we encapsulate related fields in objects reducing no parameters
for methods in obj. So now OOPs way:
*/

const User= {
   salary:30_000,
   age: 21,
   name :'sid',
   toString(){
    console.log(`Hello ${this.name}, you are ${this.age} olds having ${this.salary} in your account`)
   }
}
User.toString()

// Use dot notation when the property name is a valid identifier and static.
//  Use bracket notation when the property name is dynamic, computed, or invalid as an identifier.
const car1= { brand: "Toyota", model: "Camry" };
console.log(car1.brand); // "Toyota"
console.log(car1.model); // "Camry"

const car = { brand: "Toyota", model: "Camry" };
const key = "model";
console.log(car[key]); // "Camry"

/*
ABSTRACTION -> Hiding some of the properties & methods from the outside making simple ui for the objects & reducing impact of change ie imagine if u 
change some of those abstracted props/methods in future and as it is not linked to the outside code it will have no impact on the rest of the app.
*/
class BankAccount {
  #balance; // Private property using #

  constructor(initialBalance) {
    this.#balance = initialBalance;

    // Define a public `balance` property with getter and setter
    Object.defineProperty(this, 'balance', {
      get: () => this.#balance, // Getter: returns the private balance
      set: (amount) => {
        if (amount >= 0) {
          this.#balance += amount; // Setter: updates the private balance
        } else {
          console.log('Amount must be non-negative');
        }
      },
    });
  }
}
const account = new BankAccount(1000);

console.log(account.balance); // Accessible via getter: 1000
account.balance = 5000              // Accessible via setter
console.log(account.balance) // 6000
account.balance = -5000   // inavlid
// console.log(account.#balance) //error 

// INHERITENCE
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still.`);
  }
}

let animal = new Animal("My animal");
animal.run(2)

class Rabbit extends Animal {
  hide() {
    console.log(`${this.name} hides!`);
  }
  stop() { // overridng the parent(animal) method stop 
    super.stop(); // call parent stop 
    this.hide(); // and then hide
  }
}

let rabbit = new Rabbit("White Rabbit");

rabbit.run(5); 
rabbit.stop();