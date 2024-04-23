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


vector<int> addition_of_vectors(const vector<vector<int>>& v){
    vector<int> result(v[0].size(), 0); // Initialize result vector with size of first vector and all elements as 0

    for(auto i = 0; i < v.size(); ++i){
          const vector<int>& vec = v[i]; // Retrieve each vector by index i OR changing 2d to 1d
        for(int i = 0; i < vec.size(); ++i) {
            result[i] += vec[i]; // Add corresponding elements from all vectors
        }
    }
    return result;
}

vector<int> subtraction_of_vectors(const vector<vector<int> >& v){
    vector<int> result(v[0].size(),0);

    for(auto i=0; i<v.size(); i++){
        const vector<int> vec = v[i];
        for(auto j=0;j<vec.size();j++){
            result[i] -=vec[i];
        }
    }
    return result;
}

vector<int> mulyiplication_of_vectors(const vector<vector<int>>& v){
    vector<int> result(v[0].size(), 0); // Initialize result vector with size of first vector and all elements as 0

    for(auto i = 0; i < v.size(); ++i){
          const vector<int>& vec = v[i]; // Retrieve each vector by index i OR changing 2d to 1d
        for(int i = 0; i < vec.size(); ++i) {
            result[i] *= vec[i]; // Add corresponding elements from all vectors
        }
    }
    return result;
}

vector<int> division_of_vectors(const vector<vector<int> >& v){
    vector<int> result(v[0].size(),0);

    for(auto i=0; i<v.size(); i++){
        const vector<int> vec = v[i];
        for(auto j=0;j<vec.size();j++){
            result[i] /=vec[i];
        }
    }
    return result;
}
int main() {
    int choice;
    cout<<"Enter the Number of vectors you want: ";
    cin>>choice;

    vector<vector<int>> allVectors;

    for(int i=0; i<choice; i++) {
        vector<int> vec = make_vector();
        cout<<"Vector "<<i+1<<": ";
        traversal(vec);
        cout<<endl;
        allVectors.push_back(vec);
    }

    // Perform addition of vectors
    vector<int> sum = addition_of_vectors(allVectors);
    cout << "Sum of vectors: ";
    traversal(sum);
    cout << endl;

     // Perform subtraction of vectors
    vector<int> sum = subtraction_of_vectors(allVectors);
    cout << "Sum of vectors: ";
    traversal(sum);
    cout << endl;

     // Perform multiplication of vectors
    vector<int> sum = mulyiplication_of_vectors(allVectors);
    cout << "Sum of vectors: ";
    traversal(sum);
    cout << endl;

     // Perform division of vectors
    vector<int> sum = division_of_vectors(allVectors);
    cout << "Sum of vectors: ";
    traversal(sum);
    cout << endl;

    return 0;
}
