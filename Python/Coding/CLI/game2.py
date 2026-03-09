from game1 import GuessNumber
import random

class GuessWord(GuessNumber):

    def __init__(self):
        # Initialize the parent class
        super().__init__()
        # Word list for the game
        self.word_list = [
            "python", "coding", "computer", "algorithm", "programming",
            "developer", "software", "function", "variable", "logic"
        ]
    
    def hinting(self, hints, secret_word):
        if hints == 3:
            print(f"Word starts with: {secret_word[0]}")
        elif hints == 2:
            print(f"Word ends with: {secret_word[-1]}")
        else:
            middle_index = len(secret_word) // 2
            print(f"Middle letter of the word is: {secret_word[middle_index]}")
        
    def play_game(self):
        print("Welcome to the Word Guessing Game!")
        print("I'm thinking of a word from my list.")
        
        # Select a random word
        secret_word = random.choice(self.word_list)
        attempts = 10
        hints = 3
        
        print(f"You have {attempts} attempts to guess the word.")
        print(f"You have {hints} hints to use.")
        
        while attempts > 0:
            guess = input("Take a guess: ").lower().strip()
            attempts -= 1
            
            if guess == secret_word:
                print(f"Congratulations! You've guessed the word '{secret_word}'!")
                break
            else:
                # Provide a hint - first letter
                take_hint = input(f"Wrong guess! Take a hint? (y/n): ")
                if take_hint == 'y':
                    if hints > 0:
                        self.hinting(hints, secret_word)
                        hints -= 1
                    else:
                        print("You have no hints remaining!")
                print(f"You have {attempts} attempts left.")
            
            if attempts == 0:
                print(f"Sorry, you've run out of attempts. The word was '{secret_word}'.")
        
        print("Thanks for playing!")