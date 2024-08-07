const arr1: number[] = [1, 2, 3, 4, 5];
const arr2: string[] = ["a", "b", "c", "d", "e"];
const arr3: number[] = [6,7,8,9,10,90];
const arr4: number[] = [16,17,18,19,110,190];

// const ArrayFunction = (a1: number[], a2: string[], a3: number[], a4: number[]): void => {
//     console.log(a1);
//     console.log(a2);
//     console.log(a3);
//     console.log(a4);
// };
const ArrayFunction1 = (...args:(string[]|number[])[])=>{
   args.map(element=>{
    console.log(element);
   })
}

const ArrayFunction2 = (...args:(string[]|number[])[])=>{
    const [...arr] = args
    console.log(arr)
}


ArrayFunction1(arr1,arr2,arr3,arr4)
console.log("\n")
ArrayFunction2(arr1,arr2,arr3,arr4)