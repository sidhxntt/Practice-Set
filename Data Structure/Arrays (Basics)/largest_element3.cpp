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
int getlargest(int arr[],int n){
    sort(arr,n);
    return arr[n-1];
}
int getsecondlargest(int arr[],int n){
    sort(arr,n);
    return arr[n-2];
}
int getsmallest(int arr[],int n){
    sort(arr,n);
    return arr[0];
}
int getsecondsmallest(int arr[],int n){
    sort(arr,n);
    return arr[1];
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
    traversal(arr,n);
    cout<<endl;
    cout<<"Largest Element is: "<<getlargest(arr,n)<<endl;
    cout<<"Second Largest Element is: "<<getsecondlargest(arr,n)<<endl;
    cout<<"Smallest Element is: "<<getsmallest(arr,n)<<endl;
    cout<<"Second Smallest Element is: "<<getsecondsmallest(arr,n)<<endl;

 return 0;
}