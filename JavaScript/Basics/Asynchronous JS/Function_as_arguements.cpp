#include<iostream>
using namespace std;

int add(int a, int b) { 
    return a + b;
}
int sub(int a,int b){
    return a-b;
}
int mul(int a,int b){
    return a*b;
}
int divsion(int a,int b){
    return a/b;
}
int mod(int a,int b){
    return a/b;
}


void calculator(int (*operation)(int, int), int a, int b) {
    int result = operation(a, b);
    cout << "Result: " << result << endl;
}

int main() {
    int x = 5;
    int y = 10;
    calculator(add, x, y);
    calculator(sub, x, y);
    calculator(mul, x, y);
    calculator(divsion, x, y);
    calculator(mod, x, y);
    return 0;
}
