#include <iostream>
#include <fstream>
#include <string>
#include <vector>




using namespace std;
int main() {
    vector <int> id;
    fstream newfile;
    fstream oldfile;

    newfile.open("stock.json", ios::out);  // open a file to perform write operation using file object
    if (newfile.is_open()) //checking whether the file is open
    {  
        newfile << "[\n";
        oldfile.open("test.json", ios::in); //open a file to perform read operation using file object
        if (oldfile.is_open()) {   //checking whether the file is open
            string tp;
            while (getline(oldfile, tp)) { //read data from file object and put it into string.
                if (tp.size() >= 5)
                {
                    if (tp[5] == '_')
                    {
                        float random_sales = 0 + (rand() % static_cast<int>(100 - 0 + 1));
                        float random_stock = 0 + (rand() % static_cast<int>(100 - 0 + 1));
                        cout << "AAAAAAAAA" << endl;
                        cout << tp[5] << endl;
                        newfile << "{\n";
                        newfile << tp << "\n";
                        newfile << " \"stock\": " << random_stock << "," << "\n";
                        newfile << " \"times_sold\": " << random_sales <<  "\n";
                        newfile << "},\n";

                    }
                }
            }
            newfile << "]\n";
            oldfile.close(); //close the file object.
        }
        newfile.close();    //close the file object
    }


    
}


//newfile.open("booksdatanew.json", ios::out);  // open a file to perform write operation using file object
//if (newfile.is_open()) //checking whether the file is open
//{       
//    oldfile.open("bookdata.json", ios::in); //open a file to perform read operation using file object
//    if (oldfile.is_open()) {   //checking whether the file is open
//        string tp;
//        while (getline(oldfile, tp)) { //read data from file object and put it into string.
//            if (tp == " },{")
//            {
//                float randomcena = 15 + (rand() % static_cast<int>(40 - 15 + 1));
//                cout << "AAAAAAAAA" << endl;
//                newfile << tp << "\n";   //inserting text
//                newfile << " \"price\": " << randomcena << "," << "\n";
//            }
//            else
//            {
//                //cout << tp << "\n"; //print the data of the string
//                newfile << tp << "\n";   //inserting text
//            }
//        }
//        oldfile.close(); //close the file object.
//    }
//    newfile.close();    //close the file object
//}