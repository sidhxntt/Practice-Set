const prompt = require('prompt-sync')();

const size=parseInt(prompt("Enter the size of an array: "));
let arr=[];
for (i=0; i<size; i++){
    let element=prompt(`Enter element ${i+1}: `);
    arr.push(element);
} 
console.log("\nYour entered array is :",arr);

//Sort & reverse
console.log("Sorted Array: ",arr.sort((a,b) => a-b ));
console.log("Reverse Array: ",arr.reverse());

//MAP (For operating on each element)
console.log("Mapped Array: " ,arr.map(val => val * 2));
console.log("Mapped Array: ", arr.map((val, index) => ({ value: val * 2, index: index+1 })));
//without map (for each) 
            // for(let i=0; i < arr.length ; i++){
            //     arr[i]*=2;
            //     console.log("New Array values: " + arr[i] + " New Index Value: " + (i + 1));
            // }

//Filter (for filtering any condition)
console.log("filtered array: ",arr.filter(val => val%2 == 0));
//Without Filter
                // for(let i=0;i<arr.length;i++){
                //     if(arr[i]%2==0){
                //         console.log(arr[i]);
                //     }
                // }

//Reduce (for reducing  to single value in form of summation and other mathemtical operations of elements)
console.log("Summation of Array Elements: ", arr.reduce((val1, val2) => val1 + val2));
//Without reduce
            // const sum=0;
            // for(let i=0; i<arr.length; i++){
            //     sum+=arr[i];
            // }
            // comsole.log(sum);