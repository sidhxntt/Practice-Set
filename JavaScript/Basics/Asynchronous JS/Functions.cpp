#include<iostream>
using namespace std;

int add(int a, int b, int c, int d) {
    return a + b + c + d;  // Function to add four numbers
}

void display(int res) {
    cout << "The sum of the given numbers is: " << res << endl;  // Display function to print result
}

int main() {
    int x = 5, y = 10, z = 20, w = 30;
     //  Calling the 'display' function with the returned value from 'add' function. 
    //  Not passing add function as an arguement because it returns a value and can be used directly in calling function
    display(add(x, y, z, w));   
    return 0;
}
// _____________________________________________________________________________________________________________________________
// SAME EXAMPLE IN FUNCTION AS ARGUEMENT NOW
#include<iostream>
using namespace std;

int add(int a, int b, int c, int d) {
    return a + b + c + d;  // Function to add four numbers
}

void display(int(*function)(int, int, int, int), int x, int y, int z, int w) {
    int res = function(x, y, z, w);  // Call the provided function with arguments
    cout << "The sum of the given numbers is: " << res << endl;  // Display function to print result
}

int main() {
    int x = 5, y = 10, z = 20, w = 30;
    display(add, x, y, z, w);  // Passing the add function as an argument to display
    return 0;
}
