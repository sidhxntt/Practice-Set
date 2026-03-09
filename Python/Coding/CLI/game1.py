import random

class GuessNumber:
    def __init__(self):
        self.secret_number = random.randint(1, 100)
        self.attempts = 10

    def play_game(self):
        print("Welcome to the Number Guessing Game!")
        print("I'm thinking of a number between 1 and 100.")
        print(f"You have {self.attempts} attempts to guess the number.\n")
        
        while self.attempts > 0:
            try:
                guess = int(input("Take a guess: "))
                
                if guess < 1 or guess > 100:
                    print("Please enter a number between 1 and 100.\n")
                    continue
                
                self.attempts -= 1
                
                if guess < self.secret_number:
                    print("Too low! Try again.")
                elif guess > self.secret_number:
                    print("Too high! Try again.")
                else:
                    print(f"🎉 Congratulations! You guessed the number {self.secret_number} in {10 - self.attempts} attempts.")
                    break

                if self.attempts > 0:
                    print(f"You have {self.attempts} attempts left.\n")
                else:
                    print(f"\n❌ Sorry, you've run out of attempts. The number was {self.secret_number}.")
                    
            except ValueError:
                print("Invalid input. Please enter a valid number.\n")

        print("Thanks for playing!")

