import logging
from abc import ABC

# Base Displayer class with per-module logging
FILE_PATH = "/Users/siddhantgupta/Desktop/SID/Practice-Set/DSA & Algorithms/Basics/ADTs/src/output"
class Displayer(ABC):
    
    @staticmethod
    def get_logger(module_name: str):
        """
        Returns a logger that logs to both terminal and a module-specific file
        """
        logger = logging.getLogger(module_name)
        logger.setLevel(logging.INFO)

        # Avoid adding multiple handlers if logger is reused
        if not logger.handlers:
            # Console handler
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(logging.Formatter('%(message)s'))
            logger.addHandler(console_handler)

            # File handler: writes to <module_name>.log
            file_handler = logging.FileHandler(f'{FILE_PATH}/{module_name}_output.log', mode='w')
            file_handler.setFormatter(logging.Formatter('%(message)s'))
            logger.addHandler(file_handler)

        return logger
    
    @staticmethod
    def displayer(operation_name, reversed=False):
        """Decorator to automatically log data structure after operation"""
        def decorator(func):
            def wrapper(self, *args, **kwargs):
                result = func(self, *args, **kwargs)   # run original method

                # Handle Array objects
                if hasattr(self, "array") and hasattr(self, "size"):
                    data = self.array[:self.size]
                    if reversed:
                        self.logger.info(f"[REVERSED][{operation_name}] Array after operation: {data[::-1]}")
                    else:
                        self.logger.info(f"[{operation_name}] Array after operation: {data}")

                # Handle Stack objects
                elif hasattr(self, "stack") and hasattr(self, "size"):
                    data = self.stack[:self.size]
                    if reversed:
                        self.logger.info(f"[REVERSED][{operation_name}] Stack after operation: {data[::-1]}")
                    else:
                        self.logger.info(f"[{operation_name}] Stack after operation: {data}")

                # Handle Queue objects
                elif hasattr(self, "queue") and hasattr(self, "size"):
                    data = self.stack[:self.size]
                    if reversed:
                        self.logger.info(f"[REVERSED][{operation_name}] Queue after operation: {data[::-1]}")
                    else:
                        self.logger.info(f"[{operation_name}] Queue after operation: {data}")

                # Handle String objects
                elif hasattr(self, "string"):
                    if reversed:
                        self.logger.info(f"[REVERSED][{operation_name}] String after operation: {self.string[::-1]}")
                    else:
                        self.logger.info(f"[{operation_name}] String after operation: {self.string}")

                # Fallback
                else:
                    self.logger.info(f"[{operation_name}] Operation completed")

                return result
            return wrapper
        return decorator
