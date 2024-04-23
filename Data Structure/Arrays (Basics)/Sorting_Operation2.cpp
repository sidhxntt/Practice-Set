//Sorting even and odd
#include<iostream>
using namespace std;
void traversal(int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<" ";
    }
}
void reverse_traversal(int arr[],int n){
    for(int i=n-1;i>=0;i--){
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

void sort_even_and_odd(int arr[],int n){
    int temp[n],i=0;
    for(int j=0;j<n;j++){
        if(arr[j]%2==0){
           temp[i]=arr[j];
            i++; 
        }    
    }
    for(int j=0;j<n;j++){
        if(arr[j]%2!=0){
           temp[i]=arr[j];
            i++; 
        }    
    }
    for(int j=0;j<n;j++)
        arr[j]=temp[j];
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
    cout<<"REVERSE ARRAY: ";
    reverse_traversal(arr,n);
    cout<<endl;
    sort(arr,n);
    cout<<"Sorted array: ";
    traversal(arr,n);
    cout<<endl;
    cout<<"REVERSE SORTED ARRAY: ";
    reverse_traversal(arr,n);
    cout<<endl;
    sort_even_and_odd(arr,n);
    cout<<"Sorted even and odd elements: ";
    traversal(arr,n);
    cout<<endl;
    cout<<" REVERSED Sorted even and odd elements: ";
    reverse_traversal(arr,n);
 return 0;
}