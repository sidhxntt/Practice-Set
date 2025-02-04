function searchInsert(nums: number[], target: number): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            return i;  // Target is found at index i
        } else if (nums[i] > target) {
            return i;  // Target should be inserted at index i
        }
    }
    return nums.length;  // If target is greater than all elements, insert at the end
}

// Example usage:
const nums = [1, 3, 5, 6];
const tar = 5;
console.log(searchInsert(nums, tar)); // Output: 2
