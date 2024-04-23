#include<iostream>
using namespace std;
void traversal (int arr[],int n){
    for(int i=0;i<n;i++){
        cout<<arr[i]<<"\t";
    }
}
int pop_function(int arr[],int n){
    int temp=0;
    for(int i=0;i<n-1;i++)
    {  temp=arr[n-1]; //copy the next element to temporary variable  
        }
    return temp;
    n--;
}
void delete_from_end(int arr[], int& n) {
    if (n > 0) {
        n--; // Decrementing the size of the array
    }
}

int main(){       
    int n;
    cout<<"Enter the size of the array: ";
    cin>>n;
    int arr[n];
    cout << "Enter elements of the array:" << endl; 
    for(int i=0;i<n;i++){
        cin>>arr[i];
    }
    traversal(arr,n);
    cout<<endl<<"The popped element is : "<<pop_function(arr,n)<<endl;
    delete_from_end(arr,n);
    cout<<endl<<"After deleting from end, new array becomes : "<<endl;
    traversal(arr,n);
 return 0;
}