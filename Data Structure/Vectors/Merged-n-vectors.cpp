#include<iostream>
#include<vector>
using namespace std;

void traversal(const vector<int>& v){
    for(int i = 0; i < v.size(); i++){
        cout << v[i] << "\t";
    }
}


vector<int> make_vector(){
    int n;
    cout << "Enter the size of Vector: ";
    cin >> n;
    
    vector<int> v;
    v.reserve(n); // Reserve space for efficiency
    
    for(int i = 0; i < n; i++){
        int element;
        cout << "Enter element " << i + 1 << ": ";
        cin >> element;
        v.push_back(element);   
    }
    
    return v;
}
    // changing 2d vector (allVectors) to 1d for easy traversal
vector<int> merge_vectors(const vector<vector<int> >& vectors) {
    vector<int> merged_vector;

    for (auto i = 0; i < vectors.size(); ++i) {
        const vector<int>& v = vectors[i];
        merged_vector.insert(merged_vector.end(), v.begin(), v.end());
    }

    return merged_vector;
}

int main()
{
    int choice;
    cout << "How many Vectors do you want?: ";
    cin >> choice;
    
    vector<vector<int> > allVectors;
    
    for(int i = 0; i < choice; i++){
        vector<int> vec = make_vector();
        cout << "Vector: ";
        traversal(vec);
        cout << endl;
        allVectors.push_back(vec);
    }
    
    vector<int> result = merge_vectors(allVectors);
    cout << "Merged Vector is : \n";
    traversal(result);
    cout << endl;

    return 0;
}
