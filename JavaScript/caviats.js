/*
null: Represents an intentional absence of any object value. It is often used to explicitly indicate that a variable or property should have no value.
undefined: Represents a variable that has been declared but not assigned a value, or a function that has no explicit return value. 
*/

console.log(null > 0) //false
console.log(null < 0) //false
console.log(null == 0) //false
console.log(null >= 0) //true
console.log(null <= 0) //true
console.log(null != 0) //true
console.log(null === 0) //false
console.log(null == 0) //false
console.log("--------------------------")

console.log(undefined > 0) //false
console.log(undefined < 0) //false
console.log(undefined == 0) //false
console.log(undefined >= 0) //false
console.log(undefined <= 0) //false
console.log(undefined != 0) //true
console.log(undefined === 0) //false
console.log(undefined == 0) //false
console.log("--------------------------")

console.log(NaN > 0) //false
console.log(NaN < 0) //false
console.log(NaN == 0) //false
console.log(NaN >= 0) //false
console.log(NaN <= 0) //false
console.log(NaN != 0) //true
console.log(NaN === 0) //false
console.log(NaN == 0) //false
console.log(NaN ** 0) //1
console.log("--------------------------")


console.log(undefined/null) //NaN
console.log(null/undefined) //NaN
console.log(null*undefined) //NaN
console.log(null+undefined) //NaN
console.log(null-undefined) //NaN
console.log(null%undefined) //NaN
console.log(null**undefined) //NaN
console.log(undefined == null) //true
console.log(undefined === null) //false
console.log("--------------------------")


console.log(typeof null) //object
console.log(typeof undefined) //undefined
console.log(typeof NaN) //number
console.log(typeof Infinity) //number
console.log(typeof -Infinity) //number
console.log("--------------------------")


/*
== (Loose Equality)
Behavior: Performs type coercion if the types of the two operands are different. This means it tries to convert the operands to the same type before comparing them.
=== (Strict Equality)
Behavior: Does not perform type coercion. It checks both the value and the type of the operands. If the types are different, it immediately returns false.
 */
console.log(NaN === NaN); // false
console.log(NaN == NaN);  // false

console.log(null == false); // false
console.log(null === false); // false
console.log(Boolean(null)); // false
// null is falsy in a boolean context, but it is only loosely equal to undefined and no other values. same for undefined

console.log(null + 10); // 10 (null is treated as 0)
console.log(undefined + 10); // NaN (undefined is treated as NaN)
console.log(NaN + 10); // NaN