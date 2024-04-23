#include<iostream>
using namespace std;
void sort(int arr[],int n){
    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-1;j++){
            if(arr[j]>arr[j+1])
            swap(arr[j],arr[j+1]);
        }
    }
}
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
void get_small_element_subarray(int arr[],int n,int k){
    sort(arr,n);
    for(int i=0;i<=k-1;i++){
        cout<<arr[i]<<" ";
    }
   
}
void get_large_element_subarray(int arr[],int n,int p){
    sort(arr,n);
    for(int i=n-1;i>n-1-p;i--){
        cout<<arr[i]<<" ";
    }
    
}
int main()
{
int n,k,p;
    int*arr=new int(n);
    cout<<"Enter the size of array: "<<endl;
    cin>>n;
    cout<<"Enter numbers: "<<endl;
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    cout<<"Array: ";
    traversal(arr,n);
    cout<<endl;
    cout<<"Enter the size of subarray filled with smaller elements: ";
    cin>>k;
    cout<<"Subarray: ";
    get_small_element_subarray(arr,n,k);
    cout<<"\n";
    cout<<"Enter the size of subarray filled with larger elements:";
    cin>>p;
    cout<<"Subarray: ";
    get_large_element_subarray(arr,n,p);  
 return 0;
}