#include<iostream>
using namespace std;
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
int getlargest(int arr[],int n){
    int templargest=0;
    for(int i=1;i<n;i++){
        if (arr[i]>arr[templargest])
            templargest=i;
    }
     return templargest+1;
}
int getsecondlargest(int arr[],int n){
    int res=-1;
    int largest=getlargest(arr,n);
    for(int i=0;i<n;i++){
        if(arr[i]!=arr[largest]){
            if(res==-1)
            res=i;
            else if(arr[i]>arr[res])
            res=i;
        }
    }
    return res;
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
    cout<<"The largest element position is: "<<getlargest(arr,n)<<endl; 
    cout<<"The Second largest element position is: "<<getsecondlargest(arr,n)<<endl;
 return 0;
}