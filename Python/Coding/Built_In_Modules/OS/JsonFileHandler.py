import os
import json
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

class JsonFileHandler:
    def __init__(self, read_file_path, output_dir, file_prefix="sample"):
        """Initialize with paths for reading and writing JSON files."""
        self.read_file_path = read_file_path
        self.output_dir = output_dir
        self.file_prefix = file_prefix  # Prefix for generated files
        self.create_directory()

    def create_directory(self):
        """Creates an output directory if it does not exist."""
        try:
            os.makedirs(self.output_dir, exist_ok=True)
            logging.info(f"Directory '{self.output_dir}' is ready.")
        except Exception as e:
            logging.error(f"Failed to create directory: {e}")

    def read_json(self):
        """Reads JSON data from the specified file."""
        try:
            if not os.path.exists(self.read_file_path):
                logging.error(f"File '{self.read_file_path}' does not exist.")
                return None
            with open(self.read_file_path, "r", encoding="utf-8") as file:
                return json.load(file) #deserialisation
        except json.JSONDecodeError:
            logging.error(f"Failed to decode JSON in '{self.read_file_path}'.")
        except PermissionError:
            logging.error(f"Permission denied for '{self.read_file_path}'.")
        except Exception as e:
            logging.error(f"Unexpected error while reading JSON: {e}")
            
    def write_json(self, file_name, data):
        """Writes JSON data to a file inside the output directory."""
        try:
            file_path = os.path.join(self.output_dir, file_name)
            with open(file_path, "w", encoding="utf-8") as file:
                json.dump(data, file, indent=4) # serialisation
            logging.info(f"Data written to '{file_path}' successfully.")
        except PermissionError:
            logging.error(f"Permission denied for '{file_path}'.")
        except Exception as e:
            logging.error(f"Unexpected error while writing JSON: {e}")

    def create_multiple_json_files(self, num_files=10, timestamped=False):
        """Reads JSON data and writes it to multiple files with different names."""
        data = self.read_json()
        if not data:
            logging.warning("No data to write.")
            return

        logging.info(f"Existing Data: {data}")

        for i in range(1, num_files + 1):
            timestamp = time.strftime("%Y%m%d_%H%M%S") if timestamped else ""
            file_name = f"{self.file_prefix}_{i}_{timestamp}.json" if timestamped else f"{self.file_prefix}_{i}.json"
            self.write_json(file_name, data)

    def list_json_files(self):
        """Lists all JSON files in the output directory."""
        try:
            files = [f for f in os.listdir(self.output_dir) if f.endswith(".json")]
            if files:
                logging.info("JSON Files in Directory:")
                for file in files:
                    print(f"- {file}")
            else:
                logging.info("No JSON files found in the directory.")
        except Exception as e:
            logging.error(f"Error listing files: {e}")

    def delete_json_file(self, file_name):
        """Deletes a specific JSON file from the directory."""
        file_path = os.path.join(self.output_dir, file_name)
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logging.info(f"Deleted '{file_name}' successfully.")
            else:
                logging.warning(f"File '{file_name}' not found.")
        except Exception as e:
            logging.error(f"Error deleting file '{file_name}': {e}")

    def delete_all_json_files(self):
        """Deletes all JSON files in the output directory."""
        try:
            files_deleted = 0
            for file_name in os.listdir(self.output_dir):
                if file_name.endswith(".json"):
                    os.remove(os.path.join(self.output_dir, file_name))
                    files_deleted += 1
            logging.info(f"Deleted {files_deleted} JSON files.")
        except Exception as e:
            logging.error(f"Error deleting files: {e}")

    def rename_json_file(self, old_name, new_name):
        """Renames a JSON file in the directory."""
        old_path = os.path.join(self.output_dir, old_name)
        new_path = os.path.join(self.output_dir, new_name)
        try:
            if os.path.exists(old_path):
                os.rename(old_path, new_path)
                logging.info(f"Renamed '{old_name}' to '{new_name}'.")
            else:
                logging.warning(f"File '{old_name}' not found.")
        except Exception as e:
            logging.error(f"Error renaming file: {e}")
 
__all__ = ["JsonFileHandler"]