const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
const f = 6;

const Operation = (...args: number[]): number[] => {
    const summation = args.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0); 
    const product = args.reduce((accumulator, currentValue) => {
        return accumulator * currentValue;
    }, 1); 

    return [summation, product];
}

const [summation, product] = Operation(a, b, c, d, e, f);
console.log(`The Sum is: ${summation}`); 
console.log(`The Product is: ${product}`); 

export default Operation