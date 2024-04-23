#include <iostream>
using namespace std;
//NAIVE CODE
int getlargest1(int arr[],int n){
    for(int i=0;i<n;i++){
        bool flag=true;
        for(int j=0;j<n;j++){
            if(arr[j]>arr[i]){
                flag=false;
                break;
            }
        }
        if(flag==true)
            return i;
    }
    return -1;
}
// OPTIMIZED
int getlargest2(int arr[],int n){
    int templarge=0;
    for(int i=1;i<n;i++){
        if(arr[i]>arr[templarge])
        templarge=i;
    }
    return templarge;
}
int main()
{
    int arr[]={5,8,26,15,100,999};
    cout<<getlargest1(arr,6)<<endl;
    cout<<getlargest2(arr,6)<<endl;
    return 0;
}

