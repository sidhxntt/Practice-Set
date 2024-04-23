const prompt = require('prompt-sync')();
//ARRAY-1
const size1 = parseInt(prompt("Enter the size of the array 1: "));
const arr1 = [];
for (let i = 0; i < size1; i++) {
    let element = parseInt(prompt(`Enter element ${i + 1}: `));
    arr1.push(element);
}
//ARRAY-2
const size2 = parseInt(prompt("Enter the size of the array 2: "));
const arr2 = [];
for (let i = 0; i < size2; i++) {
    let element = parseInt(prompt(`Enter element ${i + 1}: `));
    arr2.push(element);
}
//Merging two Arrays
const arr=arr1.concat(arr2);

console.log("Given Array is: ", arr);
console.log("Length of the Array: ", arr.length);

const key = parseInt(prompt("Enter the Key to be found: "));

//Searching
function keyFinding(arr, key) {
    for (let i = 0; i < arr.length; i++) {
        if (key === arr[i]) {
            return `Your ${key} is at index ${i+1}`;
        }
    }
    return "Key not Found";
}
console.log(keyFinding(arr, key));

//Sorting
console.log(`Ascending Order of the Array: `, arr.sort((a, b) => a - b));
console.log(`Descending Order of the Array: `, arr.sort((a, b) => b-a));
console.log("Reverse of your array is: ",arr.reverse());

//array to string conversion
let str=arr.toString()
console.log(str);
console.log(typeof(str));

//removal of last element;
let popped_element=arr.pop();
console.log("Popped Element: ",popped_element,"\nRemaining Elements in the Array: ",arr);

//Pushing last element
let new_element= parseInt(prompt("Enter the new element you want  to add into the array :"));
arr.push(new_element);
console.log("Array after adding an element: ",arr);

//removal of first element;
arr.shift();
console.log("Shifted Element: ",arr.shift(),"\nRemaining Elements in the Array: ",arr);

//Adding elements to beginning of the array
arr.unshift(-5,-10);
console.log("Updated Array After Adding Elements to Beginning: ",arr);

console.log(arr[0]);
// ________________________________________________________________________________________________________________________
// Splicing the array
let deleted_elements =arr.splice(2,3,1000,2000,3000,5000,6000,7000); //start from index 2 and remove 3 elements
console.log("After splicing: \n",arr,"Deleted Elements: ",deleted_elements);
//Slicing the array (SUBARRAY)
let subarray=arr.slice(1,4);  //from index 1 to 3rd index
console.log("Subarray: ",subarray);