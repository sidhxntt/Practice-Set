function removeDuplicates(nums: number[]): number {
    let map = new Map<number, boolean>(); 
    let k = 0; 

    for (let i = 0; i < nums.length; i++) {
        if (!map.has(nums[i])) {  
            map.set(nums[i], true); 
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
}

// Time complexity: O(n)
// Space complexity: O(n)
const array = [1, 1, 2];
console.log(removeDuplicates(array)); // 2
console.log(array); // [1, 2, 2]
