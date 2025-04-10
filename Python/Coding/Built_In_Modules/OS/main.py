from JsonFileHandler import *

def interactive_menu(json_handler):
    while True:
        print("\nChoose an action:")
        print("1. Create multiple JSON files")
        print("2. List JSON files")
        print("3. Delete a JSON file")
        print("4. Delete all JSON files")
        print("5. Rename a JSON file")
        print("6. Exit")

        choice = input("Enter choice (1-6): ").strip()

        if choice == "1":
            num = int(input("Enter number of files to create: "))
            timestamped = input("Add timestamp to filenames? (y/n): ").strip().lower() == "y"
            json_handler.create_multiple_json_files(num, timestamped)
        elif choice == "2":
            json_handler.list_json_files()
        elif choice == "3":
            file_name = input("Enter file name to delete: ").strip()
            json_handler.delete_json_file(file_name)
        elif choice == "4":
            json_handler.delete_all_json_files()
        elif choice == "5":
            old_name = input("Enter current file name: ").strip()
            new_name = input("Enter new file name: ").strip()
            json_handler.rename_json_file(old_name, new_name)
        elif choice == "6":
            print("Exiting...")
            break
        else:
            print("Invalid choice. Please try again.")

# Main execution
if __name__ == "__main__":
    # Define paths
    READ_FILE_PATH = "/Users/siddhantgupta/Desktop/SID/Practice-Set/Python/Coding/sample.json"
    DIR_PATH = "/Users/siddhantgupta/Desktop/SID/Practice-Set/Python/Coding/Built_In_Modules/OS/output_directory"

    # Create an instance of JsonFileHandler
    json_handler = JsonFileHandler(READ_FILE_PATH, DIR_PATH)

    # Start interactive menu
    interactive_menu(json_handler)
