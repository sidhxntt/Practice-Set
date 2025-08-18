1. Main Memory got 3 parts - code section, heap, stack 
2. Programs cant access anything directly from heap ony from stack as variable or anything by default is initialised in stack of the main memory and to make sure you want to declare in heap u need to use new in c++ or malloc in c
3.  Therefore pointers are used which store the address of anything to access anything in the heap/ external resources or pass by reference. Also new / malloc function also returns a pointer only
4. Size of the pointer is constant irrespective of it type
5. We dont initialise pointers to the Array by & .
6. pointers vs references (references dont consume memrory like pointer)
7. i wrote a code in py and saved it and its saved in hdd when i run it, its bought to RAM where CPU executes it. And every program finally running(process) will access some data ie variable, arrays etc. and to make the performace the process on the data is optimise we require data structure. So arrange my of data in RAM in data strctures same as arrange of data in db is relational data.
Now when the program is bought into ram its bought in code section of the RAM and cpu will execute it. Now anythig such as varaibles, etc will be allocated in stack duing compile time only (compiling means changing human friendy code to machine code ie binary for excecution)
8. physical vs logical Data structures
9. Abstract data type (ADT)