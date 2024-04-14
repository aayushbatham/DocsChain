#include<iostream>
using namespace std;

void print(int i, int n)
{
    if(i < 4) 
    {return;}
    
    cout << i << endl;
    print(i - 1, n);
};

int main()
{
    print(5, 5);
    return 0;
}