from utils.displayer import logger, Displayer
from arrays import Arrays

class Strings(Displayer):

    def display(self, arr): 
        logger.info(f"Current array: {arr}")    # display the array O(1)

    def Find_char(self, arr:str, val:str): 
        if val in arr:
            i = arr.find(val)
            logger.info(f"Value {val} found at index {i}!")    
        else:
            logger.warning(f"Value {val} not found!")

    def Palindrome_check(self, arr:str):
        string = arr.lower()
        if string[::-1] == string:
            logger.info(f"String is Palindrome")    
            return True
        else:
            logger.warning(f"String is NOT Palindrome")    

# Usage
if __name__ == "__main__":
    a = Strings()

    str1 = "Siddhant Gupta"
    str2 = str1 # strings are immutable unlike lists in py
    str3 = "Level"

    operations = [
        ("Original array", a.display, str1),
        ("Index of the char G", a.Find_char, str1, "G"),
        ("Palindrome Check", a.Palindrome_check, str3 ),
      
    ]

    Displayer.execute(operations)