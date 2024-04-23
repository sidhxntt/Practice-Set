#include<iostream>
#include<vector>
using namespace std;

void making_vector(vector<int>& v){
    cout<<"Enter size: ";
    int n;
    cin>>n;
    for (int i = 0; i < n; i++) {
        int element;
        cout<<"Enter element"<<i<<": ";
        cin>>element;
        v.push_back(element);
    }
}
void display_elements(const vector<int>& v){
    for(auto it=v.begin();it!=v.end();++it)
    cout<<*it<<" ";
}

// bool check_sort(const vector<int>& v) {
//     for (auto i = v.begin(); i != v.end(); ++i) {
//         for (auto j = i + 1; j != v.end(); ++j) {
//             if (*i > *j) {
//                 return false;
//             }
//         }
//     }
//     return true;
// }

bool check_sort(const vector<int>& v){
    int n= v.size();
    for(int i=0;i<n;i++){
        for(int j=i+1;i<n;j++){
            if(v[j]<v[i]){
                return false;
        }
    }
}return true;
}
    

void bubbleSort(vector<int>& vec) {
    int n = vec.size();
    for (int i = 0; i < n - 1; ++i) {
        for (int j = 0; j < n - i - 1; ++j) {
            if (vec[j] > vec[j + 1]) {
                // Swap elements if they are in the wrong order
                swap(vec[j], vec[j + 1]);
            }
        }
    }
}
int main()
{
    vector<int> vec;
    making_vector(vec);
    cout<<"\nElements in the vector are: ";
    display_elements(vec);
    if (check_sort(vec))
        cout << "\nThe elements of the vector are sorted.";
    else
        cout << "\nThe elements of the vector are not sorted.";
        cout<<endl;
    bubbleSort(vec);
    cout<<"\nAfter sorting,the elements in the vector are: ";
    display_elements(vec);

 return 0;
}