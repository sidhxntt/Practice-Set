#include<iostream>
#include<vector>
using namespace std;

void traversal(vector<int>& v){
    for(int i=0;i<v.size();i++){
        cout<<v[i]<<"\t";
    }
}
vector<int> make_vector(){
    int n;
    cout<<"Enter the size of vector: ";
    cin>>n;

    vector<int> v;
    v.reserve(n);

    cout<<"Enter the elements of vector: ";
    for(int i=0;i<n;i++){
        int elements;
        cout<<"Enter Element "<<i+1<<": ";
        cin>>elements;
        v.push_back(elements);
    }
    return v;
}
vector<int> addition(vector<vector<int> > vec){
    vector<int> result(vec[0].size(), 0);

    for(auto i = 0; i < vec.size(); ++i) {
        for (auto j = 0; j < vec[i].size(); ++j){
            result[i] += vec[i];
        }
     } 
     return result;  
}

int main()
{
    int choice;
    cout<<"Enter the Number of vectors you want: ";
    cin>>choice;

    vector<vector<int> > allVectors;

    for(int i=0;i<choice;i++){
        vector<int>vec=make_vector();
        cout<<"Vector"<<choice+1<<": ";
        traversal(vec);
        cout<<endl;
        allVectors.push_back(vec);
    }
    
    vector<int> result = merge_vectors(allVectors);
    cout << "Merged Vector is : \n";
    traversal(result);
    cout << endl;

 return 0;
}