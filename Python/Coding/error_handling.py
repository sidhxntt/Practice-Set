import json

class CustomError(Exception):
    """Custom exception for demonstration purposes."""
    pass

def read_file(filename):
    """Reads a JSON file and handles file-related exceptions."""
    try:
        with open(filename, "r") as file:
            data = json.load(file)
            print("File content:", data)
            return data
    except FileNotFoundError:
        print(f"Error: The file '{filename}' was not found.")
    except json.JSONDecodeError:
        print(f"Error: Failed to decode JSON in '{filename}'.")
    except PermissionError:
        print(f"Error: Permission denied for '{filename}'.")

def process_number():
    """Handles user input, division, and overflow errors."""
    try:
        num = int(input("Enter a number: "))  # May raise ValueError
        result = 100 / num                   # May raise ZeroDivisionError
        print(f"100 divided by {num} is {result}")
    except ValueError:
        print("Invalid input! Please enter a valid number.")
    except ZeroDivisionError:
        print("You can't divide by zero!")
    else:
        print("Success! No errors occurred.")
    finally:
        print("Number processing complete.")

def list_operations():
    """Demonstrates handling IndexError."""
    try:
        lst = [10, 20, 30]
        print("Accessing index 5:", lst[5])  # Out of bounds
    except IndexError as e:
        print(f"IndexError: {e}")

def dict_operations():
    """Demonstrates handling KeyError."""
    try:
        d = {"name": "Alice"}
        print("Age:", d["age"])  # KeyError since 'age' doesn't exist
    except KeyError as e:
        print(f"KeyError: The key {e} does not exist.")

def validate_age(age):
    """Raises a custom exception if age is invalid."""
    if age < 0:
        raise CustomError("Age cannot be negative!")
    print(f"Age set to {age}")

def main():
    file_path = "/Users/siddhantgupta/Desktop/SID/Practice-Set/Python/Coding/sample.json"

    """Main function demonstrating all exception handling cases."""
    print("\n🔹 Handling File Operations:")
    read_file("sample.json")  # File operations

    print("\n🔹 Handling Number Processing:")
    process_number()  # Number processing

    print("\n🔹 Handling List Operations:")
    list_operations()  # List operations

    print("\n🔹 Handling Dictionary Operations:")
    dict_operations()  # Dictionary operations

    print("\n🔹 Raising Custom Exception:")
    try:
        validate_age(-5)
    except CustomError as e:
        print(f"CustomError Caught: {e}")

    print("\n✅ Program execution completed successfully!")

if __name__ == "__main__":
    main()
