#include<iostream>
using namespace std;
void traversal(int arr[],int n){
    for (int i=0;i<n;++i){
        cout<<arr[i]<<" ";
    }
}
void sort(int arr[],int n){
    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-1;j++){
            if(arr[j]>arr[j+1])
            swap(arr[j],arr[j+1]);
        }
    }
}
int get_minimum_sum_difference(int arr[],int n){
    sort(arr,n);
    int res= INT_MAX;
    for(int i=1;i<n;i++){
        res=min(res,arr[i]-arr[i-1]);
    }
    return res;
}
int get_maximum_sum_difference(int arr[],int n){
    sort(arr,n);
    return arr[n-1]-arr[0];
}
int main()
{
    int n;
    cout<<"Enter the size of array: ";
    cin>>n;
    int *arr=new int(n);
    cout<<"Enter the element:\n";
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    sort(arr,n);
    traversal(arr,n);
    cout<<endl;
    cout<<"Minimum difference among all the elements are: "<<get_minimum_sum_difference(arr,n)<<endl;
    cout<<"Maximum difference among all the elements are: "<<get_maximum_sum_difference(arr,n)<<endl;
 return 0;
}