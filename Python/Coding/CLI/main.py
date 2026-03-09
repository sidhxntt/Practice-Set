from game1 import GuessNumber
from game2 import GuessWord
import getpass

def main():
    game1 = GuessNumber()
    game2 = GuessWord()
    
    print(f"Welcome to Arcadia {getpass.getuser()}")
    input1 = input("1. Lets start the game \n2. Exit\n")
    
    if input1 == "1":  
        print("Choose your game: ")
        input2 = input("1. Guess the Number \n2. Guess the Word\n")
        
        if input2 == "1": 
            game1.play_game()
        elif input2 == "2": 
            game2.play_game()
        else:
            print("Choose a valid number")
    elif input1 == "2": 
        print("Thank you for visiting Arcadia. Goodbye!")
    else:
        print("Invalid choice. Please restart and try again.")

if __name__ == "__main__":
    main()