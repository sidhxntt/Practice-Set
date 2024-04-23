#include<iostream>
using namespace std;
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
void leftrotateone(int arr[],int n){
    int firstelement=arr[0];
    for(int i=1;i<n;i++){
        arr[i-1]=arr[i];
    }
    arr[n-1]=firstelement;
}
void leftroate(int arr[],int n,int d){
    for(int i;i<d;i++){
        leftrotateone(arr,n);
    }
}
void rightrotateone(int arr[],int n){
    int lastelement=arr[n-1];
    for(int i=n-1;i>=0;i--){
        arr[i]=arr[i-1];
    }
    arr[0]=lastelement;
}
void rightroate(int arr[],int n,int d){
    for(int i=0;i<d;i++) {
        rightrotateone(arr,n);
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
    cout<<"Enter the roration position: ";
    cin>>d;
    leftroate(arr,n,d);
    cout<<"\nLeft rotation: "<<endl;
    traversal(arr,n);
    rightroate(arr,n,d);
    cout<<"\nRight rotation: "<<endl;
    traversal(arr,n);
 return 0;
}