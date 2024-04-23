#include<iostream>
#include<vector>
using namespace std;

// void making_array(int arr[], int size){
//     cout<<"Enter elements: ";
//     for(int i = 0; i < size; i++){
//         cout<<"Enter element "<< i <<": ";
//         cin >> arr[i];
//     }
// }

// int main(){
//     int size;
//     cout << "Enter size of the array: ";
//     cin >> size;
//     int arr[size];
//     making_array(arr, size);
//     // Now you can work with 'arr' as your array containing the elements.
//     return 0;
// }


void making_vector(vector<int>&v){
    int n;
    cout<<"Enter size: ";
    cin>>n;
    for(int i=0;i<n;i++){
        int element;
        cout<<"Enter element"<<i<<": ";
        cin>>element;
        v.push_back(element);
    }
}
void print_vector(const vector<int>&v){
    for(auto i=v.begin();i!=v.end();i++){
        cout<<*i<<" ";
    }
}

int greateast_element(const vector<int>&v){
    int first_element=v.front();
    for(auto i=v.begin()+1;i!=v.end();i++)
        if(*i>first_element)
            first_element=*i;
    return first_element;
}


int main()
{
    vector<int> vec;
    making_vector(vec);
    cout<<"The entered vector is: ";
    print_vector(vec);
    cout<<endl<<greateast_element(vec)<<" is the greatest element in the vector."<<endl;
 return 0;
}