const contact={
    "name":"John",
    "age":30,
    "city":"New York"
}
// console.log(contact,"\n");
console.log(typeof(contact)); //object
console.log(typeof(contact.age));
contact["Pincode"]=20101045012;
contact["Gender"]="Male"
console.table(contact);
console.log(contact.city+contact.name);
console.log(contact.age+contact.Gender);
console.log(contact['name']);

// const obj1={
//     'name':["Siddhant","Priyanka","Muchkin", "Shashank"],
//     'age':[21,22,23,20],
//     "city":["New York","Bangalore","Delhi","London"],
//     "Phone Number":[9876543210, 1234567890]
// }
// // console.log(typeof (obj1.name));
// // console.log(typeof (obj1.city));
// // console.log(obj1.name===obj1.city);


// let arr1= Array.from(obj1.age);
// // console.log(typeof arr1);
// let arr2 = Array.from(obj1.name);
// // console.log(typeof arr2);

// const arr3= arr2.concat(arr1);
// console.log("concatenated array: ",arr3);
 

// // for (let i = 0; i < obj1.name.length; i++) {
// //     for (let j = 0; j < obj1.name[i].length; j++) { // Added '<' in the inner loop condition
// //         console.log(obj1.name[i][j]); // Print each character of the name
// //     }
// // }

// // console.log(Object.values(obj1),"\n\n"); // Prints all values as an array
// // console.log(Object.entries(obj1),"\n\n"); //Prints all key-value pairs as an array of arrays
// // console.log(Object.keys(obj1)); // Returns an array containing the names of the object’s properties


// // for (let [key, value] of Object.entries(obj1)){
// //     if(Array.isArray(value)){
// //         console.log(`${key}: ${value}`);
// //     }else{
// //         console.log(`${key}: "${value}"`);
// //     }
// // }


