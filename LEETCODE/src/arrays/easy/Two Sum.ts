// function twoSum(nums: number[], target: number): number[] {
//     for (let i = 0; i < nums.length; i++) {
//          for (let j = i + 1; j < nums.length; j++) {
//              if (nums[i] + nums[j] === target) {
//                  return [i, j];
//              }
//          }
//      }
//  }
 
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>(); //  If nums = [2, 7, 11, 15], the map will store {2 → 0, 7 → 1, 11 → 2, 15 → 3}.

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        
        map.set(nums[i], i);
    }

    throw new Error("No two sum solution found");
}

// Time complexity: O(n)
// Space complexity: O(n)
const arr = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(arr, target)); // [0, 1]