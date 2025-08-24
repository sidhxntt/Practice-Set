from utils.displayer import logger, Displayer
from arrays import Arrays
class Strings(Arrays):

    def display(self, arr): 
        logger.info(f"Current String: {arr}")    # display the array O(1)

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

    def Anagram_Check(self, *arr:str):
        base_word = sorted(arr[0])
        for word in arr[1:]:
                if sorted(word)!= base_word:
                    logger.info(f"Words are NOT Anagram")  
                    return False
        logger.info(f"Words are Anagram")  
        return True
    
       
if __name__ == "__main__":
    s = Strings()

    name = "Siddhant Gupta"
    str2 = name # strings are immutable unlike lists in py
    palindrome = "Level"
    username = "sidhxntt"
    anagram1 = "listen"  
    anagram2 = "silent"  
    anagram3 = "enlist" 
    pc = "ABC" 

    operations = [
        ("Original array", s.display, name),
        ("Index of the char G", s.Find_char, name, "G"),
        ("Palindrome Check", s.Palindrome_check, palindrome ),
        ("Duplicate Check", s.duplicate, username),
        ("Anagram Check", s.Anagram_Check, anagram1, anagram2, anagram3),
        ("P&C ", s.Permutation_and_Combinations, pc),
      
    ]

    Displayer.execute(operations)