#include<iostream>
using namespace std;

void sort(int d[],int n){
    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-1;j++){
            if(d[j]>d[j+1])
                swap(d[j],d[j+1]);
         }
    }
}
void merge_arrays(int a[],int b[],int c[],int n, int m, int p){
    int d[m+n+p];
    for(int i=0;i<n;i++){
        d[i]=a[i];
    }
    for(int j=0;j<m;j++){
        d[j+n]=b[j];
    }
    for(int k=0;k<p;k++){
        d[k+n+m]=c[k];
    }
    sort(d,n+m+p); //sorting the merged array
    for(int i=0;i<n+m+p;i++){
        cout<<d[i]<<" ";
    }
}
int main(){
    int n,m,p;
    cout<<"Enter the size of Array 1: ";
    cin>>n;
    int*a=new int(n);
    cout<<"Enter elements in Array 1:\n";
    for(int i=0;i<n;i++)
        cin>>a[i];
    cout<<endl;
   
    cout<<"Enter the size of Array 2: ";
    cin>>m;
    int*b=new int(m);
    cout<<"Enter elements in Array 2:\n";
    for(int i=0;i<m;i++)
        cin>>b[i];
    cout<<endl;
   
    cout<<"Enter the size of Array 3: ";
    cin>>p;
    int*c=new int(p);
    cout<<"Enter elements in Array 3:\n";
    for(int i=0;i<p;i++)
        cin>>c[i];
    cout<<endl;
    merge_arrays(a,b,c,n,m,p);
 return 0;
}