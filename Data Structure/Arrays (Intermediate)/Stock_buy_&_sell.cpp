//Elements of the Array(Price) represents prices as points in stock line chart
//lowest element means time to buy whereas highest means time to sell
//Therefore we only need to focus on lowest and highest peak points for simplicity
#include<iostream>
using namespace std;
int max_profit(int price[],int n){
    int profit=0;
    for(int i=1;i<n;i++){
        if(price[i]>price[i-1]){
            profit+=price[i]-price[i-1];
        }
    }
    return profit;
}
int main()
{
  int n;
  cout<<"Enter the size of Stock Chart Line For analysis: ";
  cin>>n;
  int*price=new int(n);
  cout<<"\n Enter Price Points In Order:\t";
  for (int i = 0 ; i < n ; ++i ) 
    cin >> price[i];
 cout<<"Maximum Profit made"<<max_profit(price,n);
 return 0;
}