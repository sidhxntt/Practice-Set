#include<iostream>
#include<vector>
using namespace std;

void traversal(vector<int>& v){
    int n=v.size();
    for(int i=0;i<n;i++){
        cout<<v[i]<<"\t";
    }
}
void make_vector1(vector<int>& v1){
    int n;
    cout<<"Enter the size of Vector1: ";
    cin>>n;
    for(int i=0;i<n;i++){
        int element;
        cout<<"Enter element: "<<i+1<<endl;
        cin>>element;
        v1.push_back(element);   
     }
    traversal(v1);
    cout<<endl;
}
void make_vector2(vector<int>& v2){
    int n;
    cout<<"Enter the size of Vector2: ";
    cin>>n;
    for(int i=0;i<n;i++){
        int element;
        cout<<"Enter element: "<<i+1<<endl;
        cin>>element;
        v2.push_back(element);   
     }
    traversal(v2);
    cout<<endl;
}
void make_vector3(vector<int>& v3){
    int n;
    cout<<"Enter the size of Vector3: ";
    cin>>n;
    for(int i=0;i<n;i++){
        int element;
        cout<<"Enter element: "<<i+1<<endl;
        cin>>element;
        v3.push_back(element);   
     }
    traversal(v3);
    cout<<endl;
}
vector<int> merge_vectors(const vector<int>& v1, const vector<int>& v2, const vector<int>& v3){
    vector<int> merged_vector;
    merged_vector.reserve(v1.size() + v2.size() + v3.size()); 
    merged_vector.insert(merged_vector.begin(),v1.begin(),v1.end());
    merged_vector.insert(merged_vector.end(),v2.begin(),v2.end());
    merged_vector.insert(merged_vector.end(),v3.begin(),v3.end());
    return merged_vector;
}

int main()
{
    // Task 1A
    vector<int> v1;
    make_vector1(v1);

    // Task 1B
    vector<int> v2;
    make_vector2(v2);

    // Task 1C
    vector<int> v3;
    make_vector3(v3);

    // Task 2
    vector<int> result = merge_vectors(v1, v2, v3);
    cout << "Task 2 Resultant Vector is : \n";
    traversal(result);
    cout << endl;
 return 0;
}