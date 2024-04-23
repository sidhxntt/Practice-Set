//Same as minimum difference problem but just in m groups
#include<iostream>
using namespace std;
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
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
int get_minimum_difference_in_groups(int arr[],int n,int m){
    if(m>n)
        return -1;
    sort(arr,n);
    int res=arr[m-1]-arr[0];
    for(int i=0;(i+m-1)>n;i++){
        res=min(res,arr[i+m-1]-arr[0]);
    }
    return res;
}
int main()
{
    int n,m;
    cout<<"Enter the size of array: ";
    cin>>n;
    int *arr=new int(n);
    cout<<"Enter the element:\n";
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    traversal(arr,n);
    cout<<"\nEnter the value of pairing: ";
    cin>>m;
    cout<<"Minimum diffrence in pairings are: "<<get_minimum_difference_in_groups(arr,n,m);
    
 return 0;
}