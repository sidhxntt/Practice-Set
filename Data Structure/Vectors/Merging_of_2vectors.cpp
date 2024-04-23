#include<iostream>
#include<vector>
using namespace std;


void display_vector(const vector<int>v){
    int n=v.size();
    for(int i=0;i<n;i++){
        cout<<v[i]<<"\t";
    }
}

void making_vector1(vector<int>&v1){
    int n;
    cout<<"Enter size: ";
    cin>>n;
    for(int i=0;i<n;i++){
        int element;
        cout<<"Enter element"<<i+1<<": ";
        cin>>element;
        v1.push_back(element);
    }
    display_vector(v1);
}

void making_vector2(vector<int>&v2){
    int n;
    cout<<"Enter size: ";
    cin>>n;
    for(int i=0;i<n;i++){
        int element;
        cout<<"Enter element"<<i+1<<": ";
        cin>>element;
        v2.push_back(element);
    }
    display_vector(v2);
}


vector<int> merging_vectors(vector<int>&v1,vector<int>&v2){
    vector<int> merged_vector;
    merged_vector.reserve(v1.size() + v2.size()); //Reserving memory to avoid reallocations
    merged_vector.insert(merged_vector.begin(),v1.begin(),v1.end());  //Inserting elements of first vector into the beginning of merged vector
    merged_vector.insert(merged_vector.end(),v2.begin(),v2.end()); 
    return  merged_vector;
}

void bubblesort(vector<int>&result){
    int n = result.size();
    for(int i=0;i<n-1;i++){
        for(int j=0;j<n-i-1;j++){
             if (result[j] > result[j + 1]) {
                swap(result[j], result[j + 1]);
            }
        }  
    }
}

void intersection(vector<int>&result){
    bubblesort(result);
    int n=result.size();
    for(int i=0;i<n;i++){
        if(result[i]==result[i+1]){
            cout<<result[i]<<" ";
        }
    }
}

void union_of_vectors(vector<int>&result){
    bubblesort(result);
    int n =result.size();
    for(int i=0;i<n;i++){
        if(result[i]!=result[i+1]){
            cout<<result[i]<<" ";
        }
    }
}

int main()
{
    vector<int> v1,v2;

    making_vector1(v1);
    cout<<endl;
    making_vector2(v2);
    cout<<endl;
    merging_vectors(v1,v2).shrink_to_fit();//Shrinking the capacity of the vector to its actual size after use
    cout<<endl<<"Merged Vector: ";
    vector<int> result= merging_vectors(v1,v2);
    display_vector(result);
    cout<<endl<<"Sorted Merged Vector: ";
    bubblesort(result);
    display_vector(result);
    cout<<endl<<"Intersection of the vectors: ";
    intersection(result);
    cout<<endl<<"Union of the vectors: ";
    union_of_vectors(result);
 return 0;
}