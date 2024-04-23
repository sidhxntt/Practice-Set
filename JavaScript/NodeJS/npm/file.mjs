import lodash from "lodash"

const items =[1,[2,[3,[4,[5]]]]]
const array=lodash.flattenDeep(items)
console.log("array",array); //
console.log("Siddhant");