#include<iostream>
using namespace std;
//normal traversal
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
//reversal traveral
void reverse_traversal(int arr[],int n){
    for(int i=n-1;i>=0;i--){
        cout<<arr[i]<<" ";
    }
}
int binarysearch(int arr[],int n, int x){
    int low=0;
    int high=n-1;
    while(low<=high){
        int mid=(low+high)/2;
        if (arr[mid]==x)
            return mid;
        else if(arr[mid]>x)
            high=mid-1;
        else 
            low=mid+1;
        
    }
    return -1;
}
int main()
{
    int n,x;
    cout<<"Enter the size of array: ";
    cin>>n;
    int *arr=new int(n);
   cout<<"enter elements in an array "<<endl;
    for(int i=0;i<n;i++){
                cin >> arr[i];
    } 
    cout<<"ARRAY: ";
    traversal(arr,n);
    cout<<endl;
     cout<<"REVERSE ARRAY: ";
    reverse_traversal(arr,n);
    cout<<endl;
    cout<<"Enter the element to be found: ";
    cin>>x;
    cout<<"Element position is"<<binarysearch(arr,n,x);
 return 0;
}
