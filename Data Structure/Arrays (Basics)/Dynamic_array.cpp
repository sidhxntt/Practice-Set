#include <iostream>
using namespace std;
//traversal 
int traversal(int arr[],int n){
     for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
//searching 
int search(int arr[],int n, int x){
    for (int i = 0; i <= n-1 ; i++) {
        if(arr[i]==x)
        return i+1;
    }
    return -1;
}
//inserting element
int insert(int arr[],int n,int pos,int y){
    // if(n==cap){
    //     int full=n;
    //     return full;
    // }
    int index=pos-1;
    for(int i=n-1;i>=index;i--){
        arr[i+1]=arr[i];
    }
   arr[index]=y;
   return n+1;
}

int main()
{   int n,x,y,pos;
    int*arr=new int(n);
    cout<<"Enter the size of array: "<<endl;
    cin>>n;
    cout<<"Enter numbers: "<<endl;
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    cout<<"Array: ";
    traversal(arr,n);
    cout<<"\nEnter the number to be searched: "<<endl;
    cin>>x;
    cout<<"Your element is in position: "<<search(arr,n,x)<<endl;
    cout<<"Enter a new elemnent: ";
    cin>>y;
    cout<<"Enter the position of the new element to be inserted: ";
    cin>>pos;
    cout<<"New Array: \t";
    for(int i=0;i<n;i++){
        cout<<insert(arr,n,pos,y)<< " ";
    }
 return 0;
}