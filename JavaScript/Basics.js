let box; 
const box2 = 20 // Must be declaried with initialiation and cant be changed 
let box3
let box4 = 2
console.log(box2)
box = 'sid'; //declared once
console.log(box) //sid
box= 'pri' //changed value only possible coz its not getting declared again
console.log(box) //pri

console.log(1/0) //Infinity type -> number
console.log( Infinity ); // Infinity
console.log(box/2) //NaN type -> number
console.log(box ** 0) //1
console.log(box3) //undefined but 
console.log(box3/ 2) // undefined/number == NaN
console.log(box3** 0) // 1
console.log(box++) // NaN
// So, if there’s a NaN somewhere in a mathematical expression, it propagates to the whole result (there’s only one exception to that: NaN ** 0 is 1).

console.log((String(box2)))
// console.log(typeof(NaN(box)))
console.log(Number(box))
console.log(Boolean(box))

/*
Note that if any of the operands is a string, then the other one is converted to a string too.
The binary + is the only operator that supports strings in such a way. Other arithmetic operators work only with numbers and always convert their operands to numbers.
String+ Number = String
The plus + exists in two forms: the binary form that we used above and the unary form.
The unary plus or, in other words, the plus operator + applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.
The unary plus or, in other words, the plus operator + applied to a single value, doesn’t do anything to numbers. But if the operand is not a number, the unary plus converts it into a number.
It actually does the same thing as Number(...), but is shorter. 
*/
console.log("6"/"3")// 2 ie converts automatically in number
console.log("1" + 2); // "12" 
console.log(2 + 2 + "1"); // "41" and not "221"
console.log("1" + 2 + 2); // "122" and not "14"
console.log(6 - "2"); // 4, converts '2' to a number
console.log("6" / "2"); // 3, converts both operands to numbers

let x = 1;
x = -x; 
console.log( x ); //-1

console.log("" + 1 + 0); // "10" (1)
console.log("" - 1 + 0); // -1 (2)
console.log(true + false); // 1
console.log(6 / "3"); // 2
console.log("2" * "3"); // 6
console.log(4 + 5 + "px"); // "9px"
console.log("$" + 4 + 5); // "$45"
console.log("4" - 2); // 2
console.log("4px" - 2); // NaN
console.log("  -9  " + 5); // "  -9  5" (3)
console.log("  -9  " - 5); // -14 (4)
console.log(null + 1); // 1 (5)
console.log(undefined + 1); // NaN (6)
console.log(" \t \n" - 2); // -2 (7)
/*
The addition with a string "" + 1 converts 1 to a string: "" + 1 = "1", and then we have "1" + 0, the same rule is applied.
The subtraction - (like most math operations) only works with numbers, it converts an empty string "" to 0.
The addition with a string appends the number 5 to the string.
The subtraction always converts to numbers, so it makes " -9 " a number -9 (ignoring spaces around it).
null becomes 0 after the numeric conversion.
undefined becomes NaN after the numeric conversion.
Space characters are trimmed off string start and end when a string is converted to a number. Here the whole string consists of space characters, such as \t, \n and a “regular” space between them. So, similarly to an empty string, it becomes 0.
 */

console.log( 'Z' > 'A' ); // true
console.log( 'Glow' > 'Glee' ); // true
console.log( 'Bee' > 'Be' ); // true

/*
The algorithm to compare two strings is simple:

Compare the first character of both strings.
If the first character from the first string is greater (or less) than the other string’s, then the first string is greater (or less) than the second. We’re done.
Otherwise, if both strings’ first characters are the same, compare the second characters the same way.
Repeat until the end of either string.
If both strings end at the same length, then they are equal. Otherwise, the longer string is greater.
In the first example above, the comparison 'Z' > 'A' gets to a result at the first step.

The second comparison 'Glow' and 'Glee' needs more steps as strings are compared character-by-character:

G is the same as G.
l is the same as l.
o is greater than e. Stop here. The first string is greater.

The comparison algorithm given above is roughly equivalent to the one used in dictionaries or phone books, but it’s not exactly the same.

For instance, case matters. A capital letter "A" is not equal to the lowercase "a". 
Which one is greater? The lowercase "a". 
Why? Because the lowercase character has a greater index in the internal encoding table JavaScript uses (Unicode).
*/
console.log( '2' > 1 ); // true, string '2' becomes a number 2
console.log( '01' == 1 ); // true, string '01' becomes a number 1
console.log( true == 1 ); // true
console.log( false == 0 ); // true

let a = 0;
console.log( Boolean(a) ); // false
let b = "0";
console.log( Boolean(b) ); // true
console.log(a == b); // true! happens because its not strict aka use ===
console.log(a === b); // false! 

console.log( null > 0 );  // (1) false
console.log( null == 0 ); // (2) false
console.log( null >= 0 ); // (3) true
/*
The reason is that an equality check == and comparisons > < >= <= work differently. 
Comparisons convert null to a number, treating it as 0. That’s why (3) null >= 0 is true and (1) null > 0 is false.
On the other hand, the equality check == for undefined and null is defined such that, without any conversions, they equal each other and don’t equal anything else. 
That’s why (2) null == 0 is false.
*/

console.log( undefined > 0 ); // false (1)
console.log( undefined < 0 ); // false (2)
console.log( undefined == 0 ); // false (3)
/*
Comparisons (1) and (2) return false because undefined gets converted to NaN and NaN is a special numeric value which returns false for all comparisons.
The equality check (3) returns false because undefined only equals null, undefined, and no other value.
 */
console.log(5 > 4); // true
console.log("apple" > "pineapple"); // false
console.log("2" > "12"); // true
console.log(undefined == null); // true
console.log(undefined === null); // false
console.log(null == "\n0\n"); // false
console.log(null === +"\n0\n"); // false
/*
Obviously, true.
Dictionary comparison, hence false. "a" is smaller than "p".
Again, dictionary comparison, first char "2" is greater than the first char "1".
Values null and undefined equal each other only.
Strict equality is strict. Different types from both sides lead to false.
Similar to (4), null only equals undefined.
Strict equality of different types.

== doesnt check type for it 0,false,null, undefined is all same aka 0 ==false -> true.
=== checks types aka 0 ===false -> not true.
 */

/*
The important difference between them is that:

|| returns the first truthy value.
&& returns the first Falsy value.
?? returns the first defined value.
In other words, || doesn’t distinguish between false, 0, an empty string "" and null/undefined. 
They are all the same – falsy values. If any of these is the first argument of ||, then we’ll get the second argument as the result.
 */
let height = 0;
console.log( 1 && 2 && null && 3 ); // null
console.log( 1 && 2 && 3 ); // 3, the last one
console.log(height || 100); // 100
console.log(height ?? 100); // 0
console.log(height ?? null ?? 100); // 0
console.log(height && 100); // 0