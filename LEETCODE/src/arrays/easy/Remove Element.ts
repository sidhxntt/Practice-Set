function removeElement(nums: number[], val: number): number {
    const map = new Map<number, boolean>(); 
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            map.set(nums[i], true); 
            nums[k] = nums[i];  
            k++;
        }
    }

    return k;
}

// Time complexity: O(n)
// Space complexity: O(n)

const arr1 = [3, 2, 2, 3];
const value = 3;
console.log(removeElement(arr1, value));  // Output: 2
