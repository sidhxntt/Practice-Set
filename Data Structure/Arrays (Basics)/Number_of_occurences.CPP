#include<iostream>
using namespace std;

int number_of_duplcates(int arr[],int n){
    int count=0;
    for(int i=0;i<n;i++){
        for(int j=i+1;j<n;j++){
            if(arr[i]==arr[j]){
                count++;
            }
        }
    }
    return count;
}
int main()
{
    int n;
    cout<<"Enter the size of array:";
    cin>>n;
    int*arr=new int(n);
    cout<<"Enter elements in array:"<<endl;
    for(int i=0;i<n;++i) {
        cin >> arr[i];
        }
    cout<<"Number of occurence of duplicates: "<<number_of_duplcates(arr,n)<<endl;
 return 0;
}