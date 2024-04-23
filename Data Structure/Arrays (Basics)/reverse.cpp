#include<iostream>
using namespace std;
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
void reverse(int arr[],int n){
    int low=0;
    int high=n-1;
    while(low<high){
        int temp=arr[low];
        arr[low]=arr[high];
        arr[high]=temp;
        low++;
        high--;
    }
}
int main()
{
     int n,d;
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
    reverse(arr,n);
    cout<< "Reversed Array: " ;  //printing reversed array.
    traversal(arr , n );
 return 0;
}