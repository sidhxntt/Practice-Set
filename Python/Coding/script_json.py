import json
import os

file_path = "/Users/siddhantgupta/Desktop/SID/Practice-Set/Python/Coding/sample.json"

# Check if the JSON file exists before reading
if os.path.exists(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
    print("Existing Data:", data)
else:
    print(f"Error: {file_path} does not exist.")

# Sample data
sample_data = {
    "name": "Alice Johnson",
    "age": 25,
    "email": "alice@example.com",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY",
        "zip": "10001"
    },
    "phone_numbers": [
        {"type": "home", "number": "555-1234"},
        {"type": "work", "number": "555-5678"}
    ],
    "hobbies": ["reading", "traveling", "photography"]
}

# Writing JSON data to a new file
new_file_path = "/Users/siddhantgupta/Desktop/SID/Practice-Set/Python/Coding/new_sample.json"

if os.path.exists(new_file_path):
    print("File already exists.")
else:
    with open(new_file_path, "w") as new_file:
        json.dump(sample_data, new_file, indent=4)
    print(f"New JSON file created at {new_file_path}")
