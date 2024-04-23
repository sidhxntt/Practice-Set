#include<iostream>
using namespace std;

void sort(int c[],int n){
    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-1;j++){
            if(c[j]>c[j+1])
                swap(c[j],c[j+1]);
         }
    }
}
void merge_arrays(int a[],int b[],int n, int m ){
    int c[m+n];
    for(int i=0;i<n;i++){
        c[i]=a[i];
    }
    for(int j=0;j<m;j++){
        c[j+n]=b[j];
    }
    sort(c,n+m); //sorting the merged array
    for(int i=0;i<n+m;i++){
        cout<<c[i]<<" ";
    }
}
int main(){
    int n,m;
    cout<<"Enter the size of Array 1: ";
    cin>>n;
    int*a=new int(n);
    cout<<"Enter elements in Array 1:\n";
    for(int i=0;i<n;i++)
        cin>>a[i];

    cout<<"Enter the size of Array 2: ";
    cin>>m;
    int*b=new int(m);
    cout<<"Enter elements in Array 2:\n";
    for(int i=0;i<m;i++)
        cin>>b[i];
    cout<<endl;
    merge_arrays(a,b,n,m);
 return 0;
}