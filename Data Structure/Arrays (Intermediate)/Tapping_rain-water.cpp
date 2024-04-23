// Given an array of N non-negative integers arr[ ] representing an elevation map where the width of each bar is 1, 
// compute how much water it is able to trap after rain.
// Note: The array elements represent the height of the bars.
// Input: arr[]   = {3, 0, 2, 0, 4}
// Output: 7
// Explanation: Structure is like below.
// We can trap “3 units” of water between 3 and 2,
// “1 unit” on top of bar 2 and “3 units” between 2 and 4.
#include<iostream>
using namespace std;
int get_max_water_trapped(int arr[],int n){
    int res=0;
    for(int i=1;i<n-1;i++){
        int left_max=arr[i];
        for(int j=0;j<i;j++){
            left_max=max(left_max,arr[j]);
        }
        int right_max=arr[i];
        for(int j=i+1;j<n;j++){
            right_max=max(right_max,arr[j]);
        }
        res=res+(min(left_max,right_max)-arr[i]);
    }
    return res;
}
int main()
{
     int arr[] = {3, 0, 2, 0, 4}, n = 5;
     cout<<get_max_water_trapped(arr, n);
 return 0;
}