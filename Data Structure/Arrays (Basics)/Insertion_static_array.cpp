#include <iostream>
#include <cmath>
using namespace std;
//insertion
int insertion(int arr[], int n, int x, int cap, int pos){
	if(n == cap)
		return n;
	for(int i = n - 1; i >= pos-1; i--){
		arr[i + 1] = arr[i];
	}
	arr[pos-1] = x;
	return n + 1;
}    

int main(){
       int arr[5], cap = 5, n = 3;
       arr[0] = 5; 
       arr[1] = 10; 
       arr[2] = 20;
       cout<<"Before Insertion"<<endl;
       for(int i=0; i < n; i++){
       	cout<<arr[i]<<" ";
       }
       cout<<endl;
       int x = 7, pos = 2;
       n = insertion(arr, n, x, cap, pos);
       cout<<"After Insertion"<<endl;
       for(int i=0; i < n; i++){
       		cout<<arr[i]<<" ";
       } 
       return 0;
}