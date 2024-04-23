#include<iostream>
using namespace std;
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
bool checksort(int arr[],int n){
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(arr[j]<arr[i]){
                return false;
            }
        }
    }
    return true;
}

int main()
{
    int n;
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
    cout<<"Array is sort or not: "<<checksort(arr,n)<<endl;

 return 0;
}