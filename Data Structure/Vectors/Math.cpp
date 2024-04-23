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


vector<int> addition_of_vectors(const vector<vector<int> >& v){
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

vector<int> multiplication_of_vectors(const vector<vector<int> >& v){
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

    vector<vector<int> > allVectors;

    for(int i=0; i<choice; i++) {
        vector<int> vec = make_vector();
        cout<<"Vector "<<i+1<<": ";
        traversal(vec);
        cout<<endl;
        allVectors.push_back(vec);
    }
    if(allVectors[0]!=allVectors[1]){
        throw invalid_argument("Vectors must have the same size.");
    } 
    // Perform addition of vectors
    vector<int> result1 = addition_of_vectors(allVectors);
    cout << "Sum of vectors: ";
    traversal(result1);
    cout << endl;

     // Perform subtraction of vectors
    vector<int> result2 = subtraction_of_vectors(allVectors);
    cout << "Difference of vectors: ";
    traversal(result2);
    cout << endl;

     // Perform multiplication of vectors
    vector<int> result3 = multiplication_of_vectors(allVectors);
    cout << "Product of vectors: ";
    traversal(result3);
    cout << endl;

     // Perform division of vectors
    vector<int> result4 = division_of_vectors(allVectors);
    cout << "Questient of vectors: ";
    traversal(result4);
    cout << endl;

    return 0;
}
